'use client';

import { useEffect } from 'react';

export default function CitationHandler() {
  useEffect(() => {
    // Handle citation clicks
    const handleCitationClick = (e) => {
      const citationLink = e.target.closest('a[href^="#ref"]');
      if (!citationLink) return;

      e.preventDefault();
      const href = citationLink.getAttribute('href');
      const refId = href.substring(1); // Remove the #
      const targetElement = document.getElementById(refId);

      if (targetElement) {
        // Remove previous highlights
        document.querySelectorAll('.citation-highlight').forEach((el) => {
          el.classList.remove('citation-highlight');
        });

        // Scroll to the reference
        const offset = 120;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Highlight the reference after scroll
        setTimeout(() => {
          targetElement.classList.add('citation-highlight');
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            targetElement.classList.remove('citation-highlight');
          }, 3000);
        }, 500);
      }
    };

    // Handle hash changes (when user navigates directly via URL)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#ref')) {
        const refId = hash.substring(1);
        const targetElement = document.getElementById(refId);
        
        if (targetElement) {
          const offset = 120;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          setTimeout(() => {
            targetElement.classList.add('citation-highlight');
            setTimeout(() => {
              targetElement.classList.remove('citation-highlight');
            }, 3000);
          }, 500);
        }
      }
    };

    // Add click listeners to all citation links
    const citationLinks = document.querySelectorAll('a[href^="#ref"]');
    citationLinks.forEach((link) => {
      link.addEventListener('click', handleCitationClick);
    });

    // Handle initial hash if present
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      citationLinks.forEach((link) => {
        link.removeEventListener('click', handleCitationClick);
      });
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
}

