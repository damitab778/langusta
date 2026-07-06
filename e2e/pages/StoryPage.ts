import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class StoryPage extends BasePage {
  readonly charactersInput: Locator;
  readonly settingInput: Locator;
  readonly topicInput: Locator;
  readonly generateButton: Locator;
  readonly generatingSkeleton: Locator;
  readonly errorBox: Locator;
  readonly storyTitle: Locator;
  readonly storyText: Locator;
  readonly takeQuizButton: Locator;
  readonly quizGeneratingSkeleton: Locator;
  readonly questionCards: Locator;
  readonly submitAnswersButton: Locator;
  readonly scoreDisplay: Locator;
  readonly resultCards: Locator;
  readonly restartButton: Locator;

  constructor(page: Page) {
    super(page, '/story');
    this.charactersInput = page.getByTestId('story-characters-input');
    this.settingInput = page.getByTestId('story-setting-input');
    this.topicInput = page.getByTestId('story-topic-input');
    this.generateButton = page.getByTestId('story-generate-button');
    this.generatingSkeleton = page.getByTestId('story-generating');
    this.errorBox = page.getByTestId('story-error');
    this.storyTitle = page.getByTestId('story-title');
    this.storyText = page.getByTestId('story-text');
    this.takeQuizButton = page.getByTestId('story-take-quiz-button');
    this.quizGeneratingSkeleton = page.getByTestId('story-quiz-generating');
    this.questionCards = page.getByTestId('story-question');
    this.submitAnswersButton = page.getByTestId('story-submit-answers');
    this.scoreDisplay = page.getByTestId('story-score');
    this.resultCards = page.getByTestId('story-result-card');
    this.restartButton = page.getByTestId('story-restart-button');
  }

  async fillContext(input: { characters?: string; setting?: string; topic?: string }) {
    if (input.characters) await this.charactersInput.fill(input.characters);
    if (input.setting) await this.settingInput.fill(input.setting);
    if (input.topic) await this.topicInput.fill(input.topic);
  }

  async generate() {
    await this.generateButton.click();
  }

  async generateWithContext(input: { characters?: string; setting?: string; topic?: string }) {
    await this.fillContext(input);
    await this.generate();
  }

  async takeQuiz() {
    await this.takeQuizButton.click();
    await this.questionCards.first().waitFor();
  }

  optionButtons(questionIndex: number): Locator {
    return this.questionCards.nth(questionIndex).getByTestId('story-option');
  }

  async answerQuestion(questionIndex: number, optionIndex: number) {
    await this.optionButtons(questionIndex).nth(optionIndex).click();
  }

  async answerAll(optionIndices: number[]) {
    for (let i = 0; i < optionIndices.length; i++) {
      await this.answerQuestion(i, optionIndices[i]);
    }
  }

  async submitAnswers() {
    await this.submitAnswersButton.click();
  }

  async restart() {
    await this.restartButton.click();
  }
}
