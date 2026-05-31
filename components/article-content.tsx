"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { getPost, iconMap, type Block } from "@/lib/blog-posts"
import { notFound } from "next/navigation"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
}

export function ArticleContent({ slug }: { slug: string }) {
  const post = getPost(slug)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(heroProgress, [0, 0.9], [1, 0])

  if (!post) notFound()

  const Icon = iconMap[post.iconName]

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-foreground"
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          SoftBase<span className="text-muted-foreground">Labs</span>
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative z-10 mx-auto max-w-3xl px-6 pt-10 pb-14 lg:pt-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
              {post.category}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex items-center gap-5 text-sm text-muted-foreground"
          >
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Body */}
      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6">
          {post.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-28">
        <motion.div {...reveal} className="rounded-3xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-xl lg:p-12">
          <h2 className="text-2xl font-bold text-balance sm:text-3xl">Let&apos;s build yours</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground text-balance">
            Tell us what you need and we&apos;ll tailor it exactly for your business.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-7 py-3.5 text-base font-medium transition-colors hover:bg-muted"
            >
              Book a Call
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </section>
    </main>
  )
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <motion.h2 {...reveal} className="pt-6 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {block.text}
        </motion.h2>
      )
    case "paragraph":
      return (
        <motion.p {...reveal} className="text-lg leading-relaxed text-muted-foreground">
          {block.text}
        </motion.p>
      )
    case "quote":
      return (
        <motion.blockquote
          {...reveal}
          className="my-4 border-l-2 border-foreground/40 pl-6 text-xl font-medium italic leading-relaxed text-foreground text-balance"
        >
          {block.text}
        </motion.blockquote>
      )
    case "list":
      return (
        <motion.ul {...reveal} className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-muted-foreground">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      )
    default:
      return null
  }
}
