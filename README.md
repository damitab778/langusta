# 🦞 Langusta

AI-powered language learning app. Practice grammar, conversation, quizzes, and story comprehension — all running on a local AI model via Ollama.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS |
| Backend | Node.js + Express |
| AI | Ollama (Llama 3) |

---

## Running with Docker (recommended)

The easiest way — one command starts everything.

**Prerequisites**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone the repo
git clone <repo-url>
cd langusta

# 2. Build and start all containers
docker compose up --build

# 3. First time only — pull the AI model (takes a few minutes)
docker exec langusta-ollama ollama pull llama3
```

Open **http://localhost:8080** in your browser.

> To stop everything: `docker compose down`
> To also delete downloaded AI models: `docker compose down -v`

---

## Running locally (development)

Run each piece in a separate terminal.

**Prerequisites**
- [Node.js 20+](https://nodejs.org/)
- [Ollama](https://ollama.com/)

### Terminal 1 — Ollama

```bash
# First time only
ollama pull llama3

# Ollama runs as a background service after install — nothing else needed.
# If it's not running: ollama serve
```

### Terminal 2 — Backend

```bash
cd backend

# First time only — create your env file
copy .env.example .env      # Windows
# cp .env.example .env      # Mac / Linux

npm install
npm run dev
```

Backend runs on **http://localhost:3001**

### Terminal 3 — Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## Environment Variables

Located in `backend/.env` (copy from `backend/.env.example`):

| Variable | Default | Description |
|---|---|---|
| `OLLAMA_BASE_URL` | `http://127.0.0.1:11434` | Ollama API address |
| `OLLAMA_MODEL` | `llama3` | Model to use |
| `PORT` | `3001` | Backend port |

---

## Features

| Feature | Status |
|---|---|
| Grammar correction | ✅ Done |
| Conversation practice | 🔧 In progress |
| AI-generated quizzes | 🔧 In progress |
| Story mini-game | 🔧 In progress |

---

## Project Structure

```
langusta/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── i18n/          # EN / ES / PL translations
│   │   ├── pages/
│   │   └── services/      # API call functions
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── routes/        # grammar.js, conversation.js, ...
│   │   └── services/      # ollamaClient.js, promptBuilder.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## Supported UI Languages

Switch between English, Spanish, and Polish using the buttons in the navbar.

---

## License

Models used:
- **Llama 3** — Meta custom license, free for commercial use under 700M MAU
- **Phi-3** — MIT license, unrestricted commercial use

Ollama — MIT license
