import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shorts } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Fan card configurations for 3 videos
const cardConfigs = [
  { rotate: -12, x: -180, y: 15, scale: 0.88, zIndex: 2 },
  { rotate: 0,   x: 0,    y: 0,  scale: 1,    zIndex: 5 },
  { rotate: 12,  x: 180,  y: 15, scale: 0.88, zIndex: 2 },
];

function ShortCard({ short, config, index, isCenter, onHover, isHovered, isAnyHovered, onOpenModal }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const opacity = isAnyHovered
    ? isHovered ? 1 : 0.4
    : 1;

  return (
    <div
      ref={cardRef}
      className="short-card"
      data-index={index}
      onClick={() => onOpenModal(short)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        width: 'clamp(140px, 18vw, 220px)',
        height: 'clamp(240px, 32vw, 400px)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: isHovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isHovered
          ? '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.1)'
          : isCenter
            ? '0 40px 80px rgba(0,0,0,0.7)'
            : '0 20px 40px rgba(0,0,0,0.5)',
        transform: `translateX(${config.x}px) translateY(${config.y}px) rotate(${config.rotate}deg) scale(${isHovered ? 1.05 : config.scale})`,
        zIndex: isHovered ? 10 : config.zIndex,
        opacity,
        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      aria-label={`Play Short: ${short.title}`}
    >
      {short.video ? (
        <video
          ref={videoRef}
          src={short.video}
          poster={short.thumbnail}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            display: 'block',
          }}
        />
      ) : (
        <img
          src={short.thumbnail}
          alt={short.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      )}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Play Icon overlay on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '2px' }}>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>

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
          pointerEvents: 'none',
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
        <p className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px' }}>
          {short.views} views • {short.client || 'Short'}
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
            pointerEvents: 'none',
          }}
        >
          Featured
        </div>
      )}
    </div>
  );
}

// Modal component for viewing short video with sound & controls
function VideoModal({ short, onClose }) {
  const modalVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
      modalVideoRef.current.play().catch(() => {
        setIsMuted(true);
      });
    }
  }, [short, isMuted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        modalVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      const nextMute = !isMuted;
      modalVideoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  if (!short) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '380px',
          height: 'min(82vh, 680px)',
          borderRadius: '24px',
          overflow: 'hidden',
          background: '#09090b',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 50px 100px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background 0.2s ease',
          }}
        >
          ✕
        </button>

        {/* Video container */}
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
          {short.video ? (
            <video
              ref={modalVideoRef}
              src={short.video}
              poster={short.thumbnail}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onClick={togglePlay}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          ) : (
            <img
              src={short.thumbnail}
              alt={short.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {/* Overlay controls */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
            }}
          >
            {/* Top info */}
            <div>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {short.client || 'Reels / Short'}
              </span>
            </div>

            {/* Bottom info & controls */}
            <div style={{ pointerEvents: 'auto' }}>
              <h3
                className="font-sans font-light text-white mb-1"
                style={{ fontSize: '18px', letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                {short.title}
              </h3>
              <p className="text-eyebrow mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                {short.views} views • Loop playback
              </p>

              <div className="flex items-center gap-3">
                {/* Play / Pause button */}
                <button
                  onClick={togglePlay}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>

                {/* Mute / Unmute button */}
                <button
                  onClick={toggleMute}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    background: isMuted ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {isMuted ? '🔇 Unmute' : '🔊 Sound On'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shorts() {
  const sectionRef = useRef(null);
  const fanRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeModalShort, setActiveModalShort] = useState(null);
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
                config={reducedMotion ? { rotate: 0, x: (i - 1) * 180, y: 0, scale: 1, zIndex: i } : cardConfigs[i]}
                index={i}
                isCenter={i === 1}
                onHover={setHoveredIndex}
                isHovered={hoveredIndex === i}
                isAnyHovered={hoveredIndex !== null}
                onOpenModal={setActiveModalShort}
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

      {/* Video Modal Player */}
      {activeModalShort && (
        <VideoModal short={activeModalShort} onClose={() => setActiveModalShort(null)} />
      )}
    </section>
  );
}

