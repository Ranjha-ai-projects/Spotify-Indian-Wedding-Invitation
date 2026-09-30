# The Wedding Playlist 💍🎧 (Indian Wedding Edition)

A contemporary Indian wedding invitation styled like **Spotify Wrapped / Playlist**. Every wedding ceremony is an interactive "track" in the lineup — as guests swipe or advance through events, the album art slides, the background morphs dynamically to the ceremony's color palette, and authentic wedding music plays.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build && npm run preview
```

---

## Customizing Couple & Event Information

All wedding information is centralized in [`src/data/playlist.js`](src/data/playlist.js).

### 1. Couple Details (`WEDDING_CONFIG`)

| Field | Description | Example |
| :--- | :--- | :--- |
| `bride` | Bride's name | `Alia` |
| `groom` | Groom's name | `Ranveer` |
| `displayOrder` | Order of couple names (`'bride-groom'` or `'groom-bride'`) | `'bride-groom'` |
| `weddingCityState` | Wedding destination | `Udaipur, Rajasthan, India` |
| `hashtag` | Social media hashtag | `#RanAliaForever` |
| `invitationHosts` | Host line | `Together with our families` |
| `story` | Welcome blessing / quote on the landing screen | `"Two hearts. One playlist. A lifetime on repeat. 🤍"` |
| `mainWeddingDate` | Display date string | `14 February 2027 · 6:00 PM IST` |
| `isoWeddingDate` | ISO 8601 date in Asia/Kolkata for countdown & Google Cal | `2027-02-14T18:00:00+05:30` |

### 2. Events Lineup (`WEDDING_PLAYLIST`)

The events appear in chronological order:

1. **Mehendi**: Henna afternoon with vibrant ethnic wear
2. **Haldi**: Auspicious turmeric ceremony with shades of yellow
3. **Sangeet**: High-energy musical celebration with festive Indo-Western wear
4. **Wedding Ceremony**: Sacred vows and rituals in traditional Indian attire

Each event contains:
- `title`: Actual event name (`Mehendi`, `Haldi`, `Sangeet`, `Wedding Ceremony`)
- `artist`: Couple's name
- `venue`: Name of the venue
- `address`: Full venue address
- `mapsUrl`: Google Maps link for directions
- `date` / `time`: Unambiguous event schedule in IST
- `dressCode`: Dress code recommendation
- `lyrics`: Description / vibe text
- `coverUrl`: Event photo
- `audioUrl`: Background audio track

---

## RSVP via WhatsApp

The RSVP screen allows guests to:
- See the countdown to the wedding ceremony (Asia/Kolkata timezone)
- Add the event directly to Google Calendar
- Confirm attendance (`Yes, with joy!` or `Cannot make it`)
- Choose which individual celebrations they will attend (Mehendi, Haldi, Sangeet, Wedding)
- Select number of guests and meal preference (`Vegetarian`, `Jain`, `Non-Vegetarian`)
- Submit their RSVP message directly to the host's WhatsApp number (+91 format).
