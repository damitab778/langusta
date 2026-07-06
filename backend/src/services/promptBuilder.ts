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

export function buildStoryPrompt(
  targetLang: string,
  nativeLang: string,
  characters: string,
  setting: string,
  topic: string,
): string {
  const points = [
    characters && `Characters: ${characters}`,
    setting && `Setting: ${setting}`,
    topic && `Topic: ${topic}`,
  ].filter(Boolean).join('\n');

  return `
Write a short story in ${targetLang} for a ${nativeLang}-speaking learner, 120-180 words, simple level-appropriate sentences.

${points || '(No context points given — invent an engaging scenario yourself.)'}

Incorporate any given context points naturally. Reply in this exact format — the story first, then the separator, then a JSON object with a title:

Example:
Maria walked into the small bakery on a rainy morning. The smell of fresh bread filled the air. She smiled at the baker, an old man named Tomas, and ordered her usual croissant. "Rainy days are perfect for pastries," he said, laughing.
---STORY---
{"title":"A Rainy Morning at the Bakery"}

Rules (strict):
- Story: ${targetLang} only, 120-180 words, no inline title, no markdown, no preamble.
- Separator exactly: ---STORY---
- JSON key in English: "title". Title max 8 words, written in ${targetLang}.
- No code fences, no extra text after the JSON.
`.trim();
}

export function buildStoryQuizPrompt(
  targetLang: string,
  nativeLang: string,
  story: string,
): string {
  return `
Based on this ${targetLang} story, write a 4-question multiple-choice comprehension quiz for a ${nativeLang}-speaking learner of ${targetLang}.

Story:
"""
${story}
"""

Return ONLY a JSON array of exactly 4 objects. Each has:
- "question": the question, in ${targetLang}
- "options": array of exactly 4 answer strings, in ${targetLang}
- "correctIndex": 0-based index (number) of the correct option in "options"
- "explanation": one sentence in ${nativeLang} explaining why that answer is correct, referencing the story

Example:
[{"question":"Where did Maria go?","options":["To a bakery","To a park","To school","To the beach"],"correctIndex":0,"explanation":"The story says she walked into a small bakery."}]

Rules (strict):
- Exactly 4 questions, exactly 4 options each, exactly 1 correct option.
- Questions answerable ONLY from the story text above — no outside knowledge.
- "correctIndex" is a number (0-3), never a string.
- JSON keys in English exactly as shown. "explanation" in ${nativeLang}, everything else in ${targetLang}.
- No markdown, no code fences, no extra text before or after the array.
`.trim();
}
