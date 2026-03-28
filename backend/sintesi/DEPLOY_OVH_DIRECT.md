# Deploy diretto su OVH (salta locale)

Runbook per portare **solo il backend** LIVE su VPS Ubuntu OVH, testare via **IP** prima del DNS. Allineato al pattern “deploy safe”: backup DB prima di migrazioni distruttive, smoke test, rollback con `git`.

**Server di esempio in questo documento:** `80.225.90.151` (sostituire se diverso).

**Porta API interna:** su server condivisi, **8000/8001 possono essere già occupati** da altri progetti. L’istanza veterinari usa **`127.0.0.1:8060`** (systemd + Nginx → stesso host pubblico sulla porta 80). Non modificare i processi sulle altre porte.

**File da Windows:** se `alembic.ini` ha BOM UTF-8, `alembic upgrade` fallisce. Sul server: `python3 deploy/strip_bom.py` nella cartella `backend`, oppure salvare `alembic.ini` UTF-8 senza BOM prima del deploy.

**Riferimenti nel repo:** [`deploy/veterinari.service`](../deploy/veterinari.service), [`deploy/nginx-veterinari.conf`](../deploy/nginx-veterinari.conf), [`sintesi/DEPLOY.md`](DEPLOY.md) (staging generico).

---

## SSH rapido (`ssh ovh`)

Sul **tuo PC** (Windows/Linux/macOS), in `~/.ssh/config`:

```
Host ovh
    HostName 80.225.90.151
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
```

Poi: `ssh ovh` (equivale a `ssh ubuntu@80.225.90.151`).

---

## STEP 1 — SSH

```bash
ssh ubuntu@80.225.90.151
```

---

## STEP 2 — Setup base server

```bash
sudo apt update
sudo apt install -y python3.10 python3.10-venv python3-pip postgresql postgresql-contrib nginx git
```

Facoltativo firewall (aprire anche **8000** per il test diretto allo step 10):

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp
sudo ufw enable
```

---

## STEP 3 — Cartella progetto

```bash
cd /var/www
sudo mkdir -p veterinari
sudo chown ubuntu:ubuntu veterinari
cd veterinari
```

---

## STEP 4 — Clone repo

```bash
git clone YOUR_REPO_URL .
```

Atteso: cartella `backend/` nella root del clone.

---

## STEP 5 — Backend (venv)

```bash
cd /var/www/veterinari/backend
python3.10 -m venv venv
source venv/bin/activate
pip install -U pip
pip install -r requirements.txt
```

Se errore su `psycopg`:

```bash
pip install "psycopg[binary]"
```

---

## STEP 6 — PostgreSQL

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE veterinari;
CREATE USER vetuser WITH PASSWORD 'strongpassword';
ALTER ROLE vetuser SET client_encoding TO 'UTF8';
ALTER ROLE vetuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE vetuser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE veterinari TO vetuser;
\c veterinari
GRANT ALL ON SCHEMA public TO vetuser;
\q
```

**Backup prima di migrazioni importanti (deploy safe):**

```bash
sudo -u postgres pg_dump veterinari > ~/veterinari_pre_$(date +%F).sql
```

---

## STEP 7 — File `.env`

```bash
cd /var/www/veterinari/backend
cp .env.example .env
nano .env
```

**Obbligatorio per l’app:** `DATABASE_URL`, **`SECRET_KEY` (minimo 32 caratteri)**. Senza `SECRET_KEY` l’applicazione non parte.

Esempio minimo per test su server (email solo log, niente SMTP reale):

```env
DATABASE_URL=postgresql+psycopg://vetuser:strongpassword@127.0.0.1:5432/veterinari
SECRET_KEY=SOSTITUISCI_CON_STRINGA_CASUALE_DI_ALMENO_32_CARATTERI
FRONTEND_URL=http://80.225.90.151:8080
ADMIN_EMAIL=seomantis@gmail.com
EMAIL_LOG_ONLY=true
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=noreply@localhost
SMTP_USE_TLS=false
```

Aggiungere SMTP reali quando si vuole invio vero (togliere o impostare `EMAIL_LOG_ONLY=false`).

