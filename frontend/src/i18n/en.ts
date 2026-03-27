import type { Translations } from './types';

const en: Translations = {
  nav: {
    grammar: 'Grammar',
    conversation: 'Conversation',
    quiz: 'Quiz',
    story: 'Story Game',
  },
  learnLabel: 'Learn',
  fromLabel: 'from',
  home: {
    tagline: 'Learn languages with AI. Grammar, conversation, quizzes — all in one place.',
    features: {
      grammar: { title: 'Grammar Check', desc: 'Paste your text and get instant corrections with clear explanations.' },
      conversation: { title: 'Conversation', desc: 'Chat with an AI native speaker. Practice real dialogue at your pace.' },
      quiz: { title: 'Quiz', desc: 'Pick a topic and get a custom quiz generated just for you.' },
      story: { title: 'Story Game', desc: 'Read an AI-generated story and test your comprehension with a mini-quiz.' },
    },
    start: 'Start →',
  },
  pages: {
    grammar: { title: 'Grammar Check', desc: 'Coming soon — paste your text and get AI corrections.' },
    conversation: { title: 'Conversation', desc: 'Coming soon — chat with an AI native speaker.' },
    quiz: { title: 'Quiz', desc: 'Coming soon — AI-generated quizzes on any topic.' },
    story: { title: 'Story Game', desc: 'Coming soon — read an AI story, then take a comprehension quiz.' },
  },
  footer: 'AI language learning',
};

export default en;
