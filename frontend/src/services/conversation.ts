import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchThemes, sendMessage } from '../api/conversation';
import type { BotInfo, HistoryItem, Theme } from '../api/conversation';

export function useThemes(targetLang: string, nativeLang: string) {
  return useQuery<{ themes: Theme[] }>({
    queryKey: ['conversation', 'themes', targetLang, nativeLang],
    queryFn:  () => fetchThemes(targetLang, nativeLang),
  });
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (body: {
      targetLang: string;
      nativeLang: string;
      theme:      string;
      bots:       BotInfo[];
      history:    HistoryItem[];
      message:    string;
    }) => sendMessage(body),
  });
}
