import { memo } from 'react';

const pillars = [
  {
    number: '01',
    title: 'High Performance',
    description: 'Engineered for speed, stability and seamless user experiences.',
  },
  {
    number: '02',
    title: 'Highly Secure',
    description: 'Built with reliable technology and security-focused practices to protect data and business continuity.',
  },
  {
    number: '03',
    title: 'Fast Development',
    description: 'Agile, efficient and focused on delivering scalable digital solutions faster.',
  },
];

function CorePillarsSection() {
  return (
    <section className="pillars-section" id="pillars" aria-labelledby="pillars-heading">
      <div className="pillars-container">
        {/* Centered Section Header */}
        <div className="pillars-header">
          <h2 className="pillars-title" id="pillars-heading">
            Built for <span className="pillars-title-accent">Excellence.</span>
          </h2>

          <p className="pillars-subtitle">
            Our core pillars focus on the critical factors that drive modern enterprise growth and digital resilience.
          </p>
        </div>

        {/* 3 Equal Cards Row */}
        <div className="pillars-grid" role="list">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.number} role="listitem">
              <div className="pillar-card-top">
                {/* Small Numerical Label */}
                <div className="pillar-number-wrapper">
                  <span className="pillar-number">{pillar.number}</span>
                  <div className="pillar-divider-line" aria-hidden="true"></div>
                </div>

                {/* White Card Heading */}
                <h3 className="pillar-heading">{pillar.title}</h3>

                {/* Muted Blue-Gray Description */}
                <p className="pillar-description">{pillar.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(CorePillarsSection);


