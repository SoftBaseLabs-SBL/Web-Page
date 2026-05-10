"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  const targetId = href.replace("#", "")
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

const scrollToContact = () => {
  const element = document.getElementById("contact")
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold tracking-tight text-foreground"
              >
                SoftBase<span className="text-muted-foreground">Labs</span>
              </motion.div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  onClick={scrollToContact}
                  className="border-border text-foreground hover:bg-secondary group"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-foreground p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      scrollToSection(e, item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-3xl font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8"
              >
                <Button 
                  onClick={() => {
                    scrollToContact()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
