"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Palette, Code2, Rocket, BarChart3, Layers, Zap } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description:
      "Stunning, user-centric designs that capture your brand essence and engage visitors from the first click.",
    features: ["UI/UX Design", "Brand Identity", "Design Systems"],
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Clean, scalable code built with modern technologies for lightning-fast performance and reliability.",
    features: ["React/Next.js", "Custom CMS", "API Integration"],
  },
  {
    icon: Rocket,
    title: "E-Commerce",
    description:
      "Conversion-optimized online stores that turn browsers into buyers with seamless shopping experiences.",
    features: ["Shopify/Custom", "Payment Systems", "Inventory Management"],
  },
  {
    icon: BarChart3,
    title: "SEO & Analytics",
    description:
      "Data-driven strategies to boost visibility and track performance for continuous improvement.",
    features: ["Technical SEO", "Performance Tracking", "A/B Testing"],
  },
  {
    icon: Layers,
    title: "Branding",
    description:
      "Comprehensive brand strategies that create lasting impressions and build customer loyalty.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
  },
  {
    icon: Zap,
    title: "Optimization",
    description:
      "Performance tuning and conversion optimization to maximize the impact of your digital presence.",
    features: ["Speed Optimization", "CRO", "User Testing"],
  },
]

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" ref={containerRef} className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Services built for growth
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground text-balance">
            End-to-end digital solutions designed to elevate your brand and accelerate your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-500 ${
                  hoveredIndex === index
                    ? "bg-secondary border-border"
                    : "bg-card border-border/50"
                }`}
              >
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-6"
                >
                  <service.icon className="h-6 w-6 text-foreground" />
                </motion.div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover gradient effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
