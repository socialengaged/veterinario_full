#!/usr/bin/env bash
# Backup PostgreSQL database veterinari (server OVH).
set -euo pipefail

FILE="/tmp/backup_$(date +%F_%H-%M).sql"
sudo -u postgres pg_dump veterinari -f "$FILE"
echo "Backup created: $FILE"
ls -lh "$FILE"
