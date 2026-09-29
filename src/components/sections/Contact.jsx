import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  'YouTube long form',
  'Shorts and reels',
  'Podcast',
  'Brand film',
];

export default function Contact() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [formState, setFormState] = useState({ name: '', email: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
      gsap.fromTo('.contact-right',
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, delay: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,200,100,0.04) 0%, transparent 60%)',
      }}
      aria-label="Contact and booking"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — editorial headline */}
          <div
            className="contact-left"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <p className="text-eyebrow mb-8">Start a project</p>

            <h2
              style={{
                fontSize: 'clamp(44px, 7vw, 100px)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                marginBottom: '32px',
              }}
            >
              Let's make<br />your{' '}
              <span className="font-serif italic">
                next<br />video.
              </span>
            </h2>

            <p
              className="text-body mb-12"
              style={{ maxWidth: '340px', fontSize: 'clamp(14px, 1.4vw, 16px)' }}
            >
              Tell me what you're working on. I'll get back to you within a day.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="mailto:farooqkhan.edit@gmail.com"
                className="font-sans"
                style={{
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                farooqkhan.edit@gmail.com
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="font-sans"
                style={{
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                @farooqedits
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <div
            className="contact-right"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="form-field">
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder=" "
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  autoComplete="name"
                  required
                />
                <label htmlFor="name" className="form-label">Name</label>
                <div className="form-line" />
              </div>

              {/* Email */}
              <div className="form-field">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder=" "
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  autoComplete="email"
                  required
                />
                <label htmlFor="email" className="form-label">Email</label>
                <div className="form-line" />
              </div>

              {/* Project type */}
              <div className="mb-8">
                <p
                  className="font-sans mb-4"
                  style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}
                >
                  What are you making?
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`filter-pill ${selectedTypes.includes(type) ? 'active' : ''}`}
                      onClick={() => toggleType(type)}
                      aria-pressed={selectedTypes.includes(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="form-field">
                <textarea
                  id="details"
                  className="form-input"
                  placeholder=" "
                  rows={4}
                  value={formState.details}
                  onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                  style={{ resize: 'none', lineHeight: 1.6 }}
                />
                <label htmlFor="details" className="form-label">Project details</label>
                <div className="form-line" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full justify-center mt-6"
                style={{
                  background: submitted ? 'rgba(74,222,128,0.2)' : 'var(--text-primary)',
                  color: submitted ? 'rgba(74,222,128,0.9)' : 'var(--bg-primary)',
                  border: submitted ? '1px solid rgba(74,222,128,0.3)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                }}
              >
                {submitted ? '✓ Brief sent' : 'Send brief'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
