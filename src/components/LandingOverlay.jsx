import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'

/**
 * LandingOverlay — the "cover" of the invite, styled like a Spotify Wrapped /
 * playlist splash. All text and visuals are powered by the central WEDDING_CONFIG.
 */
export default function LandingOverlay({ config, coverArt, onPlay }) {
  const groom = config?.groom || 'Ranveer'
  const bride = config?.bride || 'Alia'
  const initials = config?.initials || `${groom[0]} ♥ ${bride[0]}`
  const tagline = config?.tagline || `${config?.year || '2026'} WRAPPED`
  const playlistName = config?.playlistName || 'The Wedding Playlist'
  const story =
    config?.story ||
    'Every great love story deserves a soundtrack — and theirs is finally here. Three ceremonies, one unforgettable celebration. May their days always play in perfect harmony. 🤍'

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
        {tagline}
      </motion.p>

      <div className="flex flex-col items-center">
        {/* Playlist "cover art" tile with the couple's photo and initials */}
        <motion.div
          className="relative mb-6 h-36 w-36 overflow-hidden rounded-2xl shadow-2xl shadow-black/70 ring-1 ring-white/20 sm:h-40 sm:w-40"
          initial={{ scale: 0.6, opacity: 0, rotate: -4 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
        >
          {coverArt ? (
            <img
              src={coverArt}
              alt={`${groom} & ${bride} Wedding Cover`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold via-spotify to-emerald-700">
              <span className="text-4xl font-black text-black/90">
                {initials}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-spotify">
              Playlist
            </span>
            <span className="text-xs font-bold text-white/95 drop-shadow">
              {initials}
            </span>
          </div>
        </motion.div>

        <motion.p
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-spotify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {playlistName}
        </motion.p>

        <motion.h1
          className="font-black leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(2.75rem, 14vw, 5.5rem)' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
        >
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            {groom}
          </span>
          <span className="my-1 block text-xl font-light italic text-gold sm:text-2xl">
            weds
          </span>
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            {bride}
          </span>
        </motion.h1>

        {/* Blessing / Story */}
        <motion.p
          className="mt-7 max-w-xs text-sm leading-relaxed text-white/75 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {story}
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

