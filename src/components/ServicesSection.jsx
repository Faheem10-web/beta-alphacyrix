export default function ServicesSection() {
  const services = [
    {
      number: '01',
      title: 'Web Development',
      description: 'Scalable, secure websites and web applications built for performance.',
      iconVariant: 'icon-web',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="3.27 6.96 12 12.01 20.73 6.96"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="22.08"
            x2="12"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'App Development',
      description: 'Modern mobile applications designed for seamless user experiences.',
      iconVariant: 'icon-app',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="3"
            ry="3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="18"
            x2="12.01"
            y2="18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'UI/UX Design',
      description: 'Thoughtful, intuitive interfaces designed around real user needs.',
      iconVariant: 'icon-design',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L19 9L15 22L12 17L9 22L5 9L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="services-section" id="services" aria-labelledby="services-heading">
      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header">
          {/* Eyebrow Label with flanking horizontal rules */}
          <div className="services-eyebrow">
            <span className="eyebrow-line" aria-hidden="true"></span>
            <span className="eyebrow-text">OUR SERVICES</span>
            <span className="eyebrow-line" aria-hidden="true"></span>
          </div>

          {/* Main Heading */}
          <h2 className="services-title" id="services-heading">
            Digital solutions built <br />
            for <span className="highlight-blue">modern businesses.</span>
          </h2>

          {/* Supporting Text */}
          <p className="services-subtitle">
            We combine strategy, design and technology to create digital experiences that help businesses grow.
          </p>
        </div>

        {/* 3 Equal-Width Service Cards in 1 Row */}
        <div className="services-grid" role="list">
          {services.map((svc) => (
            <article
              key={svc.number}
              className="service-item-card"
              role="listitem"
              tabIndex={0}
              aria-label={`${svc.title} - ${svc.description}`}
            >
              <div className="service-card-top">
                {/* Small premium icon */}
                <div className={`service-icon-wrapper ${svc.iconVariant}`} aria-hidden="true">
                  {svc.icon}
                </div>

                {/* Small numbering */}
                <span className="service-number" aria-hidden="true">
                  {svc.number}
                </span>
              </div>

              {/* Service Content */}
              <div className="service-card-body">
                <h3 className="service-item-title">{svc.title}</h3>
                <p className="service-item-desc">{svc.description}</p>
              </div>

              {/* Bottom Explore Link with Arrow */}
              <div className="service-card-footer">
                <a href="#contact" className="service-explore-link">
                  <span>Explore Service</span>
                  <span className="service-link-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Corner Accents matching reference layout */}
        <div className="services-footer-accent" aria-hidden="true">
          <div className="accent-left">
            <span className="accent-code">// SERVICES</span>
            <span className="accent-line"></span>
          </div>
          <div className="accent-right">
            <span className="accent-line"></span>
            <div className="accent-words">
              <span>IDEAS</span>
              <span>TECHNOLOGY</span>
              <span>IMPACT</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
