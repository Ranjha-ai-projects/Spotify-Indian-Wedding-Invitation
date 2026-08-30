import image1 from '../assets/images/image1.png'
import image2 from '../assets/images/image2.png'
import image3 from '../assets/images/image3.png'

import song1 from '../assets/songs/song1.mp3'
import song2 from '../assets/songs/song2.mp3'
import song3 from '../assets/songs/song3.mp3'

// =========================================================================
//  WEDDING_CONFIG — SINGLE SOURCE OF TRUTH FOR ALL WEDDING DATA
//  Update couple names, dates, story, RSVP number, and calendar details here.
// =========================================================================

export const WEDDING_CONFIG = {
  // Couple Information
  groom: 'Emily',
  bride: 'Joshua',
  initials: 'E ♥ J',

  // Branding & Subtitles
  year: '2026',
  tagline: '2026 WRAPPED',
  playlistName: 'The Wedding Playlist',
  subheading: 'Wedding Wrapped',

  // Landing Screen Story / Blessing
  story:
    'Emily & Joshua are getting married and you are invited to the celebration! Three ceremonies, one unforgettable celebration. May their days always play in perfect harmony. 🤍',

  // Main Wedding Date (Used for the Live Countdown & Calendar)
  mainWeddingDate: 'Sun, 25 Nov 2026 · 6:00 PM',
  isoWeddingDate: '2026-11-25T18:00:00+05:30', // ISO format for countdown calculations

  // Google Calendar Event Details ("Mark Your Calendar" button)
  calendar: {
    eventTitle: 'Emily weds Joshua — Wedding Celebration 💍',
    description:
      'Join us to celebrate the wedding of Emily & Joshua! Seven sacred vows under the sunset breeze. Dress Code: Coastal Elegance / Traditional Best.',
    location: 'Ocean Coastline Pavilion / City Palace, Udaipur',
    durationHours: 4,
  },

  // RSVP & WhatsApp Configuration
  rsvp: {
    whatsappNumber: '9878627770', // Country code + phone number
    title: "You're a top fan!",
    subtitle: 'Will you be celebrating live with us?',
    confirmationTitle: 'Added to the Guest Library 🎉',
    confirmationYes: "We can't wait to see you on the dance floor!",
    confirmationNo: "We'll miss you dearly — sending love and warm blessings.",
  },
}

// =========================================================================
//  WEDDING_PLAYLIST — EVENTS / CEREMONIES TIMELINE
//  Each track corresponds to one wedding ceremony/event.
// =========================================================================

export const WEDDING_PLAYLIST = [
  {
    id: 'our-favorite-kind-of-ordinary',
    title: 'Our Favorite Kind of Ordinary',
    artist: 'Café Parisien Ballroom & Courtyard',
    coverUrl: image1,
    audioUrl: song1,
    lyrics:
      'From little coffee dates to a lifetime of memories, every moment is better together.',
    date: 'Fri, 6 Feb 2026 · 7:00 PM',
    accent: '#1DB954',
    mapsUrl: 'https://maps.google.com/?q=Jai+Mahal+Palace+Jaipur',
  },
  {
    id: 'holding-hands-rings',
    title: 'A Promise to Hold Forever',
    artist: 'White Rose Garden Sanctuary',
    coverUrl: image2,
    audioUrl: song2,
    lyrics:
      'Hand in hand, heart to heart — a promise of love, laughter, and a lifetime together.',
    date: 'Sat, 20 Oct 2026 · 6:30 PM',
    accent: '#D4AF37',
    mapsUrl: 'https://maps.google.com/?q=Ritz+Carlton+Udaipur',
  },
  {
    id: 'where-our-forever-begins',
    title: 'Where Our Forever Begins',
    artist: 'Ocean Coastline Pavilion',
    coverUrl: image3,
    audioUrl: song3,
    lyrics:
      'With the ocean as our witness and love in our hearts, we begin our beautiful journey together.',
    date: 'Sun, 25 Nov 2026 · 6:00 PM',
    accent: '#1DB954',
    mapsUrl: 'https://maps.google.com/?q=City+Palace+Udaipur',
  },
]


