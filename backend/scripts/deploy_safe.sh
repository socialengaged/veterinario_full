#!/usr/bin/env bash
# Eseguire sul server OVH come utente con permessi git + sudo systemctl (es. ubuntu).
# Opzionale: DEPLOY_ROOT=/alt/path ./deploy_safe.sh
set -euo pipefail

DEPLOY_ROOT="${DEPLOY_ROOT:-/var/www/veterinari/backend}"

echo "=== DEPLOY START ==="
echo "DEPLOY_ROOT=$DEPLOY_ROOT"

cd "$DEPLOY_ROOT"

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Pulling latest code..."
  git pull --ff-only
else
  echo "WARN: not a Git work tree under $DEPLOY_ROOT — skipping git pull (clone/rsync/CI)."
fi

echo "Activating venv..."
# shellcheck source=/dev/null
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running migrations..."
alembic upgrade head

echo "Restarting service..."
sudo systemctl restart veterinari

echo "Health check..."
ok=0
for _ in $(seq 1 20); do
  if out=$(curl -sfS -m 2 http://127.0.0.1:8060/health 2>/dev/null); then
    echo "$out"
    ok=1
    break
  fi
  sleep 1
done
if [[ "$ok" -ne 1 ]]; then
  echo "ERROR: health check failed after restart (port 8060)" >&2
  exit 1
fi
echo ""

echo "=== DEPLOY DONE ==="
