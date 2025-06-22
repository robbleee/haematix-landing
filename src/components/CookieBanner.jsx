'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // You can add analytics/tracking initialization here
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieBanner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p>
            We use cookies to enhance your experience on our site. These cookies help us analyze traffic, 
            personalize content, and improve our services. By clicking "Accept", you consent to our use of cookies.
          </p>
          <a href="/privacy-policy" className={styles.privacyLink}>
            Learn more about our privacy policy
          </a>
        </div>
        <div className={styles.actions}>
          <button onClick={handleDecline} className={styles.declineButton}>
            Decline
          </button>
          <button onClick={handleAccept} className={styles.acceptButton}>
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
} 