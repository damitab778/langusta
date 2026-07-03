import { useLang } from '../hooks/useLang';

export default function QuizPage() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 data-testid="quiz-page-title" className="text-2xl font-semibold text-navy mb-2">{t.pages.quiz.title}</h1>
      <p className="text-gray-500 mb-6">{t.pages.quiz.desc}</p>
      <div data-testid="quiz-placeholder" className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-300 text-4xl">🧠</div>
    </div>
  );
}
