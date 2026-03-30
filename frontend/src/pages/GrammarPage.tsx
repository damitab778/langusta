import { useState, useEffect, useRef } from 'react';
import { useLang } from '../hooks/useLang';
import { useGrammarCheck } from '../hooks/useGrammarCheck';
import type { GrammarResult, Mistake } from '../api/grammar';

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  pl: 'Polish',
};

export default function GrammarPage() {
  const { t, learnLang, nativeLang } = useLang();
  const [text, setText] = useState('');

  const { mutate, isPending, streamText, data, error } = useGrammarCheck();

  useEffect(() => {
    if (data) setText('');
  }, [data]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;

    mutate({
      text,
      targetLang: LANG_NAMES[learnLang] ?? learnLang,
      nativeLang: LANG_NAMES[nativeLang] ?? nativeLang,
    });
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy mb-1">{t.pages.grammar.title}</h1>
        <p className="text-gray-400 text-sm">
          Writing in <span className="font-medium text-coral">{LANG_NAMES[learnLang]}</span>
          {' '}· explanations in <span className="font-medium text-navy">{LANG_NAMES[nativeLang]}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="w-full rounded-2xl border-2 border-gray-200 p-4 text-navy text-sm resize-none focus:outline-none focus:border-coral transition-colors"
          rows={6}
          placeholder={`Write something in ${LANG_NAMES[learnLang] ?? learnLang}…`}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (text.trim() && !isPending) {
                mutate({
                  text,
                  targetLang: LANG_NAMES[learnLang] ?? learnLang,
                  nativeLang: LANG_NAMES[nativeLang] ?? nativeLang,
                });
              }
            }
          }}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !text.trim()}
          className="self-end px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? 'Checking…' : 'Check grammar →'}
        </button>
      </form>

      {error && (
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-red-600 text-sm">
          {error.message}
        </div>
      )}

      {streamText !== null && (
        streamText === ''
          ? <GrammarSkeleton />
          : <StreamView text={streamText} />
      )}

      {data && <GrammarResultView result={data} />}
    </div>
  );
}

function StreamView({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    const id = setInterval(() => {
      setDisplayed(prev => {
        const full = textRef.current;
        return prev.length < full.length ? full.slice(0, prev.length + 1) : prev;
      });
    }, 12);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">✏️ Corrected</p>
      <p className="text-navy text-sm leading-relaxed">
        {displayed.split('').map((char, i) => (
          <span key={i} style={{ animation: 'charIn 0.2s ease-out both' }}>{char}</span>
        ))}
        <span className="inline-block w-2 h-4 bg-coral ml-0.5 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
      </p>
    </div>
  );
}

function GrammarSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-coral/20 bg-white p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-coral animate-pulse">Analyzing</span>
        <span className="flex gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-coral"
              style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-4/5" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-3/5" />
      </div>
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-2/3" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-1/2" />
      </div>
    </div>
  );
}

function GrammarResultView({ result }: { result: GrammarResult }) {
  const clean = result.mistakes.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-2xl border-2 p-4 ${clean ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
          {clean ? '✅ Looks great!' : '✏️ Corrected'}
        </p>
        <p className="text-navy text-sm leading-relaxed">{result.corrected}</p>
      </div>

      {result.mistakes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {result.mistakes.length} mistake{result.mistakes.length !== 1 ? 's' : ''} found
          </p>
          {result.mistakes.map((m, i) => (
            <MistakeCard key={i} mistake={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function MistakeCard({ mistake }: { mistake: Mistake }) {
  return (
    <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-600 font-mono line-through">
          {mistake.original}
        </span>
        <span className="text-gray-300">→</span>
        <span className="px-2 py-0.5 rounded-lg bg-green-100 text-green-700 font-mono font-semibold">
          {mistake.fixed}
        </span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{mistake.explanation}</p>
    </div>
  );
}
