import { test, expect } from '@playwright/test';
import { StoryPage } from '../pages/StoryPage.js';

// StoryPage is currently a placeholder (no interactive UI yet) — keep this smoke-only
// until the story feature is actually built.
test.describe('story page (stub)', () => {
  // Acceptance: navigating directly to /story renders the stub UI, and the
  // navbar correctly marks "Story" as the active link.
  test('renders title and placeholder, and shows as the active nav link', async ({ page }) => {
    const story = new StoryPage(page);
    await story.goto();

    await expect(story.title).toBeVisible();
    await expect(story.placeholder).toBeVisible();
    await expect(story.navbar.navLink('story')).toHaveClass(/bg-coral/);
  });
});
