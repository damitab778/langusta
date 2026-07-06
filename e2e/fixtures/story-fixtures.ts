// Raw text fixtures shaped exactly as backend/src/routes/story.ts expects to parse them.

// buildStoryPrompt's format: story text, then the `---STORY---` separator, then a
// JSON object with a "title" key.
export const STORY_RESPONSE = `Maria walked into the small bakery on a rainy morning. The smell of fresh bread filled the air. She smiled at the baker, an old man named Tomas, and ordered her usual croissant. "Rainy days are perfect for pastries," he said, laughing.
---STORY---
{"title":"A Rainy Morning at the Bakery"}`;

// Same story text, but carries an embedded __FORCE_QUIZ_ERROR__ marker so it's still
// present once this text is echoed back verbatim as the `story` field in the
// /story/quiz request — letting a test force that specific call to fail (see
// fake-ollama-server.ts's routing and story.spec.ts's chained-sentinel test).
export const STORY_RESPONSE_FOR_QUIZ_ERROR_TEST = `Maria walked into the small bakery on a rainy morning. __FORCE_QUIZ_ERROR__ The smell of fresh bread filled the air. She smiled at the baker, an old man named Tomas, and ordered her usual croissant.
---STORY---
{"title":"A Rainy Morning at the Bakery"}`;

// buildStoryQuizPrompt's format: a bare JSON array (no separator, same convention as
// THEMES_RESPONSE in conversation-fixtures.ts). All four correctIndex values are 0
// (the first option) so tests can force a known correct/incorrect mix deterministically
// by choosing which option index they click per question.
export const STORY_QUIZ_RESPONSE = `[{"question":"Where did Maria go?","options":["A bakery","A park","A school","A beach"],"correctIndex":0,"explanation":"The story says she walked into a small bakery."},{"question":"What was the weather like?","options":["Rainy","Sunny","Snowy","Windy"],"correctIndex":0,"explanation":"The story describes a rainy morning."},{"question":"What is the baker's name?","options":["Tomas","Carlos","Marco","Luis"],"correctIndex":0,"explanation":"The story names the baker Tomas."},{"question":"What did Maria order?","options":["A croissant","A cake","Bread","Cookies"],"correctIndex":0,"explanation":"The story says she ordered her usual croissant."}]`;
