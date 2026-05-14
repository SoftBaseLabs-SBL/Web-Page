"use client"

import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowUpRight, ArrowRight, ArrowLeft, ExternalLink, Globe, Smartphone, ShoppingBag, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Projects", icon: Globe },
  { id: "web", label: "Web Apps", icon: Globe },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "enterprise", label: "Enterprise", icon: Building2 },
]

const projects = [
  {
    id: 1,
    title: "Elite Landscaping",
    category: "web",
    categoryLabel: "Lawncare",
    description: "transforms outdoor spaces into stunning, functional landscapes that enhance property value and elevate everyday living. Online bookings and automated follow ups with Google Review forms.",
    image: "https://i.postimg.cc/nzGt3JZx/Screenshot-2026-05-13-at-8-48-49-PM.png",
    technologies: ["React", "Node.js", "PostgreSQL", "HTML"],
    year: "2025",
    link: "elitelandscapesllc.com",
  },
  {
    id: 2,
    title: "Artisan Market",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    description: "Handcrafted goods marketplace connecting over 5,000 artisans with global customers. Features AI recommendations and seamless checkout.",
    image: "https://i.postimg.cc/CKPmsrnq/monty-auto-cropped.png",
    technologies: ["Next.js", "Stripe", "Tailwind"],
    year: "2025",
    link: "#",
  },
  {
    id: 3,
    title: "Wellness Hub",
    category: "mobile",
    categoryLabel: "Health & Wellness",
    description: "Comprehensive wellness platform for mental health tracking, meditation, and personalized fitness programs with 500K+ active users.",
    image: "https://i.postimg.cc/3wngHyKQ/trull-contracting-cropped.png",

    technologies: ["React Native", "Firebase", "TensorFlow", "Node.js"],
    year: "2026",
    link: "#",
  },
  {
    id: 4,
    title: "Urban Eats",
    category: "mobile",
    categoryLabel: "Food Delivery",
    description: "Premium food delivery service with real-time GPS tracking, personalized recommendations, and seamless restaurant partnerships.",
    image: "https://i.postimg.cc/0yVndXLq/Screenshot-2026-05-13-at-9-08-34-PM.png",

    technologies: ["Flutter", "Google Maps", "Stripe", "MongoDB"],
    year: "2026",
    link: "#",
  },
  {
    id: 5,
    title: "CloudSync Enterprise",
    category: "enterprise",
    categoryLabel: "SaaS Platform",
    description: "Enterprise-grade cloud collaboration platform with advanced security, real-time sync, and seamless integrations for Fortune 500 companies.",
    image: "https://i.postimg.cc/rspFWmW6/Screenshot-2026-05-13-at-9-13-50-PM.png",
    year: "2024",
    link: "#",
  },
  {
    id: 6,
    title: "Luxe Properties",
    category: "web",
    categoryLabel: "Real Estate",
    description: "High-end real estate platform featuring virtual tours, AI-powered property matching, and streamlined booking for luxury properties.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60",
    year: "2024",
    link: "#",
  },
  {
    id: 7,
    title: "EduLearn Pro",
    category: "web",
    categoryLabel: "EdTech",
    description: "Interactive e-learning platform with live classes, AI tutoring, gamification, and progress tracking for 2M+ students worldwide.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
    year: "2025",
    link: "#",
  },
  {
    id: 8,
    title: "GreenCart",
    category: "ecommerce",
    categoryLabel: "Sustainable Shopping",
    description: "Eco-friendly e-commerce platform connecting conscious consumers with sustainable brands. Carbon-neutral shipping on all orders.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
    technologies: ["Shopify", "Next.js", "GraphQL", "Contentful"],
    year: "2023",
    link: "#",
  },
]

// Infinite scrolling marquee for project logos
function ProjectMarquee() {
  const marqueeItems = [
    "Landscaping", "Mobile Mechanics", "Barbershops", "Contractors",
    "Plumbing", "Online Shops", "Roofing", "Property Management"
  ]

  return (
    <div className="relative overflow-hidden py-8 mb-16">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-2xl font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  // Scroll-based parallax for the header
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const projectsPerPage = 4
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const displayedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(0)
  }

  return (
    <section id="portfolio" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Scrolling Marquee */}
      <ProjectMarquee />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with scroll parallax */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Our Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Projects that deliver results
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
            Explore our collection of award-winning projects that have helped businesses transform their digital presence and achieve extraordinary growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Projects Grid with staggered animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="border-border text-foreground hover:bg-secondary disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === i
                    ? "bg-foreground w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="border-border text-foreground hover:bg-secondary disabled:opacity-50"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: typeof projects[0]
  index: number
  onSelect: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary mb-6">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-foreground/90 text-sm leading-relaxed mb-4 line-clamp-2"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/80 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/80 backdrop-blur-sm">
                +{project.technologies.length - 3}
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* View Project Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4"
        >
          <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center">
            <ArrowUpRight className="h-5 w-5 text-background" />
          </div>
        </motion.div>

        {/* Year Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
          {project.year}
        </div>

        {/* Stats Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-foreground text-background text-sm font-semibold"
        >
          {project.stats.increase} {project.stats.metric}
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm text-muted-foreground">{project.categoryLabel}</span>
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
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: typeof projects[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">{project.categoryLabel}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>

          <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {project.title}
          </h3>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Stats */}
          <div className="p-6 rounded-2xl bg-secondary mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{project.stats.increase}</div>
              <div className="text-muted-foreground mt-1">{project.stats.metric}</div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-foreground text-background hover:bg-foreground/90 py-6 text-base group"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Live Project
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-foreground hover:bg-secondary py-6 text-base"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
