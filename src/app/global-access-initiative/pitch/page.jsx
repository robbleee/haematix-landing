'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './pitch.module.css';
import Link from 'next/link';

export default function PartnershipPitchPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('lhs_password_correct');
    const ndaAccepted = sessionStorage.getItem('lhs_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirect back to global access initiative login
      router.push('/global-access-initiative');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.pitchContainer}>
      <Link href="/global-access-initiative" className={styles.backButton}>
        ← Back to Global Access Initiative
      </Link>

      <div className={styles.pitchContent}>
        <div className={styles.pitchHeader}>
          <h1>Partnership Proposal</h1>
          <h2>Haem.io Global Access Initiative</h2>
          <p className={styles.subtitle}>Love Hope Strength - Founding Partner</p>
        </div>

        <div className={styles.pitchSection}>
          <h3>Overview</h3>
          <p>
            The Haem.io Global Access Initiative aims to provide world-class AI-powered blood cancer diagnostics 
            to lower and middle-income countries, ensuring equitable access to life-saving diagnosis regardless 
            of geography or economic status.
          </p>
          <p>
            We propose establishing a Community Interest Company (CIC) under the Haem.io umbrella, with Love Hope 
            Strength as the Founding Partner. Your pioneering gift would be the catalyst for a permanent, scaling 
            platform that delivers cutting-edge diagnostics to the world's most underserved communities.
          </p>
        </div>

        <div className={styles.pitchSection}>
          <h3>Partnership Structure</h3>
          <div className={styles.structureGrid}>
            <div className={styles.structureCard}>
              <h4>Founding Partner Recognition</h4>
              <p>
                Love Hope Strength will be permanently recognized as the Founding Partner of the Haem.io Global 
                Access Initiative, with prominent acknowledgment in all materials, reports, and communications.
              </p>
            </div>
            <div className={styles.structureCard}>
              <h4>Governance & Board Representation</h4>
              <p>
                As Founding Partner, Love Hope Strength will have a full board seat on the Global Access Initiative 
                CIC, ensuring direct governance and strategic input into the initiative's direction and impact. 
                This provides meaningful, lasting involvement in shaping the legacy you're helping to create.
              </p>
            </div>
            <div className={styles.structureCard}>
              <h4>Legacy Elements</h4>
              <p>
                The initiative will include named elements honoring Love Hope Strength's contribution, including 
                the "Love Hope Strength Diagnostic Access Fund" and "Love Hope Strength Fellows" program for 
                subsidized diagnostics in LMEs.
              </p>
            </div>
            <div className={styles.structureCard}>
              <h4>Sustainable Model</h4>
              <p>
                The initiative will be sustained through a combination of founding partner contributions, 
                cross-subsidy from commercial Haem.io operations (1% of revenue commitment), and future grant 
                funding from global health organizations.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.pitchSection}>
          <h3>Impact Strategy</h3>
          <p>
            We're particularly excited about the opportunity to begin validation studies in regions where Love Hope 
            Strength has established relationships, including your hospital connections in Dar es Salaam, Tanzania. 
            This existing partnership foundation provides an ideal starting point for demonstrating the platform's 
            impact in a real-world LME setting.
          </p>
          <ul>
            <li><strong>Year 1-2:</strong> Validate platform in initial LME settings, including Dar es Salaam hospital partnership, establish relationships with additional LME hospitals/governments, build evidence base for impact</li>
            <li><strong>Year 3+:</strong> Scale through cross-subsidy model, attract additional global health funders, implement sliding scale pricing for LME hospitals</li>
            <li><strong>Long-term:</strong> Self-sustaining model that scales automatically with Haem.io's commercial success</li>
          </ul>
        </div>

        <div className={styles.pitchSection}>
          <h3>Why This Partnership Matters</h3>
          <p>
            Blood cancer diagnosis in LME countries faces critical challenges: limited specialist expertise, 
            lack of access to advanced diagnostic tools, and prohibitive costs. The Haem.io platform can 
            bridge this gap by providing AI-powered diagnostics that work with existing hospital infrastructure, 
            requiring no complex IT integration.
          </p>
          <p>
            Dr. Luke Carter-Brzezinski, our Clinical Co-Investigator, brings particular expertise in LME haematology with direct 
            clinical experience working in Cambodia. His hands-on experience in resource-constrained settings, 
            combined with Love Hope Strength's established hospital relationships in Dar es Salaam, creates a 
            powerful foundation for launching the Global Access Initiative in real-world LME contexts.
          </p>
        </div>

        <div className={styles.pitchSection}>
          <h3>Next Steps</h3>
          <p>
            We're excited to discuss how Love Hope Strength can create a lasting legacy through the Haem.io 
            Global Access Initiative. Your founding gift would establish a permanent fund that grows with our 
            commercial success, ensuring ongoing impact for years to come.
          </p>
          <div className={styles.contactBox}>
            <p><strong>Contact:</strong> <a href="mailto:robert.lee@haem.io">robert.lee@haem.io</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

