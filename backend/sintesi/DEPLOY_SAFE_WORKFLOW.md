# Deploy safe — standard operativo permanente (OVH)

Documento di riferimento per **ogni** modifica in produzione: riduce errori, downtime e rollback non necessari.

**Fonte versionata:** `backend/sintesi/DEPLOY_SAFE_WORKFLOW.md` nel monorepo. Se si mantiene una copia in wiki interna (es. `nemira/sintesi/`), **allineare** a questo file dopo ogni aggiornamento.

**Server produzione (riferimento):** VPS OVH, path API `/var/www/veterinari/backend`, systemd `veterinari`, health `http://127.0.0.1:8060/health`. IP e SSH: vedi [`PROGETTO_OVH_STATO.md`](PROGETTO_OVH_STATO.md) §2–3.

---

## Regole ferree

| Regola | Motivo |
|--------|--------|
| **Mai** deploy diretto in produzione senza commit su branch dedicato | Ripetibilità e `git revert` |
| **Mai** saltare **backup DB** se la release include **migrazioni Alembic** | Ripristino in caso di errore |
| **Mai** `systemctl restart veterinari` se `alembic upgrade head` **fallisce** | DB e codice devono restare coerenti; diagnosticare e ripristinare |
| **Sempre** smoke post-deploy: **health** + almeno un test **E2E** critico (`e2e_temp_mail_flow.py`) | Verifica SMTP + API pubblica |

---

## Automazione e guardrail (nel repo)

### Hook Git `pre-commit` (blocco commit di `.env`)

- Template versionato: `backend/scripts/git-hooks/pre-commit` (blocca qualsiasi path che termina con `/.env` o `.env` in root — **non** blocca `.env.example`).
- Installazione (una volta per clone, dalla **root del monorepo**):

```bash
bash backend/scripts/install_git_hooks.sh
```

Oppure: `cp backend/scripts/git-hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

### Script sul server (`backend/scripts/`)

| Script | Ruolo |
|--------|--------|
| `db_backup.sh` | `pg_dump` → `/tmp/backup_YYYY-MM-DD_HH-MM.sql` |
| `deploy_safe.sh` | `git pull` → `venv` → `pip` → `alembic upgrade head` → `systemctl restart veterinari` → `curl` health |
| `post_deploy_check.sh` | `e2e_temp_mail_flow.py --runs 1` + `journalctl` ultimi 20 righe |

Dopo il clone o `git pull`, rendere eseguibili (Linux):

```bash
chmod +x scripts/db_backup.sh scripts/deploy_safe.sh scripts/post_deploy_check.sh
```

### FAST DEPLOY MODE (produzione OVH)

Dopo aver pushato il codice sul remoto e avere SSH sul server:

```bash
ssh ovh
cd /var/www/veterinari/backend
git pull   # assicurarsi di avere gli script aggiornati
chmod +x scripts/db_backup.sh scripts/deploy_safe.sh scripts/post_deploy_check.sh

./scripts/db_backup.sh
./scripts/deploy_safe.sh
./scripts/post_deploy_check.sh
```

**Layout OVH consigliato (monorepo):** clone in `/var/www/veterinari/veterinario_full`, symlink `ln -sfn .../veterinario_full/backend /var/www/veterinari/backend`. `deploy_safe.sh` esegue `git pull --ff-only` perché la cwd backend è dentro il work tree Git (anche senza cartella `.git` locale). Migrazione una tantum: `backend/deploy/clone_migrate_ovh_backend.sh` (salva il vecchio backend in `backend.legacy.<timestamp>`). **Tutte le revisioni Alembic usate in produzione** devono essere nel branch `master` su GitHub, altrimenti `alembic upgrade head` fallisce dopo il clone.

**Nota:** `deploy_safe.sh` interrompe tutto se una fase fallisce (`set -e`). Se `alembic upgrade head` fallisce, **non** viene eseguito il restart (il comando precedente ha già fallito). Comunque **verificare** i log prima di rilanciare.

**E2E dal server:** `post_deploy_check.sh` chiama l’API pubblica (`https://api.veterinariovicino.it` di default in `e2e_temp_mail_flow.py`) e richiede rete + mail.tm; se il server non deve uscire verso internet, eseguire l’E2E dal PC di sviluppo invece che dallo script sul VPS.

---

## Deploy produzione OVH — ordine operativo tipico (frontend + backend)

Flusso **effettivo** quando la release tocca **sito statico** e **API** (path e permessi: [`PROGETTO_OVH_STATO.md`](PROGETTO_OVH_STATO.md) §2 e §9).

| Step | Dove | Azione |
|------|------|--------|
| 1 | Locale | `git push origin master` (commit già fatto) |
| 2 | SSH `ovh` | `cd /var/www/veterinari/backend` → `git pull --ff-only origin master` → `source venv/bin/activate` → `pip install -r requirements.txt` → se serve: `alembic upgrade head` → `sudo systemctl restart veterinari` → `curl -s http://127.0.0.1:8060/health` |
| 3 | PC | `cd veterinari_frontend` → `npm run build` (legge `.env.production`) |
| 4 | PC | Da `veterinari_frontend/dist/`: `scp -r * ovh:/var/www/veterinari/frontend/dist/` (PowerShell: vedi §Deploy frontend in `PROGETTO_OVH_STATO`) |
| 5 | SSH `ovh` | **Permessi (obbligatorio):** `sudo bash /var/www/veterinari/backend/deploy/fix_frontend_dist_permissions.sh /var/www/veterinari/frontend/dist` — senza questo passo, **`/assets/*.js` può rispondere 403** e il sito resta sullo **spinner**. |
| 6 | Browser / curl | `curl -sI https://veterinariovicino.it/assets/<nome-file-da-index.html>` → deve essere **200**. Poi verifica UI; se non cambia: **incognito** o **hard refresh** (Ctrl+F5) — la **PWA** può cacheare il vecchio `index.html`. |

