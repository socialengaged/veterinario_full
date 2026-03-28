#!/usr/bin/env bash
# Dopo upload di veterinari_frontend/dist su OVH: la cartella assets può restare a 700 (solo owner).
# Nginx (www-data) deve poter attraversare e leggere i file, altrimenti /assets/*.js → 403 e il sito resta sullo spinner.
set -euo pipefail
DIST="${1:-/var/www/veterinari/frontend/dist}"
sudo chmod 755 "$DIST/assets" 2>/dev/null || true
sudo find "$DIST" -type d -exec chmod a+rx {} \;
sudo find "$DIST" -type f -exec chmod a+r {} \;
echo "OK permessi dist (nginx può servire /assets)"
