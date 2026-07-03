import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { GrammarPage } from '../pages/GrammarPage.js';
import { ConversationPage } from '../pages/ConversationPage.js';
import { QuizPage } from '../pages/QuizPage.js';
import { StoryPage } from '../pages/StoryPage.js';

test.describe('navigation', () => {
  // Acceptance: clicking each navbar link updates the URL to the matching
  // route and renders that page's key landmark element.
  test('navbar links route to each feature page', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.navbar.clickNavLink('grammar');
    await expect(page).toHaveURL(/\/grammar$/);
    await expect(new GrammarPage(page).input).toBeVisible();

    await home.navbar.clickNavLink('conversation');
    await expect(page).toHaveURL(/\/conversation$/);
    await expect(new ConversationPage(page).themeCards.first()).toBeVisible();

    await home.navbar.clickNavLink('quiz');
    await expect(page).toHaveURL(/\/quiz$/);
    await expect(new QuizPage(page).title).toBeVisible();

    await home.navbar.clickNavLink('story');
    await expect(page).toHaveURL(/\/story$/);
    await expect(new StoryPage(page).title).toBeVisible();
  });

  // Acceptance: clicking a home page feature card navigates to that
  // feature's route (an alternate entry point to the same pages as the navbar).
  test('home feature cards navigate to their pages', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.featureCard('grammar').click();
    await expect(page).toHaveURL(/\/grammar$/);
  });

  // Acceptance: switching UI language writes the choice to localStorage,
  // and it's still applied after a full page reload (not just in memory).
  test('UI language switch persists across reload', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.navbar.setUiLanguage('es');

    const settings = await home.navbar.readPersistedSettings();
    expect(settings?.uiLang).toBe('es');

    await page.reload();
    const afterReload = await home.navbar.readPersistedSettings();
    expect(afterReload?.uiLang).toBe('es');
  });

  // Acceptance: changing the "learning" language selector in the navbar is
  // reflected on a different page (Grammar's subtitle), proving the language
  // context is shared app-wide, not local to one component.
  test('learn language selection propagates to the grammar page subtitle', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.navbar.setLearnLanguage('en');

    const grammar = new GrammarPage(page);
    await grammar.goto();
    await expect(grammar.subtitle).toContainText('Writing in');
    await expect(grammar.subtitle).toContainText('English');
  });
});
