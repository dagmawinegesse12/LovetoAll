import type { PageId } from '../../types';
import Ornament from '../Ornament';

interface StoryPageProps {
  setPage: (p: PageId) => void;
}

export default function StoryPage({ setPage }: StoryPageProps) {
  return (
    <div className="page-enter">
      {/* Title */}
      <section className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px 32px', maxWidth: 960 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Our story · told by Marc</div>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(48px, 7vw, 104px)',
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: 28,
          }}
        >
          It started<br />
          <em style={{ fontWeight: 400 }}>at the kitchen table.</em>
        </h1>
        <Ornament width={200} />
      </section>

      {/* Body */}
      <section className="container" style={{ padding: '32px 20px 80px', maxWidth: 960 }}>
        <img
          src="/assets/photos/founder-amor-tee.jpg"
          alt="Marc, founder of Love to All"
          style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'center 25%', marginBottom: 40 }}
        />

        {/* Chapter 1 */}
        <div className="story-chapter">
          <p className="eyebrow" style={{ color: 'var(--ink-soft)', paddingTop: 4 }}>
            Chapter one · The kitchen table
          </p>
          <div style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            <p style={{ marginBottom: 20 }}>
              I was raised by a woman who never sat down. She worked two shifts, ran a household,
              made sure my brothers and I had clean shirts on Monday morning. We didn't have much,
              but we had her — and that was enough to know we were loved.
            </p>
            <p>
              Years later, I kept seeing the same scene play out in friends' kitchens, in cousins'
              apartments, in checkout lines. Single moms, holding the whole world up, asking for nothing.
            </p>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="story-chapter">
          <p className="eyebrow" style={{ color: 'var(--ink-soft)', paddingTop: 4 }}>
            Chapter two · The first shirt
          </p>
          <div style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            <p style={{ marginBottom: 20 }}>
              I drew the wordmark on a napkin in 2023. <em>Amor para todos</em> — love for all. I had
              a tattoo artist friend braid the line underneath. We printed twelve shirts on a Saturday
              and I gave eleven away.
            </p>
            <p>
              The twelfth, I sold for $42. I drove that $42 to a friend whose hot water had been out
              for a month. She cried. I cried. The brand had a job.
            </p>
          </div>
        </div>

        {/* Pull quote */}
        <blockquote className="story-blockquote">
          <Ornament width={180} style={{ margin: '0 auto 20px' }} />
          <p
            className="serif-italic"
            style={{
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              lineHeight: 1.4,
              fontWeight: 400,
              color: 'var(--ink)',
            }}
          >
            "I won't stop until Love to All is worn and read and felt in every city of every country."
          </p>
          <p className="eyebrow" style={{ marginTop: 20 }}>— Marc Delgado, Founder</p>
        </blockquote>

        {/* Chapter 3 */}
        <div className="story-chapter" style={{ marginBottom: 0 }}>
          <p className="eyebrow" style={{ color: 'var(--ink-soft)', paddingTop: 4 }}>
            Chapter three · Where we go
          </p>
          <div style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            <p style={{ marginBottom: 20 }}>
              We're 247 households in. Fourteen cities. We've paid for water heaters and tuition and
              Christmases. We're not a charity — we're a clothing brand that decided being profitable
              wasn't enough.
            </p>
            <p>
              Wear it. Read it. Feel it. Love to all.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: 'clamp(48px, 6vw, 80px) 20px', textAlign: 'center' }}>
        <h2 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, lineHeight: 1.1, marginBottom: 24 }}>
          Wear the message.
        </h2>
        <button
          className="btn"
          onClick={() => setPage('shop')}
          style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}
        >
          Shop the collection
        </button>
      </section>
    </div>
  );
}
