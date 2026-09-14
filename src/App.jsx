import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import OrbitsGraphic from './components/OrbitsGraphic';
import ServiceCard from './components/ServiceCard';
import ClientBadge from './components/ClientBadge';
import CollaborationsSection from './components/CollaborationsSection';
import ServicesSection from './components/ServicesSection';

export default function App() {
  // Smooth mouse parallax state with LERP (Linear Interpolation)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef(null);

  // Sibling cards dimming state
  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);

  // Scroll effect on hero content
  const [scrollY, setScrollY] = useState(0);

  // Handle smooth mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates: -1 to 1 relative to center
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseTargetRef.current = { x: normX, y: normY };
    };

    const animateParallax = () => {
      // Smooth linear interpolation for buttery 60fps movement
      const target = mouseTargetRef.current;
      const current = mouseCurrentRef.current;
      
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      setMouseOffset({ x: current.x, y: current.y });
      rafIdRef.current = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafIdRef.current = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Handle scroll tracking for natural hero fade & lift
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardHoverChange = useCallback((hovered) => {
    setIsAnyCardHovered(hovered);
  }, []);

  // Parallax transform calculation for hero content on scroll
  const heroContentStyle = {
    transform: `translate3d(0, -${scrollY * 0.22}px, 0)`,
    opacity: Math.max(0, 1 - scrollY / 650),
    transition: 'transform 0.05s linear, opacity 0.05s linear',
  };

  return (
    <div className="app-root" id="home">
      {/* Background Ambient Glows & Grid */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-light-1"></div>
        <div className="ambient-light-2"></div>
        <div className="ambient-light-3"></div>
        <div className="ambient-grid"></div>
      </div>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Hero Section */}
      <main className="hero-wrapper">
        <section className="hero-container" aria-label="Hero Introduction">
          
          {/* Hero Left Content Column */}
          <div className="hero-content" style={heroContentStyle}>
            {/* Tag / Category */}
            <div className="hero-tag">
              <span className="hero-tag-dash" aria-hidden="true"></span>
              <span>DIGITAL SOLUTIONS</span>
            </div>

            {/* Main Headline (2 Rows) */}
            <h1 className="hero-title" id="hero-heading">
              <span className="title-line title-line-1">
                <span className="title-line-inner">
                  Redefining <span className="highlight-blue">Digital</span>
                </span>
              </span>
              <span className="title-line title-line-2">
                <span className="title-line-inner">
                  Experience<span className="title-dot">.</span>
                </span>
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="hero-description">
              Seamlessly integrating technology and creativity to facilitate out-of-the-box ideas to come to life. We craft high-performance digital ecosystems.
            </p>

            {/* Call to Action Buttons */}
            <div className="hero-cta-group">
              <a href="#contact" className="btn-primary" id="hero-cta-primary">
                <span>Start a Project</span>
                <span className="btn-arrow-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <a href="#work" className="btn-secondary" id="hero-cta-secondary">
                <span>Explore Our Work</span>
              </a>
            </div>
          </div>

          {/* Hero Right Visual Stage */}
          <div className="hero-stage" aria-hidden="false">
            {/* Background Orbital Rings & Nodes */}
            <OrbitsGraphic mouseOffset={mouseOffset} />

            {/* Cards Composition Cluster */}
            <div className={`cards-cluster ${isAnyCardHovered ? 'has-hover' : ''}`}>
              
              {/* Card 1: Web Development */}
              <ServiceCard
                id="card-web-dev"
                className="card-web"
                title="Web Development"
                subtitle="Scalable & Secure Web Solutions"
                depthFactor={0.8}
                mouseOffset={mouseOffset}
                onHoverChange={handleCardHoverChange}
                icon={
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="3.27 6.96 12 12.01 20.73 6.96"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="12"
                      y1="22.08"
                      x2="12"
                      y2="12"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              {/* Card 2: App Development */}
              <ServiceCard
                id="card-app-dev"
                className="card-app"
                title="App Development"
                subtitle="Powerful Mobile Experiences"
                depthFactor={1.25}
                mouseOffset={mouseOffset}
                onHoverChange={handleCardHoverChange}
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="3"
                      ry="3"
                      stroke="#A5B4FC"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="12"
                      y1="18"
                      x2="12.01"
                      y2="18"
                      stroke="#A5B4FC"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              {/* Card 3: Digital Marketing */}
              <ServiceCard
                id="card-digital-marketing"
                className="card-marketing"
                title="Digital Marketing"
                subtitle="Strategies that Drive Growth"
                depthFactor={1.05}
                mouseOffset={mouseOffset}
                onHoverChange={handleCardHoverChange}
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line
                      x1="6"
                      y1="20"
                      x2="6"
                      y2="14"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="12"
                      y1="20"
                      x2="12"
                      y2="9"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="18"
                      y1="20"
                      x2="18"
                      y2="4"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />

              {/* Client Trust Badge */}
              <ClientBadge mouseOffset={mouseOffset} />
            </div>
          </div>
        </section>
      </main>

      {/* Trusted Collaborations Section */}
      <CollaborationsSection />

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
