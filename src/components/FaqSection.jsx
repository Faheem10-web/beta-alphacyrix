import { useState, useRef, useEffect, memo } from 'react';

const faqItems = [
  {
    id: '01',
    question: 'What services does Alphacyrix provide?',
    answer:
      'We provide web development, mobile app development, ERP solutions, UI/UX design and digital marketing — creating scalable digital solutions for modern businesses.',
  },
  {
    id: '02',
    question: 'How do you approach a new project?',
    answer:
      'We follow a structured 4-stage methodology: Discovery & Architecture Planning, UI/UX Prototyping, Agile Development & Testing, and continuous Deployment & Post-launch Optimization.',
  },
  {
    id: '03',
    question: 'How can I start a project with Alphacyrix?',
    answer:
      'You can reach out through our "Start a project" form or book an introductory discovery call. We typically review your requirements and respond within 24 hours with an actionable roadmap.',
  },
];

function FaqSection() {
  const [activeId, setActiveId] = useState('01'); // First FAQ expanded by default
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const toggleFaq = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section
      className={`faq-section ${isVisible ? 'is-revealed' : ''}`}
      id="faqs"
      ref={sectionRef}
      aria-label="Frequently Asked Questions"
    >
      {/* Background Soft Blue Radial Lighting */}
      <div className="faq-bg-ambient" aria-hidden="true">
        <div className="faq-glow-radial"></div>
      </div>

      <div className="faq-container">
        {/* Header Block: Heading */}
        <div className="faq-header">
          <h2 className="faq-title">
            Common <span className="faq-title-accent">Inquiries</span>
          </h2>
        </div>

        {/* 3 Structured Horizontal FAQ Boxes */}
        <div className="faq-list" role="region" aria-label="FAQ Accordion">
          {faqItems.map((item, idx) => {
            const isExpanded = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-box ${isExpanded ? 'is-expanded' : ''}`}
                style={{ '--box-index': idx }}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>

                  <div className="faq-arrow-badge" aria-hidden="true">
                    <svg
                      className="faq-arrow-svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Diagonal arrow pointing up-right (↗) when collapsed, transitions smoothly */}
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </button>

                {/* Answer Area Inside Same Box */}
                <div
                  id={`faq-answer-${item.id}`}
                  className="faq-answer-wrapper"
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(FaqSection);
