# VeterinarioVicino — Backend API

Python 3.12+ consigliato (testato anche con 3.10). Usare ambiente virtuale dedicato.

## 1. Virtualenv

```bash
cd backend
python3.12 -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate
pip install -U pip
pip install -r requirements.txt
```

## 2. PostgreSQL

Creare utente e database:

```sql
CREATE USER veterinari WITH PASSWORD 'veterinari';
CREATE DATABASE veterinariovicino OWNER veterinari;
```

## 3. Variabili ambiente

Copiare `.env.example` in `.env` e valorizzare. **Non usare BOM UTF-8** (meglio creare `.`env con editor o `python -c "open('.env','w',encoding='utf-8').write(...)"`).

Variabili obbligatorie: `DATABASE_URL`, `SECRET_KEY` (minimo 32 caratteri).

Esempio `DATABASE_URL`:

```
DATABASE_URL=postgresql+psycopg://veterinari:veterinari@127.0.0.1:5432/veterinariovicino
```

## 4. Migrazioni Alembic

```bash
cd backend
alembic upgrade head
```

Oppure solo sviluppo (equivalente a create_all):

```bash
python scripts/init_db.py
```

## 5. Seed dati demo

```bash
python scripts/seed.py
```

## 6. Smoke test (senza avviare uvicorn)

```bash
cd backend
python scripts/smoke_test.py
```

## 6b. Validazione pre-produzione (DB + flusso completo)

Richiede PostgreSQL in esecuzione, `alembic upgrade head`, `python scripts/seed.py`. Opzionale: `EMAIL_LOG_ONLY=true` in `.env` per log email in console.

```bash
cd backend
python scripts/validate_preprod.py
```

Uvicorn dalla **root del monorepo** (con `PYTHONPATH` che include la root, es. `set PYTHONPATH=.` su Windows):

```bash
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Dalla cartella `backend/`:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

OpenAPI: http://127.0.0.1:8000/docs

## 7. Test con curl

Health:

```bash
curl -s http://127.0.0.1:8000/health
```

Crea richiesta (dopo seed, usare uno slug es. `visite-generali` e città Lecce):

```bash
curl -s -X POST http://127.0.0.1:8000/requests ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"full_name\":\"Test\",\"phone\":\"+393331112233\",\"animal_species\":\"cane\",\"city\":\"Lecce\",\"province\":\"LE\",\"specialty_slug\":\"visite-generali\",\"urgency\":\"normale\",\"contact_method\":\"telefono\",\"marketing_consent\":false}"
```

(Linux/macOS: usare singole virgolette per il JSON.)

Risposta include `access_token` (JWT) e `redirect_url` verifica email.

Login (dopo aver impostato password):

```bash
python scripts/set_password.py test@example.com secretpassword
curl -s -X POST http://127.0.0.1:8000/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"secretpassword\"}"
```

```bash
curl -s http://127.0.0.1:8000/auth/me -H "Authorization: Bearer TOKEN"
```

## 8. Deploy staging OVH

Vedere [`sintesi/DEPLOY.md`](sintesi/DEPLOY.md) e cartella [`deploy/`](deploy/).

## 9. Git (monorepo)

Repository unico con `frontend/` (o `veterinari_frontend/`) e `backend/`.

Commit iniziale backend:

```bash
git add backend
git commit -m "init backend fastapi base"
```

## Sintesi

Documentazione operativa in `sintesi/`: ARCHITETTURA, DATABASE, API, DEPLOY.