import { Router, type Request, type Response } from 'express';
import { generateStream } from '../services/ollamaClient.js';
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

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data: object) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  try {
    const prompt = buildGrammarPrompt(text, targetLang, nativeLang);
    let fullText = '';

    for await (const chunk of generateStream(prompt)) {
      fullText += chunk;
      send({ chunk });
    }

    console.log('--- RAW ---\n', fullText, '\n---');

    const start = fullText.indexOf('{');
    const end   = fullText.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON object found in response');

    const jsonStr = fullText
      .slice(start, end + 1)
      .replace(/,(\s*[}\]])/g, '$1');

    const parsed = JSON.parse(jsonStr) as ParsedResponse;

    const result = {
      corrected: parsed.corrected ?? parsed.corrected_text ?? '',
      mistakes:  (parsed.mistakes ?? []).filter((m) => m.original || m.fixed),
    };

    send({ result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[grammar/check] ERROR:', message);
    send({ error: 'AI service error. Is Ollama running?' });
  } finally {
    res.end();
  }
});

export default router;
