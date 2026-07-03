import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OLLAMA_PORT = 4143;
const BACKEND_PORT = 3901;
const FRONTEND_PORT = 4310;

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ...(process.env.CI ? [["github"] as const] : []),
  ],
  timeout: 30_000,
  use: {
    baseURL: `http://127.0.0.1:${FRONTEND_PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "npx tsx fixtures/fake-ollama-server.ts",
      cwd: __dirname,
      url: `http://127.0.0.1:${OLLAMA_PORT}/health`,
      timeout: 30_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
      env: { PORT: String(OLLAMA_PORT) },
    },
    {
      command: "npm run dev",
      cwd: path.resolve(__dirname, "../backend"),
      url: `http://127.0.0.1:${BACKEND_PORT}/api/health`,
      timeout: 30_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        PORT: String(BACKEND_PORT),
        OLLAMA_BASE_URL: `http://127.0.0.1:${OLLAMA_PORT}`,
        OLLAMA_MODEL: "e2e-fixture-model",
      },
    },
    {
      command: `npm run dev -- --host 127.0.0.1 --port ${FRONTEND_PORT} --strictPort`,
      cwd: path.resolve(__dirname, "../frontend"),
      url: `http://127.0.0.1:${FRONTEND_PORT}`,
      timeout: 30_000,
      reuseExistingServer: !process.env.CI,
      stdout: "pipe",
      stderr: "pipe",
      env: { API_PROXY_TARGET: `http://127.0.0.1:${BACKEND_PORT}` },
    },
  ],
});
