import { Router, type Request, type Response } from 'express';
import { generate } from '../services/ollamaClient.js';
import { buildGrammarPrompt } from '../services/promptBuilder.js';

type Mistake = {
  original:    string;
  fixed:       string;
  explanation: string;
};


function splitResponse(fullText: string): { corrected: string; mistakesRaw: string } {
  // Try exact separator
  const exact = fullText.indexOf('---MISTAKES---');
  if (exact !== -1) {
    return {
      corrected:   fullText.slice(0, exact).trim(),
      mistakesRaw: fullText.slice(exact + '---MISTAKES---'.length).trim(),
    };
  }

  // Fallback: any line of 3+ dashes (e.g. "---")
  const dashLine = fullText.match(/\n-{3,}\s*\n/);
  if (dashLine?.index !== undefined) {
    return {
      corrected:   fullText.slice(0, dashLine.index).trim(),
      mistakesRaw: fullText.slice(dashLine.index + dashLine[0].length).trim(),
    };
  }

  // Fallback: inline " --- " (model ignores newlines)
  const inline = fullText.indexOf(' --- ');
  if (inline !== -1) {
    return {
      corrected:   fullText.slice(0, inline).trim(),
      mistakesRaw: fullText.slice(inline + 5).trim(),
    };
  }

  // Last resort: find where the JSON array starts
  const jsonStart = fullText.search(/\[[\s\S]*?\{/);
  if (jsonStart !== -1) {
    return {
      corrected:   fullText.slice(0, jsonStart).trim(),
      mistakesRaw: fullText.slice(jsonStart).trim(),
    };
  }

  return { corrected: fullText.trim(), mistakesRaw: '[]' };
}

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
    const prompt   = buildGrammarPrompt(text, targetLang, nativeLang);
    const fullText = await generate(prompt, { num_predict: 450, num_ctx: 1024 });

    console.log('--- RAW ---\n', fullText, '\n---');

    const { corrected, mistakesRaw } = splitResponse(fullText);

    let mistakes: Mistake[] = [];
    try {
      const clean = mistakesRaw
        .replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '')
        .replace(/,(\s*[}\]])/g, '$1');
      const parsed = JSON.parse(clean);
      const NO_ERROR_RE = /brak\s+b[łl][^\s]*|no\s+error|no\s+mistake|correct(ly)?|no\s+correction/i;
      mistakes = Array.isArray(parsed)
        ? parsed
            .map((m: Record<string, string>) => ({
              original:    m.original    ?? m.Original    ?? '',
              fixed:       m.fixed       ?? m.Fixed       ?? '',
              explanation: m.explanation ?? m.Explanation ?? Object.values(m)[2] ?? '',
            }))
            .filter((m: Mistake) =>
              m.original &&
              m.fixed &&
              m.original.trim().toLowerCase() !== m.fixed.trim().toLowerCase() &&
              !NO_ERROR_RE.test(m.explanation)
            )
        : [];
    } catch {
      mistakes = [];
    }

    let finalCorrected = corrected;
    for (const m of mistakes) {
      if (finalCorrected.includes(m.original) && !finalCorrected.includes(m.fixed)) {
        finalCorrected = finalCorrected.replace(m.original, m.fixed);
      }
    }

    res.json({ corrected: finalCorrected, mistakes });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[grammar/check] ERROR:', message);
    res.status(500).json({ error: 'AI service error. Is Ollama running?' });
  }
});

export default router;
