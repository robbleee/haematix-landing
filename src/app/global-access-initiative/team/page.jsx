'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './team.module.css';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Robert Lee',
    title: 'Project Lead',
    image: '/profile-pics/robbie.png',
    bio: [
      "Robert leads software development, regulatory strategy, and research coordination. After being diagnosed with Burkitt's Lymphoma at 19, he graduated from the University of Manchester with a BSc in Computer Science and built his career in FinTech at the London Stock Exchange Group and FlexTrade, where he specialised in building and testing high-frequency algorithmic trading platforms.",
      "Drawing on this technical background, Robert developed the initial concept for Haem.io's novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski and the technical team, they developed the platform into the production-grade system it is today. Robert manages the project's intellectual property portfolio and oversees the regulatory pathway to UKCA/CE marking as a Class IIa medical device."
    ]
  },
  {
    name: 'Dr. Daniel Clarke',
    title: 'Technical Lead',
    image: '/profile-pics/danny.png',
    bio: [
      "Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.",
      "Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-frequency government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets. A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems."
    ]
  },
  {
    name: 'Dr. John Burthem',
    title: 'Principal Clinical Investigator',
    image: '/profile-pics/john.png',
    bio: [
      "Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT). He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres.",
      "With over 50 peer-reviewed publications, he is a nationally recognised expert in the field. Dr. Burthem has extensive experience in managing large research projects and IT-based partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the project's clinical validation and dissemination strategy."
    ]
  },
  {
    name: 'Dr. Luke Carter-Brzezinski',
    title: 'Clinical Co-Investigator',
    image: '/profile-pics/luke.png',
    bio: [
      "Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.",
      "Dr. Carter-Brzezinski brings particular expertise in lower and middle-income (LME) country haematology, with direct clinical experience working in Cambodia. His hands-on experience in resource-constrained settings gives him deep insight into the challenges facing haematology diagnostics in LME countries. He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, establishing strong relationships with collaborators and research partners. His passion for LME haematology and direct experience in Cambodia make him the ideal clinical lead for the Global Access Initiative."
    ]
  }
];

export default function GlobalAccessTeamPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('lhs_password_correct');
    const ndaAccepted = sessionStorage.getItem('lhs_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirect back to global access initiative login
      router.push('/global-access-initiative');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles.teamPageContainer}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
      <Link href="/global-access-initiative" className={styles.backButton}>
        ← Back to Global Access Initiative
      </Link>

      <div className={styles.teamPageContent}>
        <div className={styles.teamHeader}>
          <h1>The Haem.io Team</h1>
          <p className={styles.teamIntro}>Expertise in AI, clinical haematology, and global health. Dr. Luke Carter-Brzezinski brings particular expertise in LME haematology and leads our Global Access Initiative.</p>
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

