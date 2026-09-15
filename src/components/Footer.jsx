import { memo } from 'react';

const serviceLinks = [
  { label: 'Website/App Development', href: '#services' },
  { label: 'Digital Marketing', href: '#services' },
  { label: 'MVP Development', href: '#services' },
  { label: 'Branding', href: '#services' },
];

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  return (
    <footer className="footer-wrapper" id="contact" role="contentinfo">
      <div className="footer-container">
        {/* Main Footer Content Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-brand-col">
            <a href="#home" className="footer-logo-link" aria-label="Alphacyrix Home">
              <img
                src="/assets/logo.png"
                alt="Alphacyrix"
                className="footer-logo-img"
                height="30"
                width="auto"
                loading="lazy"
              />
            </a>

            <p className="footer-tagline">
              Architecting high-performance digital ecosystems for global industry leaders with architectural precision.
            </p>

            {/* Social Icons */}
            <div className="footer-social-links" aria-label="Social media channels">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow Alphacyrix on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Connect with Alphacyrix on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow Alphacyrix on X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.464-2.464L20 4" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow Alphacyrix on Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">SERVICES</h3>
            <ul className="footer-nav-list">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">COMPANY</h3>
            <ul className="footer-nav-list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Global Offices */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">GLOBAL OFFICES</h3>
            <div className="footer-office-item">
              <p className="footer-office-location">Kozhikode, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 AlphaCyrix Digital Innovation Agency. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy" className="footer-legal-link">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
