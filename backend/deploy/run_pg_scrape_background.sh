#!/usr/bin/env bash
# Avvio scraper PagineGialle in background (da cartella backend con venv attivo).
# Uso: bash deploy/run_pg_scrape_background.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
LOG="${PG_SCRAPE_LOG:-/tmp/pg_scrape_$(date +%Y%m%d_%H%M%S).log}"
nohup python scripts/scrape_paginegialle_specialists.py >>"$LOG" 2>&1 &
echo "PID $! log $LOG"
