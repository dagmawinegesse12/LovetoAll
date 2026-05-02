import type { PageId } from '../../types';
import { PRODUCTS } from '../../data/products';
import Ornament from '../Ornament';
import ProductCard from '../ProductCard';

interface HomePageProps {
  setPage: (p: PageId) => void;
  viewProduct: (id: string) => void;
  addToCart: (product: (typeof PRODUCTS)[0]) => void;
  headline: string;
  showRibbon: boolean;
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
        {n}
      </div>
      <div className="eyebrow" style={{ marginTop: 8 }}>{label}</div>
    </div>
  );
}

function ImpactCard({
  location,
  amount,
  note,
  date,
  highlight = false,
}: {
  location: string;
  amount: string;
  note: string;
  date: string;
  highlight?: boolean;
}) {
  return (
    <div style={{
      background: highlight ? 'var(--ink)' : 'var(--paper)',
      color: highlight ? 'var(--paper)' : 'var(--ink)',
      padding: 28,
      border: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="eyebrow" style={{ color: highlight ? 'rgba(245,239,230,0.7)' : 'var(--ink-mute)' }}>{location}</span>
        <span className="eyebrow" style={{ color: highlight ? 'rgba(245,239,230,0.7)' : 'var(--ink-mute)' }}>{date}</span>
      </div>
      <div className="serif" style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 500, letterSpacing: '-0.02em' }}>{amount}</div>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: highlight ? 'rgba(245,239,230,0.85)' : 'var(--ink-soft)' }}>{note}</p>
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: highlight ? '1px solid rgba(245,239,230,0.2)' : '1px solid var(--line)' }}>
        <span className="eyebrow" style={{ color: highlight ? 'var(--rose)' : 'var(--rose-deep)' }}>♡ Funded by you</span>
      </div>
    </div>
  );
}

