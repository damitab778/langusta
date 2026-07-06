import { test, expect } from '@playwright/test';
import { StoryPage } from '../pages/StoryPage.js';

test.describe('story mini-game', () => {
  // Acceptance: filling all three context fields and generating renders the
  // fixture story's title and text once generation completes.
  test('generating with context points renders the story', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generateWithContext({ characters: 'a curious cat', setting: 'a bakery', topic: 'friendship' });

    await expect(story.storyTitle).toBeVisible();
    await expect(story.storyTitle).toContainText('A Rainy Morning at the Bakery');
    await expect(story.storyText).toContainText('Maria walked into the small bakery');
  });

  // Acceptance: leaving all three context fields blank still succeeds — the
  // fields are optional, not required.
  test('generating with no context points still succeeds', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generate();

    await expect(story.storyTitle).toBeVisible();
  });

  // Acceptance: an Ollama/backend failure during story generation surfaces a
  // visible error and keeps the user on the form to retry.
  test('a story-generation failure surfaces an error and stays on the form', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generateWithContext({ topic: 'anything __STORY_FORCE_ERROR__' });

    await expect(story.errorBox).toBeVisible();
    await expect(story.generateButton).toBeVisible();
  });

  // Acceptance: "Take the quiz" fetches and renders exactly 4 question cards,
  // each offering exactly 4 answer options.
  test('taking the quiz renders 4 questions with 4 options each', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generate();
    await story.takeQuiz();

    await expect(story.questionCards).toHaveCount(4);
    await expect(story.optionButtons(0)).toHaveCount(4);
  });

  // Acceptance: the submit-answers button stays disabled while any question is
  // unanswered, and only enables once every question has a selected option.
  test('submit is disabled until every question is answered', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generate();
    await story.takeQuiz();

    await expect(story.submitAnswersButton).toBeDisabled();
    await story.answerAll([0, 0, 0, 0]);
    await expect(story.submitAnswersButton).toBeEnabled();
  });

  // Acceptance: submitting a known correct/incorrect mix of answers (fixture's
  // correctIndex is always 0) computes and displays the right score, marking
  // each result card's correctness accordingly.
  test('submitting answers shows the correct score and per-question results', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generate();
    await story.takeQuiz();
    await story.answerAll([0, 1, 0, 1]); // 2 correct (index 0), 2 incorrect (index 1)
    await story.submitAnswers();

    await expect(story.scoreDisplay).toContainText('2/4');
    await expect(story.resultCards).toHaveCount(4);
    await expect(story.resultCards.nth(1)).toContainText('Correct answer');
    await expect(story.resultCards.nth(0)).not.toContainText('Correct answer');
  });

  // Acceptance: forcing the quiz-generation call specifically to fail (via a
  // sentinel chained through the story text) surfaces an error while the
  // story itself remains visible for retry.
  test('a quiz-generation failure surfaces an error and keeps the story visible', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generateWithContext({ topic: 'anything __FORCE_QUIZ_ERROR__' });
    await story.takeQuizButton.click();

    await expect(story.errorBox).toBeVisible();
    await expect(story.storyTitle).toBeVisible();
  });

  // Acceptance: "Start a new story" from the results screen clears all story/
  // quiz/answer state and returns to an empty form.
  test('starting a new story resets back to an empty form', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();
    await story.generate();
    await story.takeQuiz();
    await story.answerAll([0, 0, 0, 0]);
    await story.submitAnswers();
    await expect(story.scoreDisplay).toBeVisible();

    await story.restart();

    await expect(story.charactersInput).toHaveValue('');
    await expect(story.generateButton).toBeVisible();
  });
});
