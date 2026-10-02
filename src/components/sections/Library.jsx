import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, shorts } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Brand Film', 'Podcast', 'Brands', 'Shorts'];

const allItems = [...projects, ...shorts];

export default function Library() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(allItems);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const filterItems = (cat) => {
    if (reducedMotion) {
      setActiveCategory(cat);
      setVisible(cat === 'All' ? allItems : allItems.filter(i => i.category === cat));
      return;
    }

    const newItems = cat === 'All' ? allItems : allItems.filter(i => i.category === cat);

    // Animate out
    gsap.to(gridRef.current?.querySelectorAll('.lib-card') || [], {
      opacity: 0,
      y: 20,
      stagger: 0.04,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(cat);
        setVisible(newItems);
      },
    });
  };

  // Animate in when visible changes
  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.lib-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: 'power4.out' }
    );
  }, [visible, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.lib-heading',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.lib-heading', start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="library"
      className="section-padding"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
      aria-label="Full video library"
    >
      <div className="section-container">
        {/* Header */}
        <div className="lib-heading mb-12 md:mb-16" style={{ opacity: reducedMotion ? 1 : 0 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-eyebrow mb-4">The full library</p>
              <h2
                className="font-sans font-light"
                style={{
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: 'var(--text-primary)',
                }}
              >
                Every cut.<br />
                <span className="font-serif italic">Every story.</span>
              </h2>
            </div>

            {/* Stats */}
            <div className="flex gap-10">
              <div>
                <p className="font-sans font-light" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                  6
                </p>
                <p className="metric-label" style={{ fontSize: '12px' }}>featured videos</p>
              </div>
              <div>
                <p className="font-sans font-light" style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                  300+
                </p>
                <p className="metric-label" style={{ fontSize: '12px' }}>total edits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Availability indicator + filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Open for projects */}
          <div
            className="flex items-center gap-2 pill-tag self-start"
            style={{ color: 'rgba(74,222,128,0.9)', borderColor: 'rgba(74,222,128,0.15)', background: 'rgba(74,222,128,0.05)' }}
          >
            <span className="status-dot" />
            <span>Open for projects · 2025</span>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => filterItems(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Orbital / Featured visual + Grid layout */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Featured left */}
          <div
            className="relative xl:w-2/5 flex-shrink-0"
            style={{
              height: 'clamp(340px, 42vw, 500px)',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0d0d0d',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {visible[0] && (
              <>
                {visible[0].video ? (
                  <video
                    src={visible[0].video}
                    poster={visible[0].thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={visible[0].thumbnail}
                    alt={visible[0].title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />

                {/* Orbital ring decoration */}
                <div
                  className="absolute hidden xl:block"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    top: '20px',
                    right: '-80px',
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.04)',
                      position: 'absolute',
                      top: '40px',
                      left: '40px',
                    }}
                  />
                </div>

                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <p className="text-eyebrow mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Featured</p>
                  <h3
                    className="font-sans font-light text-white"
                    style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', letterSpacing: '-0.03em', lineHeight: 1.2 }}
                  >
                    {visible[0].title}
                  </h3>
                  <p className="text-eyebrow mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {visible[0].client} · {visible[0].views} views
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Grid right */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5 flex-1"
          >
            {visible.slice(1).map((item, i) => (
              <div
                key={`${item.id}-${activeCategory}`}
                className="lib-card video-card glass-card-hover"
                style={{
                  height: 'clamp(320px, 40vw, 480px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    poster={item.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  }}
                />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <p
                    className="font-sans text-white font-light"
                    style={{ fontSize: 'clamp(10px, 1.2vw, 13px)', letterSpacing: '-0.01em', lineHeight: 1.3 }}
                  >
                    {item.title}
                  </p>
                  <p className="text-eyebrow mt-0.5" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px' }}>
                    {item.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
