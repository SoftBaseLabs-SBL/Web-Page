"use client"

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowUpRight, ExternalLink, ArrowRight, MousePointer2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Elite Landscaping",
    categoryLabel: "Lawncare",
    description:
      "Transforms outdoor spaces into stunning, functional landscapes that enhance property value and elevate everyday living. Online bookings and automated follow-ups with Google Review forms.",
    image: "https://i.postimg.cc/nzGt3JZx/Screenshot-2026-05-13-at-8-48-49-PM.png",
    technologies: ["React", "Node.js", "PostgreSQL", "HTML"],
    year: "2025",
    link: "elitelandscapesllc.com",
  },
  {
    id: 3,
    title: "Trull Contracting",
    categoryLabel: "Contracting / Excavation",
    description:
      "Delivers heavy civil and infrastructure work with precision — excavation, paving, utilities, and around-the-clock commitment to every project.",
    image: "https://i.postimg.cc/3wngHyKQ/trull-contracting-cropped.png",
    technologies: ["React", "Node.js"],
    year: "2026",
    link: "#",
  },
  {
    id: 5,
    title: "Smith Lawnscapes LLC",
    categoryLabel: "Landscaping",
    description:
      "Professional landscaping services delivering beautiful, well-maintained outdoor spaces for residential and commercial properties.",
    image: "https://i.postimg.cc/rspFWmW6/Screenshot-2026-05-13-at-9-13-50-PM.png",
    technologies: ["React", "Tailwind"],
    year: "2024",
    link: "smithlawnscapes.com",
  },
  {
    id: 6,
    title: "Omni Sushi",
    categoryLabel: "Sushi Restaurant",
    description:
      "Fresh rolls, bold flavors, and a full menu built for easy online ordering — bringing an authentic sushi experience straight to your table.",
    image: "https://i.postimg.cc/tJvWBKTM/Screenshot-2026-05-13-at-10-15-18-PM.png",
    technologies: ["Next.js", "Online Ordering"],
    year: "2024",
    link: "https://omisushimi.com",
  },
  {
    id: 8,
    title: "Kabba Mobile",
    categoryLabel: "Mobile Mechanic",
    description:
      "On-demand mobile mechanic service bringing certified repairs to your driveway — no tow truck, no waiting room, just honest work at your door.",
    image: "https://i.postimg.cc/TYZWhq5B/Screenshot-2026-05-15-at-6-15-06-PM.png",
    technologies: ["Next.js", "GraphQL", "Contentful"],
    year: "2023",
    link: "#",
  },
]

type Project = (typeof projects)[number]

const resolveHref = (link: string) =>
  link && link !== "#" ? (link.startsWith("http") ? link : `https://${link}`) : null

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

// Infinite scrolling marquee for project categories
function ProjectMarquee() {
  const marqueeItems = [
    "Landscaping", "Mobile Mechanics", "Barbershops", "Contractors",
    "Plumbing", "Online Shops", "Roofing", "Property Management",
  ]

  return (
    <div className="relative overflow-hidden py-8 mb-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-2xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: "-100px" })
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const useHorizontal = mounted && !isMobile

  return (
    <section id="portfolio" className="relative">
      {/* Marquee + Header */}
      <div className="pt-32">
        <ProjectMarquee />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Our Portfolio
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Projects that deliver results
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
              Explore our collection of projects that have helped businesses transform their
              digital presence and achieve extraordinary growth.
            </p>
            {useHorizontal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
              >
                <MousePointer2 className="h-4 w-4" />
                Scroll to explore
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {useHorizontal ? <HorizontalShowcase /> : <VerticalShowcase />}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: scroll-driven horizontal showcase                          */
/* ------------------------------------------------------------------ */
function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxX, setMaxX] = useState(0)

  useEffect(() => {
    const calc = () => {
      if (!trackRef.current) return
      setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    calc()
    window.addEventListener("resize", calc)
    // Recalculate once images/layout settle
    const t = setTimeout(calc, 300)
    return () => {
      window.removeEventListener("resize", calc)
      clearTimeout(t)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxX])
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${maxX}px)` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-8 px-[8vw] will-change-transform">
          {projects.map((project, index) => (
            <HorizontalCard key={project.id} project={project} index={index} />
          ))}
          <EndPanel />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 max-w-[60vw]">
          <div className="h-1 w-full rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full bg-foreground origin-left"
              style={{ scaleX: progress }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function HorizontalCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const href = resolveHref(project.link)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-[78vw] max-w-[1050px] shrink-0 rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-xl overflow-hidden"
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        {/* Image */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[68vh] overflow-hidden bg-secondary">
          <motion.div
            className="relative w-full h-full p-3"
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"
              sizes="78vw"
              loading="lazy"
            />
          </motion.div>

          {/* Index number */}
          <div className="absolute top-6 left-6 text-7xl font-bold text-foreground/10 tabular-nums select-none">
            {String(index + 1).padStart(2, "0")}
          </div>
          {/* Year */}
          <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-medium text-foreground">
            {project.year}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            {project.categoryLabel}
          </span>
          <h3 className="mt-3 text-3xl lg:text-4xl font-bold text-foreground text-balance">
            {project.title}
          </h3>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(project.technologies ?? []).map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors group/btn"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Site
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            ) : (
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 rounded-full bg-secondary text-foreground border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors group/btn"
              >
                Start a project like this
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EndPanel() {
  return (
    <div className="relative w-[60vw] max-w-[640px] shrink-0 flex flex-col items-center justify-center text-center rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-xl h-[68vh] p-12">
      <h3 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
        Your project could be next
      </h3>
      <p className="mt-5 max-w-md text-muted-foreground leading-relaxed">
        Let&apos;s build something your customers will love. Tell us what you need and we&apos;ll
        tailor it exactly for your business.
      </p>
      <button
        onClick={scrollToContact}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-base font-medium hover:bg-foreground/90 transition-colors group/btn"
      >
        Start a Project
        <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile: vertical reveal showcase                                    */
/* ------------------------------------------------------------------ */
function VerticalShowcase() {
  return (
    <div className="mx-auto max-w-2xl px-6 mt-12 mb-32 space-y-8">
      {projects.map((project, index) => (
        <VerticalCard key={project.id} project={project} index={index} />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl p-10 text-center"
      >
        <h3 className="text-3xl font-bold text-foreground text-balance">Your project could be next</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Tell us what you need and we&apos;ll tailor it exactly for your business.
        </p>
        <button
          onClick={scrollToContact}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-base font-medium hover:bg-foreground/90 transition-colors"
        >
          Start a Project
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </div>
  )
}

function VerticalCard({ project, index }: { project: Project; index: number }) {
  const href = resolveHref(project.link)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary p-3">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-3"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 text-5xl font-bold text-foreground/15 tabular-nums select-none">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm text-xs font-medium text-foreground">
          {project.year}
        </div>
      </div>
      <div className="p-7">
        <span className="text-sm uppercase tracking-widest text-muted-foreground">
          {project.categoryLabel}
        </span>
        <h3 className="mt-2 text-2xl font-bold text-foreground">{project.title}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(project.technologies ?? []).map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Live Site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-full bg-secondary text-foreground border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              Start a project like this
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
