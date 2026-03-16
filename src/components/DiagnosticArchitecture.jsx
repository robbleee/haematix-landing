'use client';

import React from 'react';
import styles from './DiagnosticArchitecture.module.css';

const architectureData = [
  {
    id: 'input',
    title: 'Extract',
    shortDesc: 'Pull key findings from reports into a clean structured profile.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M21 5c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      </svg>
    )
  },
  {
    id: 'classify',
    title: 'Classify',
    shortDesc: 'Apply WHO, ICC, and ELN logic to produce a traceable result.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
        <path d="M8.5 8.5v.01"></path>
        <path d="M16 15.5v.01"></path>
        <path d="M12 12v.01"></path>
      </svg>
    ),
  },
  {
    id: 'act',
    title: 'Act',
    shortDesc: 'Support next-step decisions with diagnosis, risk, and rationale.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

const DiagnosticArchitecture = () => {
  return (
    <div className={styles.container}>
      <div className={styles.architectureWrapper}>
        <h2 className={styles.title}>How Haem.io Works</h2>
        <p className={styles.subtitle}>A simple three-step diagnostic workflow.</p>
        
        <div className={styles.flowScrollWrapper}>
          <div className={styles.flowContainer}>
            {architectureData.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className={styles.card}>
                  <div className={styles.iconContainer}>
                    {stage.icon}
                  </div>
                  <h3 className={styles.cardTitle}>{stage.title}</h3>
                  <p className={styles.cardDescription}>{stage.shortDesc}</p>
                </div>

                {index < architectureData.length - 1 && (
                  <div className={styles.arrow}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticArchitecture;
