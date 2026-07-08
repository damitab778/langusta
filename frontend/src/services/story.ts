import { useMutation } from '@tanstack/react-query';
import { generateStory, generateStoryQuiz } from '../api/story';
import type {
  GenerateStoryInput,
  GenerateStoryResult,
  GenerateStoryQuizInput,
  StoryQuizResult,
} from '../api/story';

export function useGenerateStory() {
  return useMutation<GenerateStoryResult, Error, GenerateStoryInput>({
    mutationFn: generateStory,
  });
}

export function useGenerateStoryQuiz() {
  return useMutation<StoryQuizResult, Error, GenerateStoryQuizInput>({
    mutationFn: generateStoryQuiz,
  });
}
