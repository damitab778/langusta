export function buildGrammarPrompt(text: string, targetLang: string, nativeLang: string): string {
  return `
You are a ${targetLang} language tutor. The user is a ${nativeLang} speaker learning ${targetLang}.

They wrote the following text in ${targetLang}:
"""
${text}
"""

Your task:
1. Correct the text and list every grammar mistake.
2. For each mistake: "original" is the wrong word/phrase, "fixed" is ONE single corrected string (no alternatives, no "or"), "explanation" is why it is wrong — write the explanation ENTIRELY in ${nativeLang}, do not mix languages.
3. If there are no mistakes set "mistakes" to an empty array [].

Rules for your response:
- Output ONLY raw JSON. No markdown, no code fences, no commentary before or after.
- JSON keys must always be in English exactly as shown: "corrected", "mistakes", "original", "fixed", "explanation". Never translate the keys.
- Every value must be a plain string. No slashes, no "or", no parentheses outside the string value.
- "fixed" must contain exactly one corrected version, not multiple options.
- Only the VALUE of "explanation" should be written in ${nativeLang}.

Example output:
{"corrected":"Tengo hambre.","mistakes":[{"original":"Yo soy tiene hambre","fixed":"Tengo hambre","explanation":"'Tener' is used for hunger in Spanish, not 'ser'. The correct phrase is 'Tengo hambre'."}]}
`.trim();
}
