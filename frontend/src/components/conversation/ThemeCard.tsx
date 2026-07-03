import { useState } from 'react';
import type { Theme } from '../../api/conversation';

export function ThemeCard({ theme, index, onSelect }: { theme: Theme; index: number; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ animation: `floatUp 0.4s ease-out ${index * 0.1}s both` }}>
      <div style={{ position: 'relative' }}>
        <button
          data-testid="theme-card"
          onClick={onSelect}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-48 h-28 rounded-2xl border-2 border-gray-200 bg-white hover:border-coral hover:shadow-md text-navy font-medium text-sm transition-all cursor-pointer px-4 flex items-center justify-center text-center"
        >
          {theme.theme}
        </button>

        {hovered && (
          <div
            style={{
              position: 'absolute', top: 'calc(100% + 14px)',
              left: 'calc(50% - 112px)', width: '224px',
              zIndex: 50, animation: 'fadeIn 0.15s ease-out both',
            }}
            className="bg-navy text-white text-xs rounded-xl px-3 py-2.5 leading-relaxed shadow-lg"
          >
            <div style={{
              position: 'absolute', top: '-6px', left: 'calc(50% - 6px)',
              transform: 'rotate(45deg)', width: '12px', height: '12px', background: '#1a2744',
            }} />
            {theme.description}
          </div>
        )}
      </div>
    </div>
  );
}
