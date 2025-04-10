'use client';

import InteractiveFlowDiagram from '../components/InteractiveFlowDiagram';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section with Flow Diagram */}
      <section className={styles.hero} style={{ paddingTop: '6.5rem', paddingBottom: '3rem', backgroundColor: 'white' }}>
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
                <span className="text-gradient">HaematoAx</span>
              </h1>
              <p style={{ fontSize: '1.2rem', margin: '0 auto 1.5rem', lineHeight: '1.6', maxWidth: '42rem' }}>
                AI-powered diagnostic system for precise classification of hematologic disorders according to WHO 2022 and ICC 2022 guidelines, enabling more accurate treatment decisions.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <button className="button">Request Demo</button>
                <button className="button" style={{ backgroundColor: 'var(--secondary-background-color)', color: 'var(--text-color)' }}>
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Flow Diagram - Bottom */}
            <div style={{ 
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <InteractiveFlowDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        backgroundColor: 'white',
        padding: '5rem 0 6rem',
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
            margin: '0 auto 3.5rem', 
            color: '#4a5568',
            lineHeight: '1.6'
          }}>
            Comprehensive diagnostic tools designed for hematology specialists with advanced classification systems
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <div className={styles.featureCard} style={{ 
              backgroundColor: 'white', 
              borderRadius: '1rem', 
              padding: '2rem', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.08), 0 0 15px rgba(0, 150, 136, 0.1)',
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
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>Accurately classify hematologic findings according to WHO 2022 criteria and ICC 2022 guidelines for precise diagnosis.</p>
            </div>

            <div className={styles.featureCard} style={{ 
              backgroundColor: 'white', 
              borderRadius: '1rem', 
              padding: '2rem', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.08), 0 0 15px rgba(0, 150, 136, 0.1)',
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

            <div className={styles.featureCard} style={{ 
              backgroundColor: 'white', 
              borderRadius: '1rem', 
              padding: '2rem', 
              boxShadow: '0 8px 25px rgba(0,0,0,0.08), 0 0 15px rgba(0, 150, 136, 0.1)',
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

      {/* Methodology PDF Download Section */}
      <div className="container" style={{ marginTop: '3rem', textAlign: 'center', padding: '1.5rem' }}>
        <div style={{ 
          backgroundColor: 'rgba(0, 150, 136, 0.08)', 
          borderRadius: '1rem', 
          padding: '2rem', 
          maxWidth: '700px', 
          margin: '0 auto',
          border: '1px solid rgba(0, 150, 136, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#009688' }}>
            Classifier Methodology Documentation
          </h3>
          <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Learn more about the technical details and methodology behind our classification system in the detailed documentation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
              View Methodology PDF
            </a>
            <a 
              href="/classifer_methodology.pdf" 
              download="HaematoAx_Classifier_Methodology.pdf"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" style={{ 
        backgroundColor: '#009688', 
        padding: '5rem 0 6rem',
        position: 'relative',
        color: 'white',
        background: 'linear-gradient(135deg, #00a896 0%, #006b63 100%)',
      }}>
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          opacity: 0.15,
          pointerEvents: 'none'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '10%', 
            right: '15%', 
            width: '350px', 
            height: '350px', 
            borderRadius: '50%',
            background: 'white',
            filter: 'blur(80px)'
          }}></div>
          <div style={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '15%', 
            width: '250px', 
            height: '250px', 
            borderRadius: '50%',
            background: 'white',
            filter: 'blur(60px)'
          }}></div>
        </div>

        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '3.5rem', 
            color: 'white',
            position: 'relative',
            zIndex: 1
          }}>Contact Us</h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
            position: 'relative',
            zIndex: 1,
            flexWrap: 'wrap'
          }}>
            {/* Left Column - Text Content */}
            <div style={{
              flex: '1',
              minWidth: '300px',
              padding: '1rem'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '600', 
                marginBottom: '1.5rem', 
                color: 'white' 
              }}>Transform Your Diagnostic Workflow</h3>
              
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1.5rem', 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: '1.7'
              }}>
                HaematoAx offers cutting-edge AI solutions that enhance precision and efficiency in hematological diagnostics.
              </p>
              
              <div style={{
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: '500' }}>+1 (800) 555-8765</p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: '500' }}>contact@HaematoAx.com</p>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: '500' }}>100 Medical Plaza, Boston, MA 02115</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div style={{
              flex: '1',
              minWidth: '300px'
            }}>
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2.5rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                border: 'none'
              }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="name" style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#333333',
                      fontWeight: '500'
                    }}>Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #dddddd',
                        backgroundColor: '#f9f9f9',
                        color: '#333333',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#333333',
                      fontWeight: '500'
                    }}>Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #dddddd',
                        backgroundColor: '#f9f9f9',
                        color: '#333333',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: '#333333',
                      fontWeight: '500'
                    }}>Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #dddddd',
                        backgroundColor: '#f9f9f9',
                        color: '#333333',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        resize: 'vertical'
                      }}
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    style={{ 
                      backgroundColor: '#009688', 
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.85rem 1.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginTop: '0.5rem'
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 