import { test, expect } from '@playwright/test';
import { ConversationPage } from '../pages/ConversationPage.js';

test.describe('conversation practice', () => {
  test.beforeEach(async ({ page }) => {
    // pickBots() shuffles BOTS with `.sort(() => Math.random() - 0.5)` then picks a
    // count via Math.random(). Pinning Math.random() to 0 keeps array order stable
    // and always selects a count of 1, so the active bot is deterministically Sofia
    // (BOTS[0] in frontend/src/data/bots.tsx) for fixture-matching in these tests.
    await page.addInitScript(() => {
      Math.random = () => 0;
    });
  });

  // Acceptance: on page load, themes finish fetching and exactly 3 selectable
  // theme cards are rendered.
  test('themes load and render as selectable cards', async ({ page }) => {
    const conversation = new ConversationPage(page);
    await conversation.goto();

    await expect(conversation.themeCards.first()).toBeVisible();
    await expect(conversation.themeCards).toHaveCount(3);
  });

  // Acceptance: selecting a theme starts the chat and renders the bot's
  // opening message from the fixture (Sofia, since Math.random is pinned above).
  test('selecting a theme starts the chat with a bot message', async ({ page }) => {
    const conversation = new ConversationPage(page);
    await conversation.goto();
    await conversation.selectTheme(0);

    await expect(conversation.botBubbles.first()).toBeVisible();
    await expect(conversation.botBubbles.first()).toContainText('That sounds wonderful');
  });

  // Acceptance: sending a chat message adds exactly one new user bubble and
  // one new bot reply bubble.
  test('sending a message renders a new user bubble and bot reply', async ({ page }) => {
    const conversation = new ConversationPage(page);
    await conversation.goto();
    await conversation.selectTheme(0);
    await expect(conversation.botBubbles.first()).toBeVisible();

    await conversation.sendMessage('I went to the beach yesterday.');

    await expect(conversation.userBubbles).toHaveCount(1);
    await expect(conversation.botBubbles).toHaveCount(2);
  });

  // Acceptance: a reply containing a grammar correction adds exactly one
  // correction card to the sidebar and increments the visible count to match.
  test('a correction fixture populates the corrections sidebar', async ({ page }) => {
    const conversation = new ConversationPage(page);
    await conversation.goto();
    await conversation.selectTheme(0);
    await expect(conversation.botBubbles.first()).toBeVisible();

    await conversation.sendMessage('Yesterday I goed to the beach. __WITH_CORRECTION__');

    await expect(conversation.correctionCards).toHaveCount(1);
    await expect(conversation.correctionsCount).toHaveText('1');
    await expect(conversation.correctionCards.first()).toContainText('goed');
    await expect(conversation.correctionCards.first()).toContainText('went');
  });

  // Acceptance: clicking "Change topic" discards the active chat and returns
  // the user to the theme-selection screen.
  test('change topic resets back to theme selection', async ({ page }) => {
    const conversation = new ConversationPage(page);
    await conversation.goto();
    await conversation.selectTheme(0);
    await expect(conversation.botBubbles.first()).toBeVisible();

    await conversation.changeTopicButton.click();

    await expect(conversation.themeCards.first()).toBeVisible();
  });
});
