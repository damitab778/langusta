import { apiRequest } from './client';

export type Mistake = {
  original:    string;
  fixed:       string;
  explanation: string;
};

export type GrammarResult = {
  corrected: string;
  mistakes:  Mistake[];
};

export type CheckGrammarInput = {
  text:       string;
  targetLang: string;
  nativeLang: string;
};

export function checkGrammar(input: CheckGrammarInput): Promise<GrammarResult> {
  return apiRequest<GrammarResult, CheckGrammarInput>({
    method: 'POST',
    url:    '/grammar/check',
    body:   input,
  });
}
