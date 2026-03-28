#!/usr/bin/env bash
# Eseguire UNA VOLTA su OVH (ubuntu) da /var/www/veterinari:
#   bash clone_migrate_ovh_backend.sh
# Prerequisiti: backend attuale in /var/www/veterinari/backend (senza .git ok).
set -euo pipefail

ROOT=/var/www/veterinari
REPO="$ROOT/veterinario_full"
TS=$(date +%s)
LEG="$ROOT/backend.legacy.$TS"

echo "=== STOP veterinari ==="
sudo systemctl stop veterinari

echo "=== Backup backend -> $LEG ==="
mv "$ROOT/backend" "$LEG"

echo "=== Clone (shallow) ==="
if [[ -d "$REPO/.git" ]]; then
  echo "Repo già presente, fetch..."
  git -C "$REPO" fetch --depth 1 origin master
  git -C "$REPO" checkout master
  git -C "$REPO" pull --ff-only origin master
else
  git clone --depth 1 https://github.com/socialengaged/veterinario_full.git "$REPO"
fi

echo "=== Symlink backend ==="
ln -sfn "$REPO/backend" "$ROOT/backend"

echo "=== Restore .env e venv ==="
cp "$LEG/.env" "$ROOT/backend/.env"
rsync -a "$LEG/venv/" "$ROOT/backend/venv/"

cd "$ROOT/backend"
# shellcheck source=/dev/null
source venv/bin/activate
pip install -r requirements.txt -q

echo "=== Alembic ==="
alembic upgrade head

chmod +x scripts/*.sh 2>/dev/null || true
chmod +x deploy/*.sh 2>/dev/null || true

echo "=== Avvio servizio ==="
sudo systemctl start veterinari

ok=0
for _ in $(seq 1 25); do
  if curl -sfS -m 2 http://127.0.0.1:8060/health >/dev/null; then ok=1; break; fi
  sleep 1
done
if [[ "$ok" -ne 1 ]]; then
  echo "ERROR: health fallito dopo start" >&2
  exit 1
fi
echo -n "Health: "
curl -sS http://127.0.0.1:8060/health
echo ""

echo "=== Git HEAD ==="
git -C "$REPO" log -1 --oneline

echo "OK. Legacy salvato in: $LEG"
