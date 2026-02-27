'use client';

import Link from 'next/link';
import DiagnosticArchitecture from '../components/DiagnosticArchitecture';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} style={{
        paddingTop: '6rem',
        paddingBottom: '4rem',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3.5rem'
          }}>
            {/* Hero Content */}
            <div className={styles.heroContent} style={{
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center'
            }}>
              <h1 className={styles.heroTitle} style={{ 
                fontSize: '3.5rem', 
                fontWeight: '800', 
                marginBottom: '1.5rem',
                letterSpacing: '-0.02em',
                color: '#1a202c'
              }}>
                <span style={{ color: '#009688' }}>Haem.io</span>
              </h1>
              <p className={styles.heroSubtitle} style={{ 
                fontSize: '1.35rem', 
                margin: '0 auto 2rem', 
                lineHeight: '1.6', 
                maxWidth: '48rem', 
                color: '#4a5568',
                fontWeight: '400'
              }}>
                Building the end-to-end diagnostic architecture for the complexities of genomic-based haematology.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <Link href="/full-flow" style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: '#009688',
                  border: '1px solid #009688',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }} className="secondary-button">
                  View Full System Logic
                </Link>
              </div>
            </div>

            {/* Diagnostic Architecture Diagram */}
            <div style={{
              width: '100%',
              marginTop: '1rem'
            }}>
              <DiagnosticArchitecture />
            </div>
          </div>
        </div>
      </section>

      {/* Complexity Context Section */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '5rem 0 4.5rem',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          <div style={{ margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.15rem',
              fontWeight: '700',
              color: '#009688',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'
            }}>
              The Complexity Crisis in Genomic Diagnosis
            </h2>
            <p style={{
              fontSize: '1.12rem',
              lineHeight: '1.9',
              color: '#334155',
              marginBottom: '1.5rem'
            }}>
              With genomic-era diagnosis, myeloid disease classification is no longer a small checklist.
              It is a high-dimensional state space of genetic findings, cytogenetics, blast patterns,
              prior-treatment context, and clinical qualifiers, all evaluated through increasingly complex
              guideline logic. In practice, this can produce hundreds of thousands of possible pathway
              combinations before arriving at a final subtype label.
            </p>
            <p style={{
              fontSize: '1.12rem',
              lineHeight: '1.9',
              color: '#334155',
              marginBottom: '1.5rem'
            }}>
              More broadly, this is becoming a system-wide challenge across oncology as diagnostic practice
              shifts from morphology-first classification toward genomics-first classification.
            </p>
            <p style={{
              fontSize: '1.12rem',
              lineHeight: '1.9',
              color: '#334155',
              margin: 0
            }}>
              Expecting clinicians to execute that full combinatorial logic by hand, repeatedly and
              consistently, is not realistic. We need algorithmic execution for reliability, and formal
              verification layers so those algorithms can be checked for drift, contradiction, and internal
              coherence as they run in the real world. Diagnosticians in the west — and increasingly in
              LMICs — are expected to do this hundreds of times per year, and these diagnoses are clinically
              critical. It can be the difference between being put on a chemotherapy regimen or not.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection} style={{
        backgroundColor: 'white',
        padding: '6rem 0',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '1rem'
            }}>Core Capabilities</h2>
            <p style={{
              fontSize: '1.15rem',
              color: '#718096',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Designed for the future of genomic-based diagnostics.
            </p>
          </div>

          <div className={styles.featuresGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Feature 1 */}
            <div className={styles.featureCard} style={{
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#e6fffa',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#009688'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Dual Classification
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Simultaneous evaluation against both WHO 2022 and ICC 2022 guidelines ensures comprehensive diagnostic coverage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard} style={{
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#e6fffa',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#009688'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Risk Stratification
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Automated calculation of ELN 2022 (AML) and IPSS-M/R (MDS) risk scores for immediate prognostic insight.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard} style={{
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              background: 'white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#e6fffa',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: '#009688'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1rem', color: '#1a202c' }}>
                Transparent Logic
              </h3>
              <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
                Every diagnostic decision is traceable to specific evidence and guideline criteria. No black boxes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
