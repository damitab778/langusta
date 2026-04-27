import type { GrammarResult, Mistake } from '../../api/grammar';

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

export function GrammarResultView({ result, originalText }: { result: GrammarResult; originalText: string }) {
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
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Original</p>
        <p className="text-navy text-sm leading-relaxed">
          <HighlightedText
            text={originalText}
            phrases={result.mistakes.map(m => ({ phrase: m.original, kind: 'error' as const }))}
          />
        </p>
      </div>

      <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Corrected</p>
        <p className="text-navy text-sm leading-relaxed">
          <HighlightedText
            text={result.corrected}
            phrases={result.mistakes.map(m => ({ phrase: m.fixed, kind: 'fix' as const }))}
          />
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {result.mistakes.length} correction{result.mistakes.length !== 1 ? 's' : ''}
        </p>
        {result.mistakes.map((m, i) => (
          <MistakeCard key={i} mistake={m} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function MistakeCard({ mistake, index }: { mistake: Mistake; index: number }) {
  return (
    <div className="rounded-2xl border-2 border-gray-100 bg-white p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        <span className="text-gray-400 font-semibold text-xs w-5">{index}.</span>
        <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-600 font-mono line-through">{mistake.original}</span>
        <span className="text-gray-300">→</span>
        <span className="px-2 py-0.5 rounded-lg bg-green-100 text-green-700 font-mono font-semibold">{mistake.fixed}</span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{mistake.explanation}</p>
    </div>
  );
}
