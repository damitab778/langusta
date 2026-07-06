import type { Translations } from './types';

const en: Translations = {
  nav: {
    grammar: 'Grammar',
    conversation: 'Conversation',
    story: 'Story Game',
  },
  learnLabel: 'Learn',
  fromLabel: 'from',
  home: {
    tagline: 'Learn languages with AI. Grammar, conversation, and stories — all in one place.',
    features: {
      grammar: { title: 'Grammar Check', desc: 'Paste your text and get instant corrections with clear explanations.' },
      conversation: { title: 'Conversation', desc: 'Chat with an AI native speaker. Practice real dialogue at your pace.' },
      story: { title: 'Story Game', desc: 'Read an AI-generated story and test your comprehension with a mini-quiz.' },
    },
    start: 'Start →',
  },
  pages: {
    grammar: { title: 'Grammar Check', desc: 'Coming soon — paste your text and get AI corrections.' },
    conversation: { title: 'Conversation', desc: 'Coming soon — chat with an AI native speaker.' },
    story: { title: 'Story Game', desc: 'Specify a few details and get an AI story with a comprehension quiz.' },
  },
  story: {
    form: {
      charactersLabel: 'Characters',
      charactersPlaceholder: 'e.g. a curious cat and a shy dragon',
      settingLabel: 'Setting',
      settingPlaceholder: 'e.g. a floating city above the clouds',
      topicLabel: 'Topic',
      topicPlaceholder: 'e.g. making a new friend',
      generateButton: 'Generate story →',
      generatingButton: 'Writing your story…',
    },
    reading: {
      takeQuizButton: 'Take the comprehension quiz →',
      untitled: 'Your story',
    },
    quiz: {
      generatingLabel: 'Preparing your quiz…',
      submitButton: 'Submit answers',
    },
    results: {
      scoreLabel: 'You scored',
      yourAnswerLabel: 'Your answer',
      correctAnswerLabel: 'Correct answer',
      newStoryButton: 'Start a new story',
    },
    error: 'Something went wrong. Is Ollama running?',
  },
  footer: 'AI language learning',
};

export default en;
