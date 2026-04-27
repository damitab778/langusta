import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import grammarRouter      from './routes/grammar.js';
import conversationRouter from './routes/conversation.js';

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/grammar',      grammarRouter);
app.use('/api/conversation', conversationRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', model: process.env.OLLAMA_MODEL ?? 'llama3' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
