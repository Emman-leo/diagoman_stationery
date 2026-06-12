import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Diagoman — Custom Stamps & Stationery, Accra Ghana'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F2744',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Gold accent bar top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#E8A020',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: '#E8A020',
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 700,
              color: '#0F2744',
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            Diagoman
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          Custom Stamps &{' '}
          <span style={{ color: '#E8A020' }}>Stationery</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '48px',
          }}
        >
          Accra's trusted stamp maker — order online, deliver to your door
        </div>

        {/* Pills row */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Self-inking Stamps', 'Company Stamps', 'Date Stamps', 'Office Stationery'].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(232,160,32,0.15)',
                  border: '1px solid rgba(232,160,32,0.4)',
                  borderRadius: '999px',
                  padding: '10px 24px',
                  fontSize: '20px',
                  color: '#E8A020',
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            fontSize: '22px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          diagoman.org
        </div>

        {/* Gold accent bar bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: '#E8A020',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
