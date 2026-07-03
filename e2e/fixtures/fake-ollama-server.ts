// Minimal stand-in for Ollama's `POST /api/generate` endpoint, used so E2E tests can run
// the real frontend + real backend without a real Ollama install. The backend always hits
// the same /api/generate endpoint for grammar, themes and conversation requests, so this
// server disambiguates by looking for the literal separator tokens that
// backend/src/services/promptBuilder.ts always embeds in its format instructions.
import express from 'express';
import {
  GRAMMAR_MISTAKES_RESPONSE,
  GRAMMAR_CLEAN_RESPONSE,
} from './grammar-fixtures.js';
import {
  THEMES_RESPONSE,
  CONVERSATION_NO_CORRECTION_RESPONSE,
  CONVERSATION_WITH_CORRECTION_RESPONSE,
} from './conversation-fixtures.js';

const PORT = Number(process.env.PORT ?? 4143);

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/generate', (req, res) => {
  const prompt: string = req.body?.prompt ?? '';

  if (prompt.includes('---MISTAKES---')) {
    if (prompt.includes('__FORCE_ERROR__')) {
      res.status(500).json({ error: 'simulated Ollama failure' });
      return;
    }
    const response = prompt.includes('__NO_MISTAKES__')
      ? GRAMMAR_CLEAN_RESPONSE
      : GRAMMAR_MISTAKES_RESPONSE;
    res.json({ response });
    return;
  }

  if (prompt.includes('---CORRECTIONS---')) {
    const response = prompt.includes('__WITH_CORRECTION__')
      ? CONVERSATION_WITH_CORRECTION_RESPONSE
      : CONVERSATION_NO_CORRECTION_RESPONSE;
    res.json({ response });
    return;
  }

  res.json({ response: THEMES_RESPONSE });
});

app.listen(PORT, () => {
  console.log(`Fake Ollama server listening on http://127.0.0.1:${PORT}`);
});
