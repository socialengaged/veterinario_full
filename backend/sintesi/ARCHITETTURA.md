# Architettura

- **Stack**: FastAPI, SQLAlchemy 2 sync, PostgreSQL, Alembic, Pydantic v2, JWT (python-jose), passlib bcrypt, SMTP (stdlib), Jinja2 template email.
- **Entrypoint**: `main.py` (root) importa `app` da `app/main.py`.
- **Layer**: `api/routers` (HTTP) → `services` (business) → SQLAlchemy `Session` → `models`.
- **RequestService.create_request**: transazione unica (user get/create, indirizzo, animale, richiesta, match specialisti, conversazione, messaggio sistema, token verifica email, notifica admin JSON). Email inviate post-commit; errori SMTP loggati senza rollback DB.
- **Auth**: JWT Bearer; `POST /requests` restituisce `access_token` per auto-login client.
- **Matching**: join `specialist_specialties`, filtro attivi, score città (+50), provincia (+10), specie (+40 o tutte se lista vuota).