'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './pitch.module.css';
import investorStyles from '../../investors/investors.module.css';

// Import the pitch slides from investors page
import InvestorsPage from '../../investors/page';

export default function DataRoomPitchViewer() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 18; // Update this if you add/remove slides

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

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Haem.io-pitch.pdf';
    link.download = 'Haemio-Investor-Pitch.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrevSlide = () => {
    // Trigger left arrow key event to navigate
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
  };

  const handleNextSlide = () => {
    // Trigger right arrow key event to navigate
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(event);
  };

  // Listen for slide changes from the investors page
  useEffect(() => {
    const updateSlideCounter = () => {
      const indicators = document.querySelectorAll('.indicator');
      indicators.forEach((indicator, index) => {
        if (indicator.classList.contains('active')) {
          setCurrentSlide(index);
        }
      });
    };

    // Poll for active indicator changes
    const interval = setInterval(updateSlideCounter, 100);
    return () => clearInterval(interval);
  }, []);

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
    <div className={styles.pitchViewerContainer}>
      <div className={styles.pitchHeader}>
        <button 
          onClick={() => router.push('/data-room')}
          className={styles.backButton}
        >
          ← Back to Data Room
        </button>
        
        <div className={styles.headerTitle}>
          <h1>Haem.io Investor Pitch</h1>
          <p>Interactive presentation</p>
        </div>

        <button 
          onClick={handleDownloadPDF}
          className={styles.downloadButton}
        >
          ⬇ Download PDF
        </button>
      </div>

      <div className={styles.pitchContent}>
        <InvestorsPage hideControls={true} />
        
        {/* Custom Simple Navigation */}
        <div className={styles.simpleNavigation}>
          <button 
            onClick={handlePrevSlide}
            className={styles.navBtn}
            disabled={currentSlide === 0}
          >
            ← Prev
          </button>
          
          <div className={styles.slideCounter}>
            {currentSlide + 1} / {totalSlides}
          </div>
          
          <button 
            onClick={handleNextSlide}
            className={styles.navBtn}
            disabled={currentSlide === totalSlides - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

