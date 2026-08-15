# Wedding Wrapped 💍🎧

A wedding invitation styled like **Spotify Wrapped**. Every event is a "song" in a
playlist — as you skip between tracks the album art slides, the background morphs to
match the event, and the music cross-fades.

## Run it

```bash
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5173). The terminal also prints a
**Network** URL (e.g. `http://192.168.x.x:5173`) — open that on your phone (same Wi‑Fi)
to test on a real device.

Build for production:

```bash
npm run build && npm run preview
```

## Edit the content

Everything lives in one file: [`src/data/playlist.js`](src/data/playlist.js).
Each track is one event:

| field      | meaning                                   |
| ---------- | ----------------------------------------- |
| `title`    | Event name (shown as the song title)      |
| `artist`   | Venue name                                |
| `coverUrl` | Event photo (album art + blurred backdrop)|
| `audioUrl` | MP3 that plays for this event             |
| `lyrics`   | Description / vibe text                    |
| `date`     | Date & time string                        |
| `accent`   | `'#1DB954'` (green) or `'#D4AF37'` (gold)  |
| `mapsUrl`  | Google Maps link for "Get Directions"     |

> The sample images (Unsplash) and audio (SoundHelix) are royalty‑free placeholders —
> swap `coverUrl` / `audioUrl` for your own. Put local files in `/public` and reference
> them as `/my-song.mp3`.

## Tech

React + Vite · Tailwind CSS · Framer Motion · lucide-react. Pinned to Vite 4 /
Framer Motion 10 for Node 16 compatibility.

## Structure

```
src/
  App.jsx                 screen router + audio engine + slide direction
  data/playlist.js        WEDDING_PLAYLIST  ← edit here
  hooks/useAudioEngine.js dual-<audio> cross-fade engine
  components/
    LandingOverlay.jsx    intro / PLAY button
    MusicPlayer.jsx       main player layout
    AlbumArt.jsx          sliding, scaling event photo
    SongInfo.jsx          title (marquee) + date + like
    Controls.jsx          seek bar + prev/play/next
    LyricsBox.jsx         event description card
    RsvpScreen.jsx        outro RSVP form + directions
    BackgroundGradient.jsx blurred dynamic backdrop
```

## Wiring up the RSVP

`RsvpScreen.jsx`'s `handleSubmit` currently just `console.log`s. Point it at a Google
Form, Formspree, or your own endpoint to actually collect responses.
