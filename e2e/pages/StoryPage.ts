import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class StoryPage extends BasePage {
  readonly title: Locator;
  readonly placeholder: Locator;

  constructor(page: Page) {
    super(page, '/story');
    this.title = page.getByTestId('story-page-title');
    this.placeholder = page.getByTestId('story-placeholder');
  }
}
