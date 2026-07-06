import { useState } from 'react';
import { useLang } from '../hooks/useLang';
import { generateStory, generateStoryQuiz } from '../api/story';
import type { QuizQuestion } from '../api/story';
import { StoryForm } from '../components/story/StoryForm';
import { StorySkeleton } from '../components/story/StorySkeleton';
import { StoryView } from '../components/story/StoryView';
import { QuizQuestionCard } from '../components/story/QuizQuestionCard';
import { QuizResults } from '../components/story/QuizResults';

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  pl: 'Polish',
};

type Phase = 'form' | 'generating-story' | 'reading' | 'generating-quiz' | 'quiz' | 'results';

export default function StoryPage() {
  const { t, learnLang, nativeLang } = useLang();
  const targetLang = LANG_NAMES[learnLang] ?? learnLang;
  const natLang    = LANG_NAMES[nativeLang] ?? nativeLang;

  const [phase, setPhase]           = useState<Phase>('form');
  const [characters, setCharacters] = useState('');
  const [setting, setSetting]       = useState('');
  const [topic, setTopic]           = useState('');
  const [story, setStory]           = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [questions, setQuestions]   = useState<QuizQuestion[] | null>(null);
  const [answers, setAnswers]       = useState<(number | null)[]>([]);
  const [error, setError]           = useState<string | null>(null);

  async function handleGenerateStory() {
    setPhase('generating-story');
    setError(null);
    try {
      const result = await generateStory({ targetLang, nativeLang: natLang, characters, setting, topic });
      setStory(result.story);
      setStoryTitle(result.title);
      setPhase('reading');
    } catch {
      setError(t.story.error);
      setPhase('form');
    }
  }

  async function handleTakeQuiz() {
    setPhase('generating-quiz');
    setError(null);
    try {
      const result = await generateStoryQuiz({ targetLang, nativeLang: natLang, story });
      setQuestions(result.questions);
      setAnswers(new Array(result.questions.length).fill(null));
      setPhase('quiz');
    } catch {
      setError(t.story.error);
      setPhase('reading');
    }
  }

  function handleSelectAnswer(questionIndex: number, optionIndex: number) {
    setAnswers(prev => prev.map((a, i) => (i === questionIndex ? optionIndex : a)));
  }

  function handleSubmitAnswers() {
    setPhase('results');
  }

  function handleRestart() {
    setPhase('form');
    setCharacters('');
    setSetting('');
    setTopic('');
    setStory('');
    setStoryTitle('');
    setQuestions(null);
    setAnswers([]);
    setError(null);
  }

  const allAnswered = answers.length > 0 && answers.every(a => a !== null);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy mb-1">{t.pages.story.title}</h1>
        <p className="text-gray-400 text-sm">{t.pages.story.desc}</p>
      </div>

      {error && (
        <div data-testid="story-error" className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {phase === 'form' && (
        <StoryForm
          characters={characters}
          setting={setting}
          topic={topic}
          onCharactersChange={setCharacters}
          onSettingChange={setSetting}
          onTopicChange={setTopic}
          onSubmit={handleGenerateStory}
        />
      )}

      {phase === 'generating-story' && (
        <StorySkeleton testId="story-generating" label={t.story.form.generatingButton} />
      )}

      {phase === 'reading' && (
        <StoryView
          title={storyTitle}
          story={story}
          onTakeQuiz={handleTakeQuiz}
          onRestart={handleRestart}
        />
      )}

      {phase === 'generating-quiz' && (
        <StorySkeleton testId="story-quiz-generating" label={t.story.quiz.generatingLabel} />
      )}

      {phase === 'quiz' && questions && (
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <QuizQuestionCard
              key={i}
              index={i}
              question={q.question}
              options={q.options}
              selectedIndex={answers[i]}
              onSelect={optionIndex => handleSelectAnswer(i, optionIndex)}
            />
          ))}
          <button
            data-testid="story-submit-answers"
            onClick={handleSubmitAnswers}
            disabled={!allAnswered}
            className="self-end px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {t.story.quiz.submitButton}
          </button>
        </div>
      )}

      {phase === 'results' && questions && (
        <QuizResults questions={questions} answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}
