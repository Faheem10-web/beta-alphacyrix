import { useState, useEffect, useRef, memo } from 'react';

// Authentic Technology SVGs (Vector, retina-ready, international grade)
const TechIcons = {
  react: (
    <svg width="30" height="30" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  nextjs: (
    <svg width="28" height="28" viewBox="0 0 180 180" fill="none">
      <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" r="90" fill="#000" />
      </mask>
      <g mask="url(#mask-next)">
        <circle cx="90" cy="90" r="90" fill="#FFFFFF" />
        <path
          d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
          fill="#000000"
        />
        <rect x="115" y="54" width="12" height="72" fill="#000000" />
      </g>
    </svg>
  ),
  typescript: (
    <svg width="28" height="28" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M62.6 71.4c-2.3 2.5-4.8 4.4-7.5 5.7-2.7 1.3-5.7 2-8.9 2-4.2 0-7.7-1.3-10.4-3.8-2.7-2.5-4-5.9-4-10.2 0-4.4 1.4-7.9 4.2-10.5 2.8-2.6 6.5-3.9 11-3.9 3.2 0 6 .6 8.5 1.8 2.5 1.2 4.7 2.9 6.6 5.1l7.8-8.5c-3.1-3.4-6.8-6-11-7.7-4.3-1.8-9.2-2.7-14.8-2.7-6.2 0-11.8 1.4-16.7 4.3-4.9 2.8-8.8 6.8-11.6 11.9-2.8 5.1-4.2 11-4.2 17.8 0 6.6 1.4 12.5 4.3 17.6 2.8 5.1 6.8 9.1 11.9 12 5.1 2.9 10.9 4.3 17.5 4.3 6.1 0 11.5-1.1 16.2-3.4 4.7-2.3 8.7-5.5 12.1-9.6l-10.9-4.8zm51.4-30.8H78.9v12.2h15.9v47.8h13.2V52.8h15.9V40.6z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  tailwind: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  ),
  sass: (
    <svg width="28" height="28" viewBox="0 0 128 128">
      <path
        d="M64 4C30.9 4 4 30.9 4 64s26.9 60 60 60 60-26.9 60-60S97.1 4 64 4zm36.5 75.3c-1.4 6.7-7.2 10.9-15.6 11.5-12.8.9-20.9-6.3-21.2-18.4-.2-10 6.6-17.7 17.5-19.7 7.4-1.3 15.6.8 17.3 8.3.3 1.5-.7 2.4-2.1 2.3-4.2-.3-8.8-1.4-13-.8-6.1.9-9.1 4.8-8.8 10.6.3 5.4 4.5 9.1 10.1 8.8 6.4-.3 10.8-3.7 11.7-9.8.2-1.3 1.2-1.9 2.2-1.6l2.9 1.1c-.2 2.6-.5 5.2-1 7.7zm-41.9-5.4c-4.4 7.6-11.8 12-20.4 11.2-9.4-.9-15.5-7.9-14.8-17.1.6-8.9 7.6-15.9 16.7-16.6 8.5-.7 15.5 3.3 19.3 10.9.8 1.6.4 2.8-1.1 3.5l-3.2 1.6c-1.2.6-2.2.1-2.9-1.1-2.2-4.2-5.9-6.5-10.7-6.2-5.6.3-9.9 4.6-10.3 10.1-.4 5.8 3.5 10.6 9.2 11.1 5.2.5 9.6-1.9 12.3-6.4.7-1.1 1.7-1.6 2.9-1l3.3 1.6c1.3.7 1.6 1.8 1 3.4z"
        fill="#CF649A"
      />
    </svg>
  ),
  nodejs: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2.5L3.876 9.5v14L16 30.5l12.124-7v-14L16 2.5z"
        stroke="#5FA04E"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.5V23.5M10 12l6 3.5 6-3.5"
        stroke="#5FA04E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  nestjs: (
    <svg width="28" height="28" viewBox="0 0 256 256" fill="none">
      <path
        d="M239.5 98.3c-2.4-7.5-6.8-14.2-12.8-19.3L157.9 17.5c-7.3-6.2-17.1-9.6-27.1-9.5-10.1.1-19.8 3.7-27 10.1L33.7 79.5C27.5 84.7 23 91.5 20.7 99c-2.3 7.6-2.3 15.7 0 23.3 2.3 7.5 6.8 14.2 12.8 19.3l68.8 61.5c7.3 6.2 17.1 9.6 27.1 9.5 10.1-.1 19.8-3.7 27-10.1l70.1-62.4c6.2-5.2 10.7-12 13-19.5 2.3-7.6 2.3-15.7 0-22.3z"
        fill="#E0234E"
      />
      <path
        d="M141.5 86.8c-1.8 1.4-3.2 3.1-4.2 5.1-1 2-1.5 4.3-1.4 6.6.1 4.5 2.2 8.8 5.7 11.6l23.4 18.7c2.8 2.2 4.5 5.6 4.6 9.2.1 3.6-1.4 7-4.1 9.4-2.7 2.4-6.3 3.6-9.9 3.4-3.6-.2-6.9-1.8-9.3-4.4l-14.7-15.8c-1.3-1.4-3.1-2.3-5-2.5-1.9-.2-3.8.3-5.3 1.5-1.5 1.2-2.5 2.9-2.8 4.8-.3 1.9.2 3.8 1.3 5.4l14.7 15.8c4.6 4.9 10.9 7.9 17.6 8.3 6.7.4 13.3-1.9 18.3-6.3 5-4.4 8-10.7 8.3-17.4.3-6.7-2.3-13.2-7.1-17.9L158 108.4c-2.8-2.2-4.5-5.6-4.6-9.2-.1-3.6 1.4-7 4.1-9.4 2.7-2.4 6.3-3.6 9.9-3.4 3.6.2 6.9 1.8 9.3 4.4l10.8 11.6c1.3 1.4 3.1 2.3 5 2.5 1.9.2 3.8-.3 5.3-1.5 1.5-1.2 2.5-2.9 2.8-4.8.3-1.9-.2-3.8-1.3-5.4l-10.8-11.6c-4.6-4.9-10.9-7.9-17.6-8.3-6.7-.5-13.4 1.8-18.4 6.1z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  postgresql: (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
        fill="#336791"
        fillOpacity="0.15"
      />
      <path
        d="M45.5 32.5c-.8-5.3-4.2-9.7-9.5-11-2.4-.6-5.2-.6-7.8.2-5.8 1.8-9.8 7-10.2 13.1-.3 4.8 1.8 9.5 5.6 12.5 1.2 1 2.6 1.7 4.1 2.1v4.6h3.6V49c2.3-.2 4.5-.9 6.4-2.1 4.5-2.8 7.3-7.8 7.8-14.4z"
        stroke="#4183C4"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="27" r="2.2" fill="#4183C4" />
      <path d="M36 38c2-1 4-3 5-6" stroke="#4183C4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  restApi: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="5" width="28" height="22" rx="6" stroke="#0070F3" strokeWidth="2" fill="rgba(0, 112, 243, 0.12)" />
      <path
        d="M8.5 19V13h2.6c1.1 0 1.9.8 1.9 1.8 0 .8-.5 1.4-1.2 1.7l1.5 2.5H12l-1.3-2.3h-1v2.3H8.5zm1.2-3.3h1.3c.5 0 .9-.3.9-.8 0-.4-.4-.7-.9-.7H9.7v1.5zm5.5 3.3V13h3.8v1.1h-2.6v1.4h2.3v1.1h-2.3v1.3h2.7v1.1h-3.9zm5.3 0v-1.1c.7.4 1.5.6 2.2.6.7 0 1.1-.3 1.1-.7 0-1-.3-1.1-1.7-1.5-1.5-.4-2.4-.9-2.4-2.1 0-1.1.9-2 2.5-2 .8 0 1.6.2 2.2.6v1.1c-.6-.4-1.4-.6-2.1-.6-.8 0-1.2.3-1.2.7 0 .9.4 1.1 1.8 1.5 1.6.4 2.3.9 2.3 2.1 0 1.2-.9 2-2.6 2-.8 0-1.6-.2-2.1-.5z"
        fill="#0070F3"
      />
    </svg>
  ),
  graphql: (
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
      <path
        d="M50 12L83 31V69L50 88L17 69V31L50 12Z"
        stroke="#E10098"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M50 12V88M17 31L83 69M83 31L17 69"
        stroke="#E10098"
        strokeWidth="3.5"
      />
      <circle cx="50" cy="12" r="6" fill="#E10098" />
      <circle cx="83" cy="31" r="6" fill="#E10098" />
      <circle cx="83" cy="69" r="6" fill="#E10098" />
      <circle cx="50" cy="88" r="6" fill="#E10098" />
      <circle cx="17" cy="69" r="6" fill="#E10098" />
      <circle cx="17" cy="31" r="6" fill="#E10098" />
    </svg>
  ),
  aws: (
    <svg width="34" height="26" viewBox="0 0 100 60" fill="none">
      <text x="10" y="32" fill="#FFFFFF" fontSize="26" fontWeight="bold" letterSpacing="-1">
        aws
      </text>
      <path
        d="M12 42C28 52 56 53 78 40"
        stroke="#FF9900"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M74 37L82 40L78 46"
        stroke="#FF9900"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gcp: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
      <path
        d="M38.5 28.5C38.5 23.8 34.7 20 30 20c-.5 0-1 .05-1.5.15C27.2 15.4 22.5 12 17 12c-7.2 0-13 5.8-13 13 0 1.2.16 2.35.46 3.44C2 29.5 0 32.2 0 35.5 0 39.6 3.4 43 7.5 43h30c4.1 0 7.5-3.4 7.5-7.5 0-3.3-2.1-6-5.1-7"
        stroke="#4285F4"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17" cy="25" r="4" fill="#EA4335" />
      <circle cx="28" cy="27" r="3.5" fill="#FBBC05" />
      <circle cx="34" cy="35" r="3" fill="#34A853" />
    </svg>
  ),
  docker: (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="7" y="10" width="3" height="3" fill="#2496ED" rx="0.5" />
      <rect x="11" y="10" width="3" height="3" fill="#2496ED" rx="0.5" />
      <rect x="15" y="10" width="3" height="3" fill="#2496ED" rx="0.5" />
      <rect x="11" y="6" width="3" height="3" fill="#2496ED" rx="0.5" />
      <rect x="15" y="6" width="3" height="3" fill="#2496ED" rx="0.5" />
      <rect x="19" y="10" width="3" height="3" fill="#2496ED" rx="0.5" />
      <path
        d="M29 15.5c-.7-.5-2.2-.6-3.4-.2-.5-1.5-1.8-2.6-3.4-2.8l-.5.2c-.4 1.2-.2 2.5.4 3.5-1.2.7-3.2.8-6.1.8H4c-.6 2.5.5 5.2 2.6 6.8 2.8 2.1 6.8 2.2 12.8 2.2 6.5 0 10.4-2.8 12.2-7.5.9.1 1.7-.3 2.1-.9.4-.6.3-1.4-.7-2.1z"
        fill="#2496ED"
      />
    </svg>
  ),
  cicd: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M6 9v12" />
    </svg>
  ),
  terraform: (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
      <path d="M24 22.8L41.3 12.8V32.8L24 42.8V22.8Z" fill="#844FBA" />
      <path d="M44 32.8L61.3 22.8V42.8L44 52.8V32.8Z" fill="#844FBA" fillOpacity="0.8" />
      <path d="M24 45.5L41.3 35.5V55.5L24 65.5V45.5Z" fill="#844FBA" fillOpacity="0.9" />
      <path d="M4 11.2L21.3 1.2V21.2L4 31.2V11.2Z" fill="#844FBA" />
    </svg>
  ),
  kubernetes: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        stroke="#326CE5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="#326CE5" strokeWidth="1.8" />
      <path
        d="M12 2v7M12 15v7M3 7l6 3.5M15 13.5l6 3.5M21 7l-6 3.5M9 13.5L3 17"
        stroke="#326CE5"
        strokeWidth="1.6"
      />
    </svg>
  ),
};

