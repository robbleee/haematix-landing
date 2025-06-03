'use client';

import { useState } from 'react';
import styles from './pitch.module.css';

const pitchSlides = [
  {
    id: 1,
    title: "The Genetic Information Crisis",
    subtitle: "Critical Data Trapped in Unreadable Reports",
    content: (
      <div className={styles.slideContent}>
        <h3>Every Cancer Diagnosis Requires Genetic Intelligence</h3>
        <p>Modern cancer care depends on molecular genetics  —  but the critical information is buried in dense, unstructured laboratory reports that take hours to decode.</p>
        
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <h4>Information Chaos</h4>
            <p>Genetic data scattered across cytogenetics, flow cytometry, and molecular reports</p>
          </div>
          <div className={styles.problemCard}>
            <h4>Time Wastage</h4>
            <p>Clinicians spend hours manually extracting relevant markers from technical jargon</p>
          </div>
          <div className={styles.problemCard}>
            <h4>Integration Nightmare</h4>
            <p>Combining multiple data sources requires rare expertise and precious time</p>
          </div>
        </div>
        
        <div className={styles.insight}>
          The genetic intelligence exists  —  it's just locked away in formats designed for machines, not medicine.
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Our Breakthrough: AI That Reads Like a Geneticist",
    subtitle: "LLM Technology Unlocks Hidden Clinical Intelligence",
    content: (
      <div className={styles.slideContent}>
        <div className={styles.breakthrough}>
          <div className={styles.breakthroughItem}>
            <h4>Deep Understanding</h4>
            <p>Our LLM comprehends genetic reports with the sophistication of an expert haematologist</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Instant Processing</h4>
            <p>Transforms hours of manual analysis into seconds of precise genetic intelligence</p>
          </div>
          <div className={styles.breakthroughItem}>
            <h4>Clinical Translation</h4>
            <p>Converts complex molecular data into clear diagnostic pathway recommendations</p>
          </div>
        </div>
        
        <div className={styles.pathway}>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>Extract</h4>
              <p>AI identifies every relevant genetic marker</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>Interpret</h4>
              <p>Maps findings to WHO & ICC classifications</p>
            </div>
          </div>
          <div className={styles.pathwayFlow}></div>
          <div className={styles.pathwayStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>Guide</h4>
              <p>Delivers clear diagnostic recommendations</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Perfect Market Convergence",
    subtitle: "Technology Meets Urgent Clinical Need",
    content: (
      <div className={styles.slideContent}>
        <h3>The Stars Are Aligned</h3>
        
        <div className={styles.marketForces}>
          <div className={styles.force}>
            <h4>NHS Digital Revolution</h4>
            <p>40% increase in AI procurement driving unprecedented adoption of intelligent clinical tools</p>
          </div>
          <div className={styles.force}>
            <h4>Molecular Medicine Explosion</h4>
            <p>Rapid expansion of genetic testing creating an information crisis that demands AI solutions</p>
          </div>
        </div>
        
        <div className={styles.marketOpportunity}>
          <div className={styles.marketValue}>£15B</div>
          <h4>Global Market by 2030</h4>
          <p>Haematology is the perfect entry point: simple blood sampling meets complex molecular genetics, creating ideal conditions for AI-powered diagnostic intelligence.</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Unmatched Competitive Advantage",
    subtitle: "Clinical Authority + Technical Excellence = Market Leadership",
    content: (
      <div className={styles.slideContent}>
        <h3>Built to Win</h3>
        
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <h4>Deep Specialization</h4>
            <p>Laser-focused on haematology—we understand every nuance of blood cancer genetics</p>
          </div>
          <div className={styles.advantage}>
            <h4>NHS Integration</h4>
            <p>Established clinical partnerships provide direct validation pathway and market access</p>
          </div>
          <div className={styles.advantage}>
            <h4>Technical Mastery</h4>
            <p>Algorithmic trading expertise applied to real-time diagnostic decision systems</p>
          </div>
          <div className={styles.advantage}>
            <h4>Regulatory Pathway</h4>
            <p>Clear route to MHRA approval through established medical device frameworks and clinical validation</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Platform Scalability",
    subtitle: "Positioned for Expansion as Molecular Medicine Evolves",
    content: (
      <div className={styles.slideContent}>
        <h3>Beyond Haematology: A Platform Built for Growth</h3>
        
        <div className={styles.scalabilityVision}>
          <p>Our LLM-powered extraction technology isn't limited to blood cancers. We're building the foundational infrastructure that can adapt and scale as molecular understanding advances across all cancer types.</p>
        </div>
        
        <div className={styles.expansionPath}>
          <div className={styles.expansionCard}>
            <h4>Solid Tumors</h4>
            <p>As biopsy-based molecular profiling becomes routine, our platform is ready to decode the complex genetic landscapes of solid cancers</p>
          </div>
          <div className={styles.expansionCard}>
            <h4>Emerging Biomarkers</h4>
            <p>When new genetic markers and pathways are discovered, our AI can be rapidly trained to recognize and interpret these evolving diagnostic criteria</p>
          </div>
          <div className={styles.expansionCard}>
            <h4>Multi-Cancer Panels</h4>
            <p>Our technology foundation supports the integration of pan-cancer genomic testing as it becomes clinically validated</p>
          </div>
        </div>
        
        <div className={styles.globalAccess}>
          <h4>Global Accessibility</h4>
          <p>Our platform can be tailored for developing economies and centers with limited diagnostic capabilities, democratizing access to advanced molecular intelligence regardless of local infrastructure constraints.</p>
        </div>
        
        <div className={styles.strategicPosition}>
          <h4>Strategic Positioning</h4>
          <p>By mastering the most complex molecular diagnostics in haematology first, we're building the expertise and technology stack needed to lead the broader transformation of cancer diagnosis as the field evolves.</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Clinical Trial Intelligence",
    subtitle: "Connecting Patients to Hope Through Data",
    content: (
      <div className={styles.slideContent}>
        <h3>Beyond Diagnosis: Transforming Patient Outcomes</h3>
        
        <div className={styles.trialVision}>
          <p>Our diagnostic intelligence becomes a gateway to treatment opportunities. By understanding the precise molecular profile of each patient, we can automatically identify relevant clinical trials and cutting-edge therapies.</p>
        </div>
        
        <div className={styles.trialFeatures}>
          <div className={styles.trialCard}>
            <h4>Rare Disease Matching</h4>
            <p>Patients with rare molecular subtypes are automatically flagged for specialized clinical trials and research programs</p>
          </div>
          <div className={styles.trialCard}>
            <h4>Poor Prognosis Optimization</h4>
            <p>When standard treatments offer limited hope, our system identifies experimental therapies and novel treatment protocols</p>
          </div>
          <div className={styles.trialCard}>
            <h4>Real-Time Opportunities</h4>
            <p>Continuous monitoring of global clinical trial databases ensures patients never miss potentially life-saving opportunities</p>
          </div>

        </div>
        
        <div className={styles.impactStatement}>
          <h4>Transforming Hope into Action</h4>
          <p>Every diagnostic decision becomes an opportunity to connect patients with the most advanced treatments available, turning molecular complexity into personalized pathways to better outcomes.</p>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Investment Opportunity",
    subtitle: "£3-5M Series A to Revolutionize Cancer Diagnosis",
    content: (
      <div className={styles.slideContent}>
        <h3>Your Capital, Our Innovation, Global Impact</h3>
        
        <div className={styles.investmentGrid}>
          <div className={styles.investmentCard}>
            <h4>NHS Expansion</h4>
            <p>Scale from pilot to multi-center validation across leading haematology units</p>
          </div>
          <div className={styles.investmentCard}>
            <h4>Regulatory Success</h4>
            <p>Achieve MHRA approval and establish commercial deployment framework</p>
          </div>
          <div className={styles.investmentCard}>
            <h4>Team Growth</h4>
            <p>Expand clinical expertise and accelerate platform development</p>
          </div>
          <div className={styles.investmentCard}>
            <h4>Technology Leadership</h4>
            <p>Advanced LLM capabilities and diagnostic pathway expansion</p>
          </div>
        </div>
        
        <div className={styles.timeline}>
          <div className={styles.timelineValue}>18 Months</div>
          <h4>Path to Market Leadership</h4>
          <p>NHS validation opens doors to private sector dominance and international expansion</p>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Transform Medicine With Us",
    subtitle: "The Future of Precision Diagnosis Starts Now",
    content: (
      <div className={styles.slideContent}>
        <h3>Join the Revolution</h3>
        
        <div className={styles.vision}>
          <p>We're not building another diagnostic tool. We're creating the intelligent layer that transforms molecular complexity into clinical clarity—making precision medicine accessible to every clinician, everywhere.</p>
          
          <div className={styles.futureVision}>
            <h4>Imagine Tomorrow</h4>
            <div className={styles.visionPoints}>
              <div className={styles.visionPoint}>Complex genetic reports become instant clinical insights</div>
              <div className={styles.visionPoint}>Diagnostic certainty replaces overwhelming complexity</div>
              <div className={styles.visionPoint}>Precision medicine becomes universal, not elite</div>
            </div>
          </div>
        </div>
        
        <div className={styles.finalCta}>
          <h4>Ready to Lead the Diagnostic Revolution?</h4>
          <div className={styles.ctaButtons}>
            <a href="mailto:invest@haem.io" className="button">Schedule Your Demo</a>
            <a href="/results" className={styles.secondaryButton}>See Our Impact</a>
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
      <div className={styles.slide}>
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