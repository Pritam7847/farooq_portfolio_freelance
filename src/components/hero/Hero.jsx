import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const floatingCards = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=75',
    style: { top: '12%', left: '3%', width: '200px', height: '130px' },
    rotateX: 6, rotateY: -12, depth: -60, delay: 0.2,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=75',
    style: { top: '55%', left: '1%', width: '170px', height: '110px' },
    rotateX: -8, rotateY: 10, depth: -30, delay: 0.4,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=75',
    style: { top: '78%', left: '8%', width: '150px', height: '200px' },
    rotateX: 4, rotateY: -8, depth: -80, delay: 0.15,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=400&q=75',
    style: { top: '8%', right: '4%', width: '190px', height: '120px' },
    rotateX: -6, rotateY: 14, depth: -50, delay: 0.3,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=75',
    style: { top: '42%', right: '2%', width: '160px', height: '105px' },
    rotateX: 8, rotateY: -10, depth: -40, delay: 0.5,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&q=75',
    style: { bottom: '10%', right: '6%', width: '180px', height: '240px' },
    rotateX: -4, rotateY: 8, depth: -70, delay: 0.25,
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

      {/* Floating Cards */}
      {!reducedMotion && floatingCards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardsRef.current[i] = el)}
          className="floating-card hidden lg:block"
          style={{
            ...card.style,
            transformStyle: 'preserve-3d',
          }}
          aria-hidden="true"
        >
          <img
            src={card.src}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Subtle overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
              borderRadius: 'inherit',
            }}
          />
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

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-body mx-auto mt-6 md:mt-8"
          style={{
            maxWidth: '480px',
            opacity: 0,
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            lineHeight: 1.8,
          }}
        >
          Long-form, shorts and podcasts crafted for creators,<br className="hidden md:block" />
          brands and ideas worth watching.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3 mt-10 md:mt-12"
          style={{ opacity: 0 }}
        >
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Book a call
          </a>
          <a
            href="#work"
            className="btn btn-secondary"
            onClick={(e) => { e.preventDefault(); document.getElementById('longform')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            See the work
            <span style={{ display: 'inline-block', transform: 'translateX(0)', transition: 'transform 0.3s ease' }}>→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div
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
        </div>
      </div>
    </section>
  );
}
