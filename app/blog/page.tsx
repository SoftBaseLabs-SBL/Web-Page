"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react"
import { blogPosts, iconMap } from "@/lib/blog-posts"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [featured, ...rest] = blogPosts

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          SoftBase<span className="text-muted-foreground">Labs</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline">
            Home
          </Link>
          <Link href="/book" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline">
            Book a Call
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Start a Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-8 lg:pt-20">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-widest text-muted-foreground"
          >
            The SoftBaseLabs Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Ideas that help your business grow online.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground text-balance"
          >
            Straight-talking insights on websites, SEO, performance, and design — written
            for business owners, not engineers.
          </motion.p>
        </motion.div>
      </section>

      {/* Featured */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FeaturedCard slug={featured.slug} />
      </section>

      {/* Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          More articles
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <PostCard key={post.slug} slug={post.slug} index={index} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border/60 bg-card/40 p-10 text-center backdrop-blur-xl lg:p-16"
        >
          <h2 className="text-3xl font-bold text-balance sm:text-4xl">
            Ready to put these ideas to work?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-balance">
            Tell us what you need and we&apos;ll tailor it exactly for your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-8 py-4 text-base font-medium transition-colors hover:bg-muted"
            >
              Book a Call
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer back link */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SoftBaseLabs</p>
        </div>
      </footer>
    </main>
  )
}

function FeaturedCard({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug)!
  const Icon = iconMap[post.iconName]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-xl transition-colors hover:border-border lg:p-12"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-150" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
              Featured · {post.category}
            </span>
          </div>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight text-balance transition-colors group-hover:text-muted-foreground lg:text-5xl">
            {post.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground text-balance">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-medium text-foreground">
              Read article
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function PostCard({ slug, index }: { slug: string; index: number }) {
  const post = blogPosts.find((p) => p.slug === slug)!
  const Icon = iconMap[post.iconName]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card/40 p-7 backdrop-blur-xl transition-colors hover:border-border"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{post.category}</span>
        </div>
        <h3 className="mt-5 text-xl font-semibold leading-snug text-balance transition-colors group-hover:text-muted-foreground">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
          <ArrowUpRight className="ml-auto h-4 w-4 text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.div>
  )
}
