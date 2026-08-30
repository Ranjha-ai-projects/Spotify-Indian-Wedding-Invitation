import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Mic2, Sparkles } from 'lucide-react'

/**
 * LyricsBox — the Spotify-styled "lyrics" card holding the event vibe and dress code.
 * Glassmorphism panel with ambient glow and dress code badge.
 */
export default function LyricsBox({
  trackId,
  lyrics,
  venue,
  mapsUrl,
  accent = '#1DB954',
}) {
  // Extract Dress Code if specified in the lyrics text
  const dressCodeMatch = lyrics ? lyrics.match(/Dress Code:\s*(.*)/i) : null
  const dressCode = dressCodeMatch ? dressCodeMatch[1].trim() : null
  const mainLyrics = dressCodeMatch
    ? lyrics.replace(/Dress Code:\s*.*/i, '').trim()
    : lyrics

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.04] p-4 backdrop-blur-xl shadow-xl shadow-black/40">
      {/* Top ambient color glow matching track accent */}
      <div
        className="pointer-events-none absolute -top-10 left-0 right-0 h-16 opacity-35 blur-xl transition-colors duration-700"
        style={{ background: accent }}
      />

      <div className="relative z-10 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-spotify">
          <Mic2 size={13} className="text-spotify" />
          <span>Lyrics & Vibe</span>
        </div>
        {venue && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium text-white/60 hover:text-white transition-colors"
          >
            <MapPin size={11} className="text-gold shrink-0" />
            <span className="truncate max-w-[160px]">{venue}</span>
          </a>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={trackId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <p className="text-[14.5px] sm:text-[15px] font-normal leading-relaxed text-white/95 tracking-wide">
            {mainLyrics}
          </p>

          {dressCode && (
            <div className="mt-3 flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold shadow-sm">
                <Sparkles size={11} className="text-gold" />
                <span>Dress Code:</span>
                <span className="font-medium text-white/90">{dressCode}</span>
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

