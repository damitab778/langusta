import type { Page, Locator } from '@playwright/test';

export type Route = 'grammar' | 'conversation' | 'story';
export type UiLang = 'en' | 'es' | 'pl';

const STORAGE_KEY = 'langusta_lang_settings';

export class NavbarComponent {
  readonly root: Locator;
  readonly logoLink: Locator;
  readonly menuToggle: Locator;
  readonly learnLanguageSelect: Locator;
  readonly nativeLanguageSelect: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByTestId('navbar');
    this.logoLink = page.getByTestId('navbar-logo-link');
    this.menuToggle = page.getByTestId('navbar-menu-toggle');
    this.learnLanguageSelect = page.getByTestId('select-learn-language');
    this.nativeLanguageSelect = page.getByTestId('select-native-language');
  }

  navLink(route: Route): Locator {
    // Desktop and mobile menus can both render a nav-link-{route} testid; only one
    // is ever visible at a time, so .first() keeps this safe in both states.
    return this.page.getByTestId(`nav-link-${route}`).first();
  }

  async clickNavLink(route: Route) {
    await this.navLink(route).click();
  }

  uiLangButton(lang: UiLang): Locator {
    return this.page.getByTestId(`ui-lang-${lang}`);
  }

  async setUiLanguage(lang: UiLang) {
    await this.uiLangButton(lang).click();
  }

  async setLearnLanguage(code: string) {
    await this.learnLanguageSelect.selectOption(code);
  }

  async setNativeLanguage(code: string) {
    await this.nativeLanguageSelect.selectOption(code);
  }

  async readPersistedSettings(): Promise<{ uiLang: string; learnLang: string; nativeLang: string } | null> {
    return this.page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
  }
}
