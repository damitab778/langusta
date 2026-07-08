import { Router, type Request, type Response } from 'express';
import { generate } from '../services/aiClient.js';
import { buildThemesPrompt, buildConversationPrompt } from '../services/promptBuilder.js';

type HistoryItem = { role: 'user' | 'bot'; botName?: string; text: string };
type BotInfo     = { name: string; personality: string };
type Correction  = { original: string; fixed: string; note: string };
type BotMessage  = { botName: string; text: string };

const SEP_RE = /---\s*CORRECTIONS\s*---/i;

function parseCorrections(raw: string): Correction[] {
  try {
    const clean = raw
      .replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '')
      .replace(/,(\s*[}\]])/g, '$1');
    const parsed = JSON.parse(clean);
    return Array.isArray(parsed)
      ? parsed
          .map((c: Record<string, string>) => ({
            original: c.original ?? '',
            fixed:    c.fixed    ?? '',
            note:     c.note     ?? c.explanation ?? '',
          }))
          .filter(c => c.original && c.fixed && c.original.toLowerCase() !== c.fixed.toLowerCase())
      : [];
  } catch {
    return [];
  }
}

function parseBotMessages(text: string, bots: BotInfo[], fallbackName: string): BotMessage[] {
  const results: BotMessage[] = [];

  // Primary: [Name]: text
  const bracketRe = /\[([A-Za-z]+)\]:\s*([^\[]+)/g;
  let match: RegExpExecArray | null;
  while ((match = bracketRe.exec(text)) !== null) {
    const content = match[2].trim();
    if (content) results.push({ botName: match[1].trim(), text: content });
  }
  if (results.length) return results;

  // Secondary: Name: text (model forgot brackets)
  const names = bots.map(b => b.name).join('|');
  if (names) {
    const nameRe = new RegExp(`(${names}):\\s*(.+?)(?=(?:${names}):|$)`, 'gsi');
    while ((match = nameRe.exec(text)) !== null) {
      const content = match[2].trim();
      if (content) results.push({ botName: match[1], text: content });
    }
  }
  if (results.length) return results;

  // Last resort: strip prose preamble, return remaining text
  const stripped = text
    .replace(/^[^[{]*?(?:conversation[^[{]*?:|start[^[{]*?:)/gi, '')
    .trim();
  results.push({ botName: fallbackName, text: stripped || text.trim() });
  return results;
}

const router = Router();

router.post('/themes', async (req: Request, res: Response) => {
  const { targetLang, nativeLang } = req.body as { targetLang: string; nativeLang: string };
  if (!targetLang || !nativeLang) {
    res.status(400).json({ error: 'targetLang and nativeLang are required.' });
    return;
  }
  try {
    const raw   = await generate(buildThemesPrompt(targetLang, nativeLang), { num_predict: 220, num_ctx: 512, temperature: 1.0 });
    const start = raw.indexOf('[');
    const end   = raw.lastIndexOf(']');
    const themes = JSON.parse(raw.slice(start, end + 1)) as { theme: string; description: string }[];
    res.json({ themes });
  } catch {
    res.status(500).json({ error: 'Failed to generate themes.' });
  }
});

router.post('/message', async (req: Request, res: Response) => {
  const { targetLang, nativeLang, theme, history, message, bots } = req.body as {
    targetLang: string;
    nativeLang: string;
    theme:      string;
    history:    HistoryItem[];
    message:    string;
    bots:       BotInfo[];
  };

  if (!targetLang || !nativeLang || !theme || !message || !bots?.length) {
    res.status(400).json({ error: 'Missing required fields.' });
    return;
  }

  try {
    const prompt   = buildConversationPrompt(targetLang, nativeLang, theme, history ?? [], message, bots);
    const fullText = await generate(prompt, { num_predict: 350, num_ctx: 2048 });

    console.log('--- CONV RAW ---\n', fullText, '\n---');

    const sepMatch  = SEP_RE.exec(fullText);
    const replyPart = (sepMatch ? fullText.slice(0, sepMatch.index) : fullText).trim();
    const rawCorr   = (sepMatch ? fullText.slice(sepMatch.index + sepMatch[0].length) : '[]').trim();

    const messages    = parseBotMessages(replyPart, bots, bots[0].name);
    const corrections = parseCorrections(rawCorr);

    res.json({ messages, corrections });
  } catch (err) {
    console.error('[conversation/message] ERROR:', err);
    res.status(500).json({ error: 'AI service error. Is Ollama running?' });
  }
});

export default router;
