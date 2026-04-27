import { useState, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { fetchThemes, sendMessage } from '../api/conversation';
import type { Correction, HistoryItem, Theme } from '../api/conversation';
import { pickBots } from '../data/bots';
import type { Bot } from '../data/bots';
import { ThemeCard } from '../components/conversation/ThemeCard';
import { ActiveBotCard } from '../components/conversation/ActiveBotCard';
import { UserBubble, BotBubble, TypingIndicator } from '../components/conversation/ChatBubbles';
import { CorrectionCard } from '../components/conversation/CorrectionCard';

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  pl: 'Polish',
};

type ChatMessage = HistoryItem & { id: number };

export default function ConversationPage() {
  const { learnLang, nativeLang } = useLang();
  const targetLang = LANG_NAMES[learnLang] ?? learnLang;
  const natLang    = LANG_NAMES[nativeLang] ?? nativeLang;

  const [themes, setThemes]               = useState<Theme[] | null>(null);
  const [themesLoading, setThemesLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [activeBots, setActiveBots]       = useState<Bot[]>(() => pickBots());
  const [messages, setMessages]           = useState<ChatMessage[]>([]);
  const [corrections, setCorrections]     = useState<Correction[]>([]);
  const [input, setInput]                 = useState('');
  const [isLoading, setIsLoading]         = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const msgId    = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  function loadThemes() {
    setThemesLoading(true);
    setThemes(null);
    fetchThemes(targetLang, natLang)
      .then(r => setThemes(r.themes))
      .catch(() => setThemes([
        { theme: 'Travel plans',   description: 'Talk about upcoming trips and destinations.' },
        { theme: 'Food & cooking', description: 'Discuss favourite dishes and recipes.' },
        { theme: 'Weekend life',   description: 'Describe how you spend your free time.' },
      ]))
      .finally(() => setThemesLoading(false));
  }

  useEffect(() => {
    setSelectedTheme(null);
    setMessages([]);
    setCorrections([]);
    loadThemes();
  }, [targetLang, natLang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function selectTheme(theme: Theme) {
    setSelectedTheme(theme);
    setIsLoading(true);
    setError(null);
    try {
      const { messages: botMsgs } = await sendMessage({
        targetLang, nativeLang: natLang, theme: theme.theme,
        bots: activeBots.map(b => ({ name: b.name, personality: b.personality })),
        history: [],
        message: `Hello! I'd like to practise ${targetLang} by talking about: ${theme.theme}.`,
      });
      setMessages(botMsgs.map(m => ({ id: msgId.current++, role: 'bot', botName: m.botName, text: m.text })));
    } catch {
      setError('Could not start conversation. Is Ollama running?');
      setSelectedTheme(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend() {
    if (!input.trim() || isLoading || !selectedTheme) return;
    const userText = input.trim();
    setInput('');
    const userMsg: ChatMessage = { id: msgId.current++, role: 'user', text: userText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);
    try {
      const history: HistoryItem[] = messages.map(m =>
        m.role === 'user'
          ? { role: 'user', text: m.text }
          : { role: 'bot', botName: m.botName, text: m.text }
      );
      const { messages: botMsgs, corrections: newCorr } = await sendMessage({
        targetLang, nativeLang: natLang, theme: selectedTheme.theme,
        bots: activeBots.map(b => ({ name: b.name, personality: b.personality })),
        history, message: userText,
      });
      setMessages([...newMessages, ...botMsgs.map(m => ({
        id: msgId.current++, role: 'bot' as const, botName: m.botName, text: m.text,
      }))]);
      if (newCorr.length) setCorrections(prev => [...prev, ...newCorr]);
    } catch {
      setError('Failed to get a response. Is Ollama running?');
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setSelectedTheme(null);
    setActiveBots(pickBots());
    setMessages([]);
    setCorrections([]);
    setInput('');
    setError(null);
  }

  return (
    <div className="flex gap-4 h-full overflow-hidden" style={{ minHeight: 0 }}>

      {/* ── Chat column ────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0" style={{ minHeight: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-navy">
              {selectedTheme ? selectedTheme.theme : 'Conversation'}
            </h1>
            <p className="text-gray-400 text-sm">
              Practising <span className="font-medium text-coral">{targetLang}</span>
              {' '}· corrections in <span className="font-medium text-navy">{natLang}</span>
            </p>
          </div>
          {selectedTheme && (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {activeBots.map(bot => (
                  <div key={bot.id} title={bot.name} style={{ border: `2px solid ${bot.color}`, borderRadius: '50%' }}>
                    <bot.Avatar size={30} />
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-xl px-3 py-1">
                {selectedTheme.theme}
              </span>
              <button onClick={reset} className="text-xs text-gray-400 hover:text-coral transition-colors cursor-pointer">
                Change topic
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-600 text-sm shrink-0">
            {error}
          </div>
        )}

        {/* Theme selection */}
        {!selectedTheme && (
          <div className="flex-1 flex flex-col items-center justify-center gap-7">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">You'll be talking with</p>
              <div className="flex gap-6 justify-center">
                {activeBots.map((bot, i) => <ActiveBotCard key={bot.id} bot={bot} index={i} />)}
              </div>
              <button
                onClick={() => setActiveBots(pickBots())}
                className="text-xs text-gray-400 hover:text-coral transition-colors cursor-pointer flex items-center gap-1"
              >
                <span style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>↺</span> Reroll partners
              </button>
            </div>

            <div className="w-32 border-t border-gray-200" />

            {themesLoading || !themes ? (
              <div className="flex flex-col items-center gap-5">
                <div className="flex gap-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="shimmer w-48 h-28 rounded-2xl" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>Generating topics</span>
                  <span className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1 h-1 rounded-full bg-gray-400 inline-block"
                        style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-4 flex-wrap justify-center">
                {themes.map((t, i) => (
                  <ThemeCard key={t.theme} theme={t} index={i} onSelect={() => selectTheme(t)} />
                ))}
              </div>
            )}

            <button onClick={loadThemes} className="text-xs text-gray-400 hover:text-coral transition-colors cursor-pointer">
              Shuffle topics
            </button>
          </div>
        )}

        {/* Chat */}
        {selectedTheme && (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1" style={{ minHeight: 0 }}>
              <div className="flex-1" />
              {messages.map(msg =>
                msg.role === 'user'
                  ? <UserBubble key={msg.id} text={msg.text} />
                  : <BotBubble key={msg.id} text={msg.text} botName={msg.botName ?? ''} bots={activeBots} />
              )}
              {isLoading && <TypingIndicator bots={activeBots} />}
              <div ref={bottomRef} />
            </div>

            <div className="mt-3 flex gap-2 shrink-0">
              <input
                type="text"
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm text-navy focus:outline-none focus:border-coral transition-colors"
                placeholder={`Write in ${targetLang}…`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-5 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Corrections sidebar ─────────────────────────────────────── */}
      <div className="w-72 shrink-0 flex flex-col" style={{ minHeight: 0 }}>
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Notes</p>
          {corrections.length > 0 && (
            <span className="text-xs bg-coral text-white rounded-full px-2 py-0.5 font-semibold">
              {corrections.length}
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-3" style={{ minHeight: 0 }}>
          {corrections.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center text-gray-300 text-sm">
              Corrections will appear here as you chat
            </div>
          ) : (
            corrections.map((c, i) => <CorrectionCard key={i} correction={c} />)
          )}
        </div>
      </div>
    </div>
  );
}
