'use client';

import { useEffect, useState } from 'react';
import styles from '../version-control-of-medicine/article.module.css';

const navItems = [
  {
    id: 'problem',
    title: '1. The Genomic State-Space Problem',
    subsections: []
  },
  {
    id: 'architecture',
    title: '2. How Haem.io Works',
    subsections: []
  },
  {
    id: 'data-flow',
    title: '3. From Reports to Structured Features',
    subsections: []
  },
  {
    id: 'tp53-example',
    title: '4. Worked Example: Biallelic TP53 Case',
    subsections: [
      { id: 'input-reports', title: '4.1 Input Reports' },
      { id: 'structured-extraction', title: '4.2 Compact Structured Extraction' },
      { id: 'classifier-output', title: '4.3 IML Classifier Output' },
      { id: 'guardrail-outputs', title: '4.4 Guardrail Outputs' },
    ]
  },
  {
    id: 'iml',
    title: '5. Our Imandra IML Implementation',
    subsections: [
      { id: 'tribool', title: '5.1 Three-State Boolean' },
      { id: 'tp53-guardrail', title: '5.2 TP53 VUS Guardrail' },
      { id: 'age-consistency', title: '5.3 Age Consistency Check' },
      { id: 'down-syndrome', title: '5.4 Down Syndrome TAM' },
      { id: 'tp53-pathway', title: '5.5 TP53 Pathway Classification' },
      { id: 'totality', title: '5.6 Formal Theorem: Totality' },
      { id: 'low-blast', title: '5.7 Formal Theorem: Low-Blast Boundary' },
      { id: 'properties', title: '5.8 Properties We Prove' },
      { id: 'counterexamples', title: '5.9 Counterexample Generation' },
    ]
  },
  {
    id: 'parity',
    title: '6. Parity Strategy: Python-to-IML Migration',
    subsections: []
  },
  {
    id: 'telemetry',
    title: '7. Telemetry & Safety Rollout',
    subsections: []
  },
  {
    id: 'evidence',
    title: '8. Validation Evidence',
    subsections: []
  },
  {
    id: 'benefits',
    title: '9. How This Helps Haem.io',
    subsections: []
  },
  {
    id: 'limits',
    title: '10. What This Does Not Claim',
    subsections: []
  },
  {
    id: 'broader',
    title: '11. Where Else This Approach Works',
    subsections: []
  },
  {
    id: 'closing',
    title: '12. Closing Perspective',
    subsections: []
  },
  {
    id: 'references',
    title: 'References',
    subsections: []
  }
];

export default function SidebarNav() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id]');
      let current = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) current = section.id;
      });
      setActiveId(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarTitle}>Contents</div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeId === item.id ? styles.active : ''}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
            >
              {item.title}
            </a>
            {item.subsections.length > 0 && (
              <ul className={styles.navList}>
                {item.subsections.map((sub) => (
                  <li key={sub.id} className={styles.navSubItem}>
                    <a
                      href={`#${sub.id}`}
                      className={`${styles.navSubLink} ${activeId === sub.id ? styles.active : ''}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(sub.id); }}
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
