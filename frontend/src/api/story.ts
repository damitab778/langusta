import { apiRequest } from './client';

export type GenerateStoryInput = {
  targetLang: string;
  nativeLang: string;
  characters: string;
  setting:    string;
  topic:      string;
};

export type GenerateStoryResult = {
  story: string;
  title: string;
};

export type QuizQuestion = {
  question:     string;
  options:      string[];
  correctIndex: number;
  explanation:  string;
};

export type GenerateStoryQuizInput = {
  targetLang: string;
  nativeLang: string;
  story:      string;
};

export type StoryQuizResult = {
  questions: QuizQuestion[];
};

export function generateStory(input: GenerateStoryInput): Promise<GenerateStoryResult> {
  return apiRequest<GenerateStoryResult, GenerateStoryInput>({
    method: 'POST',
    url:    '/story/generate',
    body:   input,
  });
}

export function generateStoryQuiz(input: GenerateStoryQuizInput): Promise<StoryQuizResult> {
  return apiRequest<StoryQuizResult, GenerateStoryQuizInput>({
    method: 'POST',
    url:    '/story/quiz',
    body:   input,
  });
}
