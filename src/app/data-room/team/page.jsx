'use client';

import { useState } from 'react';
import styles from './team.module.css';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Robert Lee',
    title: 'CEO & Co-Founder',
    image: '/profile-pics/robbie.png',
    bio: [
      "Robert is the architect of Haem.io's core technology and leads the company's strategy. His mission is deeply personal, born from his experience as a Burkitt's Lymphoma survivor diagnosed at 19, which instilled in him the critical importance of rapid, accurate diagnostics. After graduating from the University of Manchester with a BSc in Computer Science, Robert worked in FinTech at the London Stock Exchange Group and FlexTrade, specialising in building and testing high-stakes algorithmic trading platforms.",
      "He applied the rigour of this environment to healthcare, developing a novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to his uncle, Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski, they co-developed the platform. As the sole author of the core codebase, Robert leads all technical development and fundraising efforts, driven by his personal commitment to improving the diagnostic journey for cancer patients."
    ]
  },
  {
    name: 'Dr. Daniel Clarke',
    title: 'CTO & Co-Founder',
    image: '/profile-pics/danny.png',
    bio: [
      "Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.",
      "Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-stakes government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets. A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems."
    ]
  },
  {
    name: 'Dr. John Burthem',
    title: 'Co-CMO & Co-Founder',
    image: '/profile-pics/john.png',
    bio: [
      "Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT). He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres.",
      "With over 50 peer-reviewed publications, he is a nationally recognised expert in the field. Dr. Burthem has extensive experience in managing large research projects and IT-based commercial partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the company's credibility and go-to-market strategy."
    ]
  },
  {
    name: 'Dr. Luke Carter-Brzezinski',
    title: 'Co-CMO & Co-Founder',
    image: '/profile-pics/luke.png',
    bio: [
      "Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.",
      "Dr. Carter-Brzezinski provides the critical link between Haem.io's technology and the end-user clinician. His active clinical practice ensures the platform is built to solve real-world workflow problems. He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, successfully establishing strong relationships with collaborators, industry partners, and funding bodies."
    ]
  }
];

export default function TeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <div className={styles.teamPageContainer}>
      <Link href="/data-room" className={styles.backButton}>
        ← Back to Data Room
      </Link>

      <div className={styles.teamPageContent}>
        <div className={styles.teamHeader}>
          <h1>The Founding Team</h1>
          <p className={styles.teamIntro}>Expertise in AI, clinical haematology, and healthcare technology.</p>
        </div>

        <div className={styles.carouselContainer}>
          <button onClick={prevSlide} className={styles.carouselArrow} aria-label="Previous team member">
            ‹
          </button>

          <div className={styles.carouselContent}>
            <div className={styles.teamMemberCard} key={currentIndex}>
              <div className={styles.teamMemberPhoto}>
                <img src={currentMember.image} alt={currentMember.name} />
              </div>
              <h3>{currentMember.name}</h3>
              <h4>{currentMember.title}</h4>
              {currentMember.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <button onClick={nextSlide} className={styles.carouselArrow} aria-label="Next team member">
            ›
          </button>
        </div>

        <div className={styles.carouselDots}>
          {teamMembers.map((member, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              aria-label={`View ${member.name}`}
            >
              <img src={member.image} alt={member.name} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

