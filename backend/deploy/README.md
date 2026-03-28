# File deploy (OVH / Ubuntu)

- **`package_backend_for_ovh.ps1`** / **`package_backend_for_ovh.sh`** — dalla **root del monorepo**, generano `backend-deploy.tgz` senza `venv` / `.env` (vedi `sintesi/PROGETTO_OVH_STATO.md` §15).
- **`veterinari.service`** — copiare in `/etc/systemd/system/veterinari.service`
- **`nginx-veterinari.conf`** — copiare in `/etc/nginx/sites-available/veterinari` e adattare `server_name`

- Runbook staging: [`../sintesi/DEPLOY.md`](../sintesi/DEPLOY.md)
- **Deploy diretto OVH (IP fisso, test prima DNS):** [`../sintesi/DEPLOY_OVH_DIRECT.md`](../sintesi/DEPLOY_OVH_DIRECT.md)
