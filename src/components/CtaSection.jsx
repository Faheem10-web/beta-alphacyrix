import { memo } from 'react';

function CtaSection() {
  return (
    <section className="cta-section" id="contact-cta" aria-label="Call to Action">
      <div className="cta-container">
        {/* Banner Card with Eclipse AI Background */}
        <div className="cta-banner-card">
          {/* Subtle Atmospheric Vignette */}
          <div className="cta-ambient-glow" aria-hidden="true"></div>

          {/* Center Content Stack */}
          <div className="cta-content-wrapper">

            {/* Main Heading */}
            <h2 className="cta-heading">
              Ready to <span className="cta-heading-accent">Innovate?</span>
            </h2>

            {/* Supporting Description */}
            <p className="cta-description">
              Let's turn your ideas into powerful digital solutions.
              <br className="cta-desc-br" />
              Connect with our team and start your next project today.
            </p>

            {/* 100% UI Matched Button: Get in Touch → with electric blue outer glow halo */}
            <div className="cta-action-group">
              <a href="#contact" className="btn-cta-pill" id="cta-get-in-touch">
                <span>Get in Touch</span>
                <span className="btn-cta-arrow" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CtaSection);
