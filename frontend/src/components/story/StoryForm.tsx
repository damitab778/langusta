import { useLang } from '../../hooks/useLang';

type StoryFormProps = {
  characters: string;
  setting:    string;
  topic:      string;
  onCharactersChange: (v: string) => void;
  onSettingChange:    (v: string) => void;
  onTopicChange:      (v: string) => void;
  onSubmit: () => void;
};

export function StoryForm({
  characters, setting, topic,
  onCharactersChange, onSettingChange, onTopicChange,
  onSubmit,
}: StoryFormProps) {
  const { t } = useLang();

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t.story.form.charactersLabel}</label>
        <input
          data-testid="story-characters-input"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm text-navy focus:outline-none focus:border-coral transition-colors"
          placeholder={t.story.form.charactersPlaceholder}
          value={characters}
          onChange={e => onCharactersChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t.story.form.settingLabel}</label>
        <input
          data-testid="story-setting-input"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm text-navy focus:outline-none focus:border-coral transition-colors"
          placeholder={t.story.form.settingPlaceholder}
          value={setting}
          onChange={e => onSettingChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t.story.form.topicLabel}</label>
        <input
          data-testid="story-topic-input"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm text-navy focus:outline-none focus:border-coral transition-colors"
          placeholder={t.story.form.topicPlaceholder}
          value={topic}
          onChange={e => onTopicChange(e.target.value)}
        />
      </div>
      <button
        type="submit"
        data-testid="story-generate-button"
        className="self-end px-6 py-2.5 rounded-xl bg-coral text-white font-semibold text-sm transition-all hover:bg-coral-dark cursor-pointer"
      >
        {t.story.form.generateButton}
      </button>
    </form>
  );
}
