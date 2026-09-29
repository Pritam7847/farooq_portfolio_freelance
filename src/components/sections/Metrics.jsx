import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { number: '300', suffix: '+', label: 'videos delivered' },
  { number: '4', suffix: '+', label: 'years on the timeline' },
  { number: '1%', prefix: 'Top', label: 'editors in India' },
];

function CountUp({ target, prefix = '', suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      if (el) el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const numericTarget = parseInt(target.replace(/\D/g, ''), 10);
    const isTopFormat = prefix === 'Top';

    if (isTopFormat) {
      el.textContent = `Top ${target}`;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          {
            val: numericTarget,
            duration,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = `${prefix}${Math.round(this.targets()[0].val)}${suffix}`;
            },
          }
        );
      },
    });

    return () => trigger.kill();
  }, [target, prefix, suffix, duration, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}{target}{suffix}
    </span>
  );
}

export default function Metrics() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.metric-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
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
      aria-label="Metrics"
    >
      <div className="section-container">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6"
          style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'clamp(60px, 8vw, 120px)' }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="metric-item flex flex-col gap-3 md:gap-4"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              {/* Number */}
              <div
                className="metric-number"
                style={{ fontSize: 'clamp(72px, 10vw, 140px)' }}
              >
                <CountUp
                  target={m.number}
                  prefix={m.prefix || ''}
                  suffix={m.suffix || ''}
                  duration={2}
                />
              </div>

              {/* Label */}
              <p
                className="metric-label"
                style={{ fontSize: 'clamp(15px, 1.6vw, 18px)' }}
              >
                {m.label}
              </p>

              {/* Divider on mobile */}
              {i < metrics.length - 1 && (
                <hr className="hr-subtle mt-4 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
