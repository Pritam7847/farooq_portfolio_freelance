import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/hero/Hero';
import Metrics from './components/sections/Metrics';
import TrustedMarquee from './components/sections/TrustedMarquee';
import LongForm from './components/sections/LongForm';
import Shorts from './components/sections/Shorts';
import Library from './components/sections/Library';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Global GSAP defaults
    gsap.defaults({ ease: 'power3.out' });

    // Refresh ScrollTrigger when page is fully loaded
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <>
      {/* Atmospheric overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Navigation - Dynamic Island */}
      <Navbar />

      {/* Page content */}
      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Metrics */}
        <Metrics />

        {/* 3. Video Types Marquee */}
        <TrustedMarquee />

        {/* 4. Long Form Work */}
        <LongForm />

        {/* 5. Shorts / Reels */}
        <Shorts />

        {/* 6. Full Library */}
        <Library />

        {/* 7. Process */}
        <Process />

        {/* 8. About */}
        <About />

        {/* 9. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
