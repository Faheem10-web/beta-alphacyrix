import { useState, useEffect, useRef, useMemo } from 'react';

export default function CollaborationsSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardElementsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Animation & Drag state refs (no re-renders for buttery 60/120fps)
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const stageWidthRef = useRef(1200);

  // 5 Brand Definitions
  const baseBrands = useMemo(
    () => [
      {
        id: 'optic',
        name: 'optic',
        logo: (
          <div className="brand-logo-optic">
            <svg
              className="brand-icon-optic"
              width="38"
              height="26"
              viewBox="0 0 38 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="13" r="9.5" fill="#151733" stroke="#252a5c" strokeWidth="1.2" />
              <circle cx="22" cy="13" r="9.5" fill="#1d4ed8" fillOpacity="0.7" />
              <circle cx="22" cy="13" r="8.5" fill="url(#opticGradScroll)" />
              <circle cx="17" cy="13" r="4.2" fill="#38bdf8" fillOpacity="0.85" filter="url(#opticGlowScroll)" />
              <defs>
                <radialGradient
                  id="opticGradScroll"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(22 13) scale(8.5)"
                >
                  <stop stopColor="#38bdf8" />
                  <stop offset="0.6" stopColor="#2563eb" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#1e3a8a" stopOpacity="0.3" />
                </radialGradient>
                <filter id="opticGlowScroll" x="9" y="5" width="16" height="16" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
              </defs>
            </svg>
            <span className="brand-text-optic">optic</span>
          </div>
        ),
      },
      {
        id: 'tomo',
        name: 'TOMO',
        logo: (
          <div className="brand-logo-tomo">
            <svg
              className="brand-icon-tomo"
              width="126"
              height="28"
              viewBox="0 0 126 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4H26V9.2H17.8V24H12.2V9.2H4V4Z" fill="white" />
              <rect x="31" y="4.5" width="22" height="19" rx="6" stroke="white" strokeWidth="5" />
              <path
                d="M58 4H64L71.5 16.5L79 4H85V24H79.8V12L73.2 22.5H69.8L63.2 12V24H58V4Z"
                fill="white"
              />
              <rect x="90" y="4.5" width="22" height="19" rx="6" stroke="white" strokeWidth="5" />
            </svg>
          </div>
        ),
      },
      {
        id: 'dq',
        name: 'DQ',
        logo: (
          <div className="brand-logo-dq">
            <svg
              className="brand-icon-dq"
              width="88"
              height="34"
              viewBox="0 0 88 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4H22C31 4 37 9.5 37 17C37 24.5 31 30 22 30H6V4ZM13.5 9.5V24.5H21.5C26.5 24.5 29.8 21.5 29.8 17C29.8 12.5 26.5 9.5 21.5 9.5H13.5Z"
                fill="white"
              />
              <rect x="4" y="14.5" width="11" height="5" fill="#0b0b0e" />
              <path
                d="M48 4H64C73 4 79 9.5 79 17C79 21.5 76.5 25.5 72.8 27.8L80 34H72.5L67 29.5C66 29.8 65 30 64 30H48C39 30 33 24.5 33 17C33 9.5 39 4 48 4ZM49.5 9.5C44.5 9.5 41 12.5 41 17C41 21.5 44.5 24.5 49.5 24.5H62.5C67.5 24.5 71 21.5 71 17C71 12.5 67.5 9.5 62.5 9.5H49.5Z"
                fill="white"
              />
              <rect x="42" y="14.5" width="11" height="5" fill="#0b0b0e" />
            </svg>
          </div>
        ),
      },
      {
        id: 'quantec',
        name: 'Quantec',
        logo: (
          <div className="brand-logo-quantec">
            <svg
              className="brand-icon-quantec"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="15" cy="15" r="10.5" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
              <circle cx="15" cy="15" r="4.2" fill="white" />
              <path d="M21 21L27 27" stroke="white" strokeWidth="3.4" strokeLinecap="round" />
            </svg>
            <span className="brand-text-quantec">Quantec</span>
          </div>
        ),
      },
      {
        id: 'stellar',
        name: 'stellar',
        logo: (
          <div className="brand-logo-stellar">
            <svg
              className="brand-icon-stellar"
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(16, 16)">
                <path
                  d="M-2 -13C3 -13 6 -9 6 -5C6 -1 2 2 -2 2C-6 2 -7 -1 -7 -5C-7 -9 -4 -13 -2 -13Z"
                  fill="white"
                />
                <path
                  d="M13 -2C13 3 9 6 5 6C1 6 -2 2 -2 -2C-2 -6 1 -7 5 -7C9 -7 13 -4 13 -2Z"
                  fill="white"
                />
                <path
                  d="M2 13C-3 13 -6 9 -6 5C-6 1 -2 -2 2 -2C6 -2 7 1 7 5C7 9 4 13 2 13Z"
                  fill="white"
                />
                <path
                  d="M-13 2C-13 -3 -9 -6 -5 -6C-1 -6 2 -2 2 2C2 6 -1 7 -5 7C-9 7 -13 4 -13 2Z"
                  fill="white"
                />
              </g>
            </svg>
            <span className="brand-text-stellar">stellar</span>
          </div>
        ),
      },
    ],
    []
  );

  // 4 sets of 5 brands = 20 cards for seamless loop buffer
  const totalCards = useMemo(() => {
    return [
      ...baseBrands.map((b) => ({ ...b, uid: `${b.id}-0` })),
      ...baseBrands.map((b) => ({ ...b, uid: `${b.id}-1` })),
      ...baseBrands.map((b) => ({ ...b, uid: `${b.id}-2` })),
      ...baseBrands.map((b) => ({ ...b, uid: `${b.id}-3` })),
    ];
  }, [baseBrands]);

  // Card dimensions & spacing constants
  const CARD_WIDTH = 228;
  const CARD_GAP = 22;
  const ITEM_STRIDE = CARD_WIDTH + CARD_GAP; // 250px
  const TOTAL_WIDTH = totalCards.length * ITEM_STRIDE; // 5000px
  const BASE_SPEED = 0.75; // px per frame at 60fps

  // Intersection observer for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  // Track stage container width for 3D projection calculations
  useEffect(() => {
    const updateStageWidth = () => {
      if (stageRef.current) {
        stageWidthRef.current = stageRef.current.clientWidth;
      }
    };

    updateStageWidth();
    window.addEventListener('resize', updateStageWidth, { passive: true });
    return () => window.removeEventListener('resize', updateStageWidth);
  }, []);

  // Total width ref for drag wrapping consistency
  const totalWidthRef = useRef(5000);

  // Main 3D Cylindrical Marquee Animation Loop
  useEffect(() => {
    const animate = () => {
      const stageWidth = stageWidthRef.current;
      const isMobile = stageWidth < 768;
      const cardWidth = isMobile ? 160 : 216;
      const cardGap = isMobile ? 24 : 44; // Generous 44px spacing between all cards
      const itemStride = cardWidth + cardGap; // 260px stride
      const totalWidth = totalCards.length * itemStride;
      totalWidthRef.current = totalWidth;

      const centerX = stageWidth / 2;
      const arcRadius = Math.max(520, stageWidth * 0.58);

      // If not paused or dragging, increment continuous drift
      if (!isPausedRef.current && !isDraggingRef.current) {
        scrollPosRef.current += BASE_SPEED;
        if (scrollPosRef.current >= totalWidth) {
          scrollPosRef.current -= totalWidth;
        }
      }

      // Apply smooth drag inertia when released
      if (!isDraggingRef.current && Math.abs(dragVelocityRef.current) > 0.05) {
        scrollPosRef.current -= dragVelocityRef.current;
        dragVelocityRef.current *= 0.92; // friction dampening
        if (scrollPosRef.current < 0) scrollPosRef.current += totalWidth;
        if (scrollPosRef.current >= totalWidth) scrollPosRef.current -= totalWidth;
      }

      // Project each card onto the 3D cylindrical arc in real time
      for (let i = 0; i < totalCards.length; i++) {
        const cardElem = cardElementsRef.current[i];
        if (!cardElem) continue;

        const rawX = i * itemStride - scrollPosRef.current;

        // Wrap relative to center in [-totalWidth / 2, totalWidth / 2]
        let relX = ((rawX - centerX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
        const cardCenterX = centerX + relX;

        // Normalized distance from center (-1 on left bound to +1 on right bound)
        const normalized = relX / arcRadius;

        // Cull cards that are far offstage
        if (Math.abs(normalized) > 1.35) {
          cardElem.style.visibility = 'hidden';
          continue;
        }

        cardElem.style.visibility = 'visible';

        // 3D Cylindrical curve geometry:
        // Gentle, elegant 14-degree inward tilt that preserves wide spacing between all cards
        const rotY = -normalized * 14;
        const transZ = -Math.abs(normalized) * (isMobile ? 24 : 38);
        const transY = Math.abs(normalized) * (isMobile ? 1.5 : 3);

        cardElem.style.transform = `translate3d(${cardCenterX - cardWidth / 2}px, ${transY}px, ${transZ}px) rotateY(${rotY}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [totalCards.length, BASE_SPEED]);

  // Pointer drag interactions (swipe / scrub)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    dragStartXRef.current = currentX;

    scrollPosRef.current -= deltaX;
    const currentTotalWidth = totalWidthRef.current;
    if (scrollPosRef.current < 0) scrollPosRef.current += currentTotalWidth;
    if (scrollPosRef.current >= currentTotalWidth) scrollPosRef.current -= currentTotalWidth;

    // Velocity tracking for inertia
    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    lastDragTimeRef.current = now;
    dragVelocityRef.current = (deltaX / dt) * 12;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`collab-arc-section ${isVisible ? 'is-visible' : ''}`}
      id="collaborations"
      aria-label="Trusted by 100+ companies"
    >
      <div className="collab-arc-container">
        
        {/* Centered Minimal Header */}
        <div className="collab-arc-header">
          <p className="collab-arc-eyebrow">
            <span className="collab-eyebrow-light">Trusted by </span>
            <span className="collab-eyebrow-accent">100+ companies</span>
          </p>
        </div>

        {/* 3D Curved Cards Stage Wrap */}
        <div
          className={`collab-arc-stage-wrap ${isDragging ? 'is-dragging' : ''}`}
          ref={stageRef}
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="collab-arc-stage scroll-mode">
            {totalCards.map((brand, index) => (
              <div
                key={brand.uid}
                ref={(el) => (cardElementsRef.current[index] = el)}
                className="collab-arc-card scrolling-card"
                tabIndex={0}
                role="group"
                aria-label={`${brand.name} logo`}
              >
                <div className="collab-arc-card-inner">
                  <div className="collab-card-surface-glare" aria-hidden="true"></div>
                  <div className="collab-card-logo-container">
                    {brand.logo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
