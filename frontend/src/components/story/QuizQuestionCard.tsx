type QuizQuestionCardProps = {
  question:      string;
  options:       string[];
  selectedIndex: number | null;
  onSelect:      (index: number) => void;
  index:         number;
};

export function QuizQuestionCard({ question, options, selectedIndex, onSelect, index }: QuizQuestionCardProps) {
  return (
    <div data-testid="story-question" className="rounded-2xl border-2 border-gray-200 bg-white p-4 flex flex-col gap-3">
      <p className="text-sm font-semibold text-navy">{index + 1}. {question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, i) => (
          <button
            key={i}
            data-testid="story-option"
            onClick={() => onSelect(i)}
            className={`text-left px-4 py-2 rounded-xl border-2 text-sm transition-colors cursor-pointer ${
              selectedIndex === i
                ? 'border-coral bg-coral/10 text-navy font-medium'
                : 'border-gray-200 text-navy hover:border-coral/50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
