const BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434';
const MODEL    = process.env.OLLAMA_MODEL    ?? 'qwen2.5:7b';

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

export async function* generateStream(prompt: string): AsyncGenerator<string> {
  const res = await fetch(`${BASE_URL}/api/generate`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ model: MODEL, prompt, stream: true }),
  });

  if (!res.ok) throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  if (!res.body) throw new Error('No response body');

  const reader  = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = decoder.decode(value, { stream: true }).split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const obj = JSON.parse(line) as { response?: string; done?: boolean };
        if (obj.response) yield obj.response;
      } catch { /* partial line — skip */ }
    }
  }
}
