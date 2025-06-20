'use client';

// Keep your original import
import InteractiveFlowDiagram from '../components/InteractiveFlowDiagram';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section with Flow Diagram */}
      <section className={styles.hero} style={{
        paddingTop: '6.5rem',
        paddingBottom: '3rem',
        backgroundColor: '#f8f9fa', // Source Background Color
        boxShadow: '0 4px 12px -6px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4.5rem'
          }}>
            {/* Hero Content - Top */}
            <div className={styles.heroContent} style={{
              width: '100%',
              maxWidth: '700px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                {/* Ensure .text-gradient class is defined in your CSS */}
                <span className="text-gradient">Haem.io</span>
              </h1>
              <p style={{ fontSize: '1.2rem', margin: '0 auto 1.5rem', lineHeight: '1.6', maxWidth: '42rem', color: '#4a5568' }}>
                AI-powered diagnostic system for precise classification of haematologic disorders according to WHO 2022 and ICC 2022 guidelines, enabling more accurate treatment decisions.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                {/* Add :hover styles in CSS */}

                {/* Link to document section */}
                <a 
                  href="#documentation" 
                  className="button" 
                  style={{
                    backgroundColor: 'var(--secondary-background-color)',
                    color: 'var(--text-color)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Flow Diagram - Bottom */}
            <div style={{
              width: '100%',
              maxWidth: '1000px', // Reduced from 1300px to 1000px
              margin: '0 auto',
              transform: 'scale(0.95)', // Reduced from 1.1 to 0.95
              transformOrigin: 'center top'
            }}>
              <InteractiveFlowDiagram />
              {/* Removed the redundant "View Detailed Flow Diagram" button */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        backgroundColor: 'white',
        padding: '5rem 0 3rem', // Keep reduced bottom padding
        position: 'relative',
        borderTop: '1px solid rgba(0, 150, 136, 0.1)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#009688'
          }}>Key Features</h2>

          <p style={{
            fontSize: '1.1rem',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto 3.5rem', // Space below subheading
            color: '#4a5568',
            lineHeight: '1.6'
          }}>
            Comprehensive diagnostic tools designed for haematology specialists with advanced classification systems.
          </p>

          {/* Consider adding card :hover styles in CSS (e.g., transform: translateY(-5px); box-shadow: ...;) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {/* Feature Card 1 */}
            <div className={styles.featureCard} style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              // Softer shadow
              boxShadow: '0 6px 15px rgba(0,0,0,0.07), 0 0 8px rgba(0, 150, 136, 0.08)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(0, 150, 136, 0.15)'
            }}>
              <div className={styles.featureIcon} style={{
                backgroundColor: 'rgba(0, 150, 136, 0.1)',
                borderRadius: '12px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.75rem', color: '#009688' }}>ICC/WHO Classifier</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>Accurately classify haematologic findings according to WHO 2022 criteria and ICC 2022 guidelines for precise diagnosis.</p>
            </div>

            {/* Feature Card 2 */}
            <div className={styles.featureCard} style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 6px 15px rgba(0,0,0,0.07), 0 0 8px rgba(0, 150, 136, 0.08)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(0, 150, 136, 0.15)'
            }}>
              <div className={styles.featureIcon} style={{
                backgroundColor: 'rgba(0, 150, 136, 0.1)',
                borderRadius: '12px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.75rem', color: '#009688' }}>ELN Risk Stratification</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>Automate European LeukemiaNet (ELN) risk stratification for AML, providing crucial prognostic information for treatment planning.</p>
            </div>

            {/* Feature Card 3 */}
            <div className={styles.featureCard} style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 6px 15px rgba(0,0,0,0.07), 0 0 8px rgba(0, 150, 136, 0.08)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(0, 150, 136, 0.15)'
            }}>
              <div className={styles.featureIcon} style={{
                backgroundColor: 'rgba(0, 150, 136, 0.1)',
                borderRadius: '12px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="8" y1="10" x2="16" y2="10"></line>
                  <line x1="8" y1="14" x2="12" y2="14"></line>
                  <line x1="8" y1="18" x2="12" y2="18"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '600', marginBottom: '0.75rem', color: '#009688' }}>IPSS Risk Stratifier</h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>Calculate International Prognostic Scoring System (IPSS) scores for MDS patients, helping determine risk levels and guide treatment decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disparity Analysis Section */}
      <section style={{
        backgroundColor: '#f8f9fa',
        padding: '4rem 0',
        borderTop: '1px solid rgba(0, 150, 136, 0.1)'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#009688'
            }}>Classification Analysis</h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#4a5568',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              Explore comprehensive disparity analysis between WHO 2022 and ICC 2022 classification systems, featuring detailed visualizations and clinical impact assessments across 204 test cases.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 150, 136, 0.15)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#009688', marginBottom: '0.5rem' }}>204</h3>
                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Total Test Cases</p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 150, 136, 0.15)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#f59e0b', marginBottom: '0.5rem' }}>83</h3>
                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Classification Differences</p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 150, 136, 0.15)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ef4444', marginBottom: '0.5rem' }}>42</h3>
                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>High Significance</p>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0, 150, 136, 0.15)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#8b5cf6', marginBottom: '0.5rem' }}>14</h3>
                <p style={{ fontSize: '0.9rem', color: '#4a5568' }}>Focus Areas</p>
              </div>
            </div>
            
            <a 
              href="/testing-stats" 
              className="button" 
              style={{
                backgroundColor: '#009688',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px rgba(0, 150, 136, 0.2)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#00796b';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 15px rgba(0, 150, 136, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#009688';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(0, 150, 136, 0.2)';
              }}
            >
              🚀 Explore Testing Suite & Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Document Access Section */}
      <div id="documentation" className="container" style={{
        marginTop: '3rem', // Keep space above
        marginBottom: '5rem', // Increased space below this section
        textAlign: 'center',
        padding: '0 1.5rem', // Horizontal padding only
        scrollMarginTop: '80px' // Adds margin to scroll position for fixed headers
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 150, 136, 0.08)',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '700px',
          margin: '0 auto', // Center the box
          border: '1px solid rgba(0, 150, 136, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#009688' }}>
            Transparency in Healthcare AI
          </h3>
          <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            We believe in transparency across all aspects of our AI-powered diagnostic tools. Access our documentation to understand the methodologies and processes that power our classification system.
          </p>
          <p style={{ color: '#607d8b', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem', fontStyle: 'italic' }}>
            Additional reference materials and technical documentation will be made available as we expand our resources.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/classifer_methodology.pdf"
              target="_blank"
              rel="noopener noreferrer"
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              Classification Methodology
            </a>
            <a
              href="/risk_methodology.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#00796b',
                color: 'white',
                padding: '0.7rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              Risk Stratification Methodology
            </a>
          </div>
        </div>
      </div>
    </>
  );
}