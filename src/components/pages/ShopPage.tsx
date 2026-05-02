import { useState } from 'react';
import type { PageId } from '../../types';
import { PRODUCTS } from '../../data/products';
import Ornament from '../Ornament';
import ProductCard from '../ProductCard';

interface ShopPageProps {
  viewProduct: (id: string) => void;
  setPage: (p: PageId) => void;
}

type FilterId = 'all' | 'tee' | 'hoodie' | 'sweatpants' | 'mothers';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tee', label: 'Tees' },
  { id: 'hoodie', label: 'Hoodies' },
  { id: 'sweatpants', label: 'Sweats' },
  { id: 'mothers', label: 'Mothers Edition' },
];

export default function ShopPage({ viewProduct }: ShopPageProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'mothers') return p.id.includes('mothers');
    return p.type === filter;
  });

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="container" style={{ padding: 'clamp(40px, 6vw, 60px) 20px 32px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>The Shop · Spring 2026</div>
        <h1 className="serif" style={{
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 500,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
        }}>
          Wear the message.
        </h1>
        <Ornament width={200} style={{ margin: '20px auto' }} />
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 520, margin: '0 auto' }}>
          Every piece you buy funds a household. Every household has a name, a story, and a thank-you.
        </p>
      </section>

      {/* Filter bar */}
      <div className="container" style={{
        padding: '0 0 0 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--line)',
      }}>
        <div className="filter-bar no-scrollbar" style={{ flex: 1, paddingLeft: 20 }}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-btn${filter === f.id ? ' active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-mute)',
          padding: '0 20px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: 'none',
        }}
          className="sort-label"
        >
          {filtered.length} pieces
        </div>
      </div>

      {/* Grid */}
      <section className="container" style={{ padding: '40px 20px 80px' }}>
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => viewProduct(p.id)} large />
          ))}
        </div>
      </section>
    </div>
  );
}
