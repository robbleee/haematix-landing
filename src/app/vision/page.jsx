'use client';

import Link from 'next/link';
import styles from '../page.module.css';

export default function VisionPage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section style={{
        paddingTop: '6rem',
        paddingBottom: '3rem',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 4px 12px -6px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '900px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#009688' }}>
                Our Vision
              </h1>
              <p style={{ fontSize: '1.2rem', margin: '0 auto 1.5rem', lineHeight: '1.6', maxWidth: '42rem', color: '#4a5568' }}>
                Advancing Precision Hematology Through AI-Driven Insights
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
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
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Content Section */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: 'white',
      }}>
        <div className="container" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* First paragraph */}
            <div style={{
              lineHeight: '1.8',
              color: '#4a5568',
              fontSize: '1.05rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Our vision centers on empowering clinicians on the front lines of diagnosing and managing blood cancers and related hematologic disorders through an essential, continuously evolving diagnostic intelligence platform. We understand the immense complexity clinicians face, particularly with aggressive and nuanced diseases like Acute Myeloid Leukemia (AML), where rapid, accurate decisions are critical. Our goal is to equip these specialists with tools that master this complexity and turn extracted data into actionable intelligence.
              </p>
            </div>

            {/* Second paragraph */}
            <div style={{
              lineHeight: '1.8',
              color: '#4a5568',
              fontSize: '1.05rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Hematology is constantly advancing; our platform thrives on this evolution. It leverages AI primarily for accurate and efficient extraction of key fields from complex genetic, cytogenetic, differentiation, and clinical reports. We take responsibility for embedding validated knowledge from the latest genetic insights and classification standards (from bodies like WHO, ICC, and ELN) into our system's core functional logic. This commitment ensures clinicians can reliably apply complex, up-to-date sub-classifications and guidelines without needing to manually track every change.
              </p>
            </div>

            {/* Key Points Box */}
            <div style={{
              backgroundColor: 'rgba(0, 150, 136, 0.08)',
              borderRadius: '1rem',
              padding: '2rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              border: '1px solid rgba(0, 150, 136, 0.2)'
            }}>
              <h3 style={{ color: '#009688', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '600' }}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span>Actionable intelligence linking diagnostics to treatment options and clinical trials</span>
                </li>
              </ul>
            </div>

            {/* Third paragraph */}
            <div style={{
              lineHeight: '1.8',
              color: '#4a5568',
              fontSize: '1.05rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Applying these extracted key data points within our provable, guideline-driven logic, our system enables the fastest, most accurate sub-classifications and risk profiles possible. This clarity, grounded in verifiable data inputs and established criteria, is fundamental to understanding the unique nature of each patient's disease.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Furthermore, our system is built on a foundation of complete transparency. We believe trust is paramount. Because our classification and risk stratification are driven by functional, provable logic operating on clearly defined data inputs, we publish this logic and, for every result, generate detailed derivation metrics. This allows users to see exactly how a specific classification or risk score was arrived at from the extracted data, step-by-step, ensuring clinicians can critically evaluate the outputs and confidently integrate them into their decision-making process.
              </p>
            </div>

            {/* Fourth paragraph */}
            <div style={{
              lineHeight: '1.8',
              color: '#4a5568',
              fontSize: '1.05rem'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Having proven our system's capabilities in the challenging areas of AML and Myelodysplastic Syndromes (MDS), we are expanding from AML outwards to encompass the growing range of blood cancers and conditions increasingly defined by their molecular signatures, utilizing the same reliable process of data extraction and logical application.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Crucially, our platform connects sophisticated classifications and risk stratification directly to practical considerations like MRD monitoring guidance tailored to patient risk. Furthermore, our roadmap includes future capabilities to link these deep diagnostic insights with potential optimal treatment regimens based on the molecular profile and to facilitate clinical trial matching, identifying relevant studies for which a patient may be eligible based on their precise classification and extracted markers.
              </p>
            </div>

            {/* Final paragraph - vision statement */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '1rem',
              padding: '2rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              borderLeft: '4px solid #009688',
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

            {/* Back to home link */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '2rem' 
            }}>
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
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 