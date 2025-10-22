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

  useEffect(() => {
    // Check if user is authenticated
    const passwordCorrect = sessionStorage.getItem('dataroom_password_correct');
    const ndaAccepted = sessionStorage.getItem('dataroom_nda_accepted');
    
    if (passwordCorrect === 'true' && ndaAccepted === 'true') {
      setIsAuthenticated(true);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Redirect back to data room login
      router.push('/data-room');
    }
    setIsLoading(false);

    // Cleanup: restore body scroll on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [router]);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Haem.io-pitch.pdf';
    link.download = 'Haemio-Investor-Pitch.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      </div>
    </div>
  );
}

