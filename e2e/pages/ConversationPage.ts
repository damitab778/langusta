import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ConversationPage extends BasePage {
  readonly themesLoading: Locator;
  readonly themeCards: Locator;
  readonly chatInput: Locator;
  readonly sendButton: Locator;
  readonly userBubbles: Locator;
  readonly botBubbles: Locator;
  readonly typingIndicator: Locator;
  readonly correctionCards: Locator;
  readonly correctionsCount: Locator;
  readonly errorBanner: Locator;
  readonly rerollPartnersButton: Locator;
  readonly shuffleTopicsButton: Locator;
  readonly changeTopicButton: Locator;

  constructor(page: Page) {
    super(page, '/conversation');
    this.themesLoading = page.getByTestId('themes-loading');
    this.themeCards = page.getByTestId('theme-card');
    this.chatInput = page.getByTestId('conversation-input');
    this.sendButton = page.getByTestId('conversation-send');
    this.userBubbles = page.getByTestId('chat-bubble-user');
    this.botBubbles = page.getByTestId('chat-bubble-bot');
    this.typingIndicator = page.getByTestId('chat-typing-indicator');
    this.correctionCards = page.getByTestId('correction-card');
    this.correctionsCount = page.getByTestId('corrections-count');
    this.errorBanner = page.getByTestId('conversation-error');
    this.rerollPartnersButton = page.getByTestId('reroll-partners');
    this.shuffleTopicsButton = page.getByTestId('shuffle-topics');
    this.changeTopicButton = page.getByTestId('change-topic');
  }

  async selectTheme(index = 0) {
    await this.themeCards.nth(index).click();
  }

  async sendMessage(text: string) {
    const priorBotCount = await this.botBubbles.count();
    await this.chatInput.fill(text);
    await this.sendButton.click();
    await this.botBubbles.nth(priorBotCount).waitFor();
  }
}
