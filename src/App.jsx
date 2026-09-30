import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WEDDING_CONFIG, WEDDING_PLAYLIST } from './data/playlist.js'
import { useAudioEngine } from './hooks/useAudioEngine.js'
import BackgroundGradient from './components/BackgroundGradient.jsx'
import LandingOverlay from './components/LandingOverlay.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import RsvpScreen from './components/RsvpScreen.jsx'

/**
 * App — owns the screen router ('landing' | 'player' | 'rsvp'), the audio
 * engine, and the slide direction used by the album-art transition.
 */
export default function App() {
  const [screen, setScreen] = useState('landing')

  // Dynamically update document title based on couple configuration
  useEffect(() => {
    const isBrideFirst =
      WEDDING_CONFIG?.displayOrder?.toLowerCase()?.startsWith('bride') ?? true
    const bride = WEDDING_CONFIG?.bride || '[BRIDE’S NAME]'
    const groom = WEDDING_CONFIG?.groom || '[GROOM’S NAME]'
    const first = isBrideFirst ? bride : groom
    const second = isBrideFirst ? groom : bride
    document.title = `${first} weds ${second} — ${WEDDING_CONFIG?.tagline || 'The Wedding Playlist'}`
  }, [])

  // Advancing past the final event drops the guest onto the RSVP form.
  const audio = useAudioEngine(WEDDING_PLAYLIST, {
    onFinished: () => setScreen('rsvp'),
  })

  // Track slide direction (1 = next/right, -1 = prev/left) for AlbumArt.
  const [direction, setDirection] = useState(1)
  const lastIndex = useRef(audio.currentIndex)
  if (audio.currentIndex !== lastIndex.current) {
    setDirection(audio.currentIndex > lastIndex.current ? 1 : -1)
    lastIndex.current = audio.currentIndex
  }

  const track = WEDDING_PLAYLIST[audio.currentIndex] || WEDDING_PLAYLIST[0]

  const handlePlay = () => {
    setScreen('player') // transition first so the UI never blocks on audio
    audio.start() // boots audio on the user gesture
  }

  return (
    <div className="relative min-h-dvh w-full">
      <BackgroundGradient coverUrl={track?.coverUrl} accent={track?.accent} />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingOverlay
            key="landing"
            config={WEDDING_CONFIG}
            coverArt={WEDDING_CONFIG?.landingCoverUrl || WEDDING_PLAYLIST[0]?.coverUrl}
            onPlay={handlePlay}
          />
        )}

        {screen === 'player' && track && (
          <MusicPlayer
            key="player"
            config={WEDDING_CONFIG}
            track={track}
            index={audio.currentIndex}
            total={WEDDING_PLAYLIST.length}
            direction={direction}
            audio={audio}
            onOpenRsvp={() => setScreen('rsvp')}
          />
        )}

        {screen === 'rsvp' && (
          <RsvpScreen
            key="rsvp"
            config={WEDDING_CONFIG}
            events={WEDDING_PLAYLIST}
            mapsUrl={track?.mapsUrl}
            weddingDate={WEDDING_CONFIG?.isoWeddingDate}
            onBack={() => setScreen('player')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
