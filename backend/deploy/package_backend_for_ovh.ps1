# Crea backend-deploy.tgz dalla root del monorepo senza .env, venv né cache.
# Uso (PowerShell):  cd <root-repo> ; .\backend\deploy\package_backend_for_ovh.ps1
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$out = Join-Path $root "backend-deploy.tgz"
$backend = Join-Path $root "backend"
if (-not (Test-Path $backend)) { throw "Cartella backend non trovata: $backend" }
Push-Location $root
try {
    if (Test-Path $out) { Remove-Item $out -Force }
    # tar BSD (Windows): --exclude ripetuto per ogni pattern
    tar -czf $out `
        --exclude="backend/venv" `
        --exclude="backend/.venv" `
        --exclude="backend/.venv310" `
        --exclude="backend/__pycache__" `
        --exclude="backend/.pytest_cache" `
        --exclude="backend/.env" `
        --exclude="backend/.env.*" `
        backend
    Write-Host "OK: $out"
} finally {
    Pop-Location
}
