import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Portrait subtle parallax
      if (portraitRef.current) {
        gsap.fromTo(portraitRef.current,
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      gsap.fromTo('.about-text-block',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.about-text-block', start: 'top 75%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(255,200,100,0.03) 0%, transparent 60%)',
      }}
      aria-label="About Farooq Khan"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Portrait column */}
          <div className="relative order-2 lg:order-1">
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                height: 'clamp(360px, 50vw, 600px)',
              }}
            >
              {/* Portrait glow */}
              <div className="portrait-glow" aria-hidden="true" />

              <img
                ref={portraitRef}
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Farooq Khan — Video Editor"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transformOrigin: 'center center',
                  filter: 'grayscale(20%) contrast(1.05)',
                }}
              />

              {/* Gradient mask */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(6,6,6,0.6) 0%, transparent 50%)',
                }}
              />

              {/* Floating meta card */}
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span className="status-dot" />
                <span className="font-sans" style={{ fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                  Open for projects
                </span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <p className="text-eyebrow about-text-block mb-6" style={{ opacity: reducedMotion ? 1 : 0 }}>About</p>

            <h2
              className="about-text-block"
              style={{
                fontSize: 'clamp(26px, 3.5vw, 48px)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '24px',
                opacity: reducedMotion ? 1 : 0,
              }}
            >
              Good editing isn't about<br className="hidden md:block" />
              adding more.{' '}
              <span className="font-serif italic" style={{ color: 'var(--text-secondary)' }}>
                It's about knowing<br className="hidden md:block" />what to remove.
              </span>
            </h2>

            <p
              className="text-body about-text-block mb-8"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              I'm Farooq Khan — a video editor based in India, specialising in long-form YouTube content,
              short-form reels, and podcast production. With 4+ years on the timeline and 300+ videos delivered,
              I've helped creators and brands build audiences through sharp storytelling and precise editing.
            </p>

            <p
              className="text-body about-text-block mb-10"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              My approach is straightforward: understand the story first, then build the edit around it.
              Great editing is invisible — it keeps people watching without them noticing why.
            </p>

            {/* Quick stats row */}
            <div
              className="about-text-block grid grid-cols-3 gap-6 pt-8"
              style={{
                borderTop: '1px solid var(--border-subtle)',
                opacity: reducedMotion ? 1 : 0,
              }}
            >
              {[
                { num: '4+', label: 'Years editing' },
                { num: '40+', label: 'Creators' },
                { num: '300+', label: 'Videos' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-sans font-light"
                    style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.04em', lineHeight: 1 }}
                  >
                    {stat.num}
                  </p>
                  <p className="metric-label mt-1" style={{ fontSize: '12px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
