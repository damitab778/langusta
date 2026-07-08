import { useMutation } from '@tanstack/react-query';
import { checkGrammar } from '../api/grammar';
import type { CheckGrammarInput, GrammarResult } from '../api/grammar';

export function useCheckGrammar() {
  return useMutation<GrammarResult, Error, CheckGrammarInput>({
    mutationFn: checkGrammar,
  });
}
