'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../investors.module.css';

const investorPitchSlides = [
  {
    id: 'title',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.titleSlide}>
          <div className={styles.titleMain}>
            <h1 className={styles.companyName}>Haem.io</h1>
            <p className={styles.tagline}>Intelligent Diagnostics for Precision Haematology</p>
            <div className={styles.seedBadge}>Investor Deck | £750,000 Seed Round</div>
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
              <h4>Overwhelmed Clinician</h4>
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
        <div className={styles.productProofLayout}>
          <div className={styles.productTraceFrame}>
            <img src="/screenshots/icc-tp53-execution-path.png" alt="ICC 2022 AML diagnostic execution path" />
          </div>

          <div className={styles.productProofNotes}>
            <div className={styles.proofStatus}>
              <div className={styles.proofKicker}>Current status</div>
              <h3>Production beta with 10 haematologists</h3>
              <p>AML and MDS classifiers are built and being tested before formal NHS pilot validation.</p>
            </div>
            <div className={styles.proofChecklist}>
              <h4>What investors need to see</h4>
              <ul>
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
    id: 'expansion',
    title: 'Haematology Is Just The Start',
    subtitle: 'Genomics-based diagnosis starts in blood cancers, then expands across oncology',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.genomicsExpansionLayout}>
          <div className={styles.genomicsLead}>
            <span className={styles.proofKicker}>Platform thesis</span>
            <h3>The same problem is coming for every genomics-driven cancer pathway.</h3>
            <p>
              Haematology is the first wedge because it is diagnostically complex today. Diagnosis in haematology and oncology is built around international standards, so the platform can scale globally without being rebuilt market by market.
            </p>
          </div>

          <div className={styles.genomicsPath}>
            <div className={styles.genomicsStep}>
              <span>01</span>
              <h4>Haematology</h4>
              <p>AML and MDS in production beta with 10 haematologists.</p>
            </div>
            <div className={styles.genomicsStep}>
              <span>02</span>
              <h4>Lung cancer</h4>
              <p>Prototype already built for the next genomics-led diagnostic pathway.</p>
            </div>
            <div className={styles.genomicsStep}>
              <span>03</span>
              <h4>Other cancers</h4>
              <p>Extend the same structured reasoning layer across solid tumours.</p>
            </div>
            <div className={styles.genomicsStep}>
              <span>04</span>
              <h4>Beyond oncology</h4>
              <p>Longer-term potential wherever complex biomarkers meet clinical guidelines.</p>
            </div>
          </div>

          <div className={styles.genomicsFooter}>
            Haem.io is not a single blood cancer tool. It is the decision layer for molecular medicine, and with appropriate governance the structured genomic insight layer becomes a valuable data asset.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'market',
    title: 'Business Model + Market',
    subtitle: 'Bottom-up NHS wedge, downstream insight layer, oncology expansion upside',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.marketModelLayout}>
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
            <div className={styles.competitorNote}>
              <strong>Competitive position:</strong>
              <span> morphology and lab AI companies solve the upstream automation problem. Their outputs still need a downstream reasoning layer to become diagnosis, risk, trial matching, and hospital-ready insight.</span>
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
                <div style={{ fontSize: '2.6rem', fontWeight: '800', color: 'var(--primary-color)', lineHeight: 1 }}>£30B</div>
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
    id: 'investor-fit',
    title: 'Why This Wins',
    subtitle: 'Enabling technology for data-driven, efficient specialist care',
    content: (
      <div className={styles.slideContent}>
        <div className={styles.investorFitLayout}>
          <div className={styles.investorFitLead}>
            <div className={styles.investorFitKicker}>Investment thesis</div>
            <h3>Clinical AI that turns fragmented data into action.</h3>
            <p>
              Haem.io sits at the intersection of medtech software, health data infrastructure, and specialist clinical decision support.
            </p>
            <div className={styles.investorFitNote}>
              <strong>Core wedge:</strong>
              <span> haematology diagnosis, where genomic complexity has outgrown manual workflow.</span>
            </div>
            <div className={styles.investorFitChecklist}>
              <span>Global standards architecture</span>
              <span>Clinician-in-the-loop AI</span>
              <span>Genomic insight layer</span>
            </div>
          </div>

          <div className={styles.investorFitCards}>
            {[
              ['Enabling technology', 'AI extraction plus formal diagnostic logic can sit above existing lab and hospital systems.'],
              ['Data-driven insight', 'Structured genomic and outcome data can generate insight for hospitals, research, and pharma over time.'],
              ['Workflow efficiency', 'Reduces manual synthesis for specialist clinicians and supports local NHS decision-making.'],
              ['Global scaling', 'International diagnostic standards let the same platform expand across haematology, oncology, and other diseases.'],
            ].map(([heading, text]) => (
              <div key={heading} className={styles.investorFitCard}>
                <h4>{heading}</h4>
                <p>{text}</p>
              </div>
            ))}
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
                <p>Computer science and financial technology background, with experience at Coinbase, LSEG, and FlexTrade. Works across product development, software, regulatory planning, and research coordination.</p>
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
              Haem.io is in the process of spinning out of Manchester University NHS Foundation Trust, with clinical logic co-developed directly with specialist NHS haematologists.
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
                  <span>Dr John Burthem, part-time CMO</span>
                  <span className={styles.runwayAmount}>£45k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Commercial/Sales Lead</span>
                  <span className={styles.runwayAmount}>£60k</span>
                </div>
                <div className={styles.runwayItem}>
                  <span>Dr Luke Carter-Brzezinski, part-time Clinical Director</span>
                  <span className={styles.runwayAmount}>£45k</span>
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

          <div className={styles.seriesAUnlock}>
            <p>
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

export default function SeedPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const deckRef = useRef(null);
  const printViewRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % investorPitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + investorPitchSlides.length) % investorPitchSlides.length);
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
        filename: 'Haemio-Investor-Pitch.pdf',
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
        setCurrentSlide(investorPitchSlides.length - 1);
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

  const slide = investorPitchSlides[currentSlide];

  return (
    <div className={`${styles.pitchDeck} ${styles.shortPitchDeck} ${styles.classicPitchDeck}`} ref={deckRef}>
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
        <div
          key={currentSlide}
          className={styles.slide}
          data-slide-label={`${currentSlide + 1}/${investorPitchSlides.length}`}
        >
          <div className="container">
            {(slide.title || slide.subtitle) && (
              <div className={styles.slideHeader}>
                {slide.title && <h1>{slide.title}</h1>}
                {slide.subtitle && <p className={styles.slideSubtitle}>{slide.subtitle}</p>}
              </div>
            )}
            {slide.content}
          </div>
        </div>
      </div>

      <div className={styles.printView} ref={printViewRef}>
        {investorPitchSlides.map((slideData, index) => (
          <div
            key={slideData.id || index}
            className={styles.slide}
            data-slide-label={`${index + 1}/${investorPitchSlides.length}`}
          >
            <div className="container">
              {(slideData.title || slideData.subtitle) && (
                <div className={styles.slideHeader}>
                  {slideData.title && <h1>{slideData.title}</h1>}
                  {slideData.subtitle && <p className={styles.slideSubtitle}>{slideData.subtitle}</p>}
                </div>
              )}
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
            {investorPitchSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className={styles.navButton} disabled={currentSlide === investorPitchSlides.length - 1}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
