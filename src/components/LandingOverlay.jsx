import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'

/**
 * LandingOverlay — the "cover" of the invite, styled like a Spotify Wrapped /
 * playlist splash for Ranveer & Alia. The WHOLE screen is tappable (and there's
 * an explicit button) — either boots the audio context and opens the events.
 */
export default function LandingOverlay({ onPlay }) {
  return (
    <motion.div
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invite"
      className="relative z-10 flex min-h-dvh cursor-pointer select-none flex-col items-center justify-between px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5 } }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="text-xs font-semibold tracking-[0.4em] text-white/60"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        2026 WRAPPED
      </motion.p>

      <div className="flex flex-col items-center">
        {/* Playlist "cover art" tile with the couple's monogram */}
        <motion.div
          className="mb-8 flex h-36 w-36 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-spotify to-emerald-700 shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:h-40 sm:w-40"
          initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
        >
          <span className="text-5xl font-black tracking-tight text-black/90 drop-shadow">
            R<span className="mx-0.5 align-middle text-3xl">♥</span>A
          </span>
        </motion.div>

        <motion.p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-spotify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          The Wedding Playlist
        </motion.p>

        <motion.h1
          className="font-black leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(2.75rem, 14vw, 5.5rem)' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
        >
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            Ranveer
          </span>
          <span className="my-1 block text-xl font-light italic text-gold sm:text-2xl">
            weds
          </span>
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            Alia
          </span>
        </motion.h1>

        {/* Blessing */}
        <motion.p
          className="mt-7 max-w-xs text-sm leading-relaxed text-white/75 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Every great love story deserves a soundtrack — and theirs is finally here.
          Five events, one unforgettable weekend. May their days always play in
          perfect harmony. 🤍
        </motion.p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          onClick={onPlay}
          aria-label="Open the invite"
          className="animate-pulseGlow flex h-20 w-20 items-center justify-center rounded-full bg-spotify text-black transition-transform active:scale-95"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 140 }}
        >
          <Play size={34} className="ml-1 fill-black" />
        </motion.button>

        <motion.div
          className="flex items-center gap-1 text-xs font-medium tracking-wide text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Tap anywhere to open your invite
          <ChevronRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}
