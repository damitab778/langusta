import { Router, type Request, type Response } from 'express';
import { generate } from '../services/ollamaClient.js';
import { buildGrammarPrompt } from '../services/promptBuilder.js';

type Mistake = {
  original:    string;
  fixed:       string;
  explanation: string;
};

type ParsedResponse = {
  corrected?:      string;
  corrected_text?: string;
  mistakes?:       Mistake[];
};

const router = Router();

router.post('/check', async (req: Request, res: Response) => {
  const { text, targetLang, nativeLang } = req.body as {
    text:       string;
    targetLang: string;
    nativeLang: string;
  };

  if (!text || !targetLang || !nativeLang) {
    res.status(400).json({ error: 'text, targetLang and nativeLang are required.' });
    return;
  }

  try {
    const prompt = buildGrammarPrompt(text, targetLang, nativeLang);
    const raw    = await generate(prompt);

    console.log('--- RAW ---\n', raw, '\n---');

    const start = raw.indexOf('{');
    const end   = raw.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON object found in response');

    const jsonStr = raw
      .slice(start, end + 1)
      .replace(/,(\s*[}\]])/g, '$1');

    const parsed = JSON.parse(jsonStr) as ParsedResponse;

    const result = {
      corrected: parsed.corrected ?? parsed.corrected_text ?? '',
      mistakes:  (parsed.mistakes ?? []).filter((m) => m.original || m.fixed),
    };

    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[grammar/check] ERROR:', message);
    res.status(502).json({ error: 'AI service error. Is Ollama running?' });
  }
});

export default router;
