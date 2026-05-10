"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Github, Twitter, Linkedin, Dribbble } from "lucide-react"

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
}

const footerLinks = {
  services: [
    { label: "Web Design", href: "#" },
    { label: "Development", href: "#" },
    { label: "E-Commerce", href: "#" },
    { label: "Branding", href: "#" },
    { label: "SEO", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Case Studies", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
]

export function Footer() {
  return (
    <footer className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-foreground">
                SoftBase<span className="text-muted-foreground">Labs</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Crafting exceptional digital experiences that convert visitors into customers and
              elevate brands to new heights.
            </p>

            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SoftBaseLabs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
