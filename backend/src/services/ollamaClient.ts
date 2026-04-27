const BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434';
const MODEL    = process.env.OLLAMA_MODEL    ?? 'qwen2.5:7b';

type OllamaOptions = {
  num_predict?: number; // max output tokens — biggest speed lever
  num_ctx?:     number; // context window (smaller = faster)
  temperature?: number;
};

export async function generate(prompt: string, opts: OllamaOptions = {}): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/generate`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model:   MODEL,
      prompt,
      stream:  false,
      options: {
        num_predict: opts.num_predict ?? 600,
        num_ctx:     opts.num_ctx     ?? 2048,
        temperature: opts.temperature ?? 0.4,
      },
    }),
  });

  if (!res.ok) throw new Error(`Ollama error: ${res.status} ${res.statusText}`);

  const data = await res.json() as { response: string };
  return data.response;
}
