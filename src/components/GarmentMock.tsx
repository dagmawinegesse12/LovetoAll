import type { Product } from '../types';

interface GarmentMockProps {
  product: Product;
  height?: number;
}

export default function GarmentMock({ product, height = 360 }: GarmentMockProps) {
  const { palette, type } = product;
  const { bg, ink } = palette;
  const wordmarkText =
    product.id.includes('amor') ? 'AMOR PARA TODOS' :
    product.id.includes('mothers') ? 'LOVE TO ALL MOTHERS' :
    'LOVE TO ALL';

  if (type === 'sweatpants') {
    return (
      <div style={{
        background: '#EDE5D6',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <svg viewBox="0 0 300 360" style={{ height: '90%', width: 'auto' }}>
          <path d="M90 30 L210 30 L220 90 L218 340 L165 340 L155 180 L145 180 L135 340 L82 340 L82 90 Z" fill={bg} />
          <rect x="90" y="30" width="120" height="14" fill={bg} stroke={ink} strokeOpacity="0.25" />
          <g transform="translate(105, 130)" fill={ink}>
            <text fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="11" letterSpacing="2">LOVE TO ALL</text>
            <g transform="translate(0, 8)" stroke={ink} strokeWidth="0.6" fill="none">
              <path d="M2 6 Q 18 0, 35 6 T 70 6" />
              <path d="M2 6 Q 18 12, 35 6 T 70 6" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  const isHoodie = type === 'hoodie';
  const isRaglan = type === 'raglan';
  const paneBg = type === 'tee' && bg === '#E8DFCD' ? '#DDD3BD' : '#EDE5D6';

  return (
    <div style={{
      background: paneBg,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 360 360" style={{ height: '92%', width: 'auto' }}>
        {isRaglan ? (
          <>
            <path d="M70 95 Q 50 130, 60 200 L 90 210 L 110 105 Z" fill={ink} />
            <path d="M290 95 Q 310 130, 300 200 L 270 210 L 250 105 Z" fill={ink} />
          </>
        ) : (
          <>
            <path d="M70 95 Q 50 140, 60 175 L 95 175 L 110 105 Z" fill={bg} />
            <path d="M290 95 Q 310 140, 300 175 L 265 175 L 250 105 Z" fill={bg} />
          </>
        )}
        <path
          d={isHoodie
            ? 'M110 90 Q 140 75, 150 80 Q 180 70, 210 80 Q 220 75, 250 90 L 265 175 L 260 330 L 100 330 L 95 175 Z'
            : 'M110 95 Q 145 80, 150 85 Q 180 78, 210 85 Q 215 80, 250 95 L 265 175 L 258 330 L 102 330 L 95 175 Z'}
          fill={bg}
        />
        {isHoodie && (
          <path d="M150 85 Q 180 50, 210 85 Q 200 70, 180 68 Q 160 70, 150 85 Z" fill={bg} stroke={ink} strokeOpacity="0.15" />
        )}
        {!isHoodie && (
          <ellipse cx="180" cy="92" rx="22" ry="6" fill="none" stroke={ink} strokeOpacity="0.25" strokeWidth="1" />
        )}
        <g transform={`translate(180, ${isHoodie ? 175 : 165})`} textAnchor="middle" fill={ink}>
          <text
            fontFamily="Cormorant Garamond, serif"
            fontWeight="600"
            fontSize={wordmarkText.length > 12 ? 14 : 18}
            letterSpacing="2.5"
          >
            {wordmarkText}
          </text>
          <g transform="translate(-50, 14)" stroke={ink} strokeWidth="0.8" fill="none">
            <path d="M0 8 Q 25 0, 50 8 T 100 8" />
            <path d="M0 8 Q 25 16, 50 8 T 100 8" />
            <circle cx="50" cy="8" r="1" fill={ink} stroke="none" />
          </g>
        </g>
      </svg>
    </div>
  );
}
