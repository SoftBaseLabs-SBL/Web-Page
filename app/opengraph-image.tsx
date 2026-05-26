import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SoftBaseLabs – Beautiful Converting Websites'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Blue glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-60px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          }}
        />
        {/* Pink glow center-right */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', letterSpacing: '0.05em' }}>
            Digital Design & Development
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          SoftBase
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Labs
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.01em',
            marginBottom: '56px',
            textAlign: 'center',
          }}
        >
          Beautiful Converting Websites
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
          }}
        >
          {[
            { value: '20+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '3+', label: 'Years Experience' },
            { value: '6+', label: 'Industries Served' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '48px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
          }}
        >
          softbaselabs.com
        </div>
      </div>
    ),
    { ...size }
  )
}
