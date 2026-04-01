# Avvio scraper in background (Windows). Esegui da cartella backend con .env configurato.
# Log: .\pg_scrape_out.log
$ErrorActionPreference = "Stop"
$backend = Split-Path -Parent $PSScriptRoot
Set-Location $backend
$log = Join-Path $backend "pg_scrape_out.log"
Start-Process -FilePath "python" -ArgumentList @(
  "scripts/scrape_paginegialle_specialists.py",
  "--min-delay", "1.25"
) -WorkingDirectory $backend -WindowStyle Hidden -RedirectStandardOutput $log -RedirectStandardError ($log + ".err") -PassThru | ForEach-Object { Write-Host "Started PID $($_.Id) log $log" }
