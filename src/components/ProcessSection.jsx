import { useState, useEffect, useRef } from 'react';

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardId, setActiveCardId] = useState('02'); // Default featured card is 02

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const processSteps = [
    {
      id: '01',
      number: '01',
      title: 'Discovery & Planning',
      description:
        'We understand your goals, requirements and audience to define a clear direction for the project.',
    },
    {
      id: '02',
      number: '02',
      title: 'Design & Prototyping',
      description:
        'We transform ideas into thoughtful UI/UX experiences and interactive prototypes that bring the vision to life.',
    },
    {
      id: '03',
      number: '03',
      title: 'Development & Delivery',
      description:
        'Our developers build fast, scalable and reliable digital solutions with attention to every detail.',
    },
    {
      id: '04',
      number: '04',
      title: 'Launch & Growth',
      description:
        'We launch, monitor and continuously improve the product to support long-term business growth.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`process-section ${isVisible ? 'is-visible' : ''}`}
      id="process"
      aria-label="Our Work Process - The Methodology"
    >
      {/* Ambient background glow & subtle grid */}
      <div className="process-ambient-bg" aria-hidden="true">
        <div className="process-radial-glow"></div>
        <div className="process-grid-pattern"></div>
      </div>

      <div className="process-container">
        
        {/* Header Row */}
        <div className="process-header">
          <div className="process-header-left">
            <div className="process-eyebrow">
              <span className="process-eyebrow-line" aria-hidden="true"></span>
              <span className="process-eyebrow-text">THE METHODOLOGY</span>
            </div>
            <h2 className="process-main-title">
              <span className="title-row">We Follow Our</span>
              <span className="title-row">
                Work <span className="process-highlight">Process</span>
              </span>
            </h2>
          </div>

          <div className="process-header-right">
            <p className="process-supporting-text">
              A structured approach to turn ideas into impactful digital solutions, from concept to continuous improvement.
            </p>
            <div className="process-action-badge">
              <a href="#contact" className="process-arrow-btn" aria-label="Explore Our Process">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <div className="process-arrow-caption">
                <span>OUR</span>
                <span>PROCESS</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Horizontal Grid */}
        <div className="process-cards-grid" role="list">
          {processSteps.map((step, index) => {
            const isFeatured = activeCardId === step.id;

            return (
              <div
                key={step.id}
                role="listitem"
                className={`process-card ${isFeatured ? 'is-featured' : ''}`}
                style={{ '--card-order': index }}
                onClick={() => setActiveCardId(step.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCardId(step.id);
                  }
                }}
                tabIndex={0}
                aria-selected={isFeatured}
              >
                {/* Card Surface Inner */}
                <div className="process-card-inner">
                  {/* Subtle top glare */}
                  <div className="process-card-glare" aria-hidden="true"></div>

                  <div className="process-card-header">
                    <span className="process-card-number">{step.number}</span>
                  </div>

                  <div className="process-card-content">
                    <h3 className="process-card-title">{step.title}</h3>
                    <p className="process-card-description">{step.description}</p>
                  </div>

                  <div className="process-card-footer">
                    <div className="process-card-plus-btn" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Bar */}
        <div className="process-bottom-bar">
          <div className="process-divider-line" aria-hidden="true"></div>
          
          <div className="process-bottom-content">
            <div className="process-bottom-brand">
              <span className="brand-name">ALPHACYRIX</span>
              <span className="brand-dot" aria-hidden="true">.</span>
            </div>

            <div className="process-bottom-tagline">
              <span className="tagline-blue-line" aria-hidden="true"></span>
              <span className="tagline-text">
                IDEAS <span className="slash">/</span> DESIGN <span className="slash">/</span> DEVELOPMENT <span className="slash">/</span> GROWTH
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
