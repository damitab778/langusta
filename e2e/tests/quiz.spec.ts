import { test, expect } from '@playwright/test';
import { QuizPage } from '../pages/QuizPage.js';

// QuizPage is currently a placeholder (no interactive UI yet) — keep this smoke-only
// until the quiz feature is actually built.
test.describe('quiz page (stub)', () => {
  // Acceptance: navigating directly to /quiz renders the stub UI, and the
  // navbar correctly marks "Quiz" as the active link.
  test('renders title and placeholder, and shows as the active nav link', async ({ page }) => {
    const quiz = new QuizPage(page);
    await quiz.goto();

    await expect(quiz.title).toBeVisible();
    await expect(quiz.placeholder).toBeVisible();
    await expect(quiz.navbar.navLink('quiz')).toHaveClass(/bg-coral/);
  });
});
