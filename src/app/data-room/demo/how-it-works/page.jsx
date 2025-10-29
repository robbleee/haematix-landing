'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './how-it-works.module.css';

export default function HowItWorksPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('dataroom_password_correct');
    const ndaAccepted = sessionStorage.getItem('dataroom_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/data-room');
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
    <div className={styles.howItWorksContainer}>
      <Link href="/data-room/demo" className={styles.backButton}>
        ← Back to Demo
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1>How AML/MDS Diagnosis Works</h1>
          <p className={styles.subtitle}>Understanding the diagnostic inputs and pathways our platform uses to provide accurate WHO 2022 and ICC 2022 classifications</p>
        </div>

        <div className={styles.introSection}>
          <p>Diagnosing acute myeloid leukemia (AML) and myelodysplastic syndromes (MDS) is a complex process requiring integration of multiple data sources. Our AI platform processes these inputs and applies the intricate logic defined in WHO 2022 and ICC 2022 classification schemes to deliver precise diagnoses.</p>
        </div>

        <div className={styles.diagnosticFlowSection}>
          <h2>The Diagnostic Process</h2>
          
          <div className={styles.flowDiagram}>
            <div className={styles.inputsColumn}>
              <h3>Diagnostic Inputs</h3>
              
              <div className={styles.inputCard}>
                <div className={styles.inputIcon}>🧬</div>
                <h4>Molecular/Genetic Testing</h4>
                <p className={styles.inputDescription}>
                  <strong>40+ gene mutations analyzed</strong> including NPM1, FLT3, TP53, RUNX1, CEBPA, ASXL1, SF3B1, IDH1/2, and more.
                </p>
                <div className={styles.exampleBox}>
                  <strong>Why it matters:</strong> A single NPM1 mutation in the absence of adverse cytogenetics defines "AML with mutated NPM1" — a distinct entity with better prognosis. Biallelic TP53 mutations completely change MDS classification and treatment approach.
                </div>
              </div>

              <div className={styles.inputCard}>
                <div className={styles.inputIcon}>🔬</div>
                <h4>Cytogenetics</h4>
                <p className={styles.inputDescription}>
                  <strong>Chromosomal abnormalities</strong> including translocations, inversions, deletions, and complex karyotypes.
                </p>
                <div className={styles.exampleBox}>
                  <strong>Why it matters:</strong> t(8;21), inv(16), and t(15;17) define specific AML subtypes with unique treatments. Complex karyotypes (≥3 abnormalities) indicate poor prognosis and change management entirely.
                </div>
              </div>

              <div className={styles.inputCard}>
                <div className={styles.inputIcon}>📊</div>
                <h4>Flow Cytometry</h4>
                <p className={styles.inputDescription}>
                  <strong>Immunophenotyping</strong> showing blast percentages, lineage markers, and aberrant antigen expression.
                </p>
                <div className={styles.exampleBox}>
                  <strong>Why it matters:</strong> CD34+/HLA-DR- pattern suggests APL. Aberrant CD56 or CD7 expression indicates specific subtypes. Flow cytometry confirms blast lineage (myeloid vs lymphoid) and maturation stage.
                </div>
              </div>

              <div className={styles.inputCard}>
                <div className={styles.inputIcon}>🩸</div>
                <h4>Laboratory Values</h4>
                <p className={styles.inputDescription}>
                  <strong>Complete blood counts</strong> including WBC, hemoglobin, platelets, blast percentages in blood and bone marrow.
                </p>
                <div className={styles.exampleBox}>
                  <strong>Why it matters:</strong> ≥20% blasts defines AML (vs MDS). Blast percentage determines MDS-IB1 vs MDS-IB2. Cytopenias indicate bone marrow failure severity.
                </div>
              </div>

              <div className={styles.inputCard}>
                <div className={styles.inputIcon}>📋</div>
                <h4>Clinical History</h4>
                <p className={styles.inputDescription}>
                  <strong>Patient history</strong> including prior chemotherapy, radiation, previous MDS, exposure history.
                </p>
                <div className={styles.exampleBox}>
                  <strong>Why it matters:</strong> Prior cytotoxic therapy changes classification to "therapy-related myeloid neoplasm" regardless of genetic profile. Previous MDS affects classification and prognosis.
                </div>
              </div>
            </div>

            <div className={styles.arrowColumn}>
              <div className={styles.arrow}>→</div>
            </div>

            <div className={styles.processColumn}>
              <h3>AI Processing & Logic Engine</h3>
              
              <div className={styles.processCard}>
                <h4>Step 1: Data Extraction</h4>
                <p>Our AI extracts structured data from unstructured lab reports — identifying gene mutations, cytogenetic findings, immunophenotype, and clinical values with high accuracy.</p>
              </div>

              <div className={styles.processCard}>
                <h4>Step 2: Classification Logic</h4>
                <p>Deterministic logic engine applies WHO 2022 and ICC 2022 classification rules. The system evaluates hundreds of conditional pathways to determine the correct diagnosis.</p>
              </div>

              <div className={styles.processCard}>
                <h4>Step 3: Multi-guideline Analysis</h4>
                <p>Simultaneous classification under both WHO 2022 (29 baseline AML subtypes) and ICC 2022 (52 subtypes), accounting for essential qualifiers (2,088 and 3,744 total permutations).</p>
              </div>

              <div className={styles.processCard}>
                <h4>Step 4: Risk Stratification</h4>
                <p>Integration of molecular and cytogenetic findings to provide ELN 2022 risk categories (favorable, intermediate, adverse) that guide treatment decisions.</p>
              </div>
            </div>

            <div className={styles.arrowColumn}>
              <div className={styles.arrow}>→</div>
            </div>

            <div className={styles.outputColumn}>
              <h3>Diagnostic Output</h3>
              
              <div className={styles.outputCard}>
                <h4>Complete Classification</h4>
                <ul>
                  <li>WHO 2022 diagnosis with full qualifier chain</li>
                  <li>ICC 2022 diagnosis with essential qualifiers</li>
                  <li>ELN 2022 risk category</li>
                  <li>Complete guideline derivations</li>
                </ul>
              </div>

              <div className={styles.outputCard}>
                <h4>Clinical Insights</h4>
                <ul>
                  <li>Prognostic implications</li>
                  <li>Treatment considerations</li>
                  <li>Key genetic drivers</li>
                  <li>Classification confidence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.whyItMattersSection}>
          <h2>Why This Integration Matters</h2>
          
          <div className={styles.mattersGrid}>
            <div className={styles.matterCard}>
              <div className={styles.matterNumber}>1</div>
              <h4>Classification Complexity</h4>
              <p>AML/MDS diagnosis isn't a simple lookup table. WHO 2022 and ICC 2022 contain hundreds of conditional rules. For example, the presence of t(8;21) takes precedence over NPM1 mutation, but both are superseded by prior MDS history.</p>
            </div>

            <div className={styles.matterCard}>
              <div className={styles.matterNumber}>2</div>
              <h4>No Single Test Suffices</h4>
              <p>A cytogenetic finding without molecular data might miss a critical mutation. Molecular testing without clinical history might overlook therapy-related disease. Our platform ensures all relevant factors are considered.</p>
            </div>

            <div className={styles.matterCard}>
              <div className={styles.matterNumber}>3</div>
              <h4>Treatment Impact</h4>
              <p>Misclassification can mean inappropriate therapy. APL requires ATRA immediately. Favorable-risk AML might avoid stem cell transplant. Adverse-risk MDS needs different approaches. Accuracy is critical.</p>
            </div>

            <div className={styles.matterCard}>
              <div className={styles.matterNumber}>4</div>
              <h4>Prognostic Precision</h4>
              <p>Risk stratification guides treatment intensity. The difference between "AML with mutated NPM1" and "AML, NOS" fundamentally changes prognosis and management decisions.</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomCta}>
          <p>Ready to see it in action?</p>
          <Link href="/data-room/demo" className={styles.tryDemoButton}>
            Try the Live Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}

