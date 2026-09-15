import { memo } from 'react';

const trustedProjects = [
  {
    id: '01',
    name: 'Ambré Véil',
    tag: '2026 • Website',
    image: '/assets/project-1.jpg',
    imagePosition: 'center center',
    alt: 'Ambré Véil luxury digital flagship showcase',
  },
  {
    id: '02',
    name: 'Eulture',
    tag: '2026 • Website',
    image: '/assets/project-2.jpg',
    imagePosition: 'center 25%',
    alt: 'Eulture video platform interface',
  },
  {
    id: '03',
    name: 'Merkgrove',
    tag: '2026 • Website',
    image: '/assets/project-3.jpg',
    imagePosition: 'center center',
    alt: 'Merkgrove intelligent design platform',
  },
  {
    id: '04',
    name: 'Helic',
    tag: '2026 • Website',
    image: '/assets/project-4.jpg',
    imagePosition: 'center 42%',
    alt: 'Helic visitor intelligence analytics platform',
  },
];

function TrustedBySection() {
  return (
    <section className="trustedby-section" id="work" aria-labelledby="trustedby-heading">
      <div className="trustedby-container">
        {/* Section Header */}
        <div className="trustedby-header">
          <h2 className="trustedby-title" id="trustedby-heading">
            Featured <span className="trustedby-title-accent">Works</span>
          </h2>
        </div>

        {/* Clean 2×2 Card Grid */}
        <div className="trustedby-grid" role="list">
          {trustedProjects.map((project) => (
            <article className="trustedby-card" key={project.id} role="listitem">
              {/* Image Container with 4:3 Aspect Ratio and 16px radius */}
              <div className="trustedby-image-wrapper">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="trustedby-image"
                  style={{ objectPosition: project.imagePosition || 'center center' }}
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>

              {/* Card Content: Tag, Title & Action */}
              <div className="trustedby-content">
                <div className="trustedby-info-col">
                  <span className="trustedby-tag">{project.tag}</span>
                  <h3 className="trustedby-card-name">{project.name}</h3>
                </div>

                <div className="trustedby-card-footer">
                  <a
                    href="#contact"
                    className="trustedby-action-btn"
                    aria-label={`View ${project.name} case`}
                  >
                    <span className="trustedby-btn-text">View</span>
                    <span className="trustedby-arrow-circle" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(TrustedBySection);
