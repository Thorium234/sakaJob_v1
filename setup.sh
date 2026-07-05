#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== sakaJob — Starting Backend + Frontend ==="

# Start server
if [ ! -d "$ROOT_DIR/server/node_modules" ]; then
  echo "[server] Installing dependencies..."
  cd "$ROOT_DIR/server" && npm install --silent
else
  echo "[server] Dependencies already installed."
fi

cd "$ROOT_DIR/server"

if [ ! -d "node_modules/.prisma" ]; then
  echo "[server] Generating Prisma client..."
  npx prisma generate 2>/dev/null
else
  echo "[server] Prisma client already generated."
fi

if [ ! -f "prisma/dev.db" ]; then
  echo "[server] Pushing database schema..."
  npx prisma db push 2>/dev/null
  echo "[server] Seeding database..."
  npx tsx src/seed.ts 2>/dev/null || true
else
  echo "[server] Database already exists."
fi

cd "$ROOT_DIR/server"
echo "[server] Starting API server on port 3000..."
npx tsx src/index.ts &
SERVER_PID=$!
sleep 2

# Start client
if [ ! -d "$ROOT_DIR/client/node_modules" ]; then
  echo "[client] Installing dependencies..."
  cd "$ROOT_DIR/client" && npm install --silent
else
  echo "[client] Dependencies already installed."
fi

echo "[client] Starting Expo dev server..."
npx expo start &
CLIENT_PID=$!

echo ""
echo "============================================"
echo "  sakaJob is running!"
echo "  Server: http://localhost:3000"
echo "  Client: Expo dev server (press w/a/i)"
echo "============================================"
echo ""
echo "Press Ctrl+C to stop both."

trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT TERM
wait