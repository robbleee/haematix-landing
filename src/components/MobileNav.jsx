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
        aria-label="Toggle mobile menu"
      >
        ☰
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? 'show' : ''}`}>
        <ul style={{ listStyle: 'none', margin: 0, padding: '1rem' }}>
          <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'block' }} onClick={closeMenu}>Home</Link>
          </li>
          <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
            <Link href="/vision" style={{ textDecoration: 'none', display: 'block' }} onClick={closeMenu}>Our Vision</Link>
          </li>
          <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #f0f0f0' }}>
            <Link href="/roadmap" style={{ textDecoration: 'none', display: 'block' }} onClick={closeMenu}>Roadmap</Link>
          </li>
          <li style={{ padding: '0.75rem 0' }}>
            <a className="button" href="https://app.haem.io/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>Login</a>
          </li>
        </ul>
      </div>
    </>
  );
} 