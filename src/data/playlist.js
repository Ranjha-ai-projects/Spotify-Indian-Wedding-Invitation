// =============================================================
//  WEDDING_PLAYLIST — edit everything here.
//  Each "track" is one wedding event.
//    id       : unique key
//    title    : event name  (shown as the SONG TITLE)
//    artist   : venue name   (shown under the title)
//    coverUrl : event image  (the album art + blurred backdrop)
//    audioUrl : mp3 that plays for this event
//    lyrics   : the description / vibe text (shown in the Lyrics box)
//    date     : date & time string
//    accent   : optional accent color for this track ('#1DB954' green / '#D4AF37' gold)
//    mapsUrl  : optional Google Maps link for "Get Directions"
// =============================================================

export const WEDDING_PLAYLIST = [
  {
    id: 'sangeet',
    title: 'The Sangeet Night',
    artist: 'Jai Mahal Palace, Jaipur',
    coverUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics:
      'Dust off your dancing shoes. A night of music, dhol beats and unrehearsed choreography. Dress Code: Festive Indo-Western.',
    date: 'Fri, 6 Feb 2026 · 7:00 PM',
    accent: '#D4AF37',
    mapsUrl: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
  },
  {
    id: 'haldi',
    title: 'The Haldi Ceremony',
    artist: 'Ritz-Carlton, Udaipur',
    coverUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    lyrics:
      'Join us for a sunny afternoon of turmeric and love. Expect laughter, marigolds and a lot of yellow. Dress Code: Yellow.',
    date: 'Sat, 7 Feb 2026 · 11:00 AM',
    accent: '#D4AF37',
    mapsUrl: 'https://maps.google.com/?q=Ritz+Carlton+Udaipur',
  },
  {
    id: 'mehndi',
    title: 'The Mehndi Afternoon',
    artist: 'Leela Palace Gardens, Udaipur',
    coverUrl:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    lyrics:
      'Henna, chaat carts and cool sherbet under the shade. Come get your hands adorned. Dress Code: Green & Floral.',
    date: 'Sat, 7 Feb 2026 · 4:00 PM',
    accent: '#1DB954',
    mapsUrl: 'https://maps.google.com/?q=Leela+Palace+Udaipur',
  },
  {
    id: 'wedding',
    title: 'The Wedding Pheras',
    artist: 'City Palace Courtyard, Udaipur',
    coverUrl:
      'https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=900&q=80&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    lyrics:
      'The main track. Seven vows, one fire, forever after. Witness Ranveer & Alia tie the knot. Dress Code: Traditional Best.',
    date: 'Sun, 8 Feb 2026 · 7:30 PM',
    accent: '#D4AF37',
    mapsUrl: 'https://maps.google.com/?q=City+Palace+Udaipur',
  },
  {
    id: 'reception',
    title: 'The Grand Reception',
    artist: 'Taj Lake Palace, Udaipur',
    coverUrl:
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    lyrics:
      'The encore. Cocktails on the lake, a live band and the last dance of the weekend. Dress Code: Cocktail Glam.',
    date: 'Mon, 9 Feb 2026 · 8:00 PM',
    accent: '#1DB954',
    mapsUrl: 'https://maps.google.com/?q=Taj+Lake+Palace+Udaipur',
  },
]
