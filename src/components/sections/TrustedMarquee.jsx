import { videoTypes } from '../../data/clients';

const track = [...videoTypes, ...videoTypes, ...videoTypes];

export default function TrustedMarquee() {
  return (
    <section
      className="overflow-hidden"
      style={{ paddingTop: 'clamp(32px, 5vw, 64px)', paddingBottom: 'clamp(32px, 5vw, 64px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      aria-label="Video formats and editing services"
    >
      {/* SECTION HEADER */}
      <div className="section-container mb-10 md:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase mb-2">Expertise & Formats</p>
            <h2
              className="font-sans font-light"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}
            >
              Every format.{' '}
              <span className="font-serif italic" style={{ color: 'var(--text-secondary)' }}>
                Every platform.
              </span>
            </h2>
          </div>
          <p className="text-sm text-white/40 font-sans max-w-xs leading-relaxed">
            From long-form podcasts to viral shorts — built for retention.
          </p>
        </div>
      </div>

      {/* SINGLE MARQUEE ROW */}
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-3"
          style={{ animation: 'marquee-left 28s linear infinite', width: 'max-content', padding: '8px 0' }}
        >
          {track.map((item, i) => (
            <div
              key={`t-${i}`}
              className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03]"
              style={{ whiteSpace: 'nowrap' }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="font-sans font-medium text-sm text-white/90 tracking-tight">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
