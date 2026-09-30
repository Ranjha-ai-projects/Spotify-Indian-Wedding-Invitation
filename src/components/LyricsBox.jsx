import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Mic2, Sparkles, Clock } from 'lucide-react'

/**
 * LyricsBox — Spotify-styled card holding the event vibe, venue, dress code,
 * and ceremony schedule details.
 */
export default function LyricsBox({
  trackId,
  lyrics,
  venue,
  address,
  mapsUrl,
  dressCode: propDressCode,
  schedule,
  accent = '#1DB954',
}) {
  // Extract Dress Code if specified in lyrics or passed as prop
  const dressCodeMatch = lyrics ? lyrics.match(/Dress Code:\s*(.*)/i) : null
  const dressCode =
    propDressCode || (dressCodeMatch ? dressCodeMatch[1].trim() : null)
  const mainLyrics = dressCodeMatch
    ? lyrics.replace(/Dress Code:\s*.*/i, '').trim()
    : lyrics

  const hasValidMapUrl =
    mapsUrl &&
    !mapsUrl.includes('[') &&
    (mapsUrl.startsWith('http://') || mapsUrl.startsWith('https://'))

  const cleanVenue = venue && !venue.includes('[') ? venue : venue
  const cleanAddress = address && !address.includes('[') ? address : null

  const hasSchedule =
    schedule &&
    ((schedule.arrival && !schedule.arrival.includes('[')) ||
      (schedule.baraat && !schedule.baraat.includes('[')) ||
      (schedule.ceremony && !schedule.ceremony.includes('[')))

  return (
    <div className="relative mt-3.5 w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.04] p-4 backdrop-blur-xl shadow-xl shadow-black/40">
      {/* Top ambient color glow matching track accent */}
      <div
        className="pointer-events-none absolute -top-10 left-0 right-0 h-16 opacity-35 blur-xl transition-colors duration-700"
        style={{ background: accent }}
      />

      <div className="relative z-10 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-spotify">
          <Mic2 size={13} className="text-spotify" />
          <span>Vibe & Details</span>
        </div>

        {cleanVenue && (
          hasValidMapUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium text-white/70 hover:text-white transition-colors"
            >
              <MapPin size={11} className="text-gold shrink-0" />
              <span className="truncate max-w-[160px]">{cleanVenue}</span>
            </a>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-medium text-white/60">
              <MapPin size={11} className="text-gold shrink-0" />
              <span className="truncate max-w-[160px]">{cleanVenue}</span>
            </div>
          )
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
          <p className="text-[13.5px] sm:text-[14.5px] font-normal leading-relaxed text-white/95 tracking-wide">
            {mainLyrics}
          </p>

          {cleanAddress && (
            <p className="mt-1.5 text-[11px] text-white/50 truncate">
              {cleanAddress}
            </p>
          )}

          {/* Dress code badge */}
          {dressCode && (
            <div className="mt-2.5 flex items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10.5px] font-semibold text-gold shadow-sm">
                <Sparkles size={11} className="text-gold" />
                <span>Dress Code:</span>
                <span className="font-medium text-white/90">{dressCode}</span>
              </span>
            </div>
          )}

          {/* Ceremony timetable if present */}
          {hasSchedule && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-2 text-[10.5px] font-medium text-white/80">
              {schedule.arrival && !schedule.arrival.includes('[') && (
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">
                  <Clock size={10} className="text-gold" />
                  <span className="text-gold">Arrival:</span> {schedule.arrival}
                </span>
              )}
              {schedule.baraat && !schedule.baraat.includes('[') && (
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">
                  <span className="text-gold">Baraat:</span> {schedule.baraat}
                </span>
              )}
              {schedule.ceremony && !schedule.ceremony.includes('[') && (
                <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">
                  <span className="text-gold">Ceremony:</span> {schedule.ceremony}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
