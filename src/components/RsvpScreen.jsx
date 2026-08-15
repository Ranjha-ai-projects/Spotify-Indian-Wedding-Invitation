import { motion } from 'framer-motion'
import { ArrowLeft, Check, Heart, MapPin, Music2, Send } from 'lucide-react'
import { useState } from 'react'

/**
 * RsvpScreen — the outro, styled like a "Playlist complete / Liked Songs"
 * summary. Form fields are dressed up as playlist tracks. Submitting opens
 * WhatsApp with pre-filled RSVP details and shows a confirmation state.
 */
export default function RsvpScreen({ mapsUrl, onBack, whatsappNumber = "919876543210" }) {
  const [form, setForm] = useState({ name: '', attending: 'yes', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      alert("Please enter your name.")
      return
    }

    // Format the WhatsApp message
    const attendanceText = form.attending === 'yes' ? "Yes, I'm in! 🎶" : "Can't make it 💔"
    const messagePart = form.message.trim() ? `\n*Message:* ${form.message.trim()}` : ''
    const whatsappMessage = `*New RSVP Received! 🎉*\n\n*Guest Name:* ${form.name.trim()}\n*Attending:* ${attendanceText}${messagePart}`
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
      className="relative z-10 mx-auto min-h-dvh w-full max-w-md px-5 pb-10 pt-[max(1rem,env(safe-area-inset-top))]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1 py-2 text-sm text-white/70 active:scale-95"
      >
        <ArrowLeft size={18} /> Back to player
      </button>

      {/* Header — Liked Songs style */}
      <div className="mb-6 flex items-end gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-spotify shadow-xl">
          <Heart size={40} className="fill-white text-white" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
            Playlist complete
          </p>
          <h1 className="mt-1 text-2xl font-black leading-tight">
            You&apos;re a top fan!
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Will you be listening live?
          </p>
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-2xl border border-spotify/40 bg-spotify/10 p-6 text-center"
        >
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-spotify text-black">
            <Check size={30} />
          </div>
          <h2 className="text-lg font-bold">Added to the Library 🎉</h2>
          <p className="mt-1 text-sm text-white/70">
            Thanks{form.name ? `, ${form.name}` : ''}! Your RSVP is saved
            {form.attending === 'yes'
              ? ". We can't wait to see you on the dance floor."
              : ". We'll miss you — sending love."}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Guest name — track row style */}
          <label className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3 focus-within:bg-white/[0.1]">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white/60">
              <Music2 size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-[11px] uppercase tracking-wider text-white/40">
                Guest name
              </span>
              <input
                id="guestName"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="e.g. Ariana Grande"
                className="w-full bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-white/30"
              />
            </span>
          </label>

          {/* Attending — segmented control */}
          <div className="rounded-xl bg-white/[0.06] p-3">
            <span className="mb-2 block text-[11px] uppercase tracking-wider text-white/40">
              Attending?
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: 'yes', label: "Yes, I'm in 🎶" },
                { v: 'no', label: "Can't make it" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, attending: opt.v }))}
                  className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                    form.attending === opt.v
                      ? 'bg-spotify text-black'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <label className="block rounded-xl bg-white/[0.06] p-3 focus-within:bg-white/[0.1]">
            <span className="mb-1 block text-[11px] uppercase tracking-wider text-white/40">
              Message for the couple
            </span>
            <textarea
              id="message"
              rows={3}
              value={form.message}
              onChange={set('message')}
              placeholder="Leave a note, a song request, anything…"
              className="w-full resize-none bg-transparent text-[15px] text-white outline-none placeholder:text-white/30"
            />
          </label>

          {/* Send button */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-spotify py-3.5 text-base font-bold text-black transition active:scale-[0.98] hover:brightness-105"
          >
            <Send size={18} /> Send
          </button>
        </form>
      )}

      {/* Floating Get Directions button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-20 flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-black shadow-2xl shadow-black/50 transition active:scale-95"
      >
        <MapPin size={18} /> GET DIRECTIONS
      </a>
    </motion.div>
  )
}
