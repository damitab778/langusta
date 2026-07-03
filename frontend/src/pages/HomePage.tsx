import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useLang } from '../hooks/useLang';

const featureMeta = [
  { key: 'grammar' as const, to: '/grammar', icon: '✏️', color: 'bg-blue-50 border-blue-200 hover:border-blue-400', badge: 'bg-blue-100 text-blue-700' },
  { key: 'conversation' as const, to: '/conversation', icon: '💬', color: 'bg-green-50 border-green-200 hover:border-green-400', badge: 'bg-green-100 text-green-700' },
  { key: 'quiz' as const, to: '/quiz', icon: '🧠', color: 'bg-purple-50 border-purple-200 hover:border-purple-400', badge: 'bg-purple-100 text-purple-700' },
  { key: 'story' as const, to: '/story', icon: '📖', color: 'bg-orange-50 border-orange-200 hover:border-orange-400', badge: 'bg-orange-100 text-orange-700' },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Hero */}
      <section className="text-center mt-6 flex flex-col items-center gap-4">
        <Logo size="lg" />
        <p className="text-gray-500 text-lg max-w-md">{t.home.tagline}</p>
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
        {featureMeta.map((f) => {
          const feature = t.home.features[f.key];
          return (
            <Link
              key={f.to}
              to={f.to}
              data-testid={`home-feature-card-${f.key}`}
              className={`border-2 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 ${f.color} group`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{f.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.badge}`}>
                  {feature.title}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors mt-auto">
                {t.home.start}
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
