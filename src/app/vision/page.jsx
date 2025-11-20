'use client';

import { useState } from 'react';

export default function VisionPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const visionNodes = [
    {
      id: 'platform-vision',
      title: 'Diagnostic Intelligence',
      description: 'Empowering clinicians with essential, continuously evolving tools for complex blood cancer diagnosis.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20M12 2v20"/>
        </svg>
      ),
      details: {
        fullDescription: 'Our vision centers on empowering clinicians on the front lines of diagnosing and managing blood cancers. We understand the immense complexity they face, particularly with aggressive diseases like AML. Our goal is to equip these specialists with tools that master diagnostic complexity and turn extracted data into actionable intelligence.',
        capabilities: [
          'Essential tools for complex diagnosis',
          'Focus on aggressive diseases like AML',
          'Continuously evolving with medical advances',
          'Designed for front-line decision making'
        ],
        impact: 'Equips specialists with tools that master complexity and provide actionable intelligence.'
      }
    },
    {
      id: 'ai-extraction',
      title: 'AI-Driven Extraction',
      description: 'Rapid, accurate extraction of key fields from complex genetic and clinical reports.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      details: {
        fullDescription: 'Hematology is constantly advancing. Our platform leverages AI primarily for accurate and efficient extraction of key fields from complex reports. We take responsibility for embedding validated knowledge from the latest genetic insights into our system\'s core functional logic.',
        capabilities: [
          'Rapid extraction of key data fields',
          'Integration of latest WHO/ICC standards',
          'Automated processing of genetic reports',
          'Real-time application of guidelines'
        ],
        impact: 'Ensures clinicians can reliably apply complex, up-to-date sub-classifications without manual tracking.'
      }
    },
    {
      id: 'transparency',
      title: 'Complete Transparency',
      description: 'Trust through detailed derivation metrics and explainable logic for every result.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
      details: {
        fullDescription: 'We believe trust is paramount. Because our classification and risk stratification are driven by functional, provable logic operating on clearly defined inputs, we generate detailed derivation metrics for every result. Users can see exactly how a classification was reached.',
        capabilities: [
          'Detailed derivation metrics for results',
          'Step-by-step explanation of logic',
          'Verifiable data inputs',
          'Published classification criteria'
        ],
        impact: 'Allows users to critically evaluate outputs and confidently integrate them into decision-making.'
      }
    },
    {
      id: 'expansion',
      title: 'Proven & Expanding',
      description: 'Building on success in AML/MDS to cover the full spectrum of hematologic malignancies.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      details: {
        fullDescription: 'Having proven our system\'s capabilities in AML and MDS, we are expanding to encompass the growing range of blood cancers defined by molecular signatures. We utilize the same reliable process of data extraction and logical application across new disease areas.',
        capabilities: [
          'Proven success in AML and MDS',
          'Expanding to all molecular-defined cancers',
          'Scalable platform architecture',
          'Consistent logical application'
        ],
        impact: 'Systematic expansion ensures high-quality diagnostic support across all blood cancer types.'
      }
    },
    {
      id: 'actionable-intelligence',
      title: 'Actionable Intelligence',
      description: 'Directly linking diagnostic insights to treatment options and clinical trials.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      details: {
        fullDescription: 'Our platform connects sophisticated classifications to practical considerations like MRD monitoring and treatment planning. Our roadmap includes linking insights with optimal treatment regimens and facilitating precise clinical trial matching.',
        capabilities: [
          'Linking diagnostics to treatment',
          'MRD monitoring guidance',
          'Regimen recommendations',
          'Precise clinical trial matching'
        ],
        impact: 'Bridges the gap between complex diagnostics and effective, personalized patient care.'
      }
    },
    {
      id: 'clinical-impact',
      title: 'Clinical Impact',
      description: 'Revolutionizing patient outcomes through faster, more accurate precision diagnostics.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      details: {
        fullDescription: 'By providing clinicians with transparent, up-to-date, and actionable intelligence, we strive to revolutionize hematologic diagnostics. Our goal is to reduce errors, speed up time-to-treatment, and contribute to significantly improved outcomes for patients.',
        capabilities: [
          'Improved patient outcomes',
          'Reduced diagnostic errors',
          'Faster time-to-treatment',
          'Personalized care approaches'
        ],
        impact: 'Transforms the landscape of hematologic care to ensure the best path for every patient.'
      }
    }
  ];

  const handleCardClick = (nodeId) => {
    setExpandedCard(nodeId);
  };

  const closeExpanded = () => {
    setExpandedCard(null);
  };

  const expandedNode = visionNodes.find(node => node.id === expandedCard);

  return (
    <main style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      color: '#1a202c',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      
      {/* Header */}
      <section style={{
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        background: 'white',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: '#009688',
            letterSpacing: '-0.02em'
          }}>
            Our Vision
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#4a5568',
            lineHeight: '1.6'
          }}>
            Advancing Precision Hematology Through AI-Driven Insights
          </p>
        </div>
      </section>

      {/* Vision Matrix Interface */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {visionNodes.map((node) => (
            <div
              key={node.id}
              onClick={() => handleCardClick(node.id)}
              onMouseEnter={() => setActiveCard(node.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                background: 'white',
                border: activeCard === node.id ? '1px solid #009688' : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '2.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCard === node.id 
                  ? '0 10px 25px -5px rgba(0, 150, 136, 0.15)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transform: activeCard === node.id ? 'translateY(-4px)' : 'none'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: activeCard === node.id ? '#e6fffa' : '#f7fafc',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#009688',
                transition: 'background 0.2s ease'
              }}>
                {node.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: '#2d3748'
              }}>
                {node.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#718096',
                lineHeight: '1.6',
                margin: 0
              }}>
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Principles / Mission */}
      <section style={{
        padding: '4rem 2rem',
        background: 'white',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            padding: '3rem',
            background: '#f0fdfa',
            borderRadius: '16px',
            border: '1px solid #ccfbf1'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: '#00695c',
              marginBottom: '1.5rem'
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#004d40',
              marginBottom: '1.5rem'
            }}>
              We aim to bridge the gap between complex diagnostics and effective, personalized patient care. By providing clinicians with transparent, up-to-date, comprehensive, and actionable intelligence—derived from AI-assisted data extraction feeding into robust, provable logic—we strive to revolutionize hematologic diagnostics.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#004d40',
              margin: 0
            }}>
              This commitment ensures every patient receives the most accurate diagnosis and optimal treatment path for their unique condition, leading to significantly improved outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Expanded Modal */}
      {expandedCard && expandedNode && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={closeExpanded}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              background: 'white',
              borderRadius: '16px',
              padding: '3rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflowY: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeExpanded}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                fontSize: '2rem',
                color: '#a0aec0',
                cursor: 'pointer',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ 
                display: 'inline-flex',
                padding: '1rem',
                background: '#e6fffa',
                borderRadius: '12px',
                color: '#009688',
                marginBottom: '1.5rem'
              }}>
                {expandedNode.icon}
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#2d3748',
                marginBottom: '1rem'
              }}>
                {expandedNode.title}
              </h2>
            </div>

            <div style={{ color: '#4a5568', lineHeight: '1.7' }}>
              <p style={{ fontSize: '1.15rem', marginBottom: '2rem' }}>
                {expandedNode.details.fullDescription}
              </p>

              <h4 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '700', 
                color: '#2d3748',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Key Capabilities
              </h4>
              
              <ul style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem',
                padding: 0,
                listStyle: 'none'
              }}>
                {expandedNode.details.capabilities.map((cap, i) => (
                  <li key={i} style={{
                    background: '#f7fafc',
                    padding: '1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.95rem'
                  }}>
                    <span style={{ color: '#009688', fontWeight: 'bold' }}>✓</span>
                    {cap}
                  </li>
                ))}
              </ul>

              <div style={{
                padding: '1.5rem',
                borderLeft: '4px solid #009688',
                background: '#f0fdfa'
              }}>
                <strong style={{ color: '#00695c', display: 'block', marginBottom: '0.5rem' }}>Impact</strong>
                {expandedNode.details.impact}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
