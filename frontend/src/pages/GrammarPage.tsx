import { useState } from 'react';
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

  const { mutate, isPending, data, error } = useGrammarCheck();

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

      {data && <GrammarResultView result={data} />}
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
