# Architettura

- **Stack**: FastAPI, SQLAlchemy 2 sync, PostgreSQL, Alembic, Pydantic v2, JWT (python-jose), passlib bcrypt, SMTP (stdlib), Jinja2 template email.
- **Entrypoint**: `main.py` (root) importa `app` da `app/main.py`.
- **HTTP**: CORS, GZip (risposte ≥ 512 byte), header `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` ([`app/main.py`](../app/main.py), [`app/http_middleware.py`](../app/http_middleware.py)).
- **Layer**: `api/routers` (HTTP) → `services` (business) → SQLAlchemy `Session` → `models`.
- **RequestService.create_request**: transazione unica (user get/create, indirizzo, animale, richiesta, match specialisti, conversazione, messaggio sistema, token verifica email, notifica admin JSON). Email inviate post-commit; errori SMTP loggati senza rollback DB.
- **Auth**: JWT Bearer; `POST /requests` restituisce `access_token` per auto-login client.
- **Matching** ([`RequestService._match_specialists`](../app/services/request_service.py)): join `specialist_specialties`, solo specialisti `is_active`; punteggio: stessa **città** dell’utente (+50), altrimenti stessa **provincia** (+10); **specie** animale (+40 se `species_tags` contiene la specie o lista vuota = tutte); se **CAP utente** (`user_addresses.cap`) e **CAP specialista** (`specialists.cap`) sono entrambi valorizzati e uguali, **+80** (boost zona). Ordinamento per score decrescente, max 25 risultati. Geografia SEO (comuni, slug) resta nel **frontend** (`veterinari_frontend/src/data/`), non in tabelle comuni lato API.
- **Roadmap / audit:** [`PIANO_AZIONE_POST_AUDIT.md`](PIANO_AZIONE_POST_AUDIT.md).