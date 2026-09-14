import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navItems = ['Home', 'Work', 'Services', 'About', 'Careers', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-wrapper ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="navbar-container" aria-label="Main Navigation">
        {/* Brand Logo */}
        <a href="#home" className="brand-logo" id="brand-logo" aria-label="Alphacyrix Home">
          <img
            src="/assets/logo.png"
            alt="Alphacyrix"
            className="brand-logo-img"
            height="32"
          />
        </a>

        {/* Navigation Items */}
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} id="nav-links">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeLink === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(item);
                  setMobileMenuOpen(false);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#contact" className="btn-nav-action" id="nav-cta-btn">
            <span>Start a project</span>
          </a>

          {/* Mobile hamburger toggle */}
          <button
            className="mobile-nav-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
