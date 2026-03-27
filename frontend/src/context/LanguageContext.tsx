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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [uiLang, setUiLang] = useState<UILang>('en');
  const [learnLang, setLearnLang] = useState('es');
  const [nativeLang, setNativeLang] = useState('en');

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
