import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

const Services     = dynamic(() => import("@/components/services").then(m => ({ default: m.Services })))
const Portfolio    = dynamic(() => import("@/components/portfolio").then(m => ({ default: m.Portfolio })))
const Process      = dynamic(() => import("@/components/process").then(m => ({ default: m.Process })))
const Testimonials = dynamic(() => import("@/components/testimonials").then(m => ({ default: m.Testimonials })))
const CTA          = dynamic(() => import("@/components/cta").then(m => ({ default: m.CTA })))
const Footer       = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
