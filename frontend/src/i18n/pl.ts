import type { Translations } from './types';

const pl: Translations = {
  nav: {
    grammar: 'Gramatyka',
    conversation: 'Konwersacja',
    story: 'Gra Fabularna',
  },
  learnLabel: 'Uczę się',
  fromLabel: 'z',
  home: {
    tagline: 'Ucz się języków z AI. Gramatyka, rozmowy i historie — wszystko w jednym miejscu.',
    features: {
      grammar: { title: 'Sprawdzanie Gramatyki', desc: 'Wklej tekst i otrzymaj natychmiastowe poprawki z jasnymi wyjaśnieniami.' },
      conversation: { title: 'Konwersacja', desc: 'Rozmawiaj z AI native speakerem. Ćwicz prawdziwe dialogi we własnym tempie.' },
      story: { title: 'Gra Fabularna', desc: 'Przeczytaj historię wygenerowaną przez AI i sprawdź rozumienie mini-quizem.' },
    },
    start: 'Zaczynaj →',
  },
  pages: {
    grammar: { title: 'Sprawdzanie Gramatyki', desc: 'Wkrótce — wklej tekst i otrzymaj poprawki od AI.' },
    conversation: { title: 'Konwersacja', desc: 'Wkrótce — rozmawiaj z AI native speakerem.' },
    story: { title: 'Gra Fabularna', desc: 'Podaj kilka szczegółów i otrzymaj historię AI wraz z quizem ze zrozumienia.' },
  },
  story: {
    form: {
      charactersLabel: 'Postacie',
      charactersPlaceholder: 'np. ciekawski kot i nieśmiały smok',
      settingLabel: 'Miejsce akcji',
      settingPlaceholder: 'np. latające miasto nad chmurami',
      topicLabel: 'Temat',
      topicPlaceholder: 'np. poznawanie nowego przyjaciela',
      generateButton: 'Generuj historię →',
      generatingButton: 'Piszemy Twoją historię…',
    },
    reading: {
      takeQuizButton: 'Rozwiąż quiz ze zrozumienia →',
      untitled: 'Twoja historia',
    },
    quiz: {
      generatingLabel: 'Przygotowujemy quiz…',
      submitButton: 'Wyślij odpowiedzi',
    },
    results: {
      scoreLabel: 'Twój wynik',
      yourAnswerLabel: 'Twoja odpowiedź',
      correctAnswerLabel: 'Poprawna odpowiedź',
      newStoryButton: 'Zacznij nową historię',
    },
    error: 'Coś poszło nie tak. Czy Ollama działa?',
  },
  footer: 'Nauka języków z AI',
};

export default pl;
