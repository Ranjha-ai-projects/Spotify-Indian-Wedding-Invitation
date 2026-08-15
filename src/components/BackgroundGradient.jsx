import { AnimatePresence, motion } from 'framer-motion'

/**
 * BackgroundGradient — immersive blurred backdrop built from the current cover.
 * The image is scaled up so its blurred edges never show, and cross-faded when
 * the track changes. A dark gradient sits on top for text contrast.
 *
 * Perf notes: we render only the CURRENT + OUTGOING image (AnimatePresence),
 * push it to its own GPU layer, and keep the blur on a scaled-up static layer
 * so the browser isn't re-blurring every frame.
 */
export default function BackgroundGradient({ coverUrl, accent = '#1DB954' }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <AnimatePresence initial={false}>
        <motion.div
          key={coverUrl}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(48px) saturate(1.4)',
            transform: 'scale(1.35) translateZ(0)',
            willChange: 'opacity',
          }}
        />
      </AnimatePresence>

      {/* Accent glow + dark gradient for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${accent}22 0%, transparent 45%),
                       linear-gradient(180deg, rgba(18,18,18,0.35) 0%, rgba(18,18,18,0.75) 55%, #121212 100%)`,
        }}
      />
    </div>
  )
}
