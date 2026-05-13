'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../investors.module.css';

const shortPitchSlides = [
  {
    id: 'title',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.titleSlide}>
          <div className={styles.titleMain}>
            <h1 className={styles.companyName}>Haem.io</h1>
            <p className={styles.tagline}>Intelligent Diagnostics for Precision Haematology</p>
            <div className={styles.seedBadge}>3-Minute Investor Pitch | £750,000 Seed Round</div>
          </div>
          <div className={styles.clinicalBackground}>
            <div className={styles.backgroundPattern}></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'problem',
    title: 'The Problem',
    subtitle: 'Haematology diagnosis is too slow and too complex',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.humanCostLayout}>
          <div className={styles.costStats}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>Days to Weeks</div>
              <div className={styles.statLabel}>Current diagnosis time</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Blood cancer subtypes</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>60+</div>
              <div className={styles.statLabel}>Genetic markers to integrate</div>
            </div>
          </div>

          <div className={styles.diagnosticFlow}>
            <div className={styles.flowPanel}>
              <h4>Unstructured Data</h4>
              <p>Genetics, cytogenetics, flow cytometry, morphology, and clinical context arrive in fragmented formats.</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.diagnostician}>
              <h4>Manual Synthesis</h4>
              <p>Clinicians spend hours extracting facts before diagnostic reasoning can even begin.</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowPanel}>
              <h4>Complex Guidelines</h4>
              <p>WHO 2022 and ICC 2022 contain hundreds of interconnected pathways that are hard to apply consistently.</p>
            </div>
          </div>

          <div className={styles.bottomStatement}>
            This is not just workflow friction. In acute blood cancers, time changes outcomes.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'solution',
    title: 'The Solution',
    subtitle: 'AI extraction plus formal diagnostic logic',
    content: (
      <div className={styles.slideContent}>
        <h3>
          Haem.io turns unstructured lab reports into explainable classification, risk stratification,
          guideline-aligned decision support, and clinical trial matching in minutes.
        </h3>

        <div className={styles.horizontalFlow}>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>1</span>
            <span>Upload unstructured lab report</span>
          </div>
          <div className={styles.hFlowArrow}>→</div>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>2</span>
            <span>AI extracts clinical facts</span>
          </div>
          <div className={styles.hFlowArrow}>→</div>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>3</span>
            <span>Logic engine applies WHO + ICC</span>
          </div>
          <div className={styles.hFlowArrow}>→</div>
          <div className={styles.hFlowStep}>
            <span className={styles.miniNum}>4</span>
            <span>Traceable decision support</span>
          </div>
        </div>

        <div className={styles.transformResult} style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)', maxWidth: '460px', margin: '0 auto 2rem' }}>
          ~2 minutes · Explainable · Clinically auditable
        </div>

        <div className={styles.workflowInsight}>
          <div className={styles.timeComparison}>
            <div className={styles.beforeAfter}>
              <div className={styles.beforeTime}>
                <div className={styles.beforeLabel}>Before</div>
                <div className={styles.beforeValue}>Hours to Weeks</div>
                <div className={styles.beforeDescription}>Manual diagnosis process</div>
              </div>
              <div className={styles.comparisonArrow}>→</div>
              <div className={styles.afterTime}>
                <div className={styles.afterLabel}>With Haem.io</div>
                <div className={styles.afterValue}>~2 Minutes</div>
                <div className={styles.afterDescription}>Clinician-in-the-loop decision support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'product',
    title: 'Product Proof',
    subtitle: 'Production beta, simplified workflow, auditable output',
    content: (
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '1.5rem', alignItems: 'stretch', marginTop: '0.25rem' }}>
          <div className={styles.demoCard} style={{ padding: '1rem' }}>
            <img src="/screenshots/classif-results.png" alt="Classification results" style={{ width: '100%', height: '455px', objectFit: 'contain', objectPosition: 'top' }} />
          </div>

          <div style={{ display: 'grid', gap: '1rem', alignContent: 'start' }}>
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '16px', padding: '1.2rem', border: '2px solid var(--primary-color)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary-color)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.45rem' }}>Current status</div>
              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.35rem', lineHeight: 1.12 }}>Production beta with 10 haematologists</h3>
              <p style={{ color: '#475569', lineHeight: 1.45, margin: '0.7rem 0 0' }}>AML and MDS classifiers are built and being tested before formal NHS pilot validation.</p>
            </div>
            <div style={{ background: 'white', borderRadius: '14px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.8rem', color: '#0f172a' }}>What investors need to see</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', lineHeight: 1.55, display: 'grid', gap: '0.75rem' }}>
                <li><strong>AI extraction:</strong> unstructured reports become clean clinical and molecular facts.</li>
                <li><strong>Formal logic:</strong> WHO 2022 and ICC 2022 pathways are applied consistently.</li>
                <li><strong>Full trace:</strong> every output can be reviewed by the clinician.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'traction',
    title: 'Early Traction',
    subtitle: 'Beta testing, clinical support, and pharma interest',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.advantageGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '2px solid var(--primary-color)' }}>
            <div className={styles.pointNumber} style={{ background: 'var(--primary-color)' }}>1</div>
            <h4>Production Beta</h4>
            <p>AML and MDS classifiers are built and currently in beta testing with 10 haematologists.</p>
          </div>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className={styles.pointNumber}>2</div>
            <h4>Clinical Support</h4>
            <p>Letters of support from consultant haematologists at The Christie, Royal Devon, Blackpool, and the UK AML Research Network.</p>
          </div>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className={styles.pointNumber}>3</div>
            <h4>Pharma Pull</h4>
            <p>Pfizer, Servier, Jazz, and J&J in active discussions for roughly £210k in non-dilutive grant funding.</p>
          </div>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className={styles.pointNumber}>4</div>
            <h4>Global Standards</h4>
            <p>Built on WHO 2022 and ICC 2022, so the same diagnostic logic works internationally.</p>
          </div>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className={styles.pointNumber}>5</div>
            <h4>No Integration Drag</h4>
            <p>Works from PDFs, scanned documents, text files, and existing report formats.</p>
          </div>
          <div className={styles.advantagePoint} style={{ padding: '2rem', borderRadius: '20px', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div className={styles.pointNumber}>6</div>
            <h4>Defensible Expertise</h4>
            <p>Clinical diagnostic logic codified with specialist haematology input, not a generic AI wrapper.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'market',
    title: 'Business Model + Market',
    subtitle: 'Bottom-up NHS wedge, oncology expansion upside',
    content: (
      <div className={styles.slideContent}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', marginTop: '0.75rem' }}>
          <div>
            <h3 style={{ margin: '0 0 1rem', color: '#0f172a' }}>Annual SaaS licensing</h3>
            <div className={styles.pricingCards}>
              <div className={styles.priceCard}>
                <h4>NHS Trusts</h4>
                <p>£50k-£100k/year</p>
              </div>
              <div className={styles.priceCard}>
                <h4>Private Hospitals</h4>
                <p>£75k-£150k/year</p>
              </div>
              <div className={styles.priceCard}>
                <h4>Diagnostic Labs</h4>
                <p>£100k-£200k/year</p>
              </div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '1.35rem', borderLeft: '4px solid var(--primary-color)', marginTop: '1.5rem' }}>
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.55 }}>
                NHS trusts already outsource complex cases at significant cost. Haem.io turns that spend into faster local specialist-grade decision support.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '18px', padding: '1.75rem', border: '2px solid var(--primary-color)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Why haematology first</div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>Hardest diagnostic edge case in oncology</h3>
              <p style={{ color: '#475569', lineHeight: 1.55 }}>Hundreds of subtypes, dozens of mutations, and dual international guidelines make blood cancers the right first market.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2.6rem', fontWeight: '800', color: 'var(--primary-color)', lineHeight: 1 }}>1.2M</div>
                <div style={{ color: '#475569', fontWeight: '600' }}>blood cancer diagnoses / year globally</div>
              </div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '2.6rem', fontWeight: '800', color: '#1d4ed8', lineHeight: 1 }}>£30B</div>
                <div style={{ color: '#475569', fontWeight: '600' }}>AI medical diagnostics market by 2034</div>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '14px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              <strong>Expansion path:</strong>
              <span style={{ color: '#64748b' }}> AML/MDS → other blood cancers → genomics-driven solid tumours.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'validation',
    title: 'Clinical Validation',
    subtitle: 'Endorsed by leading NHS haematologists',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.validationLayout}>
          <div className={styles.quoteGrid}>
            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "Haem.io has the potential to transform diagnosis and decision making for patients with haematological malignancies across the NHS."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Prof Charles Craddock CBE</strong>
                <span>Chair, UK AML Research Network</span>
              </div>
            </div>
            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "Haem.io has the potential to revolutionise the quality of care that patients receive."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr John Chadwick</strong>
                <span>The Christie NHS Foundation Trust</span>
              </div>
            </div>
            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "A real step forward in what technology can offer in supporting clinicians to make accurate clinical diagnoses."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr Tom Coats</strong>
                <span>Royal Devon & Exeter NHS Trust</span>
              </div>
            </div>
            <div className={styles.quoteCard}>
              <div className={styles.quoteText}>
                "I would wholeheartedly recommend this platform. This will be of significant use for clinicians in the front line."
              </div>
              <div className={styles.quoteAttribution}>
                <strong>Dr P A Cahalin</strong>
                <span>Blackpool Teaching Hospitals NHS Trust</span>
              </div>
            </div>
          </div>
          <div className={styles.validationFooter}>
            <span>4 Letters of Support</span>
            <span>•</span>
            <span>Letter of Intent for Pilot Study</span>
            <span>•</span>
            <span>3 NHS Trusts in pipeline</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'team',
    title: 'The Team',
    subtitle: 'Founder-market fit across AI, haematology, and NHS diagnostics',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.teamLayout}>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/robbie.png" alt="Robert Lee" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Robert Lee</h3>
                <h4>CEO & Co-Founder</h4>
                <p>BSc Computer Science, Manchester. Cancer survivor and former Coinbase, LSEG, and FlexTrade engineer. Leads software, regulatory pathway, and research coordination.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/danny.png" alt="Dr. Daniel Clarke" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Daniel Clarke</h3>
                <h4>CTO & Co-Founder</h4>
                <p>PhD Physics, University of Manchester and CERN. Former UK Civil Service statistician. Leads cloud architecture, AI strategy, and secure data systems.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/john.png" alt="Dr. John Burthem" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. John Burthem</h3>
                <h4>Chief Medical Officer & Co-Founder</h4>
                <p>FRCP, FRCPath. Senior NHS consultant at Manchester Foundation Trust and lead of a regional diagnostic service for haematological malignancies.</p>
              </div>
            </div>

            <div className={styles.teamMember}>
              <div className={styles.memberPhoto}>
                <img src="/profile-pics/luke.png" alt="Dr. Luke Carter-Brzezinski" />
              </div>
              <div className={styles.memberInfo}>
                <h3>Dr. Luke Carter-Brzezinski</h3>
                <h4>Clinical Director & Co-Founder</h4>
                <p>Consultant Haematologist at MFT's Regional Diagnostic Service. Leads clinical outreach, validation strategy, and real-world workflow feedback.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.25rem', padding: '0.85rem 1.5rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>
              Clinical logic co-developed directly with specialist NHS haematologists and translated into auditable software.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'ask',
    title: 'The Ask',
    subtitle: '£750k seed round. 18 months to Series A.',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.runwayLayout}>
          <div className={styles.runwayTotal}>
            <div className={styles.totalAmount}>£750,000</div>
            <p className={styles.totalLabel}>Seed Investment | 18-Month Runway</p>
          </div>

          <div className={styles.runwayBreakdown}>
            <div className={styles.runwaySection}>
              <h4>Team</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>CEO & Lead Engineer</span>
                  <span className={styles.runwayAmount}>£165k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Compliance Officer</span>
                  <span className={styles.runwayAmount}>£105k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Clinical Validation Lead</span>
                  <span className={styles.runwayAmount}>£90k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Commercial/Sales Lead</span>
                  <span className={styles.runwayAmount}>£60k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£420k</div>
            </div>

            <div className={styles.runwaySection}>
              <h4>Regulatory & Pilots</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Class I registration & compliance</span>
                  <span className={styles.runwayAmount}>£40k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>4 NHS pilot studies</span>
                  <span className={styles.runwayAmount}>£80k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£120k</div>
            </div>

            <div className={styles.runwaySection}>
              <h4>Operations</h4>
              <div className={styles.runwayItems}>
                <div className={styles.runwayItem}>
                  <span>Cloud, AI compute, legal, insurance</span>
                  <span className={styles.runwayAmount}>£90k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Contingency buffer</span>
                  <span className={styles.runwayAmount}>£120k</span>
                </div>
              </div>
              <div className={styles.sectionTotal}>£210k</div>
            </div>
          </div>

          <div className={styles.milestoneTimeline}>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 1-6</div>
              <div className={styles.milestoneText}>Complete Class I registration. Launch first 2 NHS pilot studies.</div>
            </div>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 6-12</div>
              <div className={styles.milestoneText}>Complete pilot validations. First paying customers.</div>
            </div>
            <div className={styles.milestoneItem}>
              <div className={styles.milestoneTime}>Months 12-18</div>
              <div className={styles.milestoneText}>5+ NHS trust contracts. Series A ready.</div>
            </div>
          </div>

          <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1rem 1.5rem', marginTop: '1rem', border: '1px solid #bbf7d0', textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '1.02rem', color: '#334155', lineHeight: 1.45 }}>
              <strong>Series A unlock:</strong> regulatory registration + NHS validation + first paid contracts = a repeatable commercial platform for haematology and genomic oncology.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'cta',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.ctaSlide}>
          <h1 className={styles.companyName} style={{ fontSize: '4rem' }}>Haem.io</h1>
          <p className={styles.ctaTagline}>
            Precision diagnostics for every haematologist, everywhere.<br />
            Built by clinicians. Powered by AI. Explainable by design.
          </p>
          <div style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem' }}>
            Global standards. Production beta. Ready for NHS validation.
          </div>
          <div className={styles.ctaBadge}>
            Raising £750,000 to transform haematology diagnosis
          </div>
          <div className={styles.ctaContact}>
            <span>robert.lee@haem.io</span>
            <span>haem.io</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ThreeMinutePitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deckRef = useRef(null);
  const printViewRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shortPitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shortPitchSlides.length) % shortPitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: [0.5, 0.5],
        filename: 'Haemio-Three-Minute-Pitch.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'landscape',
          compress: true,
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(opt).from(printViewRef.current).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please use your browser Print to PDF instead.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const enterFullscreen = async () => {
    const target = deckRef.current || document.documentElement;

    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        await target.webkitRequestFullscreen();
      }

      setIsCleanMode(true);
    } catch (error) {
      console.error('Fullscreen request failed:', error);
      alert('Fullscreen mode was blocked by the browser. Try using your browser presentation/fullscreen shortcut instead.');
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCleanMode(false);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        enterFullscreen();
      } else if (e.key === 'p' || e.key === 'P' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsCleanMode((value) => !value);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(shortPitchSlides.length - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(Boolean(fullscreenElement));

      if (!fullscreenElement) {
        setIsCleanMode(false);
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
    };
  }, []);

  const slide = shortPitchSlides[currentSlide];

  return (
    <div className={`${styles.pitchDeck} ${styles.shortPitchDeck}`} ref={deckRef}>
      {!isCleanMode && (
        <>
          <a href="/investors" className={styles.backButton}>← Full deck</a>
          <button
            type="button"
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className={`${styles.deckActionButton} ${styles.downloadPitchButton}`}
          >
            {isGeneratingPDF ? 'Creating PDF...' : 'Download PDF'}
          </button>
          <button
            type="button"
            onClick={enterFullscreen}
            disabled={isFullscreen}
            className={`${styles.deckActionButton} ${styles.fullscreenPitchButton}`}
            aria-label="Open the 3-minute pitch in fullscreen presentation mode"
            title="Open fullscreen presentation mode"
          >
            {isFullscreen ? 'Fullscreen on' : 'Present fullscreen'}
          </button>
        </>
      )}

      <div className={styles.screenView}>
        <div key={currentSlide} className={styles.slide}>
          <div className="container">
            <div className={styles.slideHeader}>
              <h1>{slide.title}</h1>
              <p className={styles.slideSubtitle}>{slide.subtitle}</p>
            </div>
            {slide.content}
          </div>
        </div>
      </div>

      <div className={styles.printView} ref={printViewRef}>
        {shortPitchSlides.map((slideData, index) => (
          <div key={slideData.id || index} className={styles.slide}>
            <div className="container">
              <div className={styles.slideHeader}>
                <h1>{slideData.title}</h1>
                <p className={styles.slideSubtitle}>{slideData.subtitle}</p>
              </div>
              {slideData.content}
            </div>
          </div>
        ))}
      </div>

      {!isCleanMode && (
        <div className={styles.navigation}>
          <button onClick={prevSlide} className={styles.navButton} disabled={currentSlide === 0}>
            ← Previous
          </button>
          <div className={styles.slideIndicators}>
            {shortPitchSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className={styles.navButton} disabled={currentSlide === shortPitchSlides.length - 1}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
