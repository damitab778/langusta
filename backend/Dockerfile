# ── Stage 1: Build ────────────────────────────────────────────────────────────
# Install all deps (including devDeps for tsc) and compile TypeScript → JavaScript
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY src/ ./src/
RUN npm run build
# /app/dist now contains compiled .js files — TypeScript is no longer needed

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
# Fresh image with only production deps + compiled output — no TypeScript tooling
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
