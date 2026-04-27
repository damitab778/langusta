import { apiRequest } from './client';

export type Correction  = { original: string; fixed: string; note: string };
export type BotMessage  = { botName: string; text: string };
export type HistoryItem = { role: 'user' | 'bot'; botName?: string; text: string };
export type Theme       = { theme: string; description: string };
export type BotInfo     = { name: string; personality: string };

export function fetchThemes(
  targetLang: string,
  nativeLang: string,
): Promise<{ themes: Theme[] }> {
  return apiRequest({ method: 'POST', url: '/conversation/themes', body: { targetLang, nativeLang } });
}

export function sendMessage(body: {
  targetLang: string;
  nativeLang: string;
  theme:      string;
  bots:       BotInfo[];
  history:    HistoryItem[];
  message:    string;
}): Promise<{ messages: BotMessage[]; corrections: Correction[] }> {
  return apiRequest({ method: 'POST', url: '/conversation/message', body });
}
