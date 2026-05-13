"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We dive deep into understanding your business, goals, target audience, and competitive landscape to build a solid foundation.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive digital strategy that aligns with your objectives and sets clear milestones.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our designers craft stunning visual concepts and intuitive user experiences that bring your brand story to life.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Using cutting-edge technologies, we build robust, scalable solutions that perform flawlessly across all devices.",
  },
  {
    number: "05",
    title: "Launch & Growth",
    description:
      "We handle the deployment and provide ongoing support, optimization, and growth strategies for long-term success.",
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="process" ref={containerRef} className="py-32 relative bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Our proven process
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
            A streamlined approach that transforms ideas into exceptional digital experiences.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({
  step,
  index,
  isInView,
}: {
  step: (typeof steps)[0]
  index: number
  isInView: boolean
}) {
  const stepRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "center center"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className={`flex-1 ${isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="inline-block p-8 rounded-2xl bg-secondary border border-border"
        >
          <span className="text-5xl md:text-6xl font-bold text-muted-foreground/30">
            {step.number}
          </span>
          <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">
            {step.title}
          </h3>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
            {step.description}
          </p>
        </motion.div>
      </div>

      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 hidden md:flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          className="w-4 h-4 rounded-full bg-foreground relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            className="absolute inset-0 rounded-full bg-foreground/30"
          />
        </motion.div>
      </div>

      {/* Empty space for layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}
