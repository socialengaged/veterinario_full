# VeterinarioVicino — monorepo

Repository unificato: **backend** (FastAPI) + **frontend** (Vite/React).

- **Backend:** `backend/` — API, Alembic, test `pytest`, sintesi deploy in `backend/sintesi/`
- **Frontend:** `veterinari_frontend/` — SPA; in produzione la build deve chiamare l’API HTTPS (vedi `.env.production`)

## Repository remoto

- GitHub: [https://github.com/socialengaged/veterinario_full](https://github.com/socialengaged/veterinario_full)

```bash
git remote add origin https://github.com/socialengaged/veterinario_full.git
git push -u origin master
```

## Produzione: perché login / form “non vanno”

1. **Frontend:** senza `VITE_API_BASE_URL` l’SDK usa `http://127.0.0.1:8060`. Il file **`.env.production`** nel frontend imposta `https://api.veterinariovicino.it` per ogni `npm run build`.
2. **Backend:** su server, `FRONTEND_URL` e `DATABASE_URL` corretti; CORS in `backend/app/main.py` include il dominio del sito.
3. **Permessi statici:** dopo `scp` della `dist/`, eseguire lo script permessi (vedi `backend/sintesi/PROGETTO_OVH_STATO.md`).

## Deploy OVH (sintesi)

Documentazione completa e checklist smoke test:

- [`backend/sintesi/PROGETTO_OVH_STATO.md`](backend/sintesi/PROGETTO_OVH_STATO.md)
- [`backend/sintesi/DEPLOY_OVH_DIRECT.md`](backend/sintesi/DEPLOY_OVH_DIRECT.md)

Comandi rapidi locali prima del push:

```bash
cd backend && python -m pytest -q
cd ../veterinari_frontend && npm ci && npm run build
```

## Struttura attesa sul server

| Path | Contenuto |
|------|-----------|
| `/var/www/veterinari/backend/` | Clone di questo repo, sottocartella `backend/` |
| `/var/www/veterinari/frontend/dist/` | Output di `npm run build` da `veterinari_frontend/` |

Il clone può essere la **root del repo** (con `backend/` e `veterinari_frontend/`): il deploy backend usa `cd backend`, il frontend si builda in CI o in locale e si carica solo `dist/`.
