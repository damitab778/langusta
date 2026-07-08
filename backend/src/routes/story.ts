import { Router, type Request, type Response } from 'express';
import { generate } from '../services/aiClient.js';
import { buildStoryPrompt, buildStoryQuizPrompt } from '../services/promptBuilder.js';

type QuizQuestion = {
  question:     string;
  options:      string[];
  correctIndex: number;
  explanation:  string;
};

const MAX_STORY_CHARS = 8000;

function splitStoryResponse(fullText: string): { story: string; title: string } {
  const SEP = '---STORY---';
  const idx = fullText.indexOf(SEP);
  if (idx === -1) return { story: fullText.trim(), title: '' };

  const story = fullText.slice(0, idx).trim();
  const rest  = fullText.slice(idx + SEP.length).trim();

  try {
    const clean = rest
      .replace(/^```[a-z]*\n?/i, '').replace(/```$/i, '')
      .replace(/,(\s*[}\]])/g, '$1');
    const parsed = JSON.parse(clean) as { title?: string };
    return { story, title: parsed.title ?? '' };
  } catch {
    return { story, title: '' };
  }
}

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  const { targetLang, nativeLang, characters, setting, topic } = req.body as {
    targetLang: string;
    nativeLang: string;
    characters?: string;
    setting?:    string;
    topic?:      string;
  };

  if (!targetLang || !nativeLang) {
    res.status(400).json({ error: 'targetLang and nativeLang are required.' });
    return;
  }

  try {
    const prompt   = buildStoryPrompt(targetLang, nativeLang, characters ?? '', setting ?? '', topic ?? '');
    const fullText = await generate(prompt, { num_predict: 2200, num_ctx: 4096, temperature: 0.75 });

    const { story, title } = splitStoryResponse(fullText);
    res.json({ story, title });
  } catch (err) {
    console.error('[story/generate] ERROR:', err);
    res.status(500).json({ error: 'AI service error. Is Ollama running?' });
  }
});

router.post('/quiz', async (req: Request, res: Response) => {
  const { targetLang, nativeLang, story } = req.body as {
    targetLang: string;
    nativeLang: string;
    story:      string;
  };

  if (!targetLang || !nativeLang || !story) {
    res.status(400).json({ error: 'targetLang, nativeLang and story are required.' });
    return;
  }

  try {
    const clampedStory = story.length > MAX_STORY_CHARS ? story.slice(0, MAX_STORY_CHARS) : story;
    const raw = await generate(buildStoryQuizPrompt(targetLang, nativeLang, clampedStory), {
      num_predict: 600,
      num_ctx:     4096,
      temperature: 0.5,
    });

    const start = raw.indexOf('[');
    const end   = raw.lastIndexOf(']');
    if (start === -1 || end === -1) throw new Error('No JSON array in quiz response');

    const clean  = raw.slice(start, end + 1).replace(/,(\s*[}\]])/g, '$1');
    const parsed = JSON.parse(clean) as QuizQuestion[];
    const questions = parsed.filter(q =>
      q.question &&
      Array.isArray(q.options) && q.options.length === 4 &&
      typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4
    );

    if (!questions.length) throw new Error('No valid questions parsed');

    res.json({ questions });
  } catch (err) {
    console.error('[story/quiz] ERROR:', err);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});

export default router;
