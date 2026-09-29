import { useEffect, useState } from 'react';

// Project nav items for Farooq Khan's portfolio
const navItems = [
  {
    num: '01',
    name: 'Shorts',
    target: 'shorts',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Library',
    target: 'library',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Process',
    target: 'process',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'About',
    target: 'about',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'Contact',
    target: 'contact',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(id.toLowerCase());
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* DESKTOP NAVBAR (MD AND UP) */}
      <header className="hidden md:flex fixed top-6 left-0 right-0 z-[8000] justify-center px-3 pointer-events-none">
        <div
          className={`pointer-events-auto relative flex items-center justify-between transition-all duration-300 ease-out
            bg-[#0d0e12] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]
            rounded-full ${scrolled ? 'px-4 py-2' : 'px-5 py-2.5'} max-w-max overflow-hidden`}
        >
          {/* HOME BUTTON */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('top')}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1e2536] hover:bg-[#283248] text-white transition-all duration-200 cursor-pointer shadow-inner"
              aria-label="Home"
              title="Home"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <div className="w-px h-5 bg-white/20" />
          </div>

          {/* NAV ITEMS */}
          <nav className="flex items-center gap-6 px-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.target)}
                className="flex items-center gap-2 text-white hover:text-white/80 font-sans font-semibold text-sm tracking-tight transition-all duration-200 cursor-pointer group py-1"
              >
                <span className="text-white/80 group-hover:text-white group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* RIGHT SMILEY */}
          <div className="flex items-center gap-3 ml-2">
            <div className="w-px h-5 bg-white/20" />
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center w-9 h-9 rounded-full text-white hover:text-emerald-400 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Contact / Status"
              title="Get in touch!"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE TRIGGER BUTTON (< MD) */}
      <div className="md:hidden fixed top-5 right-5 z-[9999]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0e0f14]/90 border border-white/20 text-white shadow-2xl backdrop-blur-2xl active:scale-95 transition-all cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* FULL-SCREEN ULTRA-PREMIUM MOBILE OVERLAY */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[9998] bg-[#07080a]/98 backdrop-blur-3xl flex flex-col justify-between p-6 md:p-10 animate-in fade-in duration-300">
          {/* HEADER INSIDE OVERLAY */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-sans font-bold text-xs text-white">
                FK
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-sm text-white leading-none">Farooq Khan</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase mt-1">Available for work</span>
              </div>
            </div>
          </div>

          {/* MAIN NAV LIST */}
          <nav className="flex flex-col gap-2 my-auto py-8">
            <button
              onClick={() => scrollToSection('top')}
              className="group flex items-center justify-between py-4 border-b border-white/10 text-left cursor-pointer"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-white/30 group-hover:text-emerald-400 transition-colors">00</span>
                <span className="font-sans text-3xl font-light text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">Home</span>
              </div>
              <svg className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.target)}
                className="group flex items-center justify-between py-4 border-b border-white/10 text-left cursor-pointer"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-white/30 group-hover:text-emerald-400 transition-colors">{item.num}</span>
                  <span className="font-sans text-3xl font-light text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ))}
          </nav>

          {/* FOOTER INSIDE OVERLAY */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Get in touch</span>
              <a
                href="mailto:farooqkhan.edit@gmail.com"
                className="text-xs font-sans text-white/80 hover:text-white transition-colors"
              >
                farooqkhan.edit@gmail.com
              </a>
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-3.5 rounded-full bg-white text-black font-sans font-semibold text-sm text-center shadow-lg hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Book a call →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
