'use client';

import FullInteractiveFlowDiagram from '../../components/FullInteractiveFlowDiagram';
import Link from 'next/link';

export default function FullFlowPage() {
  return (
    <div className="container" style={{ 
      padding: '2rem',
      maxWidth: '100%',
      overflowX: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold',
          color: '#009688'
        }}>
          Full Interactive Flow Diagram
        </h1>
        <Link 
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#009688',
            color: 'white',
            padding: '0.7rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Home
        </Link>
      </div>
      
      <FullInteractiveFlowDiagram />
    </div>
  );
} 