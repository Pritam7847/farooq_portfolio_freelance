import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shorts } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Fan card configurations
const cardConfigs = [
  { rotate: -18, x: -280, y: 30, scale: 0.82, zIndex: 1 },
  { rotate: -9,  x: -140, y: 10, scale: 0.9,  zIndex: 2 },
  { rotate: 0,   x: 0,    y: 0,  scale: 1,    zIndex: 5 },
  { rotate: 9,   x: 140,  y: 10, scale: 0.9,  zIndex: 2 },
  { rotate: 18,  x: 280,  y: 30, scale: 0.82, zIndex: 1 },
];

function ShortCard({ short, config, index, isCenter, onHover, isHovered, isAnyHovered }) {
  const cardRef = useRef(null);

  const opacity = isAnyHovered
    ? isHovered ? 1 : 0.4
    : 1;

  return (
    <div
      ref={cardRef}
      className="short-card"
      data-index={index}
      onClick={() => onHover(isHovered ? null : index)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        width: 'clamp(140px, 18vw, 220px)',
        height: 'clamp(240px, 32vw, 400px)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: isCenter ? '0 40px 80px rgba(0,0,0,0.7)' : '0 20px 40px rgba(0,0,0,0.5)',
        transform: `translateX(${config.x}px) translateY(${config.y}px) rotate(${config.rotate}deg) scale(${isHovered ? 1.05 : config.scale})`,
        zIndex: isHovered ? 10 : config.zIndex,
        opacity,
        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, box-shadow 0.4s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      aria-label={`Short: ${short.title}`}
    >
      <img
        src={short.thumbnail}
        alt={short.title}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
        }}
      />

      {/* Meta */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          transform: `rotate(-${config.rotate}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          className="font-sans text-white"
          style={{
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: '4px',
            letterSpacing: '-0.01em',
          }}
        >
          {short.title}
        </p>
        <p className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>
          {short.views} views
        </p>
      </div>

      {/* Center badge */}
      {isCenter && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '100px',
            padding: '4px 10px',
            fontSize: '9px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'white',
          }}
        >
          Featured
        </div>
      )}
    </div>
  );
}

export default function Shorts() {
  const sectionRef = useRef(null);
  const fanRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !fanRef.current) return;

    const ctx = gsap.context(() => {
      // Animate fan on scroll
      const cards = fanRef.current.querySelectorAll('.short-card');

      cards.forEach((card, i) => {
        const cfg = cardConfigs[i];

        // Initial state: collapsed
        gsap.set(card, {
          x: 0,
          rotate: 0,
          scale: 0.85,
          opacity: 0,
        });

        // Fan open animation on scroll
        ScrollTrigger.create({
          trigger: fanRef.current,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              x: cfg.x,
              y: cfg.y,
              rotate: cfg.rotate,
              scale: cfg.scale,
              opacity: 1,
              duration: 1.2,
              delay: 0.05 * i,
              ease: 'power4.out',
            });
          },
        });
      });

      // Subtle scroll-driven drift
      gsap.to(fanRef.current, {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="shorts"
      className="section-padding"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(100,80,200,0.04) 0%, transparent 70%)',
        overflow: 'hidden',
      }}
      aria-label="Shorts"
    >
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-eyebrow mb-4">Shorts / Reels</p>
            <h2
              className="font-sans font-light"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: 'var(--text-primary)',
              }}
            >
              Shorts that stop<br />
              <span className="font-serif italic">the scroll.</span>
            </h2>
          </div>
          <p
            className="text-body"
            style={{ maxWidth: '320px', fontSize: 'clamp(13px, 1.3vw, 15px)' }}
          >
            Hooks in the first second. Captions that carry the rhythm. Cuts timed to the beat.
          </p>
        </div>

        {/* Fan container */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(360px, 50vw, 520px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
          aria-label="Shorts fan display"
        >
          <div
            ref={fanRef}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {shorts.map((short, i) => (
              <ShortCard
                key={short.id}
                short={short}
                config={reducedMotion ? { rotate: 0, x: (i - 2) * 150, y: 0, scale: 1, zIndex: i } : cardConfigs[i]}
                index={i}
                isCenter={i === 2}
                onHover={setHoveredIndex}
                isHovered={hoveredIndex === i}
                isAnyHovered={hoveredIndex !== null}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-16 md:mt-20 pt-12"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {[
            { number: '15M+', label: 'Total short views' },
            { number: '50+', label: 'Shorts delivered' },
            { number: '4.8M', label: 'Best performing short' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p
                className="font-sans font-light"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}
              >
                {stat.number}
              </p>
              <p className="metric-label" style={{ fontSize: '13px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
