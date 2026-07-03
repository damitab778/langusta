import { test, expect } from '@playwright/test';
import { GrammarPage } from '../pages/GrammarPage.js';

test.describe('grammar check', () => {
  // Acceptance: submit is disabled with empty/whitespace-only input, and
  // becomes enabled as soon as the textarea has real text.
  test('submit button is disabled until text is entered', async ({ page }) => {
    const grammar = new GrammarPage(page);
    await grammar.goto();

    expect(await grammar.isSubmitDisabled()).toBe(true);
    await grammar.input.fill('She go to school.');
    expect(await grammar.isSubmitDisabled()).toBe(false);
  });

  // Acceptance: submitting flawed text renders exactly one mistake card,
  // containing both the original and corrected phrase from the fixture.
  test('submitting text with mistakes renders the mistake card', async ({ page }) => {
    const grammar = new GrammarPage(page);
    await grammar.goto();
    await grammar.submitText('She go to school every day.');

    await expect(grammar.mistakesResult).toBeVisible();
    await expect(grammar.mistakeCards).toHaveCount(1);
    await expect(grammar.mistakeCards.first()).toContainText('go');
    await expect(grammar.mistakeCards.first()).toContainText('goes');
  });

  // Acceptance: a mistake-free response renders the "clean" success view,
  // and the mistakes view is not shown at the same time.
  test('the __NO_MISTAKES__ fixture renders the clean result view', async ({ page }) => {
    const grammar = new GrammarPage(page);
    await grammar.goto();
    await grammar.submitText('This sentence is already correct. __NO_MISTAKES__');

    await expect(grammar.cleanResult).toBeVisible();
    await expect(grammar.mistakesResult).toBeHidden();
  });

  // Acceptance: when the backend/Ollama call fails, the UI shows a visible
  // error message instead of hanging or crashing silently.
  test('a backend/Ollama failure surfaces an error in the UI', async ({ page }) => {
    const grammar = new GrammarPage(page);
    await grammar.goto();
    await grammar.submitText('Some text to correct. __FORCE_ERROR__');

    // NOTE: the backend returns a friendly `{error: "AI service error. Is Ollama
    // running?"}` body on failure, but frontend/src/api/client.ts's apiRequest()
    // doesn't currently read response.data.error — it just rethrows axios's generic
    // HTTP error, so today's UI shows "Request failed with status code 500" instead
    // of the backend's message. Asserting today's actual behavior here; surfacing
    // the friendly message is a small frontend fix worth doing separately.
    await expect(grammar.errorBox).toBeVisible();
    await expect(grammar.errorBox).toContainText('Request failed with status code 500');
  });
});
