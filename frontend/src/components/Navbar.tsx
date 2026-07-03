import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import { useLang } from '../hooks/useLang';
import { uiLanguages, type UILang } from '../i18n/translations';

const learnLanguages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, uiLang, setUiLang, learnLang, setLearnLang, nativeLang, setNativeLang } = useLang();

  const navLinks = [
    { to: '/grammar', label: t.nav.grammar },
    { to: '/conversation', label: t.nav.conversation },
    { to: '/quiz', label: t.nav.quiz },
    { to: '/story', label: t.nav.story },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-coral text-white'
        : 'text-navy hover:bg-coral/10 hover:text-coral'
    }`;

  return (
    <nav data-testid="navbar" className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" data-testid="navbar-logo-link" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop nav links */}
          <div data-testid="navbar-links-desktop" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} data-testid={`nav-link-${link.to.slice(1)}`} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LearningSelector
              learnLabel={t.learnLabel}
              fromLabel={t.fromLabel}
              learnLang={learnLang}
              setLearnLang={setLearnLang}
              nativeLang={nativeLang}
              setNativeLang={setNativeLang}
            />
            <div className="h-5 w-px bg-gray-200" />
            <UILangSwitcher uiLang={uiLang} setUiLang={setUiLang} />
          </div>

          {/* Hamburger */}
          <button
            data-testid="navbar-menu-toggle"
            className="md:hidden p-2 rounded-lg text-navy hover:bg-coral/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div data-testid="navbar-links-mobile" className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              data-testid={`nav-link-${link.to.slice(1)}`}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
            <LearningSelector
              learnLabel={t.learnLabel}
              fromLabel={t.fromLabel}
              learnLang={learnLang}
              setLearnLang={setLearnLang}
              nativeLang={nativeLang}
              setNativeLang={setNativeLang}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">UI:</span>
              <UILangSwitcher uiLang={uiLang} setUiLang={setUiLang} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function LearningSelector({
  learnLabel,
  fromLabel,
  learnLang,
  setLearnLang,
  nativeLang,
  setNativeLang,
}: {
  learnLabel: string;
  fromLabel: string;
  learnLang: string;
  setLearnLang: (l: string) => void;
  nativeLang: string;
  setNativeLang: (l: string) => void;
}) {
  const selectClass =
    'border border-gray-200 rounded-lg px-2 py-1 text-sm font-medium text-navy bg-white focus:outline-none focus:ring-2 focus:ring-coral/50 cursor-pointer';

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-gray-400 text-xs">{learnLabel}</span>
      <select data-testid="select-learn-language" className={selectClass} value={learnLang} onChange={(e) => setLearnLang(e.target.value)}>
        {learnLanguages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
      <span className="text-gray-400 text-xs">{fromLabel}</span>
      <select data-testid="select-native-language" className={selectClass} value={nativeLang} onChange={(e) => setNativeLang(e.target.value)}>
        {learnLanguages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.flag} {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function UILangSwitcher({ uiLang, setUiLang }: { uiLang: UILang; setUiLang: (l: UILang) => void }) {
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
      {uiLanguages.map((l) => (
        <button
          key={l.code}
          data-testid={`ui-lang-${l.code}`}
          onClick={() => setUiLang(l.code)}
          title={l.label}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            uiLang === l.code
              ? 'bg-white text-navy shadow-sm'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {l.flag} {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
