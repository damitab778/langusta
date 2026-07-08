import * as ollama from './ollamaClient.js';
import * as gemini  from './geminiClient.js';

const PROVIDER = process.env.AI_PROVIDER ?? 'ollama';

type Options = Parameters<typeof ollama.generate>[1];

export async function generate(prompt: string, opts?: Options): Promise<string> {
  if (PROVIDER !== 'gemini') return ollama.generate(prompt, opts);

  try {
    return await gemini.generate(prompt, opts);
  } catch (err) {
    console.warn('[aiClient] Gemini failed, falling back to Ollama:', err instanceof Error ? err.message : err);
    return ollama.generate(prompt, opts);
  }
}
