import { useState } from 'react';
import { checkGrammar } from '../api/grammar';
import type { CheckGrammarInput, GrammarResult } from '../api/grammar';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; data: GrammarResult }
  | { status: 'error'; message: string };

export function useGrammarCheck() {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function mutate(input: CheckGrammarInput) {
    setState({ status: 'loading' });
    try {
      const data = await checkGrammar(input);
      setState({ status: 'done', data });
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : 'Unknown error' });
    }
  }

  return {
    mutate,
    isPending: state.status === 'loading',
    data:      state.status === 'done'  ? state.data              : null,
    error:     state.status === 'error' ? new Error(state.message) : null,
  };
}
