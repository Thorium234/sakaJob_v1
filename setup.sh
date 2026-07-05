#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== sakaJob — Starting Backend + Frontend ==="

# Start server
echo "[server] Installing dependencies..."
cd "$ROOT_DIR/server" && npm install --silent

echo "[server] Generating Prisma client..."
npx prisma generate 2>/dev/null

echo "[server] Pushing database schema..."
npx prisma db push 2>/dev/null

echo "[server] Starting API server on port 3000..."
npx tsx src/index.ts &
SERVER_PID=$!
sleep 2

# Start client
echo "[client] Installing dependencies..."
cd "$ROOT_DIR/client" && npm install --silent

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