const ecosystemCards = [
  {
    id: 'frontend',
    number: '01',
    category: 'Frontend',
    iconType: 'code',
    techItems: [
      { name: 'React', icon: TechIcons.react },
      { name: 'Next.js', icon: TechIcons.nextjs },
      { name: 'TypeScript', icon: TechIcons.typescript },
      { name: 'Tailwind CSS', icon: TechIcons.tailwind },
      { name: 'Sass', icon: TechIcons.sass },
    ],
  },
  {
    id: 'backend',
    number: '02',
    category: 'Backend',
    iconType: 'database',
    techItems: [
      { name: 'Node.js', icon: TechIcons.nodejs },
      { name: 'NestJS', icon: TechIcons.nestjs },
      { name: 'PostgreSQL', icon: TechIcons.postgresql },
      { name: 'REST APIs', icon: TechIcons.restApi },
      { name: 'GraphQL', icon: TechIcons.graphql },
    ],
  },
  {
    id: 'infrastructure',
    number: '03',
    category: 'Infrastructure',
    iconType: 'cloud',
    techItems: [
      { name: 'AWS', icon: TechIcons.aws },
      { name: 'GCP', icon: TechIcons.gcp },
      { name: 'Docker', icon: TechIcons.docker },
      { name: 'CI/CD', icon: TechIcons.cicd },
      { name: 'Terraform', icon: TechIcons.terraform },
      { name: 'Kubernetes', icon: TechIcons.kubernetes },
    ],
  },
];

function TechnicalEcosystemSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  return (
    <section
      className={`tech-ecosystem-section ${isVisible ? 'is-revealed' : ''}`}
      id="technology"
      ref={sectionRef}
      aria-label="Technical Ecosystem"
    >
      {/* Background Subtle Tech Grid & Radial Glow */}
      <div className="tech-bg-effects" aria-hidden="true">
        <div className="tech-ambient-glow"></div>
        <div className="tech-orbital-lines">
          <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="780" cy="300" r="320" stroke="rgba(0, 112, 243, 0.08)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="780" cy="300" r="480" stroke="rgba(0, 112, 243, 0.05)" strokeWidth="1" />
            <circle cx="780" cy="300" r="620" stroke="rgba(0, 112, 243, 0.03)" strokeWidth="1" />
            <path d="M 400 300 C 600 150, 750 450, 950 300" stroke="rgba(0, 140, 255, 0.06)" strokeWidth="1" />
          </svg>
        </div>
        <div className="tech-ambient-dots">
          <span className="tech-dot dot-1"></span>
          <span className="tech-dot dot-2"></span>
          <span className="tech-dot dot-3"></span>
        </div>
      </div>

      <div className="tech-ecosystem-container">
        {/* LEFT COLUMN: Section Header & Feature Rows */}
        <div className="tech-left-col">
          {/* Eyebrow */}
          <div className="tech-eyebrow">
            <span className="tech-eyebrow-line" aria-hidden="true"></span>
            <span>TECHNOLOGY</span>
          </div>

          {/* Large Headline */}
          <h2 className="tech-headline">
            Technical
            <br />
            <span className="tech-headline-accent">Ecosystem</span>
          </h2>

          {/* Supporting Text */}
          <p className="tech-supporting-text">
            We build robust digital systems using modern technologies, scalable architecture and future-ready infrastructure.
          </p>

          {/* Compact Feature Rows */}
          <div className="tech-feature-rows">
            {/* Feature 01: Interconnected Logic */}
            <div className="tech-feature-row">
              <div className="tech-feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {/* Branching Connected Nodes */}
                  <circle cx="6" cy="18" r="2.5" fill="#0070F3" />
                  <circle cx="6" cy="6" r="2.5" fill="#0070F3" />
                  <circle cx="18" cy="12" r="2.5" fill="#0070F3" />
                  <path
                    d="M6 8.5v7M6 8.5c0 3.5 12 3.5 12 3.5"
                    stroke="#0070F3"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="tech-feature-info">
                <h3 className="tech-feature-title">Interconnected Logic</h3>
                <p className="tech-feature-desc">Systems that work together, seamlessly.</p>
              </div>
              <div className="tech-feature-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 02: Scalable Technology */}
            <div className="tech-feature-row">
              <div className="tech-feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {/* Curly Code Brackets */}
                  <path
                    d="M8 5C7 5 6 6 6 7.5v2C6 11 5 12 4 12c1 0 2 1 2 2.5v2C6 18 7 19 8 19M16 5c1 0 2 1 2 2.5v2c0 1.5 1 2.5 2 2.5-1 0-2 1-2 2.5v2c0 1.5-1 2.5-2 2.5"
                    stroke="#0070F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="tech-feature-info">
                <h3 className="tech-feature-title">Scalable Technology</h3>
                <p className="tech-feature-desc">Modern architecture built for growing digital products.</p>
              </div>
              <div className="tech-feature-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 Equal-Height Technology Cards */}
        <div className="tech-cards-grid">
          {ecosystemCards.map((card, idx) => (
            <div
              key={card.id}
              className={`tech-card ${hoveredCardId === card.id ? 'is-active' : ''}`}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{ '--card-index': idx }}
            >
              {/* Card Top Row: Minimal Blue Icon + Number */}
              <div className="tech-card-header">
                <div className="tech-card-icon-container">
                  {card.iconType === 'code' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                      <line x1="14" y1="4" x2="10" y2="20"></line>
                    </svg>
                  )}
                  {card.iconType === 'database' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    </svg>
                  )}
                  {card.iconType === 'cloud' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                    </svg>
                  )}
                </div>
                <span className="tech-card-num">{card.number}</span>
              </div>

              {/* Title */}
              <div className="tech-card-body">
                <h3 className="tech-card-title">{card.category}</h3>
              </div>

              {/* Technology Items Grid */}
              <div className="tech-items-grid">
                {card.techItems.map((tech) => (
                  <div key={tech.name} className="tech-item" title={tech.name}>
                    <div className="tech-item-icon-wrapper">{tech.icon}</div>
                    <span className="tech-item-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TechnicalEcosystemSection);
