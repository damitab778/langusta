import type { Translations } from './types';

const es: Translations = {
  nav: {
    grammar: 'Gramática',
    conversation: 'Conversación',
    story: 'Juego de Historia',
  },
  learnLabel: 'Aprende',
  fromLabel: 'desde',
  home: {
    tagline: 'Aprende idiomas con IA. Gramática, conversación e historias — todo en un lugar.',
    features: {
      grammar: { title: 'Corrección Gramatical', desc: 'Pega tu texto y obtén correcciones instantáneas con explicaciones claras.' },
      conversation: { title: 'Conversación', desc: 'Chatea con un hablante nativo de IA. Practica diálogos a tu ritmo.' },
      story: { title: 'Juego de Historia', desc: 'Lee una historia generada por IA y pon a prueba tu comprensión con un mini-quiz.' },
    },
    start: 'Empezar →',
  },
  pages: {
    grammar: { title: 'Corrección Gramatical', desc: 'Próximamente — pega tu texto y obtén correcciones de IA.' },
    conversation: { title: 'Conversación', desc: 'Próximamente — chatea con un hablante nativo de IA.' },
    story: { title: 'Juego de Historia', desc: 'Indica algunos detalles y obtén una historia de IA con un quiz de comprensión.' },
  },
  story: {
    form: {
      charactersLabel: 'Personajes',
      charactersPlaceholder: 'p. ej. un gato curioso y un dragón tímido',
      settingLabel: 'Escenario',
      settingPlaceholder: 'p. ej. una ciudad flotante sobre las nubes',
      topicLabel: 'Tema',
      topicPlaceholder: 'p. ej. hacer un nuevo amigo',
      generateButton: 'Generar historia →',
      generatingButton: 'Escribiendo tu historia…',
    },
    reading: {
      takeQuizButton: 'Haz el quiz de comprensión →',
      untitled: 'Tu historia',
    },
    quiz: {
      generatingLabel: 'Preparando tu quiz…',
      submitButton: 'Enviar respuestas',
    },
    results: {
      scoreLabel: 'Obtuviste',
      yourAnswerLabel: 'Tu respuesta',
      correctAnswerLabel: 'Respuesta correcta',
      newStoryButton: 'Comenzar una nueva historia',
    },
    error: 'Algo salió mal. ¿Está Ollama funcionando?',
  },
  footer: 'Aprendizaje de idiomas con IA',
};

export default es;
