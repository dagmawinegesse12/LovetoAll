import type { PageId } from '../types';
import Ornament from './Ornament';

interface FooterProps {
  setPage: (p: PageId) => void;
}

interface FooterColProps {
  title: string;
  items: { label: string; go: PageId }[];
  setPage: (p: PageId) => void;
}

function FooterCol({ title, items, setPage }: FooterColProps) {
  return (
    <div>
      <div className="eyebrow" style={{ color: 'var(--paper)', marginBottom: 18 }}>{title}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it) => (
          <li key={it.label}>
            <button
              onClick={() => setPage(it.go)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                cursor: 'pointer',
                color: 'rgba(245,239,230,0.75)',
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
                transition: 'color 180ms',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--paper)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.75)')}
            >
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--paper)', marginTop: 80 }}>
      <div className="container" style={{ padding: '64px 20px 40px' }}>
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <span className="wordmark" style={{ fontSize: 28, color: 'var(--paper)' }}>Love to All</span>
              <Ornament width={140} color="var(--paper)" />
            </div>
            <p
              className="serif-italic"
              style={{ marginTop: 24, fontSize: 20, lineHeight: 1.4, maxWidth: 360, color: 'var(--paper)' }}
            >
              "I won't stop until <em>Love to All</em> is worn and read and felt in every city of every country."
            </p>
            <p className="eyebrow" style={{ marginTop: 16, color: 'rgba(245,239,230,0.6)' }}>— Marc, Founder</p>
          </div>

          <FooterCol
            title="Shop"
            setPage={setPage}
            items={[
              { label: 'All Products', go: 'shop' },
              { label: 'Tees', go: 'shop' },
              { label: 'Hoodies & Sweats', go: 'shop' },
              { label: 'Mothers Edition', go: 'shop' },
            ]}
          />

          <FooterCol
            title="The Brand"
            setPage={setPage}
            items={[
              { label: 'Our Mission', go: 'mission' },
              { label: 'Our Story', go: 'story' },
              { label: 'Impact Report', go: 'mission' },
              { label: 'Press', go: 'story' },
            ]}
          />

          {/* Newsletter */}
          <div>
            <div className="eyebrow" style={{ color: 'var(--paper)', marginBottom: 18 }}>Stay close</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(245,239,230,0.7)', marginBottom: 16 }}>
              Drops, impact updates, and the occasional handwritten note from Marc.
            </p>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(245,239,230,0.4)' }}>
              <input
                type="email"
                placeholder="email address"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--paper)',
                  padding: '12px 0',
                  fontSize: 14,
                  minHeight: 44,
                }}
              />
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--paper)',
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: 18,
                  minHeight: 44,
                  minWidth: 44,
                }}
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(245,239,230,0.15)',
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,230,0.55)',
        }}>
          <span>© 2026 Love to All Apparel · Founded in love.</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>TikTok</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
