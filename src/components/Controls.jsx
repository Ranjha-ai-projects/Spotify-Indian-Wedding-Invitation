import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'

function fmt(sec) {
  if (!sec || Number.isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Controls — seekable progress bar + prev / play-pause / next.
 * The progress fill is driven by width% with a short linear transition so it
 * glides smoothly even though state only updates ~4x/second.
 */
export default function Controls({
  currentTime,
  duration,
  isPlaying,
  accent = '#1DB954',
  onSeek,
  onPrev,
  onNext,
  onTogglePlay,
}) {
  const pct = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: accent,
              transition: 'width 0.25s linear',
            }}
          />
        </div>
        {/* Invisible range on top for seeking */}
        <input
          type="range"
          className="track-range absolute inset-0 -top-1.5 h-4"
          min={0}
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          aria-label="Seek"
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/50">
        <span>{fmt(currentTime)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Transport controls */}
      <div className="mt-3 flex items-center justify-center gap-8">
        <button
          onClick={onPrev}
          aria-label="Previous event"
          className="text-white/80 transition active:scale-90 hover:text-white"
        >
          <SkipBack size={30} className="fill-current" />
        </button>

        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg transition active:scale-95"
        >
          {isPlaying ? (
            <Pause size={28} className="fill-black" />
          ) : (
            <Play size={28} className="ml-0.5 fill-black" />
          )}
        </button>

        <button
          onClick={onNext}
          aria-label="Next event"
          className="text-white/80 transition active:scale-90 hover:text-white"
        >
          <SkipForward size={30} className="fill-current" />
        </button>
      </div>
    </div>
  )
}
