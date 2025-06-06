'use client';

import { useState, useEffect } from 'react';
import styles from './pitch.module.css';

const pitchSlides = [
  {
    id: 1,
    title: "The Diagnostic Pathway Crisis",
    subtitle: "Complex Guidelines Meet Unstructured Data",
    content: (
      <div className={styles.slideContent}>
        <h3>Diagnosticians Face an Impossible Challenge</h3>
        
        <div className={styles.diagnosticFlow}>
          <div className={styles.flowPanel}>
            <h4>Unstructured Data Chaos</h4>
            <p>Critical genetic markers buried in dense, inconsistent laboratory reports. Cytogenetics, flow cytometry, and molecular data exist in different formats with no standardization.</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.diagnostician}>
            <h4>Overwhelmed Diagnostician</h4>
            <p>Clinicians spend hours manually extracting parameters before any diagnostic logic can begin</p>
          </div>
          
          <div className={styles.flowArrow}>→</div>
          
          <div className={styles.flowPanel}>
            <h4>Pathway Complexity Explosion</h4>
            <p>WHO 2022 and ICC 2022 guidelines contain hundreds of interconnected diagnostic pathways with precise criteria. Too complex for consistent human application.</p>
          </div>
        </div>
        
        <div className={styles.flowInsight}>
          The diagnostic intelligence exists — but it's trapped in unstructured formats while pathways become impossibly complex
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Formal Logic Meets Intelligent Extraction",
    subtitle: "Structured Diagnostic Pathways + AI-Powered Data Liberation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.pathway}>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>AI Extraction</h4>
              <p>LLM identifies and extracts genetic parameters from unstructured reports</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>Formal Logic Engine</h4>
              <p>Structured diagnostic pathways apply WHO/ICC criteria with mathematical precision</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>AI Review</h4>
              <p>Post-diagnostic validation and pathway adherence verification</p>
            </div>
          </div>
        </div>

        <div className={styles.breakthrough}>
          <div className={styles.breakthroughItem}>
            <h4>Pathway Formalization</h4>
            <p>Complex diagnostic guidelines converted into testable, maintainable logic trees</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Data Liberation</h4>
            <p>AI extracts structured genetic parameters from any report format</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Logic Validation</h4>
            <p>Every diagnostic pathway is formally tested and validated against real-world cases</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Perfect Market Convergence",
    subtitle: "Riding the Wave: Multi-Billion Dollar Market Transformation",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.marketLayout}>
          <div className={styles.marketLeft}>
            <div className={styles.marketForces}>
              <div className={styles.force}>
                <h4>Global AI in Diagnostics</h4>
                <p>$1.92B → $46.59B by 2034 (37.6% CAGR) - explosive growth in AI-powered diagnostic interpretation</p>
              </div>
              <div className={styles.force}>
                <h4>Clinical Decision Support Systems</h4>
                <p>$5.79B → $10.71B by 2030 (11.0% CAGR) - mature, stable foundation for diagnostic assistance</p>
              </div>
              <div className={styles.force}>
                <h4>NHS AI Transformation</h4>
                <p>£500M+ in AI contracts, £123M across 86 technologies, targeting 29M GP appointments annually</p>
              </div>
            </div>
          </div>
          
          <div className={styles.marketRight}>
            <div className={styles.marketOpportunity}>
              <div className={styles.marketValue}>$164B</div>
              <h4>AI in Healthcare Market by 2030</h4>
              <p>49.1% CAGR growth driven by chronic disease management, diagnostic accuracy demands, and productivity gains worth $14-55B annually.</p>
              <div className={styles.marketSupport}>
                <div className={styles.supportItem}>
                  <span>Global AI Healthcare: $14.92B → $164.16B (2030)</span>
                  <small><a href="https://www.globenewswire.com/news-release/2025/01/14/3009462/28124/en/164-Bn-Artificial-Intelligence-AI-in-Healthcare-Markets-Global-Forecast-to-2030-Market-to-Grow-at-a-CAGR-of-49-1-with-Koninklijke-Philips-Microsoft-Siemens-NVIDIA-and-Epic-Systems-.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a></small>
                </div>
                <div className={styles.supportItem}>
                  <span>AI Diagnostics: $1.92B → $46.59B (2034)</span>
                  <small><a href="https://www.globenewswire.com/news-release/2025/05/29/3090079/0/en/46-5-Bn-AI-in-Medical-Diagnostics-Market-Opportunities-and-Strategies-to-2034-Machine-Learning-and-Computer-Vision-Set-to-Transform-AI-Diagnostics-Landscape.html" target="_blank" rel="noopener noreferrer">GlobeNewswire, 2025</a></small>
                </div>
                <div className={styles.supportItem}>
                  <span>UK CDSS: £361.9M → £634.9M (2030)</span>
                  <small><a href="https://www.grandviewresearch.com/horizon/outlook/clinical-decision-support-systems-market/uk" target="_blank" rel="noopener noreferrer">Grand View Research, 2025</a></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Unmatched Technical Architecture",
    subtitle: "Formal Logic + AI Integration = Diagnostic Leadership",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.heroFeature}>
          <div className={styles.mainAdvantage}>
            <h3>Formal Logic Mastery</h3>
            <p>We bring algorithmic trading precision to diagnostic pathway formalization—building complex, testable logic systems that know rather than guess.</p>
          </div>
          
          <div className={styles.supportingPoints}>
            <div className={styles.supportPoint}>
              <h4>Clinical Integration</h4>
              <p>Deep haematology partnerships ensure formalized pathways reflect real-world complexity</p>
            </div>
            <div className={styles.supportPoint}>
              <h4>Systematic Validation</h4>
              <p>Every pathway is formally tested, version-controlled, and validated against case libraries</p>
            </div>
          </div>
        </div>
        
        <div className={styles.architectureInsight}>
          We're not building AI that guesses—we're building formal logic systems that know, with AI that extracts and validates.
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Effortless Clinical Integration",
    subtitle: "Designed for Junior Clinicians, Trusted by Experts",
    content: (
      <div className={styles.slideContent}>
        <h3>Zero Learning Curve, Maximum Confidence</h3>
        
        <div className={styles.largeAdvantages}>
          <div className={styles.advantage}>
            <h4>No Training Required</h4>
            <p>Junior clinicians achieve expert-level diagnostic accuracy from day one</p>
          </div>
          <div className={styles.advantage}>
            <h4>Intuitive Interface</h4>
            <p>Upload report, get structured diagnosis. Complex logic runs invisibly</p>
          </div>
          <div className={styles.advantage}>
            <h4>Confidence Building</h4>
            <p>Shows reasoning behind each decision, helping doctors learn while ensuring they never miss critical criteria</p>
          </div>
          <div className={styles.advantage}>
            <h4>Expert Validation</h4>
            <p>Built on WHO 2022 and ICC 2022 guidelines, validated by leading hematologists worldwide</p>
          </div>
        </div>
        
        <div className={styles.insight}>
          Sophisticated formal logic, simple clinical experience.
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Investment Opportunity",
    subtitle: "£500k-£2M Seed to Formalize Medical Decision-Making",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.professionalInvestmentLayout}>
          <div className={styles.investmentOverview}>
            <div className={styles.fundingRequest}>
              <div className={styles.amount}>£500k-£2M</div>
              <div className={styles.stage}>Seed Round</div>
              <div className={styles.purpose}>Building the diagnostic logic revolution</div>
            </div>
            
            <div className={styles.keyMetrics}>
              <div className={styles.metric}>
                <div className={styles.metricValue}>18</div>
                <div className={styles.metricLabel}>Months to NHS validation</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricValue}>£164B</div>
                <div className={styles.metricLabel}>AI Healthcare market by 2030</div>
              </div>
            </div>
          </div>
          
          <div className={styles.usageBreakdown}>
            <h4>Use of Funds</h4>
            <div className={styles.fundingItems}>
              <div className={styles.fundingItem}>
                <div className={styles.itemCategory}>Platform Development</div>
                <div className={styles.itemDescription}>Scale formal pathway development across haematology subspecialties</div>
              </div>
              <div className={styles.fundingItem}>
                <div className={styles.itemCategory}>Clinical Validation</div>
                <div className={styles.itemDescription}>Multi-center testing with comprehensive outcome tracking</div>
              </div>
              <div className={styles.fundingItem}>
                <div className={styles.itemCategory}>Team Expansion</div>
                <div className={styles.itemDescription}>Logic engineering and clinical informatics capabilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    content: (
      <div className={styles.slideContent}>
        <div className={styles.impactLayout}>
          <div className={styles.visionStatement}>
            <h3>Transforming Medical Guidelines into Engineering-Grade Logic Systems</h3>
            <p>We're not building another AI diagnostic tool. We're creating the framework that makes complex medical decision-making as reliable as software engineering.</p>
          </div>
          
          
        </div>
        
       
      </div>
    )
  }
];

export default function Pitch() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = pitchSlides[currentSlide];

  return (
    <div className={styles.pitchDeck}>
      {/* Back to Main Button */}
      <a href="/" className={styles.backButton}>
        ← Back
      </a>

      {/* Main Slide */}
      <div 
        key={currentSlide} 
        className={styles.slide}
      >
        <div className="container">
          <div className={styles.slideHeader}>
            <h1><span className="text-gradient">{slide.title}</span></h1>
            <p className={styles.slideSubtitle}>{slide.subtitle}</p>
          </div>
          
          {slide.content}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.navigation}>
        <button 
          onClick={prevSlide} 
          className={styles.navButton}
          disabled={currentSlide === 0}
        >
          ← Previous
        </button>
        
        <div className={styles.slideIndicators}>
          {pitchSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide} 
          className={styles.navButton}
          disabled={currentSlide === pitchSlides.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
} 