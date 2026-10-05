/**
 * 🍛 BIRYANI OVERLAY
 * ──────────────────────────────────────────────────────────────────
 * Remove this file and the import in App.jsx to restore the site.
 * ──────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500&display=swap');

  #biryani-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Subtle dark-red vignette */
  #biryani-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(120, 20, 0, 0.45) 100%);
    pointer-events: none;
  }

  /* Steam particles */
  .bo-particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .bo-particle {
    position: absolute;
    bottom: -10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 160, 50, 0.25);
    animation: bo-rise linear infinite;
  }

  @keyframes bo-rise {
    0%   { transform: translateY(0) scale(1);   opacity: 0.6; }
    50%  { transform: translateY(-40vh) scale(2); opacity: 0.3; }
    100% { transform: translateY(-100vh) scale(3); opacity: 0; }
  }

  /* Plate emoji */
  .bo-plate {
    font-size: clamp(4rem, 10vw, 7rem);
    animation: bo-float 3s ease-in-out infinite;
    margin-bottom: 0.5rem;
    filter: drop-shadow(0 0 24px rgba(255, 150, 30, 0.5));
  }

  @keyframes bo-float {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50%       { transform: translateY(-14px) rotate(3deg); }
  }

  /* Main headline */
  .bo-headline {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-weight: 700;
    font-size: clamp(2.4rem, 7vw, 5.5rem);
    color: #fff;
    text-align: center;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin: 0 1rem;
    text-shadow:
      0 0 40px rgba(255, 140, 0, 0.6),
      0 0 80px rgba(255, 80, 0, 0.25);
    animation: bo-glow 2.5s ease-in-out infinite alternate;
  }

  @keyframes bo-glow {
    from { text-shadow: 0 0 30px rgba(255, 140, 0, 0.5), 0 0 60px rgba(255, 80, 0, 0.2); }
    to   { text-shadow: 0 0 60px rgba(255, 160, 0, 0.9), 0 0 120px rgba(255, 100, 0, 0.4); }
  }

  /* Accent word */
  .bo-headline span {
    color: #ff9f1c;
  }

  /* Divider */
  .bo-divider {
    width: clamp(120px, 30vw, 260px);
    height: 1px;
    background: linear-gradient(90deg, transparent, #ff9f1c, transparent);
    margin: 1.6rem auto;
    animation: bo-fade 2s ease-in-out infinite alternate;
  }
  @keyframes bo-fade { from { opacity: 0.4; } to { opacity: 1; } }

  /* Sub-text */
  .bo-subtext {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.85rem, 2.5vw, 1.1rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
    text-align: center;
    letter-spacing: 0.04em;
    max-width: 520px;
    margin: 0 1.5rem;
    line-height: 1.7;
  }

  /* Pulsing badge */
  .bo-badge {
    margin-top: 2.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 159, 28, 0.12);
    border: 1px solid rgba(255, 159, 28, 0.35);
    border-radius: 999px;
    padding: 0.55rem 1.4rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: #ff9f1c;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    animation: bo-pulse 2s ease-in-out infinite;
  }
  @keyframes bo-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 159, 28, 0.3); }
    50%       { box-shadow: 0 0 0 10px rgba(255, 159, 28, 0); }
  }
  .bo-badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff9f1c;
    animation: bo-blink 1.2s ease-in-out infinite;
  }
  @keyframes bo-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
`;

// Generate steam particles
const PARTICLE_COUNT = 22;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${4 + Math.random() * 5}s`,
  size: `${4 + Math.random() * 8}px`,
}));

export default function BiryaniOverlay() {
  const styleRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('style');
    tag.id = 'biryani-overlay-styles';
    tag.textContent = styles;
    document.head.appendChild(tag);
    styleRef.current = tag;
    return () => tag.remove();
  }, []);

  return (
    <div id="biryani-overlay" role="dialog" aria-modal="true" aria-label="Biryani Demand">
      {/* Floating particles */}
      <div className="bo-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="bo-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Plate */}
      <div className="bo-plate" role="img" aria-label="Biryani plate">🍛</div>

      {/* Headline */}
      <h1 className="bo-headline">
        First Order <span>Biryani</span>,
        <br />
        Then Work Continues.
      </h1>

      {/* Divider */}
      <div className="bo-divider" />

      {/* Sub text */}
      <p className="bo-subtext">
        This page is on hold until the sacred dish is delivered.
        No Biryani&nbsp;= No portfolio. The choice is yours, my friend. 🫵
      </p>

      {/* Badge */}
      <div className="bo-badge">
        <span className="bo-badge-dot" />
        Waiting for Biryani…
      </div>
    </div>
  );
}
