'use client';

import { useEffect, useState } from 'react';
import styles from './article.module.css';

const navItems = [
  {
    id: 'headline-section',
    title: '1. The Headline Section',
    subsections: [
      { id: 'architecture-of-diagnosis', title: 'The Architecture of Diagnosis' }
    ]
  },
  {
    id: 'part-1',
    title: 'Part 1: The Morphological Framework vs. The Genomic Shift',
    subsections: [
      { id: 'morphology-legacy', title: '1.1 The Morphology Legacy' },
      { id: 'genomic-shift', title: '1.2 The Genomic Shift' },
      { id: 'divergence', title: '1.3 The Divergence: WHO 2022 vs. ICC 2022' }
    ]
  },
  {
    id: 'part-2',
    title: 'Part 2: The Logic of the NPM1 Case Study',
    subsections: [
      { id: 'clinical-parameters', title: '2.1 The Clinical Parameters' },
      { id: 'who-2016', title: '2.2 Execution Trace: WHO 2016' },
      { id: 'who-2022', title: '2.3 Execution Trace: WHO 2022' },
      { id: 'icc-2022', title: '2.4 Execution Trace: ICC 2022' },
      { id: 'logic-visualization', title: '2.5 The Logic Visualization' }
    ]
  },
  {
    id: 'part-3',
    title: 'Part 3: The Complexity Crisis and Cognitive Load',
    subsections: [
      { id: 'blue-book-algorithm', title: '3.1 The "Blue Book" as an Algorithm' },
      { id: 'cognitive-capacity', title: '3.2 The Limits of Cognitive Capacity' },
      { id: 'will-rogers', title: '3.3 The "Will Rogers Phenomenon"' }
    ]
  },
  {
    id: 'part-4',
    title: 'Part 4: The Solution: Guidelines as Executable Logic',
    subsections: [
      { id: 'executable-logic', title: '4.1 The Concept of Executable Logic' },
      { id: 'digital-twin', title: '4.2 The "Digital Twin" of the Guideline' },
      { id: 'version-control', title: '4.3 Handling Breaking Changes' }
    ]
  },
  {
    id: 'part-5',
    title: 'Part 5: Implications for Clinical Practice (ELN 2022)',
    subsections: [
      { id: 'flt3-change', title: '5.1 The FLT3-ITD Variable Change' },
      { id: 'mr-gene-expansion', title: '5.2 The MR-Gene List Expansion' },
      { id: 'nccn-connection', title: '5.3 Treatment Guidelines: The NCCN Connection' }
    ]
  },
  {
    id: 'part-6',
    title: 'Part 6: Conclusion - The Operating System for Haematology',
    subsections: []
  },
  {
    id: 'appendix',
    title: 'Appendix: Comparative Logic Tables',
    subsections: [
      { id: 'table-a', title: 'Table A: WHO 2022 vs. ICC 2022' },
      { id: 'table-b', title: 'Table B: ELN 2022 Risk Stratification' }
    ]
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
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
        }
      });

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for header and padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
        behavior: 'smooth'
      });
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

