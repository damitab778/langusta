// Raw text fixtures shaped exactly as backend/src/routes/grammar.ts expects to parse them
// (corrected text, then the `---MISTAKES---` separator, then a JSON array of mistakes).

export const GRAMMAR_MISTAKES_RESPONSE = `She goes to school every day.
---MISTAKES---
[{"original":"go","fixed":"goes","explanation":"Use the third-person singular -s ending after \\"she\\"."}]`;

export const GRAMMAR_CLEAN_RESPONSE = `This sentence is already correct.
---MISTAKES---
[]`;
