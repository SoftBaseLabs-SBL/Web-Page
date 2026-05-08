"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "SoftBaseLabs transformed our online presence completely. The new website increased our conversion rate by 340% in just three months. Their attention to detail and understanding of our brand was exceptional.",
    author: "Sarah Chen",
    role: "CEO, Nexus Finance",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "Working with SoftBaseLabs was a game-changer for our e-commerce business. They didn't just build a website; they created an experience that our customers love. Sales have never been better.",
    author: "Marcus Williams",
    role: "Founder, Artisan Market",
    avatar: "MW",
    rating: 5,
  },
  {
    quote:
      "The team at SoftBaseLabs exceeded every expectation. Their strategic approach to design and development resulted in a platform that truly resonates with our users. Highly recommended!",
    author: "Elena Rodriguez",
    role: "Product Lead, Wellness Hub",
    avatar: "ER",
    rating: 5,
  },
  {
    quote:
      "From concept to launch, SoftBaseLabs delivered excellence at every stage. Our new platform has received incredible feedback, and the ROI speaks for itself. True professionals.",
    author: "David Park",
    role: "CTO, Urban Eats",
    avatar: "DP",
    rating: 5,
  },
]

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Loved by industry leaders
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-card border border-border">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-muted-foreground/20" />

            <div className="relative z-10">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-medium text-balance">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-foreground">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-border hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-foreground w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-border hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </motion.div>

        {/* Logo cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {["Nexus", "Artisan", "Wellness", "Urban", "TechFlow", "CloudBase"].map(
              (company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-xl md:text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors cursor-default"
                >
                  {company}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
