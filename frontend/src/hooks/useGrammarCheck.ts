import { useState } from 'react';
import type { CheckGrammarInput, GrammarResult } from '../api/grammar';

type State =
  | { status: 'idle' }
  | { status: 'streaming'; raw: string }
  | { status: 'done'; data: GrammarResult }
  | { status: 'error'; message: string };

export function useGrammarCheck() {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function mutate(input: CheckGrammarInput) {
    setState({ status: 'streaming', raw: '' });

    try {
      const res = await fetch('/api/grammar/check', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(input),
      });

      if (!res.ok || !res.body) throw new Error('Request failed');

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = JSON.parse(line.slice(6)) as
            | { chunk: string }
            | { result: GrammarResult }
            | { error: string };

          if ('chunk' in payload) {
            setState(prev =>
              prev.status === 'streaming'
                ? { status: 'streaming', raw: prev.raw + payload.chunk }
                : prev
            );
          } else if ('result' in payload) {
            setState({ status: 'done', data: payload.result });
          } else if ('error' in payload) {
            setState({ status: 'error', message: payload.error });
          }
        }
      }
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' });
    }
  }

  return {
    mutate,
    isPending:  state.status === 'streaming',
    streamText: state.status === 'streaming' ? state.raw : null,
    data:       state.status === 'done' ? state.data : null,
    error:      state.status === 'error' ? new Error(state.message) : null,
  };
}
