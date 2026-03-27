# ── Stage 1: Build ────────────────────────────────────────────────────────────
# A multi-stage build keeps the final image small.
# This stage installs Node, builds the app, then gets thrown away.
# Only the compiled /dist output is carried forward to Stage 2.
FROM node:20-alpine AS build

WORKDIR /app

# Cache npm install separately from source (same trick as backend Dockerfile)
COPY package*.json ./
RUN npm install

# Copy source and build the production bundle
COPY . .
RUN npm run build
# /app/dist now contains the compiled HTML/CSS/JS — no Node.js needed to serve it

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
# nginx is a lightweight web server (~25 MB). It just serves static files
# and forwards /api/* to the backend. No Node.js needed here.
FROM nginx:alpine

# Copy our custom nginx config (handles React Router + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from Stage 1 into nginx's serving folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx starts automatically — no CMD needed (defined in the base image)
