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
              maxWidth: '900px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
                Diagnose All AML & MDS Subtypes<br />
                <span className="text-gradient" style={{ fontSize: '2.5rem' }}>in Minutes, Not Days</span>
              </h1>
              <p style={{ fontSize: '1.3rem', margin: '0 auto 1.5rem', lineHeight: '1.7', maxWidth: '48rem', color: '#4a5568', fontWeight: '400' }}>
                AI-powered platform integrating <strong>100+ genetic and clinical data points</strong> for WHO 2022 & ICC 2022 compliant diagnosis. Production Alpha version now deployed with NHS validation.
              </p>
              
              {/* Trust Badges */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#2e7d32',
                  border: '1px solid #c8e6c9'
                }}>
                  ✓ NHS Validated
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1976d2',
                  border: '1px solid #bbdefb'
                }}>
                  Production Alpha
                </div>
                <div style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#fff3e0',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#f57c00',
                  border: '1px solid #ffe0b2'
                }}>
                  UKCA Pending
                </div>
              </div>

              {/* Key Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1.5rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#009688', marginBottom: '0.25rem' }}>
                    All AML & MDS
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>Subtypes</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#009688', marginBottom: '0.25rem' }}>
                    100+
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>Data Points</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#009688', marginBottom: '0.25rem' }}>
                    4 NHS
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>Pilot Sites</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <a 
                  href="/contact" 
                  className="button"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backgroundColor: '#009688',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 150, 136, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 150, 136, 0.3)';
                  }}
                >
                  Request Demo
                </a>
                <a 
                  href="/data-room" 
                  className="button"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    backgroundColor: 'white',
                    color: '#009688',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    border: '2px solid #009688',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Investor Access
                </a>
              </div>
            </div>

            {/* Flow Diagram - Bottom */}
            <div className="flow-diagram-container" style={{
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

      {/* Social Proof Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 0',
        borderTop: '1px solid rgba(0, 150, 136, 0.1)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#00695c'
            }}>
              Trusted by Leading NHS Trusts
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              Validated through clinical partnerships and pilot programmes across the UK
            </p>
          </div>

          {/* NHS Partners */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                The Christie NHS
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Foundation Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                Royal Devon & Exeter
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>NHS Foundation Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                Manchester Foundation
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>NHS Trust</div>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                UK AML Research
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Network</div>
            </div>
          </div>

          {/* Key Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '12px',
              textAlign: 'center',
              border: '2px solid #c8e6c9'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem' }}>
                4 NHS
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                Pilot Sites
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Active clinical validation</div>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: '#e3f2fd',
              borderRadius: '12px',
              textAlign: 'center',
              border: '2px solid #bbdefb'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1976d2', marginBottom: '0.5rem' }}>
                £7M
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                Grant LOI
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Research funding secured</div>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: '#fff3e0',
              borderRadius: '12px',
              textAlign: 'center',
              border: '2px solid #ffe0b2'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f57c00', marginBottom: '0.5rem' }}>
                Production
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                Alpha Deployed
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Fully functional platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-only vertical flow diagram */}
      <section className="mobile-flow-section" style={{
        backgroundColor: '#f8fdfc',
        padding: '3rem 0',
        borderTop: '1px solid rgba(0, 150, 136, 0.2)'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#00695c'
          }}>How Haem.io Works</h2>
          
          <div className="mobile-flow-steps" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            
            {/* Step 1: Molecular Genetics */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%'
            }}>
                             <div style={{
                 background: 'linear-gradient(135deg, #009688 0%, #00796b 100%)',
                 borderRadius: '20px',
                 width: '80px',
                 height: '80px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 marginBottom: '1rem',
                 boxShadow: '0 6px 15px rgba(0, 150, 136, 0.3)'
               }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                   <path d="M2 17l10 5 10-5"></path>
                   <path d="M2 12l10 5 10-5"></path>
                 </svg>
               </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#00695c' }}>
                Molecular Genetics
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.4', fontSize: '0.9rem' }}>
                Analyze genetic mutations, cytogenetics, and molecular markers
              </p>
            </div>

            {/* Arrow Down */}
            <div style={{
              color: '#00796b',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              ↓
            </div>

            {/* Step 2: Diagnosis */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%'
            }}>
                             <div style={{
                 background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
                 borderRadius: '20px',
                 width: '80px',
                 height: '80px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 marginBottom: '1rem',
                 boxShadow: '0 6px 15px rgba(0, 121, 107, 0.3)'
               }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M9 12l2 2 4-4"></path>
                   <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.2 0 4.2.8 5.76 2.12"></path>
                 </svg>
               </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#00695c' }}>
                AI Diagnosis
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.4', fontSize: '0.9rem' }}>
                WHO 2022 & ICC 2022 compliant classification and risk stratification
              </p>
            </div>

            {/* Arrow Down */}
            <div style={{
              color: '#00796b',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              ↓
            </div>

            {/* Step 3: Treatment/Clinical Trials */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%'
            }}>
                             <div style={{
                 background: 'linear-gradient(135deg, #004d40 0%, #00251a 100%)',
                 borderRadius: '20px',
                 width: '80px',
                 height: '80px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 marginBottom: '1rem',
                 boxShadow: '0 6px 15px rgba(0, 77, 64, 0.3)'
               }}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                   <polyline points="14 2 14 8 20 8"></polyline>
                   <line x1="16" y1="13" x2="8" y2="13"></line>
                   <line x1="16" y1="17" x2="8" y2="17"></line>
                 </svg>
               </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#00695c' }}>
                Treatment Matching
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.4', fontSize: '0.9rem' }}>
                Personalized treatment recommendations and clinical trial matching
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        backgroundColor: 'white',
        padding: '5rem 0 3rem',
        position: 'relative',
        borderTop: '1px solid rgba(0, 150, 136, 0.1)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#009688'
            }}>Why Haem.io?</h2>

            <div style={{
              maxWidth: '800px',
              margin: '0 auto 2rem',
              padding: '2rem',
              backgroundColor: '#fff3e0',
              borderRadius: '12px',
              borderLeft: '4px solid #f57c00',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#f57c00' }}>
                The Problem
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#333', marginBottom: '0' }}>
                Current diagnostic processes take <strong>weeks</strong>, require multiple specialists, 
                and risk misclassification due to the complexity of integrating genetics, cytogenetics, 
                morphology, and flow cytometry data. Clinicians struggle to keep up with rapidly evolving 
                WHO 2022 and ICC 2022 classification guidelines.
              </p>
            </div>

            <div style={{
              maxWidth: '800px',
              margin: '0 auto 2rem',
              padding: '2rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '12px',
              borderLeft: '4px solid #2e7d32',
              textAlign: 'left'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#2e7d32' }}>
                Our Solution
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#333', marginBottom: '0' }}>
                Haem.io integrates <strong>all data sources</strong> for instant, accurate diagnosis. 
                Our AI-powered platform reduces diagnosis time from weeks to minutes, eliminates classification 
                errors with automated validation, and ensures compliance with the latest WHO 2022 & ICC 2022 guidelines.
              </p>
            </div>
          </div>

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
            margin: '0 auto 3.5rem',
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

      {/* Clinical Trial Matching Section */}
      <section className="clinical-trial-matching-section" style={{
        backgroundColor: '#f8fdfc',
        padding: '4rem 0',
        borderTop: '2px solid rgba(0, 150, 136, 0.2)'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#00695c',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>Clinical Trial Matching</h2>
            
            <p style={{
              fontSize: '1.15rem',
              color: '#37474f',
              lineHeight: '1.7',
              marginBottom: '0.5rem',
              fontWeight: '400'
            }}>
              Our AI-powered system analyzes patient genetic profiles and clinical characteristics to identify relevant blood cancer clinical trials, ensuring patients have access to cutting-edge treatments.
            </p>
          </div>

          {/* Horizontal Process Flow */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}>
            {/* Step 1 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #009688 0%, #00796b 100%)',
                borderRadius: '20px',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(0, 150, 136, 0.3)',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#00695c' }}>
                Data Analysis
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Extract genetic mutations, cytogenetic abnormalities, and molecular markers
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              color: '#00796b',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              →
            </div>

            {/* Step 2 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #00796b 0%, #004d40 100%)',
                borderRadius: '20px',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(0, 121, 107, 0.3)',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.2 0 4.2.8 5.76 2.12"></path>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#00695c' }}>
                AI Matching
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Match patient profiles against trial eligibility criteria using advanced algorithms
              </p>
            </div>

            {/* Arrow */}
            <div style={{
              color: '#00796b',
              fontSize: '2rem',
              fontWeight: 'bold'
            }}>
              →
            </div>

            {/* Step 3 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              textAlign: 'center'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #004d40 0%, #00251a 100%)',
                borderRadius: '20px',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 8px 20px rgba(0, 77, 64, 0.3)',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem', color: '#00695c' }}>
                Recommendations
              </h3>
              <p style={{ color: '#546e7a', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Provide ranked list of relevant trials with detailed eligibility assessment
              </p>
            </div>
          </div>

          {/* Matching Criteria - Vertical List Style */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '2.5rem',
              color: '#00695c'
            }}>
              Key Matching Criteria
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Genetic Mutations */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f8e9 50%, #ffffff 100%)',
                borderRadius: '15px',
                padding: '2rem',
                borderLeft: '6px solid #009688',
                boxShadow: '0 4px 15px rgba(0, 150, 136, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 150, 136, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    minWidth: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🧬</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#00695c', margin: '0 0 0.5rem 0' }}>
                      Genetic Mutations & Variants
                    </h4>
                    <p style={{ color: '#546e7a', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                      FLT3-ITD, NPM1, CEBPA mutations • TP53, IDH1/2, ASXL1 variants • Fusion genes (PML-RARA, BCR-ABL)
                    </p>
                  </div>
                </div>
              </div>

              {/* Biomarkers */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e8f5e8 50%, #ffffff 100%)',
                borderRadius: '15px',
                padding: '2rem',
                borderLeft: '6px solid #00796b',
                boxShadow: '0 4px 15px rgba(0, 121, 107, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 121, 107, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    minWidth: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🔬</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#00695c', margin: '0 0 0.5rem 0' }}>
                      Biomarkers & Immunophenotype
                    </h4>
                    <p style={{ color: '#546e7a', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                      Flow cytometry markers • Immunophenotype profiles • Protein expression levels • Surface antigens
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Data */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0f2f1 50%, #ffffff 100%)',
                borderRadius: '15px',
                padding: '2rem',
                borderLeft: '6px solid #004d40',
                boxShadow: '0 4px 15px rgba(0, 77, 64, 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: 'rgba(0, 77, 64, 0.15)',
                    borderRadius: '12px',
                    padding: '0.8rem',
                    minWidth: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>📊</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#00695c', margin: '0 0 0.5rem 0' }}>
                      Clinical Parameters
                    </h4>
                    <p style={{ color: '#546e7a', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                      Age, performance status • Prior treatment history • Comorbidities and contraindications • Disease stage
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        backgroundColor: '#f8f9fa',
        padding: '4rem 0',
        borderTop: '1px solid rgba(0, 150, 136, 0.1)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#00695c'
            }}>
              Platform Capabilities
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              Comprehensive coverage of haematologic malignancies with advanced diagnostic capabilities
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #009688',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                All 29 WHO
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                AML Subtypes
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                2,088 with essential qualifiers
              </div>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #009688',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                52 ICC
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                MDS Subtypes
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                3,744 with qualifiers
              </div>
            </div>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '2px solid #009688',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                100+
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.5rem' }}>
                Data Points
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                Genetic & clinical integration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Path Section */}
      <section style={{
        backgroundColor: '#f0fdf4',
        padding: '4rem 0',
        borderTop: '2px solid #009688',
        borderBottom: '2px solid #009688'
      }}>
        <div className="container">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#00695c'
            }}>
              For Investors
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#37474f',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              Join us in transforming haematology diagnostics. We're raising £750k seed round to reach UKCA certification and first NHS sales.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '2px solid #009688'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                  £750k
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                  Seed Round
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>18-month runway</div>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '2px solid #009688'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                  Q2 2027
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                  Series A Ready
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Post-UKCA certification</div>
              </div>
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '2px solid #009688'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#009688', marginBottom: '0.5rem' }}>
                  4 NHS
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#00695c', marginBottom: '0.25rem' }}>
                  Pilot Sites
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Clinical validation</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/data-room"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  backgroundColor: '#009688',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 150, 136, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 150, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 150, 136, 0.3)';
                }}
              >
                Access Data Room
              </a>
              <a 
                href="/investors"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: '#009688',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '2px solid #009688',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Pitch Deck
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}