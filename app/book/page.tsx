"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { ArrowLeft, ArrowRight, CalendarCheck, Clock, Mail } from "lucide-react"
import { GlassCalendar } from "@/components/ui/glass-calendar"

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [note, setNote] = useState("")

  const prettyDate = format(selectedDate, "EEEE, MMMM d, yyyy")
  const mailtoHref = `mailto:softbaselabs@gmail.com?subject=${encodeURIComponent(
    "Book a Call — SoftBaseLabs",
  )}&body=${encodeURIComponent(
    `Hi SoftBaseLabs,\n\nI'd like to book a call on ${prettyDate}${
      selectedTime ? ` at ${selectedTime}` : ""
    }.\n\nA bit about my project:\n${note || "\n"}\n`,
  )}`

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient gradient backdrop so the glass effect reads */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.35)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.30)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.20)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          SoftBase<span className="text-muted-foreground">Labs</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20 lg:px-8">
        {/* Left — copy + action */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Book a Call
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s find a time that works
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-balance">
            Pick a day for a free 30-minute discovery call. We&apos;ll talk through your
            project, your goals, and how we can help your business grow.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Selected day</div>
                <div className="font-medium">{prettyDate}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Time</div>
                <div className="font-medium">
                  {selectedTime ? `${selectedTime} · 30 min, free` : "30-min call · choose a time"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={mailtoHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-base font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <Mail className="h-5 w-5" />
              Request this time
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-7 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              Use contact form instead
            </Link>
          </div>
        </motion.div>

        {/* Right — glass calendar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <GlassCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            onNoteChange={setNote}
            className="transform transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </div>
    </main>
  )
}
