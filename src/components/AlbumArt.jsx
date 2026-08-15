import { AnimatePresence, motion } from 'framer-motion'

/**
 * AlbumArt — the big square event photo.
 * - Cross-slides on track change (old exits left, new enters from right) via
 *   AnimatePresence + the `direction` prop.
 * - Scales up slightly while playing, shrinks when paused.
 */
export default function AlbumArt({ track, isPlaying, direction = 1 }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(78vw,22rem)] select-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={track.id}
          custom={direction}
          className="absolute inset-0"
          initial={(dir) => ({ x: dir > 0 ? '110%' : '-110%', opacity: 0 })}
          animate={{ x: '0%', opacity: 1 }}
          exit={(dir) => ({ x: dir > 0 ? '-110%' : '110%', opacity: 0 })}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        >
          <motion.div
            className="h-full w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10"
            animate={{ scale: isPlaying ? 1 : 0.92 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            style={{ willChange: 'transform' }}
          >
            <img
              src={track.coverUrl}
              alt={track.title}
              draggable={false}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
