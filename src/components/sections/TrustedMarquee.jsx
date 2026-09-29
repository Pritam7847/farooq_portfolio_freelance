import { videoTypes } from '../../data/clients';

// Repeat items for seamless continuous marquee loop
const marqueeItems = [...videoTypes, ...videoTypes, ...videoTypes];

export default function TrustedMarquee() {
  return (
    <section
      className="section-padding py-14 md:py-20 overflow-hidden"
      aria-label="Video formats and editing services"
    >
      <div className="section-container mb-8 md:mb-12">
        <p className="text-eyebrow mb-3 text-white/50 tracking-widest uppercase font-mono text-xs">
          EXPERTISE & FORMATS
        </p>
        <h2
          className="font-sans font-light tracking-tight"
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
          }}
        >
          Specialized in editing <br />
          <span className="font-serif italic text-white/60">
            high-performance content formats.
          </span>
        </h2>
      </div>

      {/* SINGLE MARQUEE ROW */}
      <div className="marquee-fade overflow-hidden relative py-4" aria-hidden="true">
        <div className="marquee-track flex gap-4 md:gap-6 items-center">
          {marqueeItems.map((item, i) => (
            <div
              key={`type-${i}`}
              className="group flex items-center gap-3.5 px-6 py-3.5 rounded-full bg-[#131418] border border-white/15 hover:border-white/40 hover:bg-[#1a1b22] transition-all duration-300 flex-shrink-0 shadow-lg"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                {item.icon}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-sans font-semibold text-sm md:text-base text-white tracking-tight">
                  {item.name}
                </span>
                <span className="text-[11px] text-emerald-400/90 font-mono tracking-wider uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
