import { ChevronDown, ListMusic } from 'lucide-react'
import AlbumArt from './AlbumArt.jsx'
import SongInfo from './SongInfo.jsx'
import LyricsBox from './LyricsBox.jsx'
import Controls from './Controls.jsx'

/**
 * MusicPlayer — the main event view. Lays out the album art, song info,
 * lyrics box and transport controls in a mobile-first, fixed-height column.
 */
export default function MusicPlayer({
  config,
  track,
  index,
  total,
  direction,
  audio,
  onOpenRsvp,
}) {
  const subheading = config?.subheading || 'The Celebration Lineup'

  return (
    <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      {/* Top bar */}
      <div className="flex items-center justify-between py-2 text-white/80">
        <button aria-label="Collapse" className="p-1 active:scale-90 opacity-60 hover:opacity-100 transition-opacity">
          <ChevronDown size={22} />
        </button>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">
            Playing from lineup
          </p>
          <p className="text-xs font-semibold">{subheading}</p>
        </div>
        <button
          aria-label="View RSVP screen"
          onClick={onOpenRsvp}
          className="p-1 active:scale-90 text-gold hover:text-white transition-colors"
        >
          <ListMusic size={22} />
        </button>
      </div>

      {/* Art + info fill the middle */}
      <div className="flex flex-1 flex-col justify-center">
        <AlbumArt track={track} isPlaying={audio.isPlaying} direction={direction} />

        <SongInfo
          title={track.title}
          artist={track.artist}
          subtitle={track.date}
          isPlaying={audio.isPlaying}
          trackNumber={index + 1}
          accent={track.accent}
        />

        <LyricsBox
          trackId={track.id}
          lyrics={track.lyrics}
          venue={track.venue || track.artist}
          address={track.address}
          mapsUrl={track.mapsUrl}
          dressCode={track.dressCode}
          schedule={{
            arrival: track.arrival,
            baraat: track.baraat,
            ceremony: track.ceremony,
          }}
          accent={track.accent}
        />
      </div>

      {/* Controls pinned to the bottom */}
      <div className="mt-4">
        <Controls
          currentTime={audio.currentTime}
          duration={audio.duration}
          isPlaying={audio.isPlaying}
          accent={track.accent}
          onSeek={audio.seek}
          onPrev={audio.prev}
          onNext={audio.next}
          onTogglePlay={audio.togglePlay}
        />

        {/* Track position + jump to RSVP on the last event */}
        <div className="mt-3 flex items-center justify-between text-xs text-white/50">
          <span>
            Event {index + 1} of {total}
          </span>
          <button
            onClick={onOpenRsvp}
            className="font-semibold text-gold underline-offset-4 hover:underline"
          >
            {index === total - 1 ? 'Finish → RSVP' : 'Skip to RSVP'}
          </button>
        </div>
      </div>
    </div>
  )
}
