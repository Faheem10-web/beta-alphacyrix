import { memo } from 'react';

function ClientBadge({ mouseOffset }) {
  const hasOffsetProp = mouseOffset && (mouseOffset.x !== 0 || mouseOffset.y !== 0);
  const transformStyle = hasOffsetProp
    ? `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px, 0)`
    : 'translate3d(calc(var(--mouse-x, 0) * 6px), calc(var(--mouse-y, 0) * 6px), 0)';

  return (
    <div
      className="client-badge"
      id="client-trust-badge"
      style={{
        transform: transformStyle,
      }}
      role="complementary"
      aria-label="Over 50 Happy Clients"
    >
      {/* Overlapping client avatars */}
      <div className="avatar-stack">
        <img
          src="/avatars/avatar-1.jpg"
          alt="Client portrait"
          className="avatar-item"
          width="32"
          height="32"
          loading="lazy"
        />
        <img
          src="/avatars/avatar-2.jpg"
          alt="Client portrait"
          className="avatar-item"
          width="32"
          height="32"
          loading="lazy"
        />
        <img
          src="/avatars/avatar-3.jpg"
          alt="Client portrait"
          className="avatar-item"
          width="32"
          height="32"
          loading="lazy"
        />
      </div>

      <div className="client-info">
        <span className="client-stat">50+</span>
        <span className="client-label">Happy Clients</span>
      </div>

      <div className="client-badge-arrow" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default memo(ClientBadge);
