export type Translations = {
  nav: {
    grammar: string;
    conversation: string;
    story: string;
  };
  learnLabel: string;
  fromLabel: string;
  home: {
    tagline: string;
    features: {
      grammar: { title: string; desc: string };
      conversation: { title: string; desc: string };
      story: { title: string; desc: string };
    };
    start: string;
  };
  pages: {
    grammar: { title: string; desc: string };
    conversation: { title: string; desc: string };
    story: { title: string; desc: string };
  };
  story: {
    form: {
      charactersLabel: string;
      charactersPlaceholder: string;
      settingLabel: string;
      settingPlaceholder: string;
      topicLabel: string;
      topicPlaceholder: string;
      generateButton: string;
      generatingButton: string;
    };
    reading: {
      takeQuizButton: string;
      untitled: string;
    };
    quiz: {
      generatingLabel: string;
      submitButton: string;
    };
    results: {
      scoreLabel: string;
      yourAnswerLabel: string;
      correctAnswerLabel: string;
      newStoryButton: string;
    };
    error: string;
  };
  footer: string;
};

export type UILang = 'en' | 'es' | 'pl';

export const uiLanguages: { code: UILang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];
