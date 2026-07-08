import type { Bot } from '../../data/bots';
import { getBotById } from '../../data/bots';
import BotAvatar from '../BotAvatar';

export function UserBubble({ text }: { text: string }) {
  return (
    <div data-testid="chat-bubble-user" className="flex justify-end" style={{ animation: 'fadeIn 0.2s ease-out both' }}>
      <div className="max-w-[70%] bg-coral text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}

export function BotBubble({ text, botName, bots }: { text: string; botName: string; bots: Bot[] }) {
  const bot = bots.find(b => b.name === botName) ?? getBotById('sofia');
  return (
    <div data-testid="chat-bubble-bot" className="flex items-end gap-2" style={{ animation: 'fadeIn 0.2s ease-out both' }}>
      <div style={{ border: `2px solid ${bot?.color ?? '#ccc'}`, borderRadius: '50%', flexShrink: 0 }}>
        {bot ? <BotAvatar bot={bot} size={32} /> : <div className="w-8 h-8 rounded-full bg-gray-200" />}
      </div>
      <div className="max-w-[70%]">
        <p className="text-xs font-semibold mb-1" style={{ color: bot?.color ?? '#888' }}>{botName}</p>
        <div className="bg-white border-2 border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-navy leading-relaxed">
          {text}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator({ bots }: { bots: Bot[] }) {
  return (
    <div data-testid="chat-typing-indicator" className="flex items-end gap-2">
      <div className="flex -space-x-2" style={{ flexShrink: 0 }}>
        {bots.map(bot => (
          <div key={bot.id} style={{ border: `2px solid ${bot.color}`, borderRadius: '50%', background: 'white' }}>
            <BotAvatar bot={bot} size={32} />
          </div>
        ))}
      </div>
      <div className="bg-white border-2 border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"
            style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
      </div>
    </div>
  );
}
