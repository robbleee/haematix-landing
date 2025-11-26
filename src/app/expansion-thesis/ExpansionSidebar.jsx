'use client';

import { useState, useEffect } from 'react';
import styles from '../articles/version-control-of-medicine/article.module.css'; // Reusing existing styles

const navItems = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    subsections: []
  },
  {
    id: 'section-1-the-molecular-tsunami--redefining-the-taxonomy-of-thoracic-malignancies',
    title: 'Section 1: The Molecular Tsunami',
    subsections: [
      { id: '11-the-death-of-large-cell-carcinoma-a-case-study-in-market-expansion', title: '1.1 The Death of "Large Cell Carcinoma"' },
      { id: '12-the-nsclc-nos-problem-and-the-tissue-stewardship-crisis', title: '1.2 The "NSCLC-NOS" Problem' },
      { id: '13-molecular-subtypes-the-fragmentation-of-adenocarcinoma', title: '1.3 Molecular Subtypes' }
    ]
  },
  {
    id: 'section-2-the-cns-paradigm-shift--the-molecular-redefinition-of-glioblastoma',
    title: 'Section 2: The CNS Paradigm Shift',
    subsections: [
      { id: '21-the-schism-idh-mutant-vs-idh-wildtype', title: '2.1 The Schism: IDH-Mutant vs. Wildtype' },
      { id: '22-the-rise-of-molecular-glioblastoma-grade-4-by-decree', title: '2.2 The Rise of "Molecular Glioblastoma"' },
      { id: '23-cdkn2ab-and-the-grading-of-idh-mutant-tumors', title: '2.3 CDKN2A/B and Grading' },
      { id: '24-diagnostic-drift-in-cns-and-data-normalization', title: '2.4 Diagnostic Drift in CNS' }
    ]
  },
  {
    id: 'section-3-the-operational-bottleneck--the-crisis-of-the-molecular-tumor-board',
    title: 'Section 3: The Operational Bottleneck',
    subsections: [
      { id: '31-the-time-tax-of-precision-medicine', title: '3.1 The "Time Tax" of Precision Medicine' },
      { id: '32-the-financial-toxicity-of-the-tumor-board', title: '3.2 The Financial Toxicity' },
      { id: '33-the-cognitive-limit-matching-clinical-trials', title: '3.3 The Cognitive Limit' }
    ]
  },
  {
    id: 'section-4-the-digital-infrastructure-landscape--validating-the-solution',
    title: 'Section 4: The Digital Infrastructure',
    subsections: [
      { id: '41-the-vendor-ecosystem', title: '4.1 The Vendor Ecosystem' },
      { id: '42-buying-centers-and-market-adoption', title: '4.2 Buying Centers and Adoption' }
    ]
  },
  {
    id: 'section-5-economic-implications-and-roi',
    title: 'Section 5: Economic Implications',
    subsections: [
      { id: '51-the-return-on-precision', title: '5.1 The Return on Precision' },
      { id: '52-reimbursement-and-diagnostic-drift', title: '5.2 Reimbursement and Drift' },
      { id: '53-integrated-diagnostics-the-final-frontier', title: '5.3 Integrated Diagnostics' }
    ]
  },
  {
    id: 'section-6-conclusion',
    title: 'Section 6: Conclusion',
    subsections: []
  },
  {
    id: 'appendix-key-data-tables',
    title: 'Appendix: Key Data Tables',
    subsections: []
  }
];

export default function ExpansionSidebar() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const headers = navItems.flatMap(item => [
        item.id,
        ...(item.subsections || []).map(sub => sub.id)
      ]);
      
      let current = '';
      
      // Find the current section
      for (const id of headers) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If element is in the top third of the screen
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      
      if (current) {
        setActiveId(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check once on mount after a slight delay to allow rendering
    setTimeout(handleScroll, 1000);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.sidebar} style={{ top: '100px' }}>
      <div className={styles.sidebarTitle} style={{ color: '#009688' }}>Contents</div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a
              href={`#${item.id}`}
              className={`${styles.navLink} ${activeId === item.id ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.title}
            </a>
            {item.subsections && item.subsections.length > 0 && (
              <ul className={styles.navList}>
                {item.subsections.map((sub) => (
                  <li key={sub.id} className={styles.navSubItem}>
                    <a
                      href={`#${sub.id}`}
                      className={`${styles.navSubLink} ${activeId === sub.id ? styles.active : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(sub.id);
                      }}
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

