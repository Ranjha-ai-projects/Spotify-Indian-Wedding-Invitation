import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useAudioEngine — drives playback for the whole playlist using TWO <audio>
 * elements so we can cross-fade between tracks (one fades out while the next
 * fades in). All heavy work is done imperatively on refs to avoid re-renders;
 * React state only holds the lightweight values the UI needs.
 *
 * @param {Array} playlist  array of tracks (needs .audioUrl)
 * @param {object} [opts]
 * @param {number} [opts.fadeMs]      cross-fade duration in ms
 * @param {Function} [opts.onFinished] called when advancing past the last track
 */
export function useAudioEngine(playlist, { fadeMs = 700, onFinished } = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  // Keep the latest onFinished without re-subscribing the 'ended' listeners.
  const onFinishedRef = useRef(onFinished)
  onFinishedRef.current = onFinished

  // Two audio elements + which one is "active" (0 or 1).
  const audiosRef = useRef([])
  const activeRef = useRef(0)
  const fadeRafRef = useRef(null)
  const tickRef = useRef(null)

  // Lazily create the two Audio elements once.
  if (audiosRef.current.length === 0 && typeof Audio !== 'undefined') {
    const a = new Audio()
    const b = new Audio()
    for (const el of [a, b]) {
      el.preload = 'auto'
      // NOTE: no crossOrigin — we only need playback, not Web Audio analysis.
      // Setting it would require CORS headers the sample host doesn't send.
      el.volume = 0
    }
    audiosRef.current = [a, b]
  }

  const getActive = () => audiosRef.current[activeRef.current]
  const getIdle = () => audiosRef.current[activeRef.current === 0 ? 1 : 0]

  const cancelFade = () => {
    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current)
    fadeRafRef.current = null
  }

  // Animate volumes from current values toward targets over fadeMs.
  const runFade = useCallback(
    (inEl, outEl, done) => {
      cancelFade()
      const startIn = inEl.volume
      const startOut = outEl ? outEl.volume : 0
      const start = performance.now()
      const step = (now) => {
        const t = Math.min(1, (now - start) / fadeMs)
        inEl.volume = startIn + (1 - startIn) * t
        if (outEl) outEl.volume = startOut * (1 - t)
        if (t < 1) {
          fadeRafRef.current = requestAnimationFrame(step)
        } else {
          fadeRafRef.current = null
          if (outEl) {
            outEl.pause()
            outEl.volume = 0
          }
          done && done()
        }
      }
      fadeRafRef.current = requestAnimationFrame(step)
    },
    [fadeMs],
  )

  // Load a track into a given audio element.
  const load = useCallback(
    (el, index) => {
      const track = playlist[index]
      if (!track) return
      if (el.dataset.src !== track.audioUrl) {
        el.src = track.audioUrl
        el.dataset.src = track.audioUrl
        el.load()
      }
    },
    [playlist],
  )

  // Poll current time / duration ~4x per second (cheap, smooth enough).
  useEffect(() => {
    tickRef.current = setInterval(() => {
      const el = getActive()
      if (!el) return
      if (!Number.isNaN(el.duration)) setDuration(el.duration || 0)
      setCurrentTime(el.currentTime || 0)
    }, 250)
    return () => clearInterval(tickRef.current)
  }, [])

  // Start playing the current index from the beginning (first user gesture).
  const start = useCallback(() => {
    const el = getActive()
    load(el, currentIndex)
    try {
      el.currentTime = 0
    } catch (_) {}
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
    runFade(el, null)
    setReady(true)
    setIsPlaying(true)
  }, [currentIndex, load, runFade])

  const play = useCallback(() => {
    const el = getActive()
    const p = el.play()
    if (p && p.catch) p.catch(() => {})
    runFade(el, null)
    setIsPlaying(true)
  }, [runFade])

  const pause = useCallback(() => {
    cancelFade()
    const el = getActive()
    el.pause()
    el.volume = 1 // keep it ready for instant resume
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  // Cross-fade to another index.
  const goto = useCallback(
    (nextIndex) => {
      const len = playlist.length
      const idx = ((nextIndex % len) + len) % len
      if (idx === currentIndex && ready) {
        // same track -> just restart
        const el = getActive()
        el.currentTime = 0
        return
      }
      const outEl = getActive()
      const inEl = getIdle()
      load(inEl, idx)
      inEl.currentTime = 0
      inEl.volume = 0
      const p = inEl.play()
      if (p && p.catch) p.catch(() => {})
      // swap active pointer immediately so time-tracking follows the new track
      activeRef.current = activeRef.current === 0 ? 1 : 0
      runFade(inEl, outEl)
      setCurrentIndex(idx)
      setCurrentTime(0)
      setDuration(0)
      setReady(true)
      setIsPlaying(true)
    },
    [currentIndex, playlist.length, load, runFade, ready],
  )

  const next = useCallback(() => {
    // Past the last event -> hand off (e.g. to the RSVP screen) instead of wrapping.
    if (currentIndex >= playlist.length - 1) {
      if (onFinishedRef.current) onFinishedRef.current()
      return
    }
    goto(currentIndex + 1)
  }, [goto, currentIndex, playlist.length])

  const prev = useCallback(() => {
    // If we're >3s in, restart the current track (Spotify behaviour).
    const el = getActive()
    if (el && el.currentTime > 3) {
      el.currentTime = 0
      return
    }
    if (currentIndex <= 0) {
      if (el) el.currentTime = 0
      return
    }
    goto(currentIndex - 1)
  }, [goto, currentIndex])

  const seek = useCallback((time) => {
    const el = getActive()
    if (el && !Number.isNaN(time)) {
      el.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  // Auto-advance when a track ends.
  useEffect(() => {
    const [a, b] = audiosRef.current
    if (!a || !b) return
    const onEnd = (e) => {
      // Only advance if the ended element is the active one.
      if (e.target === getActive()) next()
    }
    a.addEventListener('ended', onEnd)
    b.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('ended', onEnd)
      b.removeEventListener('ended', onEnd)
    }
  }, [next])

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      cancelFade()
      audiosRef.current.forEach((el) => {
        try {
          el.pause()
          el.src = ''
        } catch (_) {}
      })
    }
  }, [])

  return {
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    ready,
    start,
    play,
    pause,
    togglePlay,
    next,
    prev,
    goto,
    seek,
  }
}
