'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

export default function ConsentAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setHasConsent(localStorage.getItem('cookie-consent') === 'accepted');
    };

    syncConsent();
    window.addEventListener('cookie-consent-change', syncConsent);
    window.addEventListener('storage', syncConsent);

    return () => {
      window.removeEventListener('cookie-consent-change', syncConsent);
      window.removeEventListener('storage', syncConsent);
    };
  }, []);

  return hasConsent ? <Analytics /> : null;
}
