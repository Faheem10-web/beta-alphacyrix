import { useState, useRef, useCallback } from 'react';

export default function ServiceCard({
  id,
  className = '',
  title,
  subtitle,
  icon,
  depthFactor = 1,
  mouseOffset,
  onHoverChange,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Handle local 3D tilt on card hover
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within card
    const y = e.clientY - rect.top;  // y position within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate normalized -1 to 1 tilt, max 5 degrees
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  }, [onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (onHoverChange) onHoverChange(false);
  }, [onHoverChange]);

  // Global mouse parallax offset
  const parallaxX = (mouseOffset?.x || 0) * (depthFactor * 10);
  const parallaxY = (mouseOffset?.y || 0) * (depthFactor * 10);

  // Combine floating, parallax, and hover tilt
  const transformStyle = isHovered
    ? `translate3d(${parallaxX}px, ${parallaxY - 8}px, 30px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
    : `translate3d(${parallaxX}px, ${parallaxY}px, 0px) rotateX(0deg) rotateY(0deg)`;

  return (
    <div
      ref={cardRef}
      id={id}
      className={`service-card ${className} ${isHovered ? 'active-hover' : ''}`}
      style={{
        transform: transformStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="article"
      aria-label={`${title} - ${subtitle}`}
    >
      <div className="card-header">
        <div className="card-icon-box">
          {icon}
        </div>

        {/* 3 Activity / Signal Bars at top-right */}
        <div className="card-signal-bars" aria-hidden="true">
          <span className="signal-bar"></span>
          <span className="signal-bar"></span>
          <span className="signal-bar"></span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
      </div>

      {/* Action Chevron Circle Button */}
      <div className="card-action-btn" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 5L16 12L9 19"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
