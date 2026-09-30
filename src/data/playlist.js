import haldiImg from '../assets/images/haldi.jpg'
import landingCoverImg from '../assets/images/landing page.jpg'
import mehendiImg from '../assets/images/mehandi.jpg'
import sangeetImg from '../assets/images/sangeet.jpg'
import weddingImg from '../assets/images/wedding.jpg'

import dinShagnaDa from '../assets/songs/din_shagna_da.mp3'
import song1 from '../assets/songs/song1.mp3'
import song2 from '../assets/songs/song2.mp3'
import song3 from '../assets/songs/song3.mp3'

// =========================================================================
//  WEDDING_CONFIG — SINGLE SOURCE OF TRUTH FOR ALL WEDDING DATA
//  Update couple names, dates, events, RSVP, and calendar details here.
// =========================================================================

export const WEDDING_CONFIG = {
  // Couple Information
  bride: '[BRIDE’S NAME]',
  groom: '[GROOM’S NAME]',
  displayOrder: 'bride-groom', // Options: 'bride-groom' or 'groom-bride'
  initials: 'B ♥ G', // Auto-derived if left default; can be set e.g. 'P ♥ R'

  // Branding & Subtitles
  year: '2027',
  tagline: 'OUR FOREVER ERA',
  playlistName: 'The Wedding Playlist',
  subheading: 'The Celebration Lineup',

  // Wedding Location & Socials
  weddingCityState: '[CITY, STATE, INDIA]',
  hashtag: '[HASHTAG]',

  // Invitation Hosts & Cultural Details
  invitationHosts: 'Together with our families',
  brideParents: '', // Optional: e.g. 'Mr. & Mrs. Sharma' (omitted if empty)
  groomParents: '', // Optional: e.g. 'Mr. & Mrs. Verma' (omitted if empty)
  language: 'English',
  culturalTraditions: 'Culturally neutral contemporary Indian wedding',

  // Landing Screen Story / Blessing
  story:
    'Together with our families, we invite you to celebrate the beginning of our forever. Two hearts. One playlist. A lifetime on repeat. 🤍',

  // Cover image for the landing card
  landingCoverUrl: landingCoverImg,

  // Main Wedding Date (Used for Live Countdown & Calendar)
  // Display date format: unambiguous e.g. "14 February 2027 · 6:00 PM IST"
  mainWeddingDate: '[DATE] · [TIME] IST',

  // ISO 8601 date string in Asia/Kolkata timezone (+05:30) for accurate countdown
  // Set to e.g. '2027-02-14T18:00:00+05:30' once confirmed. Leave empty if pending.
  isoWeddingDate: '',
  timezone: 'Asia/Kolkata',

  // Google Calendar Event Details ("Mark Your Calendar" button)
  calendar: {
    eventTitle: '[BRIDE’S NAME] weds [GROOM’S NAME] — Wedding Ceremony 💍',
    description:
      'Together with our families, we invite you to celebrate the wedding ceremony of [BRIDE’S NAME] & [GROOM’S NAME]! Dress Code: Traditional Indian Attire.',
    location: '[VENUE NAME], [CITY, STATE, INDIA]',
    durationHours: 4,
  },

  // RSVP & WhatsApp Configuration
  rsvp: {
    deadline: '[DATE]',
    contactName: '[NAME]',
    contactPhone: '+91 [PHONE NUMBER]',
    whatsappNumber: '+91 [PHONE NUMBER]', // Host WhatsApp phone number (+91 format)
    rsvpLink: '[LINK]',
    title: "You're on the Guest List!",
    subtitle: 'Will you be celebrating live with us?',
    mealOptions: ['Vegetarian', 'Jain', 'Non-Vegetarian'],
    confirmationTitle: 'Added to the Celebration Library 🎉',
    confirmationYes: "We can't wait to see you on the dance floor!",
    confirmationNo: "We'll miss you dearly — sending love and warm blessings.",
  },

  // Optional Travel & Accommodation (leave empty to omit from UI)
  accommodation: '',
  travel: '',
}

// =========================================================================
//  WEDDING_PLAYLIST — EVENTS / CEREMONIES TIMELINE
//  Chronological Indian wedding events. Each item is a "track" in the playlist.
// =========================================================================

export const WEDDING_PLAYLIST = [
  {
    id: 'mehendi',
    title: 'Mehendi',
    artist: '[BRIDE’S NAME] & [GROOM’S NAME]',
    venue: '[VENUE NAME]',
    address: '[FULL ADDRESS]',
    mapsUrl: '[GOOGLE MAPS LINK]',
    date: '[DATE] · [TIME] IST',
    time: '[TIME] IST',
    dressCode: 'Colourful Ethnic Wear',
    description: 'An afternoon of henna, music, and happy beginnings.',
    lyrics:
      'An afternoon of henna, music, and happy beginnings.\nDress Code: Colourful Ethnic Wear',
    coverUrl: mehendiImg,
    audioUrl: song1,
    accent: '#1DB954', // Spotify & Mehendi green
  },
  {
    id: 'haldi',
    title: 'Haldi',
    artist: '[BRIDE’S NAME] & [GROOM’S NAME]',
    venue: '[VENUE NAME]',
    address: '[FULL ADDRESS]',
    mapsUrl: '[GOOGLE MAPS LINK]',
    date: '[DATE] · [TIME] IST',
    time: '[TIME] IST',
    dressCode: 'Shades of Yellow',
    description: 'A little haldi, a lot of laughter, and love all around.',
    lyrics:
      'A little haldi, a lot of laughter, and love all around.\nDress Code: Shades of Yellow',
    coverUrl: haldiImg,
    audioUrl: song2,
    accent: '#EAB308', // Turmeric Haldi gold
  },
  {
    id: 'sangeet',
    title: 'Sangeet',
    artist: '[BRIDE’S NAME] & [GROOM’S NAME]',
    venue: '[VENUE NAME]',
    address: '[FULL ADDRESS]',
    mapsUrl: '[GOOGLE MAPS LINK]',
    date: '[DATE] · [TIME] IST',
    time: '[TIME] IST',
    dressCode: 'Festive Indian / Indo-Western',
    description: 'Our favourite people, their best moves, and a night to remember.',
    lyrics:
      'Our favourite people, their best moves, and a night to remember.\nDress Code: Festive Indian / Indo-Western',
    coverUrl: sangeetImg,
    audioUrl: song3,
    accent: '#A855F7', // Festive Sangeet royal violet
  },
  {
    id: 'wedding-ceremony',
    title: 'Wedding Ceremony',
    artist: '[BRIDE’S NAME] & [GROOM’S NAME]',
    venue: '[VENUE NAME]',
    address: '[FULL ADDRESS]',
    mapsUrl: '[GOOGLE MAPS LINK]',
    date: '[DATE] · [TIME] IST',
    time: '[TIME] IST',
    arrival: '[TIME] IST',
    baraat: '[TIME] IST',
    ceremony: '[TIME] IST',
    dressCode: 'Traditional Indian Attire',
    description:
      'Join us as we begin our next chapter, surrounded by your love and blessings.',
    lyrics:
      'Join us as we begin our next chapter, surrounded by your love and blessings.\nDress Code: Traditional Indian Attire',
    coverUrl: weddingImg,
    audioUrl: dinShagnaDa,
    accent: '#E11D48', // Royal Wedding crimson
  },
]
