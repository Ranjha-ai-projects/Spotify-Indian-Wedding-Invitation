import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/**
 * SongInfo — event name (title) + date/time (artist line).
 * The title auto-scrolls as a marquee only when it actually overflows.
 */
export default function SongInfo({ title, subtitle }) {
  const [liked, setLiked] = useState(false)
  const wrapRef = useRef(null)
  const textRef = useRef(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    if (!wrap || !text) return
    // Compare the single-copy width against the container.
    setOverflowing(text.scrollWidth / 2 > wrap.clientWidth + 4)
  }, [title])

  return (
    <div className="mt-6 flex w-full items-center justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div ref={wrapRef} className="overflow-hidden">
          {overflowing ? (
            <div
              ref={textRef}
              className="animate-marquee whitespace-nowrap text-2xl font-bold"
            >
              <span className="pr-12">{title}</span>
              <span className="pr-12">{title}</span>
            </div>
          ) : (
            <h2 ref={textRef} className="truncate text-2xl font-bold">
              {title}
            </h2>
          )}
        </div>
        <p className="mt-1 truncate text-sm text-white/60">{subtitle}</p>
      </div>

      <button
        aria-label={liked ? 'Unlike' : 'Like'}
        onClick={() => setLiked((v) => !v)}
        className="shrink-0 transition-transform active:scale-90"
      >
        <Heart
          size={26}
          className={liked ? 'fill-spotify text-spotify' : 'text-white/70'}
        />
      </button>
    </div>
  )
}
