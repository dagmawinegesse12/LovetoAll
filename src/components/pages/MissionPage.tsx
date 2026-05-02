import type { PageId } from '../../types';
import Ornament from '../Ornament';

interface MissionPageProps {
  setPage: (p: PageId) => void;
}

function BigStat({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="serif" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>
        {n}
      </div>
      <div className="eyebrow" style={{ marginTop: 12 }}>{label}</div>
    </div>
  );
}

const STEPS = [
  { n: '01', t: 'You shop', d: 'Pick a piece. Tee, hoodie, sweat. Wear it like you would anything else.' },
  { n: '02', t: 'We ship', d: 'Made in Texas. Ships in 3 days. The wordmark and braid are embroidered, not printed.' },
  { n: '03', t: 'We pool', d: "Every Friday we close the books and add up the week's profits." },
  { n: '04', t: 'A mother gets paid', d: 'Direct deposit. Same week. No vouchers, no strings, no preachy paperwork.' },
];

export default function MissionPage({ setPage }: MissionPageProps) {
  return (
    <div className="page-enter">
      {/* Dark hero */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(80px, 10vw, 120px) 20px', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--rose)', marginBottom: 24 }}>Our mission</div>
          <h1
            className="serif"
            style={{
              fontSize: 'clamp(52px, 9vw, 128px)',
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            A clothing brand,<br />
            <em style={{ fontWeight: 400 }}>that gives back.</em>
          </h1>
          <Ornament width={260} color="var(--paper)" style={{ margin: '36px auto' }} />
          <p
            className="serif-italic"
            style={{
              fontSize: 'clamp(20px, 3vw, 30px)',
              lineHeight: 1.5,
              maxWidth: 880,
              margin: '0 auto',
              opacity: 0.9,
            }}
          >
            Love to All takes its profits and gives them to single mother households.
            That's the whole brand. That's the whole product.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="container" style={{ padding: 'clamp(60px, 8vw, 100px) 20px' }}>
        <div className="mission-steps">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="serif" style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 500, color: 'var(--rose-deep)', marginBottom: 12 }}>
                {s.n}
              </div>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 500, marginBottom: 12 }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--paper-deep)', padding: 'clamp(60px, 8vw, 100px) 20px' }}>
        <div className="container" style={{ maxWidth: 920, margin: '0 auto' }}>
          <div className="eyebrow" style={{ textAlign: 'center', marginBottom: 28 }}>The numbers · since founding</div>
          <div className="mission-stats">
            <BigStat n="$48,200" label="Donated" />
            <BigStat n="247" label="Households" />
            <BigStat n="14" label="Cities" />
            <BigStat n="100%" label="Of profits" />
          </div>
        </div>
      </section>

      {/* Nomination CTA */}
      <section className="container" style={{ padding: 'clamp(60px, 8vw, 120px) 20px', textAlign: 'center' }}>
        <h2 className="serif" style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          Know a mother who could use it?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: 520, margin: '0 auto 28px' }}>
          We accept community nominations every Sunday. Tell us about her — we'll handle the rest with care.
        </p>
        <button className="btn btn-rose" onClick={() => setPage('shop')}>
          Nominate a household
        </button>
      </section>
    </div>
  );
}
