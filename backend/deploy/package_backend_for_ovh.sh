#!/usr/bin/env bash
# Crea backend-deploy.tgz dalla root del monorepo senza .env, venv né cache.
# Uso:  cd <root-repo> && bash backend/deploy/package_backend_for_ovh.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="${ROOT}/backend-deploy.tgz"
cd "$ROOT"
rm -f "$OUT"
tar -czf "$OUT" \
  --exclude='backend/venv' \
  --exclude='backend/.venv' \
  --exclude='backend/.venv310' \
  --exclude='backend/__pycache__' \
  --exclude='backend/.pytest_cache' \
  --exclude='backend/.env' \
  --exclude='backend/.env.*' \
  backend
echo "OK: $OUT"
