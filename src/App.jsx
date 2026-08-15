import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { WEDDING_PLAYLIST } from './data/playlist.js'
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

  const track = WEDDING_PLAYLIST[audio.currentIndex]

  const handlePlay = () => {
    setScreen('player') // transition first so the UI never blocks on audio
    audio.start() // boots audio on the user gesture
  }

  return (
    <div className="relative min-h-dvh w-full">
      <BackgroundGradient coverUrl={track.coverUrl} accent={track.accent} />

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <LandingOverlay key="landing" onPlay={handlePlay} />
        )}

        {screen === 'player' && (
          <MusicPlayer
            key="player"
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
            mapsUrl={track.mapsUrl}
            onBack={() => setScreen('player')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
