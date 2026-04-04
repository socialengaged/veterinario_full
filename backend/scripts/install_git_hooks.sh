#!/usr/bin/env bash
# Dalla root del monorepo: bash backend/scripts/install_git_hooks.sh
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
HOOK_SRC="$ROOT/backend/scripts/git-hooks/pre-commit"
HOOK_DST="$ROOT/.git/hooks/pre-commit"
if [[ ! -f "$HOOK_SRC" ]]; then
  echo "Missing $HOOK_SRC" >&2
  exit 1
fi
cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"
echo "Installed: $HOOK_DST"
