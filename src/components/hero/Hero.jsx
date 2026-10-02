import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

import aeLogo from '../../assets/ae.png';
import capcutLogo from '../../assets/capcut.png';
import davinciLogo from '../../assets/davinci.png';
import finalcutLogo from '../../assets/finalcut.png';
import vnLogo from '../../assets/vn.png';

// Standalone floating software logos
const floatingCards = [
  {
    id: 1,
    name: 'Premiere Pro',
    style: { top: '12%', left: '4%' },
    rotateX: 6, rotateY: -12, depth: -60, delay: 0.2,
    logo: (
      <svg width="68" height="68" viewBox="0 0 100 100" fill="none" className="drop-shadow-2xl">
        <rect width="100" height="100" rx="24" fill="#00005B" />
        <text x="50" y="68" fontSize="50" fontWeight="900" fill="#9999FF" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="-2px">Pr</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'After Effects',
    style: { top: '56%', left: '2%' },
    rotateX: -8, rotateY: 10, depth: -30, delay: 0.4,
    logo: <img src={aeLogo} alt="After Effects" width="68" height="68" className="drop-shadow-2xl object-contain rounded-2xl" />,
  },
  {
    id: 3,
    name: 'DaVinci Resolve',
    style: { top: '80%', left: '7%' },
    rotateX: 4, rotateY: -8, depth: -80, delay: 0.15,
    logo: <img src={davinciLogo} alt="DaVinci Resolve" width="70" height="70" className="drop-shadow-2xl object-contain rounded-2xl" />,
  },
  {
    id: 4,
    name: 'CapCut',
    style: { top: '8%', right: '5%' },
    rotateX: -6, rotateY: 14, depth: -50, delay: 0.3,
    logo: <img src={capcutLogo} alt="CapCut" width="68" height="68" className="drop-shadow-2xl object-contain rounded-2xl" />,
  },
  {
    id: 5,
    name: 'VN Editor',
    style: { top: '44%', right: '3%' },
    rotateX: 8, rotateY: -10, depth: -40, delay: 0.5,
    logo: <img src={vnLogo} alt="VN Editor" width="68" height="68" className="drop-shadow-2xl object-contain rounded-2xl" />,
  },
  {
    id: 6,
    name: 'Final Cut Pro',
    style: { bottom: '10%', right: '6%' },
    rotateX: -4, rotateY: 8, depth: -70, delay: 0.25,
    logo: (
      <svg width="74" height="74" viewBox="0 0 100 100" fill="none" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="fcpRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#30D158" />
            <stop offset="25%" stopColor="#FFD60A" />
            <stop offset="50%" stopColor="#FF453A" />
            <stop offset="75%" stopColor="#BF5AF2" />
            <stop offset="100%" stopColor="#0A84FF" />
          </linearGradient>
        </defs>
        <g transform="rotate(-9 50 25)">
          <rect x="14" y="14" width="72" height="16" rx="4" fill="#2C2C2E" />
          <polygon points="20,14 30,30 22,30 12,14" fill="#E5E5EA" />
          <polygon points="40,14 50,30 42,30 32,14" fill="#E5E5EA" />
          <polygon points="60,14 70,30 62,30 52,14" fill="#E5E5EA" />
        </g>
        <rect x="14" y="32" width="72" height="54" rx="14" fill="#1C1C1E" stroke="#3A3A3C" strokeWidth="3" />
        <rect x="18" y="36" width="64" height="46" rx="10" fill="url(#fcpRainbow)" />
      </svg>
    ),
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headline1Ref = useRef(null);
  const headline2Ref = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial states
      gsap.set(eyebrowRef.current, { y: 20, opacity: 0 });
      gsap.set(headline1Ref.current, { y: 60, opacity: 0 });
      gsap.set(headline2Ref.current, { y: 50, opacity: 0 });
      gsap.set(bodyRef.current, { y: 30, opacity: 0, filter: 'blur(4px)' });
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cfg = floatingCards[i];
        gsap.set(card, {
          opacity: 0,
          z: cfg.depth - 100,
          rotateX: cfg.rotateX * 2,
          rotateY: cfg.rotateY * 2,
          scale: 0.85,
        });
      });

      // Animate sequence
      tl
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 1 }, 0.4)
        .to(headline1Ref.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 0.6)
        .to(headline2Ref.current, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }, 0.75)
        .to(bodyRef.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, 1.0)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.9 }, 1.15);

      // Cards staggered
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cfg = floatingCards[i];
        tl.to(card, {
          opacity: 1,
          z: cfg.depth,
          rotateX: cfg.rotateX,
          rotateY: cfg.rotateY,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, 0.2 + cfg.delay);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Mouse parallax
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const strength = 8 + i * 2;
        gsap.to(card, {
          x: dx * strength,
          y: dy * strength,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="hero-section"
      style={{ perspective: '1200px' }}
      aria-label="Hero"
    >
      {/* Background ambient */}
      <div className="hero-bg-gradient" aria-hidden="true" />

      {/* Standalone Floating Software Logos */}
      {!reducedMotion && floatingCards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[i] = el)}
          className="floating-card hidden lg:block cursor-pointer transition-transform duration-300 hover:scale-115"
          style={{
            ...card.style,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.65))',
          }}
          aria-label={card.name}
          title={card.name}
        >
          {card.logo}
        </div>
      ))}

      {/* Hero content */}
      <div
        className="relative z-10 text-center"
        style={{ maxWidth: '900px', padding: '0 clamp(24px, 5vw, 60px)' }}
      >
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-eyebrow mb-8 md:mb-10"
          style={{ opacity: 0 }}
        >
          Video Editor&nbsp;&nbsp;/&nbsp;&nbsp;Creative Storytelling
        </p>

        {/* Main headline */}
        <h1 className="mb-2 md:mb-3">
          <span
            ref={headline1Ref}
            className="text-display block"
            style={{
              fontSize: 'clamp(52px, 8vw, 112px)',
              opacity: 0,
              color: 'var(--text-primary)',
            }}
          >
            Edits that keep
          </span>
          <span
            ref={headline2Ref}
            className="text-display-serif block"
            style={{
              fontSize: 'clamp(54px, 8.5vw, 118px)',
              opacity: 0,
              color: 'var(--text-primary)',
            }}
          >
            people watching.
          </span>
        </h1>



        {/* CTA */}
        {/* <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3 mt-8 md:mt-12"
          style={{ opacity: 0 }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Contact Me
          </a>
          <a
            href="#work"
            className="btn btn-secondary"
            onClick={(e) => { e.preventDefault(); document.getElementById('longform')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            See the work
            <span style={{ display: 'inline-block', transform: 'translateX(0)', transition: 'transform 0.3s ease' }}>→</span>
          </a>
        </div> */}

        {/* Scroll indicator */}
        {/* <div
          className="flex flex-col items-center gap-2 mt-16 md:mt-20"
          style={{ color: 'var(--text-tertiary)' }}
          aria-hidden="true"
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))',
              animation: 'float-y 2s ease-in-out infinite',
            }}
          />
        </div> */}
      </div>
    </section>
  );
}
