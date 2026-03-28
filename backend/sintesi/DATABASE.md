# Database

Tabelle principali (PK UUID, timestamp `created_at` / `updated_at` dove definito):

- `users`: email unica indicizzata, `hashed_password` nullable (utenti solo da richiesta); `profile_notes_for_vets` (testo, note persistenti per i professionisti); `pending_specialist_profile` JSON (dati form iscrizione vet in attesa di merge).
- `user_addresses`: `city`, `province` indicizzati.
- `animals`: `species` indicizzato.
- `specialties`: `slug` unico, `category` indicizzato.
- `specialists`: email, city, province indicizzati; `cap` e `street_address` (nullable); `user_id` nullable FK verso `users` (account collegato, unicità parziale dove valorizzato); `species_tags` JSON lista stringhe.
- **Backfill CAP/indirizzo** su DB già popolato senza rieseguire seed: [`scripts/backfill_specialist_cap_address.sql`](../scripts/backfill_specialist_cap_address.sql) oppure [`scripts/backfill_specialist_cap_address.py`](../scripts/backfill_specialist_cap_address.py) (stessi default di `seed.py` per le email `@example.com`).
- `specialist_specialties`: PK composta (specialist_id, specialty_id).
- `vet_requests`: stato richiesta; FK a user, animal, address, specialty.
- `request_matches`: score float; unique (request_id, specialist_id).
- `conversations`: unique su `request_id`.
- `messages`: `sender_role` stringa (user|specialist|system|admin).
- `email_verifications`: `token_hash` unico; scadenza e consumo.
- Unione profilo vet esistente: `users.pending_specialist_profile` JSON può contenere `merge_specialist_id` finché l’utente completa la verifica email.
- `admin_notifications`: `payload_json` (testo WhatsApp + struttura).

Migrazioni: `alembic upgrade head` (revisione iniziale crea schema da metadata).