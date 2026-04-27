import { useState } from 'react';
import type { Bot } from '../../data/bots';

export function ActiveBotCard({ bot, index }: { bot: Bot; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ animation: `floatUp 0.35s ease-out ${index * 0.1}s both` }}>
      <div
        className="flex flex-col items-center gap-2 cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: 'relative' }}>
          <div style={{
            border: `3px solid ${bot.color}`, borderRadius: '50%',
            boxShadow: hovered ? `0 0 0 4px ${bot.color}28` : 'none',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}>
            <bot.Avatar size={58} />
          </div>

          {hovered && (
            <div
              style={{
                position: 'absolute', bottom: 'calc(100% + 14px)',
                left: 'calc(50% - 112px)', width: '224px',
                zIndex: 50, animation: 'fadeIn 0.15s ease-out both',
              }}
              className="bg-navy text-white text-xs rounded-xl px-3 py-2.5 leading-relaxed shadow-xl"
            >
              {bot.personality}
              <div style={{
                position: 'absolute', bottom: '-6px', left: 'calc(50% - 6px)',
                transform: 'rotate(45deg)', width: '12px', height: '12px', background: '#1a2744',
              }} />
            </div>
          )}
        </div>

        <p className="text-sm font-semibold" style={{ color: bot.color }}>{bot.name}</p>
        <p className="text-xs text-gray-400">{bot.tagline}</p>
      </div>
    </div>
  );
}
