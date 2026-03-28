# Segreti locali (non in Git)

Questa cartella è **ignorata** dal repository: qui tieni copie **solo sul tuo PC** di password e URL sensibili (es. `DATABASE_URL` produzione OVH).

## File consigliati

| File | Contenuto |
|------|-----------|
| `ovh_database.env` | Copia da `ovh_database.env.example` e incolla la `DATABASE_URL` reale (utente `vetuser`, DB `veterinari`, host/password come sul server). **Non condividere né committare.** |
| `ovh_db_password.txt` | Opzionale: solo la password DB, se preferisci tenerla separata. |

## Operazioni

1. Copia `ovh_database.env.example` → `ovh_database.env`.
2. Incolla i valori veri (da password manager o da `/var/www/veterinari/backend/.env` sul server, se hai accesso SSH).
3. Verifica che `git status` **non** mostri mai file in `secrets/` tranne README ed `.example`.

Il deploy tramite archivio (`scripts/package_backend_deploy.*`) **esclude** `backend/.env`: il server mantiene il proprio `.env`; non sovrascriverlo con tarball dal PC.
