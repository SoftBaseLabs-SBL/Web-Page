"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Nexus Finance",
    category: "Fintech Platform",
    description: "A revolutionary banking platform with real-time analytics and seamless transactions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    stats: { increase: "+340%", metric: "User Engagement" },
  },
  {
    title: "Montys Auto",
    category: "Mobile Mechanic",
    description: "Mobile mechanic service bringing expert auto repair straight to your door.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    stats: { increase: "+180%", metric: "Conversion Rate" },
  },
  {
    title: "Trull Contracting",
    category: "Heavy Contracting",
    description: "Heavy contracting specialists delivering large-scale construction and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
    stats: { increase: "+250%", metric: "App Downloads" },
  },
  {
    title: "Catos Cut Masters",
    category: "Barbershop",
    description: "Premium barbershop experience with expert cuts, fades, and grooming for every style.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=60",
    stats: { increase: "+420%", metric: "Order Volume" },
  },
]

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  return (
    <section id="portfolio" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              Featured Work
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Selected projects
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors group"
          >
            <span className="text-sm font-medium uppercase tracking-wider">View All Work</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>

        <motion.div style={{ x }} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary mb-6">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center px-6"
          >
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mb-4">
              <ArrowUpRight className="h-6 w-6 text-background" />
            </div>
            <p className="text-foreground text-lg">{project.description}</p>
          </motion.div>
        </motion.div>

        {/* Stats badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium"
        >
          {project.stats.increase} {project.stats.metric}
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm text-muted-foreground">{project.category}</span>
          <h3 className="text-2xl font-semibold text-foreground mt-1 group-hover:text-muted-foreground transition-colors">
            {project.title}
          </h3>
        </div>
        <motion.div
          animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
          className="mt-2"
        >
          <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>
    </motion.div>
  )
}
