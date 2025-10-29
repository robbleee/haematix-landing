'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './demo.module.css';

export default function DemoPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Demo token from environment variable
  const DEMO_TOKEN = process.env.NEXT_PUBLIC_DEMO_TOKEN || 'haemio_investor_demo_2025_secure_key';
  const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL || 'https://haemio-demo-9496d49bba7c.herokuapp.com';

  // Sample report data - real test cases
  const sampleReports = [
    {
      name: "AML with Mutated NPM1",
      data: `Patient: 62-year-old male
Clinical History: Fatigue, recurrent infections, easy bruising for 3 weeks

Complete Blood Count:
WBC: 45.2 x10^9/L
Hemoglobin: 8.2 g/dL
Platelets: 42 x10^9/L
Blasts: 35% in peripheral blood

Bone Marrow Aspirate:
Cellularity: 90%
Blast percentage: 45%
Morphology: Blasts with monocytoid features, cup-like nuclear invaginations
Myeloperoxidase: Positive

Cytogenetics:
Karyotype: 46,XY[20] - Normal male karyotype

Molecular/NGS Results:
NPM1: Mutated (Type A insertion, VAF 42%)
FLT3-ITD: Negative
FLT3-TKD: Negative
DNMT3A: Mutated (R882H, VAF 38%)
IDH1/IDH2: Negative
TP53: Wild type
NRAS/KRAS: Negative

Flow Cytometry:
Blasts positive for: CD34 (partial 30%), CD33, CD117, HLA-DR, MPO
CD56: Positive (aberrant)`
    },
    {
      name: "MDS with Biallelic TP53 Inactivation",
      data: `Patient: 71-year-old female
Clinical History: Transfusion-dependent anemia, thrombocytopenia

Complete Blood Count:
WBC: 2.1 x10^9/L
Hemoglobin: 7.8 g/dL
Platelets: 18 x10^9/L
MCV: 102 fL

Bone Marrow Aspirate:
Cellularity: 60%
Blast percentage: 8%
Dysplasia: Marked trilineage dysplasia
Erythroid dysplasia: 45% - Nuclear irregularities, multinucleation
Myeloid dysplasia: 35% - Hypolobation, hypogranulation
Megakaryocyte dysplasia: 40% - Micromegakaryocytes, hypolobated nuclei

Cytogenetics:
Karyotype: 45,XX,-5,del(17)(p13),-7,+mar[15]/46,XX[5]
Complex karyotype present (4 abnormalities)

Molecular/NGS Results:
TP53: Two distinct mutations detected
  - c.817C>T (p.R273C), VAF 68%
  - c.524G>A (p.R175H), VAF 52%
ASXL1: Wild type
RUNX1: Wild type
SF3B1: Wild type

Additional Testing:
del(17p) confirmed by FISH: 78% of nuclei`
    },
    {
      name: "Therapy-Related AML",
      data: `Patient: 58-year-old male
Clinical History: History of Hodgkin lymphoma treated with ABVD chemotherapy 4 years ago. Now presents with pancytopenia and fatigue.

Previous Therapy: ABVD chemotherapy (Adriamycin, Bleomycin, Vinblastine, Dacarbazine) completed 4 years ago

Complete Blood Count:
WBC: 3.2 x10^9/L
Hemoglobin: 8.5 g/dL
Platelets: 35 x10^9/L
Blasts: 15% in peripheral blood

Bone Marrow Aspirate:
Cellularity: 85%
Blast percentage: 28%
Morphology: Myeloblasts with Auer rods present
Dysplastic features present in all lineages

Cytogenetics:
Karyotype: 46,XY,del(5q),-7,+8[18]/46,XY[2]

Molecular/NGS Results:
ASXL1: Mutated (G646Wfs*12, VAF 45%)
RUNX1: Mutated (R174Q, VAF 38%)
SRSF2: Mutated (P95H, VAF 42%)
TET2: Mutated (VAF 35%)
TP53: Wild type
NPM1: Wild type
FLT3-ITD: Negative

Flow Cytometry:
Blasts positive for: CD34, CD33, CD117, HLA-DR, CD13`
    },
    {
      name: "AML, NOS with Maturation",
      data: `Patient: 55-year-old female
Clinical History: New onset fatigue, fever, night sweats

Complete Blood Count:
WBC: 62.5 x10^9/L
Hemoglobin: 7.2 g/dL
Platelets: 28 x10^9/L
Blasts: 42% in peripheral blood

Bone Marrow Aspirate:
Cellularity: 95%
Blast percentage: 35%
Morphology: Myeloblasts with evidence of maturation to promyelocytes and myelocytes (18% of total cellularity)
Myeloperoxidase: Strongly positive
Auer rods: Present

Cytogenetics:
Karyotype: 46,XX[20] - Normal female karyotype

Molecular/NGS Results:
FLT3-ITD: Negative
NPM1: Wild type
CEBPA: Wild type (single allele, not bZIP domain)
RUNX1: Wild type
TP53: Wild type
IDH1: Wild type
IDH2: Wild type
ASXL1: Wild type
DNMT3A: Mutated (VAF 28%) - not MDS-defining

Flow Cytometry:
Blasts positive for: CD34, CD33, CD117, HLA-DR, CD13, MPO
Maturing myeloid elements present with normal maturation pattern
CD19/CD56: Negative`
    }
  ];

  const handleCopyReport = async (reportData) => {
    try {
      await navigator.clipboard.writeText(reportData);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 4000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('dataroom_password_correct');
    const ndaAccepted = sessionStorage.getItem('dataroom_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirect back to data room login
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
    <div className={styles.demoContainer}>
      <button 
        onClick={() => router.push('/data-room')}
        className={styles.backButton}
      >
        ← Back to Data Room
      </button>

      <div className={styles.demoContent}>
        {/* Copy Notification Toast */}
        {showCopyNotification && (
          <div className={styles.copyToast}>
            <div className={styles.toastIcon}>✓</div>
            <div className={styles.toastContent}>
              <div className={styles.toastTitle}>Report Copied!</div>
              <div className={styles.toastMessage}>Paste it into the text box in the demo below</div>
            </div>
          </div>
        )}

        {/* Unified Header with Sample Reports */}
        <div className={styles.demoHeader}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1>Live Platform Demo</h1>
              <p><strong>This is our live production platform</strong> — not a prototype. Our acute myeloid leukemia and myelodysplasia diagnostic tool uses genetics and laboratory reports to accurately diagnose across WHO's 29 baseline AML subtypes (2,088 with essential qualifiers) and ICC's 52 subtypes (3,744 with qualifiers).</p>
              <p className={styles.headerNote}>Click a sample report below to copy and paste into the demo, or use your own anonymized patient reports to see instant AI-powered diagnosis with full guideline derivations.</p>
            </div>
            <div className={styles.sampleReportsCompact}>
              <div className={styles.reportsLabel}>Sample Reports:</div>
              <div className={styles.reportsGrid}>
                {sampleReports.map((report, index) => (
                  <button
                    key={index}
                    onClick={() => handleCopyReport(report.data)}
                    className={styles.reportButton}
                  >
                    {report.name}
                    <svg 
                      className={styles.copyIcon}
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Demo */}
        <div className={styles.demoFrame}>
          <div className={styles.demoFrameHeader}>
            <div className={styles.demoFrameTitle}>
              <span className={styles.liveIndicator}></span>
              <span>Live Platform Demo</span>
            </div>
            <div className={styles.demoFrameInfo}>
              Production-grade | Anonymized Data | Secure
            </div>
          </div>
          
          <div className={styles.iframeContainer}>
            <iframe
              src={`${DEMO_URL}?token=${DEMO_TOKEN}&embed=true`}
              className={styles.demoIframe}
              title="Haem.io Interactive Demo"
              sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
              loading="lazy"
            />
            <div className={styles.iframeLoader}>
              <div className={styles.loader}></div>
              <p>Loading demo environment...</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