**Errore comune:** componente aggiunto in repo ma **non montato nel JSX** (es. import senza `<Componente />` in `App.tsx`): il deploy file è corretto ma in produzione non compare nulla.

---

## Flusso fisso (ogni modifica)

### 1) Prima di ogni modifica — branch

```bash
git checkout master   # o main, allineato al default del repo
git pull origin master
git checkout -b feature/nome-descrittivo
```

Esempio nome branch: `feature/contact-priority-v2`.

### 2) Sviluppo (locale / Cursor)

- Implementare la feature con **diff minimo**; non refactor non richiesti.
- Mantenere **backward compatibility** dove possibile (API, schema DB con default/nullable).

### 3) Test locale minimo

```bash
cd backend
python -m pytest -q
```

- Se la modifica tocca **script che scrivono sul DB** (import, backfill): eseguire sempre **`--dry-run`** prima del run reale.
- Opzionale: `curl http://127.0.0.1:8060/health` con API locale avviata.

### 4) Commit e push

```bash
git add .
git commit -m "feat: descrizione breve in imperativo"
git push origin feature/nome-descrittivo
```

### 5) Produzione — SSH

Due stili equivalenti (scegliere quello configurato sul PC):

**A — Host `ovh` in `~/.ssh/config`** (vedi `PROGETTO_OVH_STATO.md`):

```bash
ssh ovh
```

**B — Chiave esplicita (esempio):**

```bash
ssh -i ~/.ssh/ssh-key-2026-01-02.key ubuntu@57.131.16.162
```

Poi:

```bash
cd /var/www/veterinari/backend
```

*(Se il deploy non usa Git in `/var/www/veterinari`, seguire invece la modalità “pacchetto” in `PROGETTO_OVH_STATO.md` §15.)*

### 6) Backup DB (obbligatorio se ci sono migrazioni o modifiche schema)

```bash
sudo -u postgres pg_dump veterinari > /tmp/backup_$(date +%F_%H-%M).sql
ls -lh /tmp/backup_*.sql
```

Copiare il backup fuori da `/tmp` se serve conservazione a lungo termine.

### 7) Aggiornamento codice

```bash
git fetch origin
git pull origin master   # o main
```

Verificare di essere sul commit atteso (`git log -1`).

### 8) Dipendenze

```bash
source venv/bin/activate
pip install -r requirements.txt
```

### 9) Migrazioni (se presenti nel branch)

```bash
alembic upgrade head
```

- Se **errore**: **STOP** — non riavviare il servizio; ripristinare da backup o correggere migrazione in locale e ripetere il flusso.

### 10) Riavvio servizio

```bash
sudo systemctl restart veterinari
```

### 11) Health check

```bash
curl -s http://127.0.0.1:8060/health
```

Atteso: `{"status":"ok"}` (o equivalente documentato).

Opzionale pubblico: `curl -s https://api.veterinariovicino.it/health`

### 12) Test critici post-deploy

- Da **PC di sviluppo** (con rete):

```bash
cd backend
python scripts/e2e_temp_mail_flow.py --runs 1
```

- Manuale: creare richiesta, verificare email admin, match, eventuali link (es. contatto firmato).

### 13) Log

```bash
journalctl -u veterinari -n 50 --no-pager
```

Cercare errori SMTP, traceback, `CONTACT UPDATE`, `MATCH EMAIL`, ecc.

### 14) Aggiornamento sintesi (obbligatorio per release che cambiano comportamento)

Aggiornare in repo:

- `backend/sintesi/PROGETTO_OVH_STATO.md` — tabella “modifiche recenti” se serve
- `backend/sintesi/API.md` — nuovi endpoint
- `backend/sintesi/DATABASE.md` — nuove tabelle/colonne

Poi commit separato o nello stesso merge: `docs: sintesi post-deploy …`

### 15) Merge su branch principale e pulizia

Il branch principale del repo è **`master`** (verificare con `git branch -r`).

```bash
git checkout master
git pull origin master
git merge feature/nome-descrittivo
git push origin master
git branch -d feature/nome-descrittivo
```

Se il team usa **`main`**, sostituire `master` con `main` in modo coerente.

---

## Output richiesto a ogni deploy (checklist)

Compilare a mano o in ticket:

| Voce | Valore |
|------|--------|
| **Status deploy** | OK / FAIL |
| **Migration** | OK / N/A / FAIL |
| **Health** | OK / FAIL |
| **E2E** (`e2e_temp_mail_flow`) | OK / SKIP / FAIL |
| **Errori** | (nessuno / estratto log) |

---

## Riferimenti incrociati

- Deploy alternativo senza Git, Nginx, systemd: [`DEPLOY_OVH_DIRECT.md`](DEPLOY_OVH_DIRECT.md), [`DEPLOY.md`](DEPLOY.md)
- Runbook script server: `backend/deploy/ovh_vps_runbook.sh`

---

*Ultimo aggiornamento: workflow standard operativo permanente (marzo 2026). Deploy **2026-04-01:** email admin con `ADMIN_EMAIL_CC` documentato in `PROGETTO_OVH_STATO.md` §4 e `merge_email_env.py`.*
