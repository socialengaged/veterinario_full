# Database

Tabelle principali (PK UUID, timestamp `created_at` / `updated_at` dove definito):

- `users`: email unica indicizzata, `hashed_password` nullable (utenti solo da richiesta).
- `user_addresses`: `city`, `province` indicizzati.
- `animals`: `species` indicizzato.
- `specialties`: `slug` unico, `category` indicizzato.
- `specialists`: email, city, province indicizzati; `cap` e `street_address` (nullable, per tabella email e matching zona); `species_tags` JSON lista stringhe.
- **Backfill CAP/indirizzo** su DB già popolato senza rieseguire seed: [`scripts/backfill_specialist_cap_address.sql`](../scripts/backfill_specialist_cap_address.sql) oppure [`scripts/backfill_specialist_cap_address.py`](../scripts/backfill_specialist_cap_address.py) (stessi default di `seed.py` per le email `@example.com`).
- `specialist_specialties`: PK composta (specialist_id, specialty_id).
- `vet_requests`: stato richiesta; FK a user, animal, address, specialty.
- `request_matches`: score float; unique (request_id, specialist_id).
- `conversations`: unique su `request_id`.
- `messages`: `sender_role` stringa (user|specialist|system|admin).
- `email_verifications`: `token_hash` unico; scadenza e consumo.
- `admin_notifications`: `payload_json` (testo WhatsApp + struttura).

Migrazioni: `alembic upgrade head` (revisione iniziale crea schema da metadata).