import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Heart,
  MapPin,
  Music2,
  Send,
  Sparkles,
} from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Helper to build prefilled Google Calendar URL for the wedding
 */
function buildGoogleCalendarUrl({
  title = 'Ranveer weds Alia — Wedding Ceremony',
  details = 'The Wedding Celebration of Ranveer & Alia. Seven sacred vows under the golden sunset breeze! Dress Code: Coastal Elegance / Traditional Best.',
  location = 'City Palace Courtyard, Udaipur',
  startDate = '2026-11-25T18:00:00+05:30',
  durationHours = 4,
}) {
  try {
    const start = new Date(startDate)
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000)

    const fmtUtc = (d) =>
      d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

    const datesParam = `${fmtUtc(start)}/${fmtUtc(end)}`

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: datesParam,
      details: details,
      location: location,
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  } catch (_) {
    return 'https://calendar.google.com'
  }
}

/**
 * CountdownTimer — live Spotify-themed countdown to the wedding day.
 */
function CountdownTimer({
  targetDate = '2026-11-25T18:00:00+05:30',
  displayDate = '25 Nov 2026',
}) {
  const calculateTime = () => {
    const target = new Date(targetDate).getTime()
    const now = new Date().getTime()
    const diff = target - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isComplete: false,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ]

  if (timeLeft.isComplete) {
    return (
      <div className="mb-5 overflow-hidden rounded-2xl border border-spotify/40 bg-gradient-to-r from-spotify/20 to-gold/20 p-4 text-center backdrop-blur-xl shadow-xl shadow-black/50">
        <p className="text-xs font-bold uppercase tracking-wider text-spotify">
          Today is the Day! 💍✨
        </p>
        <p className="mt-1 text-base font-extrabold text-white">
          The Wedding Celebration has Arrived
        </p>
      </div>
    )
  }

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-4 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gold">
          <Clock size={13} className="text-gold animate-pulse" />
          <span>Countdown to the Wedding</span>
        </div>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">
          {displayDate}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/40 py-2.5 px-1 shadow-inner"
          >
            <span className="text-xl sm:text-2xl font-black tabular-nums tracking-tight text-white drop-shadow">
              {item.value.toString().padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * RsvpScreen — "Playlist Complete" summary with wedding countdown, Google Calendar integration,
 * and WhatsApp RSVP form. All data is driven by config.
 */
export default function RsvpScreen({
  config,
  mapsUrl = 'https://maps.google.com/?q=City+Palace+Udaipur',
  weddingDate,
  onBack,
}) {
  const [form, setForm] = useState({ name: '', attending: 'yes', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const rsvpConfig = config?.rsvp || {}
  const calendarConfig = config?.calendar || {}
  const whatsappNumber = rsvpConfig.whatsappNumber || '9878627770'
  const targetIsoDate = config?.isoWeddingDate || weddingDate || '2026-11-25T18:00:00+05:30'
  const displayDate = config?.mainWeddingDate
    ? config.mainWeddingDate.split('·')[0].trim()
    : '25 Nov 2026'

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const googleCalendarUrl = buildGoogleCalendarUrl({
    title:
      calendarConfig.eventTitle ||
      `${config?.groom || 'Ranveer'} weds ${config?.bride || 'Alia'} — Wedding Ceremony 💍`,
    details:
      calendarConfig.description ||
      `The Wedding Celebration of ${config?.groom || 'Ranveer'} & ${config?.bride || 'Alia'}. Seven vows under the golden sunset breeze!`,
    location: calendarConfig.location || 'City Palace Courtyard, Udaipur',
    startDate: targetIsoDate,
    durationHours: calendarConfig.durationHours || 4,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      alert('Please enter your name.')
      return
    }

    // Format the WhatsApp message
    const attendanceText =
      form.attending === 'yes' ? "Yes, I'm in! 🎶" : "Can't make it 💔"
    const messagePart = form.message.trim()
      ? `\n*Message:* ${form.message.trim()}`
      : ''
    const whatsappMessage = `*New RSVP Received for ${config?.groom || 'Ranveer'} & ${config?.bride || 'Alia'}! 🎉*\n\n*Guest Name:* ${form.name.trim()}\n*Attending:* ${attendanceText}${messagePart}`
    const encodedMessage = encodeURIComponent(whatsappMessage)

    // Set phone number (stripping any non-digit characters)
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
    const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank')

    setSubmitted(true)
  }

  return (
    <motion.div
      className="relative z-10 mx-auto min-h-dvh w-full max-w-md px-5 pb-24 pt-[max(1rem,env(safe-area-inset-top))]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 py-2 text-sm font-medium text-white/70 hover:text-white transition active:scale-95"
      >
        <ArrowLeft size={18} /> Back to player
      </button>

      {/* Header — Liked Songs style */}
      <div className="mb-5 flex items-end gap-4">
        <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-emerald-600 to-spotify shadow-2xl ring-1 ring-white/20">
          <Heart size={38} className="fill-white text-white drop-shadow" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 font-bold">
            Playlist complete
          </p>
          <h1 className="mt-0.5 text-2xl sm:text-[1.7rem] font-black leading-tight">
            {rsvpConfig.title || "You're a top fan!"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/70">
            {rsvpConfig.subtitle || 'Will you be celebrating live with us?'}
          </p>
        </div>
      </div>

      {/* Wedding Countdown Timer */}
      <CountdownTimer targetDate={targetIsoDate} displayDate={displayDate} />

      {/* Mark Your Calendar (Google Calendar) Button */}
      <div className="mb-5">
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-spotify/50 bg-gradient-to-r from-emerald-600/30 via-spotify/20 to-emerald-700/30 py-3 px-4 text-sm font-bold text-white shadow-lg shadow-spotify/15 transition-all duration-300 hover:border-spotify hover:brightness-110 active:scale-[0.98]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-spotify/20 text-spotify group-hover:bg-spotify group-hover:text-black transition-colors">
            <Calendar size={16} />
          </div>
          <span>Mark Your Calendar</span>
          <span className="rounded-full bg-spotify/20 px-2 py-0.5 text-[10px] font-semibold text-spotify uppercase tracking-wide">
            Google Cal
          </span>
        </a>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl border border-spotify/40 bg-spotify/10 p-6 text-center shadow-xl backdrop-blur-xl"
        >
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-spotify text-black shadow-lg shadow-spotify/30">
            <Check size={30} />
          </div>
          <h2 className="text-lg font-bold">
            {rsvpConfig.confirmationTitle || 'Added to the Guest Library 🎉'}
          </h2>
          <p className="mt-1.5 text-sm text-white/75 leading-relaxed">
            Thanks{form.name ? `, ${form.name}` : ''}! Your RSVP is sent.
            {form.attending === 'yes'
              ? ` ${rsvpConfig.confirmationYes || "We can't wait to see you on the dance floor!"}`
              : ` ${rsvpConfig.confirmationNo || "We'll miss you dearly — sending love and warm blessings."}`}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Guest name — track row style */}
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3 focus-within:border-spotify/60 focus-within:bg-white/[0.1] transition-all">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
              <Music2 size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-white/50">
                Guest name
              </span>
              <input
                id="guestName"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Ariana & Dalton"
                className="w-full bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-white/30"
              />
            </span>
          </label>

          {/* Attending — segmented control */}
          <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-white/50">
              Attending the Celebrations?
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: 'yes', label: "Yes, I'm in! 🎶" },
                { v: 'no', label: "Can't make it 💔" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, attending: opt.v }))}
                  className={`rounded-lg py-2.5 text-xs sm:text-sm font-bold transition-all ${
                    form.attending === opt.v
                      ? 'bg-spotify text-black shadow-md shadow-spotify/25'
                      : 'bg-white/10 text-white/70 hover:bg-white/15'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <label className="block rounded-xl border border-white/10 bg-white/[0.07] p-3 focus-within:border-spotify/60 focus-within:bg-white/[0.1] transition-all">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-white/50">
              Message / Song Request for the couple
            </span>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={set('message')}
              placeholder="Leave a heartfelt note, song request, or cheer…"
              className="w-full resize-none bg-transparent text-[14.5px] text-white outline-none placeholder:text-white/30 leading-relaxed"
            />
          </label>

          {/* Send RSVP button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-spotify py-3.5 text-base font-extrabold text-black shadow-xl shadow-spotify/25 transition active:scale-[0.98] hover:brightness-105"
          >
            <Send size={18} /> Send RSVP via WhatsApp
          </button>
        </form>
      )}

      {/* Floating Get Directions button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-20 flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs sm:text-sm font-extrabold text-black shadow-2xl shadow-black/80 ring-1 ring-white/20 transition active:scale-95 hover:brightness-105"
      >
        <MapPin size={17} /> GET DIRECTIONS
      </a>
    </motion.div>
  )
}

