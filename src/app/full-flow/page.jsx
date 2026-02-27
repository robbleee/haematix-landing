'use client';

import FullInteractiveFlowDiagram from '../../components/FullInteractiveFlowDiagram';
import Link from 'next/link';

export default function FullFlowPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 2rem 3rem',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        flexShrink: 0,
      }}>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#374151',
          textDecoration: 'none',
          padding: '0.45rem 0.9rem',
          background: '#fff',
          border: '1px solid #e5e5e3',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.15s ease',
        }}>
          ← Back
        </Link>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#9ca3af',
            margin: 0,
          }}>
            Platform Architecture
          </p>
          <h1 style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#111',
            margin: '0.15rem 0 0',
          }}>
            Interactive Flow Diagram
          </h1>
        </div>

        {/* Spacer to balance the back button */}
        <div style={{ width: '80px' }} />
      </div>

      {/* Diagram — fills remaining height */}
      <div style={{ flex: 1 }}>
        <FullInteractiveFlowDiagram />
      </div>
    </div>
  );
}
