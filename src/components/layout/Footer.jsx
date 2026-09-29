export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(40px, 6vw, 80px) 0',
      }}
      aria-label="Footer"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-sans"
                style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}
              >
                Farooq Khan
              </span>
              <span
                className="font-serif italic"
                style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}
              >
                editor
              </span>
            </div>
            <p
              className="font-sans"
              style={{ fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}
            >
              Long-form · Shorts · Podcasts · Brands
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 md:gap-8">
              {['Work', 'Shorts', 'Library', 'Process', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-sans"
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                      letterSpacing: '0.04em',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { label: 'YouTube', href: '#' },
              { label: 'Twitter', href: '#' },
              { label: 'Instagram', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                style={{
                  fontSize: '12px',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-12 pt-6"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p
            className="font-sans"
            style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}
          >
            © {year} Farooq Khan. All rights reserved.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}
          >
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
