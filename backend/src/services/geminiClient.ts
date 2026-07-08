const API_KEY = process.env.GEMINI_API_KEY ?? '';
const MODEL    = process.env.GEMINI_MODEL   ?? 'gemini-2.5-flash-lite';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

type GeminiOptions = {
  num_predict?: number; // mapped to maxOutputTokens
  num_ctx?:     number; // no Gemini equivalent, ignored
  temperature?: number;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
};

export async function generate(prompt: string, opts: GeminiOptions = {}): Promise<string> {
  if (!API_KEY) throw new Error('GEMINI_API_KEY is not set.');

  const res = await fetch(`${BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: opts.num_predict ?? 600,
        temperature:     opts.temperature ?? 0.4,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Gemini error: ${res.status} ${res.statusText} — ${body}`);
  }

  const data = await res.json() as GeminiResponse;
  const candidate = data.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;

  if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
    console.warn(`[geminiClient] finishReason: ${candidate.finishReason}`);
  }

  if (text === undefined) throw new Error(`Gemini returned no text. finishReason: ${candidate?.finishReason}`);

  return text;
}
