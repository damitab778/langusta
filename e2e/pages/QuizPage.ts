import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class QuizPage extends BasePage {
  readonly title: Locator;
  readonly placeholder: Locator;

  constructor(page: Page) {
    super(page, '/quiz');
    this.title = page.getByTestId('quiz-page-title');
    this.placeholder = page.getByTestId('quiz-placeholder');
  }
}
