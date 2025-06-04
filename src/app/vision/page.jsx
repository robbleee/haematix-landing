'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function VisionPage() {
  const [activeCard, setActiveCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Hide the header navigation
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    // Trigger sparkle animation
    setTimeout(() => setIsLoaded(true), 100);

    // Show header again when component unmounts
    return () => {
      if (header) {
        header.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const visionNodes = [
    {
      id: 'platform-vision',
      title: 'Diagnostic Intelligence Platform',
      description: 'Empowering clinicians with essential, continuously evolving tools',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.5 21h5"/>
          <path d="M12 18h-1"/>
          <path d="M8 16h8"/>
          <path d="M6 14h12"/>
          <path d="M4 12h16"/>
          <path d="M2 10h20"/>
          <path d="M4 8h16"/>
          <path d="M6 6h12"/>
          <path d="M8 4h8"/>
          <path d="M10 2h4"/>
        </svg>
      ),
      position: { x: 20, y: 30 },
      details: {
        fullDescription: 'Our vision centers on empowering clinicians on the front lines of diagnosing and managing blood cancers and related hematologic disorders through an essential, continuously evolving diagnostic intelligence platform. We understand the immense complexity clinicians face, particularly with aggressive and nuanced diseases like Acute Myeloid Leukemia (AML), where rapid, accurate decisions are critical.',
        capabilities: [
          'Essential tools for complex blood cancer diagnosis',
          'Specialized focus on aggressive diseases like AML',
          'Continuously evolving with medical advances',
          'Designed for front-line clinical decision making'
        ],
        impact: 'Our goal is to equip specialists with tools that master diagnostic complexity and turn extracted data into actionable intelligence'
      }
    },
    {
      id: 'ai-extraction',
      title: 'AI-Driven Data Extraction',
      description: 'Rapid extraction from complex genetic and clinical reports',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      position: { x: 75, y: 25 },
      details: {
        fullDescription: 'Hematology is constantly advancing; our platform thrives on this evolution. It leverages AI primarily for accurate and efficient extraction of key fields from complex genetic, cytogenetic, differentiation, and clinical reports. We take responsibility for embedding validated knowledge from the latest genetic insights and classification standards into our system\'s core functional logic.',
        capabilities: [
          'Rapid extraction of key data fields from complex clinical reports using AI',
          'Integration of the latest WHO, ICC, and ELN classification standards',
          'Automated processing of genetic and cytogenetic reports',
          'Real-time application of up-to-date sub-classifications and guidelines'
        ],
        impact: 'Ensures clinicians can reliably apply complex, up-to-date sub-classifications without manually tracking every change'
      }
    },
    {
      id: 'transparency',
      title: 'Complete Transparency',
      description: 'Detailed derivation metrics for all diagnostic results',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <circle cx="11" cy="11" r="3"/>
        </svg>
      ),
      position: { x: 50, y: 85 },
      details: {
        fullDescription: 'Our system is built on a foundation of complete transparency. We believe trust is paramount. Because our classification and risk stratification are driven by functional, provable logic operating on clearly defined data inputs, we publish this logic and generate detailed derivation metrics for every result.',
        capabilities: [
          'Complete transparency with detailed derivation metrics for all results',
          'Step-by-step explanation of how classifications are reached',
          'Published logic for all classification and risk stratification',
          'Verifiable data inputs and established criteria for every decision'
        ],
        impact: 'Allows users to see exactly how results were derived, ensuring clinicians can critically evaluate outputs and confidently integrate them into decision-making'
      }
    },
    {
      id: 'expansion',
      title: 'Proven & Expanding',
      description: 'From AML success to comprehensive blood cancer coverage',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
          <path d="M8.5 8.5v.01"/>
          <path d="M16 15.5v.01"/>
          <path d="M12 12v.01"/>
        </svg>
      ),
      position: { x: 25, y: 75 },
      details: {
        fullDescription: 'Having proven our system\'s capabilities in the challenging areas of AML and Myelodysplastic Syndromes (MDS), we are expanding from AML outwards to encompass the growing range of blood cancers and conditions increasingly defined by their molecular signatures, utilizing the same reliable process of data extraction and logical application.',
        capabilities: [
          'Proven success in AML and MDS diagnosis',
          'Expanding to cover molecular signature-defined blood cancers',
          'Reliable process of data extraction and logical application',
          'Scalable platform architecture for new conditions'
        ],
        impact: 'Systematic expansion ensures the same high-quality diagnostic support across all blood cancer types'
      }
    },
    {
      id: 'actionable-intelligence',
      title: 'Actionable Intelligence',
      description: 'Linking diagnostics to treatment and clinical trials',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="m4.5 12.5 6-6"/>
          <path d="m19.5 11.5-6 6"/>
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
          <path d="M4.93 4.93l2.83 2.83"/>
          <path d="M16.24 16.24l2.83 2.83"/>
          <path d="M2 12h4"/>
          <path d="M18 12h4"/>
          <path d="M4.93 19.07l2.83-2.83"/>
          <path d="M16.24 7.76l2.83-2.83"/>
        </svg>
      ),
      position: { x: 80, y: 65 },
      details: {
        fullDescription: 'Our platform connects sophisticated classifications and risk stratification directly to practical considerations like MRD monitoring guidance tailored to patient risk. Our roadmap includes future capabilities to link diagnostic insights with optimal treatment regimens and facilitate clinical trial matching.',
        capabilities: [
          'Actionable intelligence linking diagnostics to treatment options and clinical trials',
          'MRD monitoring guidance tailored to individual patient risk',
          'Treatment regimen recommendations based on molecular profiles',
          'Clinical trial matching based on precise classifications and markers'
        ],
        impact: 'Bridges the gap between complex diagnostics and effective, personalized patient care for significantly improved outcomes'
      }
    },
    {
      id: 'clinical-impact',
      title: 'Clinical Impact',
      description: 'Revolutionizing patient outcomes through precision diagnostics',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          <circle cx="12" cy="12" r="1"/>
        </svg>
      ),
      position: { x: 50, y: 15 },
      details: {
        fullDescription: 'Ultimately, we aim to bridge the gap between complex diagnostics and effective, personalized patient care. By providing clinicians with transparent, up-to-date, comprehensive, and actionable intelligence – derived from AI-assisted data extraction feeding into robust, provable logic – we strive to revolutionize hematologic diagnostics and contribute to significantly improved outcomes for patients facing these challenging conditions.',
        capabilities: [
          'Significantly improved patient outcomes through precision diagnostics',
          'Reduced diagnostic errors and increased treatment efficacy',
          'Faster time-to-treatment for aggressive conditions like AML',
          'Enhanced quality of life through personalized care approaches'
        ],
        impact: 'Our mission is to transform the landscape of hematologic care, ensuring every patient receives the most accurate diagnosis and optimal treatment path for their unique condition'
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
      color: 'var(--text-color)',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
    }}>
      {/* Back to Home Button */}
      <Link 
        href="/"
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 1001,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(0, 150, 136, 0.2)',
          color: 'var(--primary-color)',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--border-radius)',
          textDecoration: 'none',
          fontWeight: '600',
          backdropFilter: 'blur(10px)',
          transition: 'var(--transition)',
          boxShadow: 'var(--box-shadow)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        Back to Home
      </Link>

      {/* Particle Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 150, 136, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(0, 150, 136, 0.03) 0%, transparent 50%)
        `,
        filter: 'blur(40px)',
        animation: 'float 20s ease-in-out infinite'
      }} />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          linear-gradient(rgba(0, 150, 136, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 150, 136, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        opacity: 0.4
      }} />

      {/* Header */}
      <section style={{
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1.5s ease 0.5s'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, var(--primary-color), #4DB6AC)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Our Vision
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#4a5568',
          maxWidth: '650px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          Advancing Precision Hematology Through AI-Driven Insights
        </p>
      </section>

      {/* Vision Matrix Interface */}
      <section 
        ref={containerRef}
        style={{
          padding: '2rem',
          position: 'relative',
          margin: '0 auto',
          maxWidth: '1200px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease 1s'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {visionNodes.map((node, index) => (
            <div
              key={node.id}
              onMouseEnter={() => setActiveCard(node.id)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => handleCardClick(node.id)}
              style={{
                background: activeCard === node.id 
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: activeCard === node.id 
                  ? '2px solid var(--primary-color)'
                  : '1px solid rgba(0, 150, 136, 0.2)',
                borderRadius: '1rem',
                padding: '2rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: activeCard === node.id 
                  ? '0 10px 30px rgba(0, 150, 136, 0.15), var(--box-shadow)'
                  : 'var(--box-shadow)',
                transform: activeCard === node.id ? 'translateY(-5px)' : 'translateY(0)',
                opacity: isLoaded ? 1 : 0,
                animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
              }}
            >
              <div style={{
                marginBottom: '1.5rem',
                color: activeCard === node.id ? 'var(--primary-color)' : '#4a5568',
                transition: 'color 0.3s ease'
              }}>
                {node.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: activeCard === node.id ? 'var(--primary-color)' : 'var(--text-color)',
                transition: 'color 0.3s ease'
              }}>
                {node.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4a5568',
                lineHeight: '1.6',
                margin: 0
              }}>
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{
        padding: '4rem 2rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1.5s ease 2s'
      }}>
        <div className="container" style={{
          maxWidth: '900px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(0, 150, 136, 0.15)',
          borderRadius: '1rem',
          padding: '3rem',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--box-shadow)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Our vision centers on empowering clinicians on the front lines of diagnosing and managing blood cancers and related hematologic disorders through an essential, continuously evolving diagnostic intelligence platform. We understand the immense complexity clinicians face, particularly with aggressive and nuanced diseases like Acute Myeloid Leukemia (AML), where rapid, accurate decisions are critical. Our goal is to equip these specialists with tools that master this complexity and turn extracted data into actionable intelligence.
            </p>
            
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Hematology is constantly advancing; our platform thrives on this evolution. It leverages AI primarily for accurate and efficient extraction of key fields from complex genetic, cytogenetic, differentiation, and clinical reports. We take responsibility for embedding validated knowledge from the latest genetic insights and classification standards (from bodies like WHO, ICC, and ELN) into our system's core functional logic. This commitment ensures clinicians can reliably apply complex, up-to-date sub-classifications and guidelines without needing to manually track every change.
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(0, 150, 136, 0.08)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(0, 150, 136, 0.2)'
          }}>
            <h3 style={{ 
              color: 'var(--primary-color)', 
              fontSize: '1.3rem', 
              marginBottom: '1rem', 
              fontWeight: '600' 
            }}>
              Our Core Principles
            </h3>
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem' 
            }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '0.75rem' 
              }}>
                <div style={{ 
                  minWidth: '24px', 
                  height: '24px', 
                  backgroundColor: 'rgba(0, 150, 136, 0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '0.2rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Rapid extraction of key data fields from complex clinical reports using AI</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '0.75rem' 
              }}>
                <div style={{ 
                  minWidth: '24px', 
                  height: '24px', 
                  backgroundColor: 'rgba(0, 150, 136, 0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '0.2rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Integration of the latest WHO, ICC, and ELN classification standards</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '0.75rem' 
              }}>
                <div style={{ 
                  minWidth: '24px', 
                  height: '24px', 
                  backgroundColor: 'rgba(0, 150, 136, 0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '0.2rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Complete transparency with detailed derivation metrics for all results</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'flex-start',
                gap: '0.75rem' 
              }}>
                <div style={{ 
                  minWidth: '24px', 
                  height: '24px', 
                  backgroundColor: 'rgba(0, 150, 136, 0.2)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '0.2rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Actionable intelligence linking diagnostics to treatment options and clinical trials</span>
              </li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Applying these extracted key data points within our provable, guideline-driven logic, our system enables the fastest, most accurate sub-classifications and risk profiles possible. This clarity, grounded in verifiable data inputs and established criteria, is fundamental to understanding the unique nature of each patient's disease.
            </p>
            
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Furthermore, our system is built on a foundation of complete transparency. We believe trust is paramount. Because our classification and risk stratification are driven by functional, provable logic operating on clearly defined data inputs, we publish this logic and, for every result, generate detailed derivation metrics. This allows users to see exactly how a specific classification or risk score was arrived at from the extracted data, step-by-step, ensuring clinicians can critically evaluate the outputs and confidently integrate them into their decision-making process.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Having proven our system's capabilities in the challenging areas of AML and Myelodysplastic Syndromes (MDS), we are expanding from AML outwards to encompass the growing range of blood cancers and conditions increasingly defined by their molecular signatures, utilizing the same reliable process of data extraction and logical application.
            </p>
            
            <p style={{
              fontSize: '1.05rem',
              lineHeight: '1.8',
              color: '#4a5568',
              marginBottom: '1.5rem'
            }}>
              Crucially, our platform connects sophisticated classifications and risk stratification directly to practical considerations like MRD monitoring guidance tailored to patient risk. Furthermore, our roadmap includes future capabilities to link these deep diagnostic insights with potential optimal treatment regimens based on the molecular profile and to facilitate clinical trial matching, identifying relevant studies for which a patient may be eligible based on their precise classification and extracted markers.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '1rem',
            padding: '2rem',
            borderLeft: '4px solid var(--primary-color)',
            fontStyle: 'italic'
          }}>
            <p style={{ 
              color: '#4a5568', 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              margin: 0
            }}>
              Ultimately, we aim to bridge the gap between complex diagnostics and effective, personalized patient care. By providing clinicians with transparent, up-to-date, comprehensive, and actionable intelligence – derived from AI-assisted data extraction feeding into robust, provable logic – we strive to revolutionize hematologic diagnostics and contribute to significantly improved outcomes for patients facing these challenging conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Expanded Panel Modal */}
      {expandedCard && expandedNode && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
          }}
          onClick={closeExpanded}
        >
          <div 
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 150, 136, 0.2)',
              borderRadius: '1rem',
              padding: '3rem',
              backdropFilter: 'blur(20px)',
              boxShadow: 'var(--box-shadow), 0 30px 60px rgba(0, 150, 136, 0.2)',
              overflow: 'auto',
              position: 'relative',
              color: 'var(--text-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeExpanded}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: '2px solid rgba(0, 150, 136, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'var(--primary-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'var(--transition)'
              }}
            >
              ×
            </button>

            {/* Content */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                {expandedNode.icon}
              </div>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, var(--primary-color), #4DB6AC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {expandedNode.title}
              </h2>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                color: '#4a5568',
                marginBottom: '2rem'
              }}>
                {expandedNode.details.fullDescription}
              </p>

              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: '600',
                color: 'var(--primary-color)',
                marginBottom: '1rem'
              }}>
                Key Capabilities
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                display: 'grid',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {expandedNode.details.capabilities.map((capability, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid rgba(0, 150, 136, 0.15)',
                    boxShadow: 'var(--box-shadow)'
                  }}>
                    <div style={{
                      minWidth: '24px',
                      height: '24px',
                      background: 'var(--primary-color)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      marginTop: '0.2rem',
                      color: 'white'
                    }}>
                      ✓
                    </div>
                    <span style={{ color: '#4a5568', lineHeight: '1.6' }}>
                      {capability}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{
                background: 'rgba(0, 150, 136, 0.08)',
                border: '1px solid rgba(0, 150, 136, 0.2)',
                borderRadius: 'var(--border-radius)',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ 
                  color: 'var(--primary-color)', 
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>Impact</h4>
                <p style={{ 
                  color: '#4a5568',
                  fontSize: '1.1rem',
                  margin: 0,
                  fontWeight: '500',
                  lineHeight: '1.6'
                }}>
                  {expandedNode.details.impact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(0.5deg); }
          50% { transform: translateY(-5px) rotate(-0.5deg); }
          75% { transform: translateY(-15px) rotate(0.3deg); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        @keyframes cardSparkleIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotateY(-90deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateY(0deg);
          }
        }

        @keyframes coreSparkleIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
} 