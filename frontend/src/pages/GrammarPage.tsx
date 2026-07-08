import { useState, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { useCheckGrammar } from '../services/grammar';
import { GrammarResultView } from '../components/grammar/GrammarResult';
import { GrammarSkeleton } from '../components/grammar/GrammarSkeleton';

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  pl: 'Polish',
};

export default function GrammarPage() {
  const { t, learnLang, nativeLang } = useLang();
  const [text, setText] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const { mutate, isPending, data, error } = useCheckGrammar();

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
        <p data-testid="grammar-subtitle" className="text-gray-400 text-sm">
          Writing in <span className="font-medium text-coral">{LANG_NAMES[learnLang]}</span>
          {' '}· explanations in <span className="font-medium text-navy">{LANG_NAMES[nativeLang]}</span>
        </p>
      </div>

      <form onSubmit={e => { e.preventDefault(); submit(); }} className="flex flex-col gap-3">
        <textarea
          data-testid="grammar-input"
          className="w-full rounded-2xl border-2 border-gray-200 p-4 text-navy text-sm resize-none focus:outline-none focus:border-coral transition-colors"
          rows={6}
          placeholder={`Write something in ${LANG_NAMES[learnLang] ?? learnLang}…`}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
          disabled={isPending}
        />
        <button
          type="submit"
          data-testid="grammar-submit"
          disabled={isPending || !text.trim()}
          className="self-end px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? 'Checking…' : 'Check grammar →'}
        </button>
      </form>

      {error && (
        <div data-testid="grammar-error" className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-red-600 text-sm">
          {error.message}
        </div>
      )}

      {isPending && <GrammarSkeleton />}
      {data && <GrammarResultView result={data} originalText={submittedText} />}
    </div>
  );
}
