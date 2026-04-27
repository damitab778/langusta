import { useState, useEffect } from 'react';
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
  const [submittedText, setSubmittedText] = useState('');

  const { mutate, isPending, data, error } = useGrammarCheck();

  useEffect(() => {
    if (data) setText('');
  }, [data]);

  function submit() {
    if (!text.trim() || isPending) return;
    setSubmittedText(text);
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

      <form onSubmit={e => { e.preventDefault(); submit(); }} className="flex flex-col gap-3">
        <textarea
          className="w-full rounded-2xl border-2 border-gray-200 p-4 text-navy text-sm resize-none focus:outline-none focus:border-coral transition-colors"
          rows={6}
          placeholder={`Write something in ${LANG_NAMES[learnLang] ?? learnLang}…`}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
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

      {isPending && <GrammarSkeleton />}

      {data && <GrammarResultView result={data} originalText={submittedText} />}
    </div>
  );
}

// ── Highlighted text ─────────────────────────────────────────────────────────

type Segment = { text: string; kind: 'normal' | 'error' | 'fix' };

function buildSegments(
  text: string,
  phrases: { phrase: string; kind: 'error' | 'fix' }[],
): Segment[] {
  const ranges: [number, number, 'error' | 'fix'][] = [];

  for (const { phrase, kind } of phrases) {
    if (!phrase) continue;
    let idx = 0;
    while (idx < text.length) {
      const found = text.indexOf(phrase, idx);
      if (found === -1) break;
      ranges.push([found, found + phrase.length, kind]);
      idx = found + phrase.length;
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const segments: Segment[] = [];
  let pos = 0;
  for (const [start, end, kind] of ranges) {
    if (start < pos) continue;
    if (start > pos) segments.push({ text: text.slice(pos, start), kind: 'normal' });
    segments.push({ text: text.slice(start, end), kind });
    pos = end;
  }
  if (pos < text.length) segments.push({ text: text.slice(pos), kind: 'normal' });

  return segments;
}

function HighlightedText({
  text,
  phrases,
}: {
  text: string;
  phrases: { phrase: string; kind: 'error' | 'fix' }[];
}) {
  const segments = buildSegments(text, phrases);
  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === 'error' ? (
          <span key={i} className="bg-red-100 text-red-600 line-through rounded px-0.5">{seg.text}</span>
        ) : seg.kind === 'fix' ? (
          <span key={i} className="bg-green-100 text-green-700 font-semibold rounded px-0.5">{seg.text}</span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

// ── Result view ───────────────────────────────────────────────────────────────

function GrammarResultView({ result, originalText }: { result: GrammarResult; originalText: string }) {
  if (result.mistakes.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-5 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-500">Looks great!</p>
        <p className="text-green-800 text-sm leading-relaxed">{originalText}</p>
        <p className="text-green-600 text-xs mt-1">Good job! No mistakes found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Original */}
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Original</p>
        <p className="text-navy text-sm leading-relaxed">
          <HighlightedText
            text={originalText}
            phrases={result.mistakes.map(m => ({ phrase: m.original, kind: 'error' as const }))}
          />
        </p>
      </div>

      {/* Corrected */}
      <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Corrected</p>
        <p className="text-navy text-sm leading-relaxed">
          <HighlightedText
            text={result.corrected}
            phrases={result.mistakes.map(m => ({ phrase: m.fixed, kind: 'fix' as const }))}
          />
        </p>
      </div>

      {/* Summary */}
      {result.mistakes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {result.mistakes.length} correction{result.mistakes.length !== 1 ? 's' : ''}
          </p>
          {result.mistakes.map((m, i) => (
            <MistakeCard key={i} mistake={m} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function MistakeCard({ mistake, index }: { mistake: Mistake; index: number }) {
  return (
    <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <span className="text-gray-400 font-semibold text-xs w-5">{index}.</span>
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

// ── Skeleton ──────────────────────────────────────────────────────────────────

function GrammarSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 flex flex-col gap-2">
        <div className="h-2.5 w-14 rounded-full bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-4/5" />
      </div>
      <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-4 flex flex-col gap-2">
        <div className="h-2.5 w-20 rounded-full bg-blue-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-blue-100 animate-pulse w-full" />
        <div className="h-3 rounded-full bg-blue-100 animate-pulse w-3/4" />
      </div>
      <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 flex flex-col gap-2">
        <div className="h-2.5 w-24 rounded-full bg-gray-100 animate-pulse mb-1" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-2/3" />
        <div className="h-3 rounded-full bg-gray-100 animate-pulse w-1/2" />
      </div>
    </div>
  );
}
