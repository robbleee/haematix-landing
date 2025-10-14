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
    </>
  );
}