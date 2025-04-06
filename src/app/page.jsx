'use client';

import InteractiveFlowDiagram from '../components/InteractiveFlowDiagram';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section with Flow Diagram */}
      <section className={styles.hero} style={{ paddingTop: '6.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <div className={styles.heroContent} style={{ marginBottom: '0', paddingTop: '0.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              <span className="text-gradient">HematoDx</span>
            </h1>
            <p style={{ fontSize: '1.15rem', maxWidth: '42rem', margin: '0 auto 0.5rem' }}>
              Advanced hematology diagnosis tool using AI to classify findings according to 
              WHO 2022 and ICC 2022 standards.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
              <button className="button">Request Demo</button>
              <button className="button" style={{ backgroundColor: 'var(--secondary-background-color)', color: 'var(--text-color)' }}>
                Learn More
              </button>
            </div>
          </div>
          
          {/* Flow Diagram integrated with Hero */}
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '0', marginTop: '-0.5rem' }}>
            <InteractiveFlowDiagram />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        backgroundColor: '#008080', 
        padding: '4rem 0',
        position: 'relative'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: 'white' }}>Key Features</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className={styles.featureCard} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>IPSS/WHO Classifier</h3>
              <p>Accurately classify hematologic findings according to WHO 2022 criteria and IPSS guidelines for precise diagnosis.</p>
            </div>

            <div className={styles.featureCard} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 9.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5H17.5C18.6 3.5 19.5 4.4 19.5 5.5V9.5"></path>
                  <line x1="4.5" y1="14.5" x2="19.5" y2="14.5"></line>
                  <line x1="4.5" y1="19.5" x2="19.5" y2="19.5"></line>
                  <polyline points="6.5 9.5 12 4.5 17.5 9.5"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>ELN Risk Stratification</h3>
              <p>Automate European LeukemiaNet (ELN) risk stratification for AML, providing crucial prognostic information for treatment planning.</p>
            </div>

            <div className={styles.featureCard} style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#008080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18"></path>
                  <path d="M4 8h16"></path>
                  <path d="M4 16h16"></path>
                  <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>IPSS Risk Stratifier</h3>
              <p>Calculate International Prognostic Scoring System (IPSS) scores for MDS patients, helping determine risk levels and guide treatment decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className={styles.secondaryBg} style={{ padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Ready to Transform Your Diagnostic Workflow?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
            Join leading hematology centers already using HematoDx to streamline their diagnostic process.
          </p>
          <button className="button">Request Demo</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ backgroundColor: 'var(--background-color)', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Contact Us</h2>
          <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className={styles.formInput}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className={styles.formInput}
                  placeholder="Your email address"
                />
              </div>
              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className={styles.formInput}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="button" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
} 