import { motion } from 'framer-motion'
import { Calendar, Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * SongInfo — event name (title), couple (artist) + date/time (subtitle)
 * with Spotify equalizer & like button.
 * Uses a marquee when title overflows the container.
 */
export default function SongInfo({
  title,
  artist,
  subtitle,
  isPlaying = false,
  trackNumber = 1,
  accent = '#1DB954',
}) {
  const [liked, setLiked] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const wrapRef = useRef(null)
  const textRef = useRef(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    if (!wrap || !text) return
    setOverflowing(text.scrollWidth / 2 > wrap.clientWidth + 4)
  }, [title])

  const toggleLike = () => {
    const nextState = !liked
    setLiked(nextState)
    if (nextState) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 1600)
    }
  }

  return (
    <div className="mt-4 flex w-full flex-col">
      {/* Top track pill + live audio equalizer */}
      <div className="flex items-center justify-between text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-spotify uppercase">
            Event {trackNumber.toString().padStart(2, '0')}
          </span>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-spotify rounded-full animate-eq1" />
              <span className="w-0.5 bg-spotify rounded-full animate-eq2" />
              <span className="w-0.5 bg-spotify rounded-full animate-eq3" />
            </div>
          )}
        </div>
        {showToast && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] font-medium text-spotify"
          >
            ♥ Added to Liked Events
          </motion.span>
        )}
      </div>

      <div className="mt-1 flex w-full items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div ref={wrapRef} className="overflow-hidden">
            {overflowing ? (
              <div
                ref={textRef}
                className="animate-marquee whitespace-nowrap text-2xl sm:text-[1.65rem] font-black tracking-tight text-white drop-shadow-sm"
              >
                <span className="pr-12">{title}</span>
                <span className="pr-12">{title}</span>
              </div>
            ) : (
              <h2
                ref={textRef}
                className="truncate text-2xl sm:text-[1.65rem] font-black tracking-tight text-white drop-shadow-sm"
              >
                {title}
              </h2>
            )}
          </div>

          <div className="mt-0.5 flex flex-col gap-0.5">
            {artist && (
              <p className="truncate text-xs font-semibold text-white/80">
                {artist}
              </p>
            )}
            <p className="flex items-center gap-1.5 truncate text-[11px] sm:text-xs font-medium text-white/60">
              <Calendar size={12} className="shrink-0 text-gold" />
              <span>{subtitle}</span>
            </p>
          </div>
        </div>

        <motion.button
          aria-label={liked ? 'Unlike' : 'Like'}
          onClick={toggleLike}
          whileTap={{ scale: 0.8 }}
          animate={{ scale: liked ? [1, 1.25, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 p-1 transition-colors"
        >
          <Heart
            size={26}
            className={
              liked
                ? 'fill-spotify text-spotify drop-shadow-[0_0_8px_rgba(29,185,84,0.6)]'
                : 'text-white/60 hover:text-white'
            }
          />
        </motion.button>
      </div>
    </div>
  )
}
