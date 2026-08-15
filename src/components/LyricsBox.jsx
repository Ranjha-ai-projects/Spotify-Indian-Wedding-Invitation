import { AnimatePresence, motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

/**
 * LyricsBox — the "lyrics" card holding the event description / vibe text.
 * Glassmorphism panel; content cross-fades when the track changes.
 */
export default function LyricsBox({ trackId, lyrics, venue, mapsUrl }) {
  return (
    <div className="mt-5 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
          Lyrics
        </span>
        {venue && (
          <span className="flex items-center gap-1 text-xs text-white/50">
            <MapPin size={12} /> {venue}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={trackId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-[15px] leading-relaxed text-white/90"
        >
          {lyrics}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
