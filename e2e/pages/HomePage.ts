import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export type FeatureKey = 'grammar' | 'conversation' | 'story';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, '/');
  }

  featureCard(key: FeatureKey): Locator {
    return this.page.getByTestId(`home-feature-card-${key}`);
  }
}
