const BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434';
const MODEL    = process.env.OLLAMA_MODEL    ?? 'llama3';

export async function generate(prompt: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/generate`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ model: MODEL, prompt, stream: false }),
  });

  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json() as { response: string };
  return data.response;
}
