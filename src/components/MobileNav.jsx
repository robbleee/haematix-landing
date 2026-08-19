'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? 'show' : ''}`}>
        <ul>
          <li><Link href="/#projects" onClick={closeMenu}>Projects</Link></li>
          <li><Link href="/clinical-trials" onClick={closeMenu}>Clinical trials</Link></li>
          <li><Link href="/articles" onClick={closeMenu}>Articles</Link></li>
          <li><Link href="/team" onClick={closeMenu}>Team</Link></li>
          <li><a className="mobile-login" href="https://app.haem.io/" target="_blank" rel="noopener noreferrer">Sign in</a></li>
        </ul>
      </div>
    </>
  );
}
