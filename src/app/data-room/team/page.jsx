'use client';

import styles from './team.module.css';
import Link from 'next/link';

export default function TeamPage() {
  return (
    <div className={styles.teamPageContainer}>
      <Link href="/data-room" className={styles.backButton}>
        ← Back to Data Room
      </Link>

      <div className={styles.teamPageContent}>
        <div className={styles.teamHeader}>
          <h1>The Founding Team</h1>
          <p className={styles.teamIntro}>World-class expertise in AI, clinical haematology, and healthcare technology.</p>
        </div>

        <div className={styles.teamGrid}>
          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberPhoto}>
              <img src="/profile-pics/robbie.png" alt="Robert Lee" />
            </div>
            <h3>Robert Lee</h3>
            <h4>CEO & Co-Founder</h4>
            <p>
              Robert is the architect of Haem.io's core technology and leads the company's strategy. His mission is deeply personal, born from his experience as a Burkitt's Lymphoma survivor diagnosed at 19, which instilled in him the critical importance of rapid, accurate diagnostics. After graduating from the University of Manchester with a BSc in Computer Science, Robert worked in FinTech at the London Stock Exchange Group and FlexTrade, specialising in building and testing high-stakes algorithmic trading platforms.
            </p>
            <p>
              He applied the rigour of this environment to healthcare, developing a novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to his uncle, Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski, they co-developed the platform. As the sole author of the core codebase, Robert leads all technical development and fundraising efforts, driven by his personal commitment to improving the diagnostic journey for cancer patients.
            </p>
          </div>

          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberPhoto}>
              <img src="/profile-pics/danny.png" alt="Dr. Daniel Clarke" />
            </div>
            <h3>Dr. Daniel Clarke</h3>
            <h4>CTO & Co-Founder</h4>
            <p>
              Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.
            </p>
            <p>
              Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-stakes government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets. A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems.
            </p>
          </div>

          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberPhoto}>
              <img src="/profile-pics/john.png" alt="Dr. John Burthem" />
            </div>
            <h3>Dr. John Burthem</h3>
            <h4>Co-CMO & Co-Founder</h4>
            <p>
              Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT). He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres.
            </p>
            <p>
              With over 50 peer-reviewed publications, he is a nationally recognised expert in the field. Dr. Burthem has extensive experience in managing large research projects and IT-based commercial partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the company's credibility and go-to-market strategy.
            </p>
          </div>

          <div className={styles.teamMemberCard}>
            <div className={styles.teamMemberPhoto}>
              <img src="/profile-pics/luke.png" alt="Dr. Luke Carter-Brzezinski" />
            </div>
            <h3>Dr. Luke Carter-Brzezinski</h3>
            <h4>Co-CMO & Co-Founder</h4>
            <p>
              Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.
            </p>
            <p>
              Dr. Carter-Brzezinski provides the critical link between Haem.io's technology and the end-user clinician. His active clinical practice ensures the platform is built to solve real-world workflow problems. He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, successfully establishing strong relationships with collaborators, industry partners, and funding bodies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

