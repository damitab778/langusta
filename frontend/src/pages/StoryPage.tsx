import { useLang } from '../hooks/useLang';

export default function StoryPage() {
  const { t } = useLang();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-navy mb-2">{t.pages.story.title}</h1>
      <p className="text-gray-500 mb-6">{t.pages.story.desc}</p>
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-300 text-4xl">📖</div>
    </div>
  );
}
