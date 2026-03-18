import Link from 'next/link';

export const metadata = {
  title: 'Haem.io Demo — AML Diagnostic Walkthrough',
  description: 'Watch Haem.io classify a real AML case in minutes using WHO 2022 and ICC 2022 logic.',
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2f1 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', marginBottom: '1.5rem' }}>
        <span style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #009688, #00796b, #4DB6AC)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Haem.io
        </span>
      </Link>

      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
        fontWeight: 800,
        color: '#1a202c',
        textAlign: 'center',
        marginBottom: '0.5rem',
        letterSpacing: '-0.02em',
      }}>
        AML Diagnostic Walkthrough
      </h1>
      <p style={{
        fontSize: '1.05rem',
        color: '#4a5568',
        textAlign: 'center',
        marginBottom: '2rem',
        maxWidth: '540px',
        lineHeight: 1.6,
      }}>
        Watch Dr. Luke Carter-Brzezinski classify a real AML case using WHO 2022
        &amp; ICC 2022 logic — in under 2 minutes.
      </p>

      {/* Video */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0, 150, 136, 0.18)',
        background: '#000',
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
      }}>
        <iframe
          src="https://www.loom.com/embed/b7ed13ff312447cfb2352f813400a3f7?autoplay=0&hide_owner=true&hide_share=true&hide_title=false&hideEmbedTopBar=false"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          title="Haem.io AML diagnostic demo"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* CTA row */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <Link href="/interactive-classifier" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.85rem 1.75rem',
          background: 'linear-gradient(135deg, #009688, #00796b)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.95rem',
          textDecoration: 'none',
          boxShadow: '0 6px 20px rgba(0,150,136,0.25)',
        }}>
          Try the Classifier →
        </Link>
        <a href="https://app.haem.io/" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.85rem 1.75rem',
          color: '#00796b',
          border: '2px solid #b2dfdb',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.95rem',
          textDecoration: 'none',
          background: 'rgba(255,255,255,0.7)',
        }}>
          Sign In to App
        </a>
      </div>
    </div>
  );
}
