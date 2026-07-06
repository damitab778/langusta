import { useLang } from '../../hooks/useLang';

type StoryViewProps = {
  title: string;
  story: string;
  onTakeQuiz: () => void;
  onRestart:  () => void;
};

export function StoryView({ title, story, onTakeQuiz, onRestart }: StoryViewProps) {
  const { t } = useLang();
  const paragraphs = story.split(/\n+/).filter(Boolean);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 flex flex-col gap-3">
        <h2 data-testid="story-title" className="text-lg font-semibold text-navy">
          {title || t.story.reading.untitled}
        </h2>
        <div data-testid="story-text" className="flex flex-col gap-3 text-navy text-sm leading-relaxed">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          data-testid="story-restart-button"
          onClick={onRestart}
          className="text-xs text-gray-400 hover:text-coral transition-colors cursor-pointer"
        >
          {t.story.results.newStoryButton}
        </button>
        <button
          data-testid="story-take-quiz-button"
          onClick={onTakeQuiz}
          className="px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark cursor-pointer"
        >
          {t.story.reading.takeQuizButton}
        </button>
      </div>
    </div>
  );
}
