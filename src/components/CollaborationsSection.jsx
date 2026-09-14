import { useState, useEffect, useRef } from 'react';

export default function CollaborationsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const rafIdRef = useRef(null);

  // 6 Client Logos matching user specification
  const clients = [
    {
      id: 'rivontech',
      name: 'RivonTech',
      tagline: 'SMART SOLUTIONS',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized Modern Angular R */}
          <path
            d="M6 5H18C22.4 5 25 7.6 25 11.5C25 14.8 22.8 17.2 19.5 17.8L26 27H20.2L14.2 18.5H11.5V27H6V5ZM11.5 14H17.5C19.6 14 20.8 12.8 20.8 11.2C20.8 9.6 19.6 8.5 17.5 8.5H11.5V14Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 'globexia',
      name: 'Globexia',
      tagline: 'DIGITAL COMMERCE',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sliced Wave Sphere */}
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          <path
            d="M4.5 12C8 10 13 9.5 18 10.5C23 11.5 26.5 14 27.5 16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M3.5 16.5C7.5 14.5 13 14 19 15C24.5 16 27.5 19 28.5 21"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6 21C9.5 19.5 14.5 19 19.5 20C23.5 20.8 25.5 22.5 26 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 'altura',
      name: 'Altura',
      tagline: 'TECHNOLOGIES',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dual Peak Chevrons: Left Translucent, Right Solid */}
          <path
            d="M10.5 26L3 26L11.5 6L16 16.5L10.5 26Z"
            fill="currentColor"
            fillOpacity="0.38"
          />
          <path
            d="M20.5 26L13.5 26L22 6L29 26H23.5L22 22.5H16.5L18.5 18H20L20.5 26Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 'novexa',
      name: 'Novexa',
      tagline: 'BUSINESS SOLUTIONS',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Interlocking Link Infinity Mark */}
          <rect
            x="5.5"
            y="13"
            width="14"
            height="7"
            rx="3.5"
            transform="rotate(-35 5.5 13)"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <rect
            x="14.5"
            y="19"
            width="14"
            height="7"
            rx="3.5"
            transform="rotate(-35 14.5 19)"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 'zentura',
      name: 'Zentura',
      tagline: 'HEALTH & LIFE',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Quarter Circle and Crescent Segment Mark */}
          <path
            d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28V4Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <path
            d="M16 16H28C28 9.37 22.63 4 16 4V16Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 'lumora',
      name: 'Lumora',
      tagline: 'CREATIVE STUDIO',
      icon: (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Four-part Geometric Modernist Monogram */}
          <rect x="5" y="5" width="8" height="8" rx="4" fill="currentColor" />
          <path d="M15 5H21C24.3 5 27 7.7 27 11C27 14.3 24.3 17 21 17H15V5Z" fill="currentColor" />
          <rect x="5" y="15" width="8" height="8" fill="currentColor" />
          <path d="M15 19H23C23 23.4 19.4 27 15 27V19Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      ),
    },
  ];

  // Duplicate logos for seamless infinite horizontal loop
  const displayClients = [...clients, ...clients, ...clients];

  // Viewport entrance observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  // Subtle scroll parallax for the logo row with LERP interpolation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from when section approaches bottom to when it leaves top
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        // Subtle offset: max 70px translation across entire scroll
        scrollTargetRef.current = (progress - 0.5) * -70;
      }
    };

    const animateScrollParallax = () => {
      const target = scrollTargetRef.current;
      const current = scrollCurrentRef.current;

      // Buttery smooth LERP dampening
      scrollCurrentRef.current += (target - current) * 0.08;
      setScrollProgress(scrollCurrentRef.current);

      rafIdRef.current = requestAnimationFrame(animateScrollParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafIdRef.current = requestAnimationFrame(animateScrollParallax);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`collab-section ${isVisible ? 'is-visible' : ''}`}
      id="collaborations"
      aria-label="Trusted by Visionary Businesses"
    >
      <div className="collab-container">
        
        {/* Top Header Row */}
        <div className="collab-header">
          <div className="collab-header-left">
            <div className="collab-eyebrow">
              <span className="collab-eyebrow-text">TRUSTED BY VISIONARY BUSINESSES</span>
              <span className="collab-eyebrow-dot" aria-hidden="true"></span>
              <span className="collab-eyebrow-line" aria-hidden="true"></span>
            </div>
            <h2 className="collab-title">
              Building lasting partnerships<span className="title-dot">.</span>
            </h2>
          </div>

          <div className="collab-header-right">
            <a href="#case-studies" className="collab-case-link" id="collab-case-studies-link">
              <span>View Case Studies</span>
              <span className="collab-link-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Top Progressive Divider Line */}
        <div className="collab-divider-line collab-divider-top" aria-hidden="true"></div>

        {/* Horizontal Marquee & Parallax Logo Row */}
        <div className="collab-marquee-wrapper" aria-label="Client company logos">
          <div
            className="collab-parallax-wrap"
            style={{
              transform: `translate3d(${scrollProgress}px, 0, 0)`,
            }}
          >
            <div className="collab-track">
              {displayClients.map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="collab-logo-item"
                  style={{
                    '--reveal-delay': `${0.06 * (idx % 6)}s`,
                  }}
                  tabIndex={0}
                  role="img"
                  aria-label={`${client.name} - ${client.tagline}`}
                >
                  <div className="collab-logo-mark" aria-hidden="true">
                    {client.icon}
                  </div>
                  <div className="collab-logo-info">
                    <span className="collab-logo-name">{client.name}</span>
                    <span className="collab-logo-tagline">{client.tagline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progressive Divider Line */}
        <div className="collab-divider-line collab-divider-bottom" aria-hidden="true"></div>

      </div>
    </section>
  );
}
