import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class GrammarPage extends BasePage {
  readonly subtitle: Locator;
  readonly input: Locator;
  readonly submitButton: Locator;
  readonly errorBox: Locator;
  readonly cleanResult: Locator;
  readonly mistakesResult: Locator;
  readonly originalTextBox: Locator;
  readonly correctedTextBox: Locator;
  readonly mistakeCards: Locator;

  constructor(page: Page) {
    super(page, '/grammar');
    this.subtitle = page.getByTestId('grammar-subtitle');
    this.input = page.getByTestId('grammar-input');
    this.submitButton = page.getByTestId('grammar-submit');
    this.errorBox = page.getByTestId('grammar-error');
    this.cleanResult = page.getByTestId('grammar-result-clean');
    this.mistakesResult = page.getByTestId('grammar-result');
    this.originalTextBox = page.getByTestId('grammar-original-text');
    this.correctedTextBox = page.getByTestId('grammar-corrected-text');
    this.mistakeCards = page.getByTestId('grammar-mistake-card');
  }

  async submitText(text: string) {
    await this.input.fill(text);
    await this.submitButton.click();
  }

  async isSubmitDisabled(): Promise<boolean> {
    return this.submitButton.isDisabled();
  }
}
