import { createContext, useState, type ReactNode } from 'react';
import { translations, type UILang, type Translations } from '../i18n/translations';

export type LanguageContextValue = {
  uiLang: UILang;
  setUiLang: (lang: UILang) => void;
  t: Translations;
  learnLang: string;
  setLearnLang: (lang: string) => void;
  nativeLang: string;
  setNativeLang: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'langusta_lang_settings';

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const saved = loadSettings();

  const [uiLang, setUiLangState] = useState<UILang>(saved?.uiLang ?? 'en');
  const [learnLang, setLearnLangState] = useState(saved?.learnLang ?? 'es');
  const [nativeLang, setNativeLangState] = useState(saved?.nativeLang ?? 'en');

  function persist(next: { uiLang: UILang; learnLang: string; nativeLang: string }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const setUiLang = (lang: UILang) => {
    setUiLangState(lang);
    persist({ uiLang: lang, learnLang, nativeLang });
  };
  const setLearnLang = (lang: string) => {
    setLearnLangState(lang);
    persist({ uiLang, learnLang: lang, nativeLang });
  };
  const setNativeLang = (lang: string) => {
    setNativeLangState(lang);
    persist({ uiLang, learnLang, nativeLang: lang });
  };

  return (
    <LanguageContext.Provider
      value={{
        uiLang,
        setUiLang,
        t: translations[uiLang],
        learnLang,
        setLearnLang,
        nativeLang,
        setNativeLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