export default function HomePage({ setPage, viewProduct, headline, showRibbon }: HomePageProps) {
  const featured = PRODUCTS.slice(0, 4);
  const headlineParts = headline.split(/\.\s*/).filter(Boolean);

  return (
    <div className="page-enter">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-grid">
        {/* Image pane */}
        <div
          className="hero-image-pane"
          style={{ backgroundImage: 'url(/assets/photos/founder-amor-tee.jpg)' }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(14,14,14,0.45) 0%, rgba(14,14,14,0.15) 50%, transparent 100%)',
          }} />
          <div style={{ position: 'absolute', top: 24, left: 24, color: 'var(--paper)' }}>
            <div className="eyebrow" style={{ color: 'rgba(245,239,230,0.85)' }}>Founder · Marc Delgado</div>
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: 'var(--paper)' }}>
            <p className="serif-italic" style={{ fontSize: 'clamp(18px, 3vw, 24px)', maxWidth: 360, lineHeight: 1.3, opacity: 0.95 }}>
              "Every shirt is a conversation. Every conversation lifts a household."
            </p>
          </div>
        </div>

        {/* Text pane */}
        <div className="hero-text-pane">
          <div className="eyebrow" style={{ marginBottom: 20 }}>A clothing brand with a purpose</div>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(48px, 8vw, 104px)',
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}
          >
            {headlineParts[0]}.<br />
            <em style={{ fontWeight: 400 }}>{headlineParts[1] ? headlineParts[1] + '.' : ''}</em>
          </h1>
          <Ornament width={200} />
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 460, marginTop: 28 }}>
            Love to All is a clothing brand that takes its profits and gives them to single mother
            households. Every tee, hoodie, and sweat you wear funds a kitchen, a coat, a tank of
            gas, a Christmas morning.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => setPage('shop')}>Shop the collection</button>
            <button className="btn btn-ghost" onClick={() => setPage('mission')}>Read our mission</button>
          </div>

          <div className="stat-grid">
            <Stat n="247" label="Households supported" />
            <Stat n="$48k" label="Donated to date" />
            <Stat n="14" label="Cities reached" />
          </div>
        </div>
      </section>

      {/* ── MISSION RIBBON ──────────────────────────────── */}
      {showRibbon && (
        <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '20px 0', overflow: 'hidden' }}>
          <div className="marquee-track">
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 48,
                  paddingRight: 48,
                  whiteSpace: 'nowrap',
                }}
              >
                {['Love to all mothers', 'Love to all fathers', 'Love to all kids', 'Love to all neighbors', 'Love to all'].map((t, j) => (
                  <span key={j} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
                    <span className="serif-italic" style={{ fontSize: 'clamp(22px, 4vw, 32px)' }}>{t}</span>
                    <Ornament width={70} color="var(--rose)" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>The Collection · Spring 2026</div>
            <h2 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Made to be<br /><em style={{ fontWeight: 400 }}>worn often.</em>
            </h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage('shop')}>View all →</button>
        </div>

        <div className="product-grid-featured">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => viewProduct(p.id)} />
          ))}
        </div>
      </section>

      {/* ── MOTHERS EDITION ──────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #FBE7EE 0%, #F5C6D4 100%)',
        padding: 'clamp(60px, 8vw, 120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container">
          <div className="mothers-grid">
            <div>
              <div className="eyebrow" style={{ color: 'var(--rose-deep)', marginBottom: 18 }}>Mothers Edition · Limited</div>
              <h2 className="serif" style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 0.95,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                marginBottom: 20,
              }}>
                For every mother<br />who never sat down.
              </h2>
              <Ornament width={180} color="var(--rose-deep)" />
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 480, marginTop: 24 }}>
                Released on Mother's Day. <strong>$20 from every tee</strong> is wired the same week —
                directly — to a single mother household nominated by our community.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <button className="btn btn-rose" onClick={() => viewProduct('mothers-tee')}>
                  Shop the tee — $44
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setPage('mission')}
                  style={{ borderColor: 'var(--rose-deep)', color: 'var(--rose-deep)' }}
                >
                  How nominations work
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img
                src="/assets/photos/mothers-tee-pink.jpg"
                alt="Love to All Mothers tee"
                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: -16,
                right: -8,
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '16px 20px',
                textAlign: 'center',
              }}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>$20</div>
                <div className="eyebrow" style={{ color: 'var(--paper)', marginTop: 4, fontSize: 9 }}>
                  Donated per tee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER QUOTE ────────────────────────────────── */}
      <section className="container" style={{ padding: 'clamp(60px, 8vw, 120px) 20px', textAlign: 'center' }}>
        <Ornament width={240} style={{ margin: '0 auto' }} />
        <h2
          className="serif-italic"
          style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            lineHeight: 1.2,
            maxWidth: 900,
            margin: '28px auto 20px',
            fontWeight: 400,
          }}
        >
          "I won't stop until{' '}
          <strong style={{ fontStyle: 'normal' }}>Love to All</strong>{' '}
          is worn and read and felt in every city of every country."
        </h2>
        <p className="eyebrow">— Marc, Founder</p>
        <button className="btn btn-ghost" style={{ marginTop: 36 }} onClick={() => setPage('story')}>
          Read Marc's story
        </button>
      </section>

      {/* ── IMPACT FEED ─────────────────────────────────── */}
      <section style={{ background: 'var(--paper-deep)', padding: 'clamp(60px, 8vw, 100px) 20px' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Recent impact · April 2026</div>
          <h2 className="serif" style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}>
            Where this month's profits went.
          </h2>
          <div className="impact-grid">
            <ImpactCard
              location="Chicago, IL"
              amount="$1,420"
              note="Three months of after-school care for the Reyes family — twin boys, age 9."
              date="Apr 22"
            />
            <ImpactCard
              location="Newark, NJ"
              amount="$680"
              note="Replaced a hot water heater for Tasha and her daughter so they could shower at home."
              date="Apr 14"
              highlight
            />
            <ImpactCard
              location="Phoenix, AZ"
              amount="$2,100"
              note="One semester of community-college tuition for Jasmine — first in her family to enroll."
              date="Apr 03"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
