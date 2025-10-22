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
  const totalSlides = 19; // Total slides in the pitch (IDs 0-18 = 19 slides)

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
    console.log('Previous button clicked, current slide:', currentSlide);
    // Trigger left arrow key event to navigate - only dispatch once!
    const event = new KeyboardEvent('keydown', { 
      key: 'ArrowLeft',
      keyCode: 37,
      which: 37,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  const handleNextSlide = () => {
    console.log('Next button clicked, current slide:', currentSlide);
    // Trigger right arrow key event to navigate - only dispatch once!
    const event = new KeyboardEvent('keydown', { 
      key: 'ArrowRight',
      keyCode: 39,
      which: 39,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  // Listen for slide changes from the investors page
  useEffect(() => {
    const updateSlideCounter = () => {
      // Try multiple selectors to find the active indicator
      const indicators = document.querySelectorAll('[class*="indicator"]');
      let foundActive = false;
      
      indicators.forEach((indicator, index) => {
        if (indicator.classList.contains('active') || 
            Array.from(indicator.classList).some(c => c.includes('active'))) {
          console.log('Active slide found:', index);
          setCurrentSlide(index);
          foundActive = true;
        }
      });
      
      if (!foundActive && indicators.length > 0) {
        // If no active indicator found, check the first one
        console.log('No active indicator found, staying on slide:', currentSlide);
      }
    };

    // Poll for active indicator changes
    const interval = setInterval(updateSlideCounter, 100);
    
    // Also update immediately
    updateSlideCounter();
    
    return () => clearInterval(interval);
  }, [currentSlide]);

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
      {/* Floating Back Button */}
      <button 
        onClick={() => router.push('/data-room')}
        className={styles.floatingBackButton}
      >
        ← Back to Data Room
      </button>

      <div className={styles.pitchContent}>
        <InvestorsPage hideControls={true} />
        
        {/* Vertical Navigation on the Right */}
        <div className={styles.verticalNavigation}>
          <button 
            onClick={handlePrevSlide}
            className={styles.verticalNavBtn}
            disabled={currentSlide === 0}
            title="Previous slide"
          >
            ↑
          </button>
          
          <div className={styles.slideCounter}>
            <div className={styles.currentSlide}>{currentSlide + 1}</div>
            <div className={styles.divider}></div>
            <div className={styles.totalSlides}>{totalSlides}</div>
          </div>
          
          <button 
            onClick={handleNextSlide}
            className={styles.verticalNavBtn}
            disabled={currentSlide === totalSlides - 1}
            title="Next slide"
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}

