# Deploy OVH — Staging (runbook)

**Prerequisito:** backend verificato in locale (`python scripts/smoke_test.py`, migrazioni e opzionale seed). Non puntare il DNS finché non passano i check in fondo.

File di riferimento nel repo:

- [`deploy/veterinari.service`](../deploy/veterinari.service) — unit systemd
- [`deploy/nginx-veterinari.conf`](../deploy/nginx-veterinari.conf) — sito Nginx

---

## STEP 1 — SSH

```bash
ssh ubuntu@YOUR_OVH_IP
```

---

## STEP 2 — Setup server

```bash
sudo apt update
sudo apt install -y python3.10 python3.10-venv python3-pip
sudo apt install -y postgresql postgresql-contrib
sudo apt install -y nginx git
```

Facoltativo firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## STEP 3 — Clone progetto

```bash
cd /var/www
sudo mkdir veterinari
sudo chown ubuntu:ubuntu veterinari
cd veterinari
git clone YOUR_REPO_URL .
```

Struttura attesa: cartella `backend/` alla root del clone.

---

## STEP 4 — Backend (venv)

```bash
cd /var/www/veterinari/backend
python3.10 -m venv venv
source venv/bin/activate
pip install -U pip
pip install -r requirements.txt
```

---

## STEP 5 — Database PostgreSQL

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

---

## STEP 6 — File `.env`

```bash
cd /var/www/veterinari/backend
cp .env.example .env
nano .env
```

Obbligatorio: `SECRET_KEY` (≥32 caratteri) e `DATABASE_URL` con driver **psycopg v3** (vedi `requirements.txt`):

```env
DATABASE_URL=postgresql+psycopg://vetuser:strongpassword@127.0.0.1:5432/veterinari
SECRET_KEY=<stringa-lunga-casuale-min-32-caratteri>
FRONTEND_URL=https://staging.tuofrontend.it
ADMIN_EMAIL=seomantis@gmail.com
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...
SMTP_FROM=...
SMTP_USE_TLS=true
```

**Nota:** file `.env` UTF-8 **senza BOM** (su Windows editor).

---

## STEP 7 — Migrazioni e seed

```bash
cd /var/www/veterinari/backend
source venv/bin/activate
alembic upgrade head
python scripts/seed.py
```

(Seed opzionale in staging; utile per slug e specialisti di test.)

---

## STEP 8 — Test run manuale

Dalla directory `/var/www/veterinari/backend` (dove si trova `main.py`):

```bash
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Importante:** usare `main:app` (non `backend.main:app`) con questa working directory.

Test da browser o curl (prima del DNS, usando IP):

- `http://SERVER_IP:8000/health` → `{"status":"ok"}`
- `http://SERVER_IP:8000/docs`

Test funzionale rapido (dopo seed):

```bash
curl -s -X POST http://127.0.0.1:8000/requests \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test","phone":"+393331112233","animal_species":"cane","city":"Lecce","province":"LE","specialty_slug":"visite-generali","urgency":"normale","contact_method":"telefono","marketing_consent":false}'
```

---

## STEP 9 — Systemd

Copiare l’unit dal repo:

```bash
sudo cp /var/www/veterinari/backend/deploy/veterinari.service /etc/systemd/system/veterinari.service
sudo systemctl daemon-reload
sudo systemctl enable veterinari
sudo systemctl start veterinari
sudo systemctl status veterinari
```

In alternativa, creare manualmente `/etc/systemd/system/veterinari.service` con lo stesso contenuto di [`deploy/veterinari.service`](../deploy/veterinari.service).

---

## STEP 10 — Nginx

```bash
sudo cp /var/www/veterinari/backend/deploy/nginx-veterinari.conf /etc/nginx/sites-available/veterinari
sudo nano /etc/nginx/sites-available/veterinari
sudo ln -sf /etc/nginx/sites-available/veterinari /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Sostituire `api.tuodominio.it` con il dominio reale.

---

## STEP 11 — SSL (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.tuodominio.it
```

---

## STEP 12 — Stato LIVE

Backend raggiungibile su `https://api.tuodominio.it` dopo DNS e SSL.

---

## DNS — quando puntare il dominio

Solo quando:

- `/health` OK via IP (o host temporaneo)
- DB e migrazioni OK (`alembic current`)
- `systemctl status veterinari` attivo senza errori
- Nginx + (opzionale) SSL OK
- `POST /requests` verificato

**Prima:** test su `http://SERVER_IP:8000`. **Dopo:** record A/AAAA verso OVH.

---

## Deploy aggiornamento (safe)

```bash
cd /var/www/veterinari
git pull
cd backend
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
sudo systemctl restart veterinari
```

Backup DB prima di migrazioni distruttive:

```bash
pg_dump -U vetuser -h 127.0.0.1 veterinari > backup_$(date +%F).sql
```

---

## Rollback

```bash
cd /var/www/veterinari
git log --oneline -5
git checkout <COMMIT_PRECEDENTE>
cd backend && source venv/bin/activate && alembic downgrade -1
sudo systemctl restart veterinari
```

Ripristino DB da `pg_dump` se necessario.

---

## Produzione (path alternativo)

Per layout `/var/www/veterinari_backend` e servizio `veterinari-api`, vedere cronologia git o README; lo staging standardizza su `/var/www/veterinari` e servizio `veterinari`.
