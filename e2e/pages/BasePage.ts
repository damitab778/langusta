import type { Page } from '@playwright/test';
import { NavbarComponent } from './NavbarComponent.js';

export class BasePage {
  readonly navbar: NavbarComponent;

  constructor(protected readonly page: Page, protected readonly path: string) {
    this.navbar = new NavbarComponent(page);
  }

  async goto() {
    await this.page.goto(this.path);
  }
}
