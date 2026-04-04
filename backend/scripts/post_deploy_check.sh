#!/usr/bin/env bash
# Eseguire sul server dopo deploy_safe.sh (venv attivo dalla stessa shell) oppure:
#   cd /var/www/veterinari/backend && source venv/bin/activate && ./scripts/post_deploy_check.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$BACKEND"

if [[ ! -f "venv/bin/activate" ]]; then
  echo "ERROR: venv not found under $BACKEND" >&2
  exit 1
fi
# shellcheck source=/dev/null
source venv/bin/activate

echo "Running E2E test..."
python scripts/e2e_temp_mail_flow.py --runs 1

echo "Checking logs..."
sudo journalctl -u veterinari -n 20 --no-pager

echo "=== CHECK DONE ==="
