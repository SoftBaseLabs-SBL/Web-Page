import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://softbaselabs.com'),
  title: 'SoftBaseLabs | Beautiful Converting Websites',
  description: 'We design and develop stunning, high-converting websites that elevate your brand and drive results. Serving local businesses across the US.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'SoftBaseLabs | Beautiful Converting Websites',
    description: 'We design and develop stunning, high-converting websites that elevate your brand and drive results.',
    url: 'https://softbaselabs.com',
    siteName: 'SoftBaseLabs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoftBaseLabs | Beautiful Converting Websites',
    description: 'We design and develop stunning, high-converting websites that elevate your brand and drive results.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SoftBaseLabs',
  description: 'Digital design and development agency crafting high-converting websites for local businesses.',
  url: 'https://softbaselabs.com',
  email: 'softbaselabs@gmail.com',
  foundingDate: '2023',
  serviceType: ['Web Design', 'Web Development', 'E-Commerce', 'SEO & Analytics', 'Branding', 'Speed Optimization'],
  areaServed: 'United States',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  )
}
