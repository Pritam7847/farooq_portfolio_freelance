import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function VideoCard({ project, index, large = false }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Image scale on scroll
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion, index]);

  const setRef = (el) => {
    cardRef.current = el;
  };

  const handleMouseEnter = (e) => {
    if (reducedMotion) return;
    const card = e.currentTarget;
    gsap.to(card.querySelector('.vcard-inner'), {
      scale: 1.03,
      duration: 0.6,
      ease: 'power3.out',
    });
    document.body.classList.add('cursor-view');
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card.querySelector('.vcard-inner'), {
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
    document.body.classList.remove('cursor-view');
  };

  return (
    <article
      ref={setRef}
      className="video-card"
      style={{
        opacity: reducedMotion ? 1 : 0,
        height: large
          ? 'clamp(320px, 40vw, 560px)'
          : 'clamp(200px, 25vw, 340px)',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="vcard-inner" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'inherit' }}>
        <img
          ref={imgRef}
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Overlay */}
      <div className="video-card-overlay" />

      {/* Meta */}
      <div className="video-card-meta">
        <span className="index-label block mb-1">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <h3
          className="font-sans font-light text-white"
          style={{ fontSize: 'clamp(14px, 1.6vw, 20px)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {project.title}
        </h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>{project.client}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
          <span className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>{project.duration}</span>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
          <span className="text-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>{project.views}</span>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="vcard-arrow absolute top-4 right-4 flex items-center justify-center"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(8px)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{ fontSize: '14px', color: 'white', transform: 'rotate(-45deg)', display: 'block' }}>↑</span>
      </div>
    </article>
  );
}

export default function LongForm() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.longform-heading',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.longform-heading',
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const [featured, ...rest] = projects;

  return (
    <section
      ref={sectionRef}
      id="longform"
      className="section-padding"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
      aria-label="Long form work"
    >
      <div className="section-container">
        {/* Header */}
        <div className="longform-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16" style={{ opacity: reducedMotion ? 1 : 0 }}>
          <div>
            <p className="text-eyebrow mb-4">Selected long form</p>
            <h2
              className="font-sans font-light"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: 'var(--text-primary)',
              }}
            >
              Stories built<br />
              <span className="font-serif italic">to hold attention.</span>
            </h2>
          </div>
          <a
            href="#library"
            className="btn btn-secondary self-start md:self-auto"
            style={{ flexShrink: 0 }}
            onClick={(e) => { e.preventDefault(); document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            View all →
          </a>
        </div>

        {/* Featured large card */}
        <div className="mb-4 md:mb-5">
          <VideoCard project={featured} index={0} large />
        </div>

        {/* Grid of smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {rest.map((project, i) => (
            <VideoCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
