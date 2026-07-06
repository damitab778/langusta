import { useLang } from '../../hooks/useLang';
import type { QuizQuestion } from '../../api/story';

type QuizResultsProps = {
  questions: QuizQuestion[];
  answers:   (number | null)[];
  onRestart: () => void;
};

export function QuizResults({ questions, answers, onRestart }: QuizResultsProps) {
  const { t } = useLang();
  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 text-center">
        <p data-testid="story-score" className="text-lg font-semibold text-navy">
          {t.story.results.scoreLabel}: {score}/{questions.length}
        </p>
      </div>
      {questions.map((q, i) => {
        const answerIndex = answers[i];
        const isCorrect = answerIndex === q.correctIndex;
        return (
          <div
            key={i}
            data-testid="story-result-card"
            className={`rounded-2xl border-2 p-4 flex flex-col gap-2 ${
              isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}
          >
            <p className="text-sm font-semibold text-navy">{i + 1}. {q.question}</p>
            <p className="text-sm text-gray-600">
              {t.story.results.yourAnswerLabel}: {answerIndex !== null ? q.options[answerIndex] : '—'}
            </p>
            {!isCorrect && (
              <p className="text-sm text-gray-600">
                {t.story.results.correctAnswerLabel}: {q.options[q.correctIndex]}
              </p>
            )}
            <p className="text-gray-500 text-xs leading-relaxed">{q.explanation}</p>
          </div>
        );
      })}
      <button
        data-testid="story-restart-button"
        onClick={onRestart}
        className="self-center px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark cursor-pointer"
      >
        {t.story.results.newStoryButton}
      </button>
    </div>
  );
}
