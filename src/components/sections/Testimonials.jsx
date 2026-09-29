import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '../../data/clients';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
      aria-label="Testimonials"
    >
      <div className="section-container">
        <div className="mb-12 md:mb-16">
          <p className="text-eyebrow mb-4">Social proof</p>
          <h2
            className="font-sans font-light"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
            }}
          >
            What creators say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card glass-card"
              style={{
                padding: 'clamp(24px, 3vw, 40px)',
                opacity: reducedMotion ? 1 : 0,
              }}
            >
              {/* Quote */}
              <p
                className="font-sans font-light"
                style={{
                  fontSize: 'clamp(14px, 1.6vw, 18px)',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  marginBottom: '28px',
                }}
              >
                "{t.text}"
              </p>

              {/* Divider */}
              <hr className="hr-subtle mb-5" />

              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'var(--text-secondary)',
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p
                      className="font-sans"
                      style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
                    >
                      {t.name}
                    </p>
                    <p className="text-eyebrow" style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                      {t.handle}
                    </p>
                  </div>
                </div>

                {/* Metric pill */}
                <span
                  style={{
                    padding: '5px 12px',
                    borderRadius: '100px',
                    border: '1px solid rgba(74,222,128,0.2)',
                    background: 'rgba(74,222,128,0.05)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(74,222,128,0.8)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
