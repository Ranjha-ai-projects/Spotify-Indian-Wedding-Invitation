import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Play } from 'lucide-react'

/**
 * LandingOverlay — the "cover" of the invite, styled like a Spotify Wrapped /
 * playlist splash. All text and visuals are powered by the central WEDDING_CONFIG.
 */
export default function LandingOverlay({ config, coverArt, onPlay }) {
  const isBrideFirst =
    config?.displayOrder?.toLowerCase()?.startsWith('bride') ?? true
  const bride = config?.bride || '[BRIDE’S NAME]'
  const groom = config?.groom || '[GROOM’S NAME]'

  const firstPerson = isBrideFirst ? bride : groom
  const secondPerson = isBrideFirst ? groom : bride

  const firstInitial = (firstPerson.replace(/[^a-zA-Z]/g, '')[0] || 'B').toUpperCase()
  const secondInitial = (secondPerson.replace(/[^a-zA-Z]/g, '')[0] || 'G').toUpperCase()
  const initials = config?.initials && config.initials !== 'E ♥ J'
    ? config.initials
    : `${firstInitial} ♥ ${secondInitial}`

  const tagline = config?.tagline || 'OUR FOREVER ERA'
  const playlistName = config?.playlistName || 'The Wedding Playlist'
  const story =
    config?.story ||
    'Together with our families, we invite you to celebrate the beginning of our forever. Two hearts. One playlist. A lifetime on repeat. 🤍'

  const effectiveCover = config?.landingCoverUrl || coverArt
  const cityState = config?.weddingCityState && !config.weddingCityState.includes('[')
    ? config.weddingCityState
    : null
  const hashtag = config?.hashtag && !config.hashtag.includes('[')
    ? config.hashtag.startsWith('#')
      ? config.hashtag
      : `#${config.hashtag}`
    : null

  return (
    <motion.div
      onClick={onPlay}
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invite"
      className="relative z-10 flex min-h-dvh cursor-pointer select-none flex-col items-center justify-between px-6 py-10 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5 } }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        className="text-xs font-semibold tracking-[0.4em] text-white/60 uppercase"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {tagline}
      </motion.p>

      <div className="flex flex-col items-center max-w-sm sm:max-w-md w-full">
        {/* Playlist "cover art" tile with the couple's photo and initials */}
        <motion.div
          className="relative mb-5 h-36 w-36 overflow-hidden rounded-2xl shadow-2xl shadow-black/70 ring-1 ring-white/20 sm:h-44 sm:w-44"
          initial={{ scale: 0.6, opacity: 0, rotate: -4 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
        >
          {effectiveCover ? (
            <img
              src={effectiveCover}
              alt={`${firstPerson} & ${secondPerson} Wedding Cover`}
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
          className="mb-1 text-[11px] font-bold uppercase tracking-[0.3em] text-spotify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {playlistName}
        </motion.p>

        <motion.h1
          className="font-black leading-[0.95] tracking-tight w-full break-words"
          style={{ fontSize: 'clamp(2.25rem, 11vw, 4.5rem)' }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
        >
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent px-2">
            {firstPerson}
          </span>
          <span className="my-0.5 block text-lg font-light italic text-gold sm:text-2xl">
            weds
          </span>
          <span className="block bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent px-2">
            {secondPerson}
          </span>
        </motion.h1>

        {cityState && (
          <motion.div
            className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-wider text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MapPin size={13} className="text-gold shrink-0" />
            <span>{cityState}</span>
          </motion.div>
        )}

        {hashtag && (
          <motion.span
            className="mt-1.5 inline-block text-[11px] font-bold tracking-wider text-gold/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {hashtag}
          </motion.span>
        )}

        {/* Blessing / Story */}
        <motion.p
          className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-white/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {story}
        </motion.p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <motion.button
          onClick={onPlay}
          aria-label="Open the invite"
          className="animate-pulseGlow flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-spotify text-black transition-transform active:scale-95 shadow-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 140 }}
        >
          <Play size={30} className="ml-1 fill-black sm:w-8 sm:h-8" />
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
