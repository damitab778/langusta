const THEME_CATEGORIES = [
  'food & cooking', 'travel & transport', 'work & career', 'family & relationships',
  'sport & fitness', 'music & concerts', 'technology & gadgets', 'nature & weather',
  'shopping & fashion', 'health & medicine', 'art & museums', 'books & reading',
  'movies & series', 'city life', 'childhood memories', 'future plans',
  'hobbies & free time', 'animals & pets', 'news & current events', 'money & budgeting',
];

function pickCategories(): string {
  const shuffled = [...THEME_CATEGORIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).join(', ');
}

export function buildThemesPrompt(targetLang: string, nativeLang: string): string {
  const categories = pickCategories();
  return `
Generate exactly 3 conversation topics for a ${nativeLang} speaker practising ${targetLang}.
Draw inspiration from these categories (one per topic): ${categories}.

Return ONLY a JSON array of 3 objects. Each has:
- "theme": specific topic title, max 6 words, written in ${targetLang}
- "description": one sentence in ${targetLang} saying what vocabulary or situations will be practiced

Example:
[{"theme":"At the coffee shop","description":"Practice ordering drinks and making small talk."},{"theme":"Weekend plans","description":"Talk about leisure activities and future tense."},{"theme":"Favourite films","description":"Discuss movies and express opinions."}]

No extra text, no markdown.
`.trim();
}

export function buildConversationPrompt(
  targetLang: string,
  nativeLang: string,
  theme: string,
  history: { role: 'user' | 'bot'; botName?: string; text: string }[],
  userMessage: string,
  bots: { name: string; personality: string }[],
): string {
  const historyText = history
    .map(m => m.role === 'bot' ? `[${m.botName ?? 'AI'}]: ${m.text}` : `User: ${m.text}`)
    .join('\n');

  const botList = bots.map(b => `- ${b.name}: ${b.personality}`).join('\n');

  return `
You are running a group conversation in ${targetLang} about: "${theme}".
The user is learning ${targetLang}; their native language is ${nativeLang}.

Characters in this conversation:
${botList}

Conversation so far:
${historyText || '(conversation just started — open with a warm greeting related to the topic)'}
User: ${userMessage}

Respond as 1 or 2 of the characters (pick whoever fits naturally). Each character's reply on its own line:
[CharacterName]: their message in ${targetLang}

Then correct any grammar or vocabulary mistakes in what the USER wrote (not what the characters said):
---CORRECTIONS---
[{"original":"wrong word/phrase from user's message","fixed":"correct version","note":"brief explanation in ${nativeLang}"}]

Rules:
- Characters speak ONLY in ${targetLang}, 1–3 sentences each.
- Reflect each character's personality clearly.
- Start immediately with [CharacterName]: — no preamble.
- Corrections are ONLY for the user's message — never correct the characters' replies.
- "original": specific wrong word/phrase from the user's text, never the full sentence.
- If the user made no mistakes, use [].
- JSON keys in English: "original", "fixed", "note". "note" in ${nativeLang}.
- No markdown, no code fences, no extra text.
`.trim();
}

export function buildGrammarPrompt(text: string, targetLang: string, nativeLang: string): string {
  return `
Correct this ${targetLang} text written by a ${nativeLang} learner: "${text}"

Reply in this exact format — corrected text first, then the separator, then a JSON array of mistakes:
Can you help me with English?
---MISTAKES---
[{"original":"can","fixed":"Can","explanation":"${nativeLang}: sentences start with a capital."},{"original":"english","fixed":"English","explanation":"${nativeLang}: language names are capitalised."}]

No mistakes example:
She goes to school every day.
---MISTAKES---
[]

Rules (strict):
- First line(s): corrected text with ALL fixes applied. No label, no preamble.
- "original": the specific wrong word/phrase only — never the full sentence.
- "fixed": one corrected string, no alternatives.
- No mistakes → []. Never write "no error" in an explanation.
- Separator exactly: ---MISTAKES---
- Keys in English: "original","fixed","explanation". "explanation" in ${nativeLang}.
`.trim();
}
