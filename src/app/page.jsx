'use client';

import InteractiveFlowDiagram from '../components/InteractiveFlowDiagram';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              <span className="text-gradient">HematoDx</span>
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
              Advanced hematology diagnosis tool using AI to classify findings according to 
              WHO 2022 and ICC 2022 standards.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="button">Request Demo</button>
              <button className="button" style={{ backgroundColor: 'var(--secondary-background-color)', color: 'var(--text-color)' }}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Diagram Section */}
      <section style={{ backgroundColor: 'var(--secondary-background-color)', padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
            Diagnostic Workflow
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            Our AI-powered system processes complex hematological data into accurate classifications.
            Click on any step to learn more about the process.
          </p>
          
          <InteractiveFlowDiagram />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ backgroundColor: 'var(--background-color)', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>Key Features</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data Extraction</h3>
              <p>Extract relevant data from unstructured molecular, cytogenetic, and clinical reports with high accuracy.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dual Pathway Logic</h3>
              <p>Simultaneously classify findings according to both WHO 2022 and ICC 2022 standards for comprehensive diagnosis.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Risk Stratification</h3>
              <p>Automate ELN risk stratification for AML and IPSS for MDS, providing crucial prognostic information.</p>
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