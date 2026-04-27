import type { Correction } from '../../api/conversation';

export function CorrectionCard({ correction }: { correction: Correction }) {
  return (
    <div className="rounded-2xl border-2 border-gray-100 bg-white p-3 flex flex-col gap-1.5"
      style={{ animation: 'fadeIn 0.3s ease-out both' }}>
      <div className="flex items-center gap-1.5 flex-wrap text-xs">
        <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-600 font-mono line-through">
          {correction.original}
        </span>
        <span className="text-gray-300">→</span>
        <span className="px-2 py-0.5 rounded-lg bg-green-100 text-green-700 font-mono font-semibold">
          {correction.fixed}
        </span>
      </div>
      {correction.note && <p className="text-gray-500 text-xs leading-relaxed">{correction.note}</p>}
    </div>
  );
}
