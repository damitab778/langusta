// Raw text fixtures shaped exactly as backend/src/routes/conversation.ts expects to parse them.

// buildThemesPrompt has no separator token — the handler just slices between the first
// `[` and last `]`, so a bare JSON array is enough.
export const THEMES_RESPONSE = `[{"theme":"At the coffee shop","description":"Practice ordering drinks and making small talk."},{"theme":"Weekend plans","description":"Talk about leisure activities and future tense."},{"theme":"Favourite films","description":"Discuss movies and express opinions."}]`;

// Bot replies use the `[BotName]: text` format. Tests pin Math.random() to 0 so
// pickBots() always returns [Sofia] as the sole active bot (see conversation.spec.ts).
export const CONVERSATION_NO_CORRECTION_RESPONSE = `[Sofia]: That sounds wonderful! Tell me more about it.
---CORRECTIONS---
[]`;

export const CONVERSATION_WITH_CORRECTION_RESPONSE = `[Sofia]: That sounds wonderful! Tell me more about it.
---CORRECTIONS---
[{"original":"goed","fixed":"went","note":"The irregular past tense of \\"go\\" is \\"went\\", not \\"goed\\"."}]`;
