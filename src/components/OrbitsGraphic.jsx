import { memo } from 'react';

function OrbitsGraphic({ mouseOffset }) {
  // Supports direct prop fallback or CSS variables for zero re-render 60/120fps GPU parallax
  const hasOffsetProp = mouseOffset && (mouseOffset.x !== 0 || mouseOffset.y !== 0);
  const transformStyle = hasOffsetProp
    ? `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px, 0)`
    : 'translate3d(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px), 0)';

  return (
    <div 
      className="orbits-layer"
      style={{
        transform: transformStyle,
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      aria-hidden="true"
    >
      <svg
        className="orbits-svg"
        viewBox="0 0 700 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle blue gradient for orbit glow */}
          <linearGradient id="orbitGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter for traveling particles */}
          <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Path 1 (Outer Ellipse) */}
        <path
          id="orbitPathOuter"
          d="M 120 300 C 120 130, 260 30, 440 30 C 620 30, 720 150, 720 320 C 720 490, 580 570, 400 570 C 220 570, 120 470, 120 300 Z"
          className="orbit-ring orbit-ring-primary"
        />

        {/* Orbit Path 2 (Middle Ellipse) */}
        <path
          id="orbitPathMiddle"
          d="M 170 300 C 170 165, 280 85, 430 85 C 580 85, 660 185, 660 320 C 660 455, 550 520, 400 520 C 250 520, 170 435, 170 300 Z"
          className="orbit-ring orbit-ring-glow"
        />

        {/* Orbit Path 3 (Inner Ellipse) */}
        <path
          d="M 230 300 C 230 200, 310 140, 420 140 C 530 140, 600 215, 600 315 C 600 415, 520 465, 410 465 C 300 465, 230 400, 230 300 Z"
          className="orbit-ring"
        />

        {/* Orbit Static / Glowing Nodes matching reference */}
        {/* Static Blue glowing node on middle orbit */}
        <circle cx="178" cy="216" r="6.5" className="orbit-node-blue" />
        
        {/* Static Slate node on outer orbit */}
        <circle cx="184" cy="390" r="10.5" className="orbit-node-slate" />

        {/* Dynamic smooth traveling particle 1 on outer path */}
        <circle r="4.5" fill="#38BDF8" filter="url(#particleGlow)">
          <animateMotion
            dur="42s"
            repeatCount="indefinite"
            path="M 120 300 C 120 130, 260 30, 440 30 C 620 30, 720 150, 720 320 C 720 490, 580 570, 400 570 C 220 570, 120 470, 120 300 Z"
          />
        </circle>

        {/* Dynamic smooth traveling particle 2 on middle path */}
        <circle r="3.5" fill="#00D2FF" filter="url(#particleGlow)" opacity="0.85">
          <animateMotion
            dur="34s"
            begin="-16s"
            repeatCount="indefinite"
            path="M 170 300 C 170 165, 280 85, 430 85 C 580 85, 660 185, 660 320 C 660 455, 550 520, 400 520 C 250 520, 170 435, 170 300 Z"
          />
        </circle>

        {/* Top-Right Green Spark Diamond Accent */}
        <g transform="translate(630, 130)">
          <path
            d="M 0 -9 Q 0 0 9 0 Q 0 0 0 9 Q 0 0 -9 0 Q 0 0 0 -9 Z"
            className="spark-green"
          />
        </g>

        {/* Bottom Green Spark Diamond Accent */}
        <g transform="translate(420, 530)">
          <path
            d="M 0 -7.5 Q 0 0 7.5 0 Q 0 0 0 7.5 Q 0 0 -7.5 0 Q 0 0 0 -7.5 Z"
            className="spark-green"
          />
        </g>

        {/* Sketched looping connector arrow between cards */}
        <path
          d="M 440 365 C 460 380, 475 365, 490 368 C 505 371, 510 380, 520 375"
          className="sketch-arrow"
        />
        {/* Arrow head */}
        <path
          d="M 515 371 L 522 376 L 515 380"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Sketched arc and handwritten "Ideas into Impact" text */}
        <path
          d="M 540 420 C 565 390, 595 380, 640 370"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />
        <text
          x="555"
          y="375"
          className="sketch-note"
        >
          Ideas
        </text>
        <text
          x="570"
          y="402"
          className="sketch-note"
          style={{ fontSize: '20px' }}
        >
          Into Impact
        </text>
      </svg>

      {/* Center floating paper airplane disc badge */}
      <div 
        className="plane-disc" 
        id="plane-disc-badge"
        style={{
          transform: hasOffsetProp
            ? `translate3d(${mouseOffset.x * 4.8}px, ${mouseOffset.y * 4.8}px, 20px)`
            : 'translate3d(calc(var(--mouse-x, 0) * 4.8px), calc(var(--mouse-y, 0) * 4.8px), 20px)',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 2L11 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default memo(OrbitsGraphic);