---

## STEP 8 — Migrazioni

```bash
cd /var/www/veterinari/backend
source venv/bin/activate
alembic upgrade head
```

---

## STEP 9 — Seed

```bash
python scripts/seed.py
```

---

## STEP 10 — Test diretto (uvicorn in foreground)

```bash
cd /var/www/veterinari/backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

Dal browser (o altra macchina):

- `http://80.225.90.151:8000/health` → `{"status":"ok"}`

Se non risponde: verificare `ufw`, security group OVH (porta 8000 aperta verso il mondo o verso il tuo IP).

Se OK: **CTRL+C** per fermare uvicorn.

---

## STEP 11 — Validazione completa

```bash
cd /var/www/veterinari/backend
source venv/bin/activate
python scripts/validate_preprod.py
```

Output atteso: `STATUS: READY_FOR_OVH`.

Se `NOT_READY`: leggere errori (DB, seed, permessi).

---

## STEP 12 — Systemd

```bash
sudo cp /var/www/veterinari/backend/deploy/veterinari.service /etc/systemd/system/veterinari.service
sudo systemctl daemon-reload
sudo systemctl enable veterinari
sudo systemctl start veterinari
sudo systemctl status veterinari
```

L’unit espone l’app su **127.0.0.1:8000** (Nginx in fronte). Per test senza Nginx da LAN si può temporaneamente cambiare `ExecStart` in `--host 0.0.0.0` (non consigliato in produzione senza firewall ristretto).

---

## STEP 13 — Nginx

```bash
sudo cp /var/www/veterinari/backend/deploy/nginx-veterinari.conf /etc/nginx/sites-available/veterinari
sudo nano /etc/nginx/sites-available/veterinari
```

Impostare `server_name` con IP o hostname temporaneo se serve.

```bash
sudo ln -sf /etc/nginx/sites-available/veterinari /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Test:

- `http://80.225.90.151/health` (tramite Nginx → proxy a 127.0.0.1:8000)

---

## STEP 14 — SSL (dopo DNS sul dominio)

Quando il dominio punta al server:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.tuodominio.it
```

---

## STEP 15 — Test finale

```bash
curl -s http://127.0.0.1/health
curl -s http://80.225.90.151/health
curl -s https://api.tuodominio.it/health
```

Test funzionale:

```bash
curl -s -X POST http://127.0.0.1:8000/requests -H "Content-Type: application/json" \
  -d '{"email":"probe@example.com","first_name":"P","last_name":"Robe","phone":"+39333000000","city":"Lecce","province":"LE","animal":{"species":"cane","name":"X"},"service":"visita_generica","urgency":"media"}'
```

---

## Quando cambiare il DNS

Solo quando:

- `/health` OK su IP (porta 80 o 443 dopo Nginx)
- `POST /requests` OK
- `validate_preprod.py` → `READY_FOR_OVH` sul server
- `systemctl status veterinari` stabile
- Nginx OK
- (Opzionale) SSL OK con Certbot sul dominio

**Prima:** test su IP e porta. **Dopo:** record A/AAAA del dominio verso `80.225.90.151`.

---

## Rollback

```bash
cd /var/www/veterinari
git log --oneline -5
git checkout COMMIT_PRECEDENTE
cd backend
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
sudo systemctl restart veterinari
```

Ripristino DB da dump se necessario:

```bash
sudo -u postgres psql -c "DROP DATABASE IF EXISTS veterinari;"
sudo -u postgres psql -c "CREATE DATABASE veterinari OWNER vetuser;"
sudo -u postgres pg_restore -d veterinari ~/backup.sql
```

(adattare al formato dump usato)

---

## Stato output

- **LIVE_READY** — tutti gli step OK: health, `validate_preprod`, systemd, nginx (e opzionale SSL).
- **ERROR** — fallito uno step (DB, env senza `SECRET_KEY`, migrazioni, firewall/security group, seed). Ripetere dalla prima verifica fallita.

Non modificare DNS finché non si è in **LIVE_READY** con i criteri sopra.
