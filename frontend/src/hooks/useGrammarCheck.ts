import { useMutation } from '@tanstack/react-query';
import { checkGrammar, type CheckGrammarInput, type GrammarResult } from '../api/grammar';
import axios from 'axios';

export function useGrammarCheck() {
  return useMutation<GrammarResult, Error, CheckGrammarInput>({
    mutationFn: checkGrammar,
    // Axios wraps server error messages inside error.response.data.error —
    // normalise them into a plain Error so the component just reads error.message
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        throw new Error(err.response.data.error as string);
      }
    },
  });
}
