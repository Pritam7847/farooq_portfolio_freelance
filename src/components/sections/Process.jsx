import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Animated Color Grading UI
function ColorGradingUI() {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-sans)' }}>
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Colour & Grade
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff6b6b', '#ffd93d', '#6bcb77'].map((c, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Color wheels row */}
      <div className="flex gap-3 justify-center mb-4">
        {[
          { label: 'Shadows', hue: '220deg' },
          { label: 'Midtones', hue: '40deg' },
          { label: 'Highlights', hue: '50deg' },
        ].map((wheel) => (
          <div key={wheel.label} className="flex flex-col items-center gap-1">
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: `conic-gradient(hsl(${wheel.hue}, 70%, 55%), hsl(calc(${wheel.hue} + 60deg), 60%, 50%), hsl(calc(${wheel.hue} + 120deg), 70%, 55%), hsl(calc(${wheel.hue} + 180deg), 60%, 45%), hsl(calc(${wheel.hue} + 240deg), 70%, 55%), hsl(calc(${wheel.hue} + 300deg), 60%, 50%), hsl(${wheel.hue}, 70%, 55%))`,
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '30%',
                  borderRadius: '50%',
                  background: '#0c0c0c',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />
            </div>
            <span style={{ fontSize: '8px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
              {wheel.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sliders */}
      {[
        { label: 'Exposure', cls: 'slider-handle-1', fill: 'rgba(255,255,255,0.5)', value: '30%' },
        { label: 'Saturation', cls: 'slider-handle-2', fill: 'rgba(100,200,150,0.5)', value: '50%' },
        { label: 'Warmth', cls: 'slider-handle-3', fill: 'rgba(255,160,80,0.5)', value: '60%' },
      ].map((slider) => (
        <div key={slider.label} className="mb-3">
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>{slider.label}</span>
          </div>
          <div
            style={{
              height: '3px',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '2px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: slider.value,
                background: slider.fill,
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }}
            />
            <div
              className={slider.cls}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 0 6px rgba(0,0,0,0.6)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Animated Timeline UI
function TimelineUI() {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-sans)' }}>
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Timeline
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '7px', color: 'var(--text-secondary)' }}>◀◀</span>
          </div>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '7px', color: '#060606' }}>▶</span>
          </div>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '7px', color: 'var(--text-secondary)' }}>▶▶</span>
          </div>
        </div>
      </div>

      {/* Timeline tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' }}>
        {/* Playhead */}
        <div
          className="playhead"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(255,100,100,0.8)',
            zIndex: 10,
          }}
        />

        {/* Clip tracks */}
        {[
          { color: 'rgba(80,130,255,0.5)', clips: [{ w: '35%', l: '5%' }, { w: '28%', l: '45%' }, { w: '18%', l: '77%' }] },
          { color: 'rgba(80,200,150,0.4)', clips: [{ w: '50%', l: '2%' }, { w: '25%', l: '57%' }] },
          { color: 'rgba(255,160,60,0.4)', clips: [{ w: '20%', l: '10%' }, { w: '40%', l: '35%' }, { w: '22%', l: '76%' }] },
          { color: 'rgba(180,80,255,0.35)', clips: [{ w: '60%', l: '5%' }, { w: '28%', l: '68%' }] },
        ].map((track, ti) => (
          <div
            key={ti}
            style={{
              height: '18px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '3px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {track.clips.map((clip, ci) => (
              <div
                key={ci}
                style={{
                  position: 'absolute',
                  left: clip.l,
                  width: clip.w,
                  height: '100%',
                  background: track.color,
                  borderRadius: '2px',
                  border: `1px solid ${track.color.replace('0.', '0.8').replace('0.5', '0.8').replace('0.4', '0.8').replace('0.35', '0.8')}`,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3">
        {['0:00', '0:15', '0:30', '0:45', '1:00'].map((t) => (
          <span key={t} style={{ fontSize: '8px', color: 'var(--text-tertiary)' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// Export UI
function ExportUI() {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-sans)' }}>
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Export
        </span>
        <span style={{ fontSize: '9px', color: 'rgba(74,222,128,0.8)', letterSpacing: '0.06em' }}>Ready</span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>Rendering</span>
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>87%</span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
          <div className="progress-bar-animated" style={{ height: '100%', background: 'linear-gradient(90deg, rgba(255,255,255,0.6), white)', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Format chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['H.264', '4K', '60fps', 'AAC 320'].map((f) => (
          <span
            key={f}
            style={{
              padding: '3px 9px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '9px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      {/* Platform badges */}
      <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Optimised for
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[
          { name: 'YouTube', color: 'rgba(255,0,0,0.2)', border: 'rgba(255,0,0,0.3)' },
          { name: 'Shorts', color: 'rgba(255,0,0,0.2)', border: 'rgba(255,0,0,0.3)' },
          { name: 'Reels', color: 'rgba(180,0,180,0.2)', border: 'rgba(180,0,180,0.3)' },
          { name: 'LinkedIn', color: 'rgba(0,120,210,0.2)', border: 'rgba(0,120,210,0.3)' },
        ].map((p) => (
          <span
            key={p.name}
            style={{
              padding: '4px 10px',
              borderRadius: '100px',
              background: p.color,
              border: `1px solid ${p.border}`,
              fontSize: '9px',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.04em',
            }}
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// Caption UI
function CaptionUI() {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-sans)' }}>
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          Captions
        </span>
      </div>

      {/* Preview frame */}
      <div
        style={{
          aspectRatio: '9/5',
          background: '#1a1a1a',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '90%',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: 'clamp(10px, 1.5vw, 14px)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              lineHeight: 1.4,
            }}
          >
            ...every second matters.
          </span>
        </div>
      </div>

      {/* Caption tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {['every', 'second', 'matters'].map((word, i) => (
          <div
            key={word}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 8px',
              background: i === 1 ? 'rgba(255,255,255,0.08)' : 'transparent',
              borderRadius: '4px',
              border: i === 1 ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
            }}
          >
            <span style={{ fontSize: '8px', color: 'var(--text-tertiary)', width: '28px', flexShrink: 0 }}>
              0:{String(i * 15).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '10px', color: i === 1 ? 'white' : 'var(--text-secondary)' }}>
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    num: 'I',
    label: 'Discover',
    desc: 'Understanding the story, the audience, and the outcome before a single cut is made.',
    ui: <TimelineUI />,
  },
  {
    num: 'II',
    label: 'Edit',
    desc: 'Pacing, rhythm, and narrative structure. Every clip earns its place on the timeline.',
    ui: <TimelineUI />,
  },
  {
    num: 'III',
    label: 'Refine',
    desc: 'Colour, sound and captions. The details that separate good from exceptional.',
    ui: <ColorGradingUI />,
  },
  {
    num: 'IV',
    label: 'Deliver',
    desc: 'Optimised for every platform. Ready to publish, ready to perform.',
    ui: <ExportUI />,
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.process-heading',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: '.process-heading', start: 'top 80%', once: true },
        }
      );

      gsap.fromTo('.process-step-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.process-step-card', start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding"
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(255,200,100,0.03) 0%, transparent 70%)',
      }}
      aria-label="Editing process"
    >
      <div className="section-container">
        {/* Header */}
        <div className="process-heading mb-14 md:mb-20" style={{ opacity: reducedMotion ? 1 : 0 }}>
          <p className="text-eyebrow mb-4">How I work</p>
          <h2
            className="font-sans font-light"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--text-primary)',
            }}
          >
            The process.
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step-card process-card"
              style={{ opacity: reducedMotion ? 1 : 0 }}
            >
              {/* Step header */}
              <div
                style={{
                  padding: '24px 24px 16px',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span
                    className="font-serif italic"
                    style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="font-sans font-light text-white mt-1"
                    style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    {step.label}
                  </h3>
                </div>
                <span
                  className="font-sans"
                  style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.1em' }}
                >
                  0{i + 1} / 04
                </span>
              </div>

              {/* Animated UI */}
              <div style={{ background: '#080808', minHeight: '180px' }}>
                {step.ui}
              </div>

              {/* Description */}
              <div style={{ padding: '16px 24px 24px' }}>
                <p className="text-body" style={{ fontSize: 'clamp(13px, 1.3vw, 15px)' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
