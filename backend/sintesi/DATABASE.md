# Database

Tabelle principali (PK UUID, timestamp `created_at` / `updated_at` dove definito):

- `users`: email unica indicizzata, `hashed_password` nullable (utenti solo da richiesta); `profile_notes_for_vets` (testo, note persistenti per i professionisti); `pending_specialist_profile` JSON (dati form iscrizione vet in attesa di merge).
- `user_addresses`: `city`, `province` indicizzati.
- `animals`: `species` indicizzato.
- `specialties`: `slug` unico, `category` indicizzato.
- `specialists`: email, city, province indicizzati; `cap` e `street_address` (nullable); `user_id` nullable FK verso `users` (account collegato, unicità parziale dove valorizzato); `species_tags` JSON lista stringhe; **`import_batch`** (nullable, stringa corta es. `italia_pg_2026_04`) — traccia ondate di import; **non** esposta in API pubbliche verso il frontend; **`last_contacted_at`**, **`contact_success_count`**, **`contact_attempts`** (tracking contatti admin — migrazione `0008_contact_tracking_priority`).
- **Backfill CAP/indirizzo** su DB già popolato senza rieseguire seed: [`scripts/backfill_specialist_cap_address.sql`](../scripts/backfill_specialist_cap_address.sql) oppure [`scripts/backfill_specialist_cap_address.py`](../scripts/backfill_specialist_cap_address.py) (stessi default di `seed.py` per le email `@example.com`).
- `specialist_specialties`: PK composta (specialist_id, specialty_id).
- `vet_requests`: stato richiesta; FK a user, animal, address, specialty.
- `request_matches`: score float; unique (request_id, specialist_id); **`contacted`**, **`contacted_at`**, **`outcome`** (testo: success, no_answer, busy, refused — migrazione `0008_contact_tracking_priority`).
- `conversations`: unique su `request_id`.
- `messages`: `sender_role` stringa (user|specialist|system|admin).
- `email_verifications`: `token_hash` unico; scadenza e consumo.
- Unione profilo vet esistente: `users.pending_specialist_profile` JSON può contenere `merge_specialist_id` finché l’utente completa la verifica email.
- `admin_notifications`: `payload_json` (testo WhatsApp + struttura).

Migrazioni: `alembic upgrade head` (revisione iniziale crea schema da metadata).

---

## Pipeline anagrafica veterinari (CSV → directory + matching DB)

Due consumi distinti degli stessi dati anagrafici (studi / ambulatori), con **una sorgente consigliata**:

| Passaggio | Dove | Cosa fa |
|-----------|------|---------|
| 1. Sorgente | `veterinari_frontend/src/data/veterinari.csv` | Dataset master (righe ≈ strutture). Sostituire o appendere qui le nuove righe; colonne attese come da [`csv-importer.ts`](../../veterinari_frontend/src/data/csv-importer.ts) (nome, indirizzo, città, provincia, telefoni, email se presente, `business_status`, ecc.). |
| 2. Frontend | Build Vite (`npm run build`) | A build time il CSV viene parsato e genera gli oggetti **Clinic** usati da elenco, mappe, schede città (nessun fetch runtime dal CSV). |
| 3. Backend matching | Tabella **`specialists`** + `specialist_specialties` | Il matching delle richieste (`RequestService._match_specialists`) interroga **solo il DB**, non il CSV. Allineare il DB con lo stesso dataset tramite import. |

**Script di import DB (stesso schema CSV del frontend):**

- [`scripts/import_from_frontend_dataset.py`](../scripts/import_from_frontend_dataset.py) — legge `veterinari.csv` (default: path sotto `veterinari_frontend/src/data/`), crea `Specialist` con email reale o sintetica `...@noemail.local`, collega **specialty** euristiche (`visite-generali`, `emergenze`, `domicilio`, `chirurgia`). Opzioni: `--dry-run`, `--limit`, `--offset`, `--city "Lecce"`.
- [`scripts/import_italia_pg_wave.py`](../scripts/import_italia_pg_wave.py) — ondata **PagineGialle** da `veterinari_italia_completo_dedup.csv` (root repo): dedup URL, geo da path URL, genera `veterinari_italia_wave.csv` (merge in `csv-importer.ts`) con `source=italia_pg_2026` e `profile_slug`; imposta `import_batch` e campi vuoti dove mancano dati; `--csv-only` solo CSV senza DB.
- [`scripts/backfill_cap_italia_pg_wave.py`](../scripts/backfill_cap_italia_pg_wave.py) — aggiorna **solo** `specialists.cap` per righe con `import_batch` (default `italia_pg_2026_04`) e CAP ancora vuoto, usando `veterinari_frontend/src/data/comuni_italiani_full.csv` (match comune+provincia, fuzzy opzionale). **Non** modifica specialist fuori dall’ondata. `--dry-run` per statistiche.
- [`scripts/backfill_cap_nominatim_wave.py`](../scripts/backfill_cap_nominatim_wave.py) — **secondo passaggio** CAP (sempre solo `import_batch` + CAP vuoto): geocoding **OpenStreetMap Nominatim** (`città, provincia, Italia` → `postcode`). Dedup per coppia (city, province); delay ~**1,1 s** tra richieste (policy OSM). Opzioni: `--dry-run` (query senza commit), `--no-fetch` (solo conteggi), `--limit-unique-pairs N` (test).
- [`scripts/import_specialists_seed.py`](../scripts/import_specialists_seed.py) — alternativa per CSV **strutturato** con colonne esplicite (`specialties` JSON, ecc.); utile per batch curati o integrazioni OTA.

### Dati mancanti (telefono, indirizzo, orari) — cosa si può fare in modo semplice

| Campo | Recupero programmatico “semplice” |
|-------|-----------------------------------|
| **CAP** | ① CSV comuni (`backfill_cap_italia_pg_wave`) ② Nominatim (`backfill_cap_nominatim_wave`) per frazioni / località non in anagrafica ISTAT. |
| **Telefono, indirizzo stradale, orari** | Non c’è un’API pubblica gratuita e affidabile solo da città+provincia. Opzioni realistiche: **Google Places / simili** (chiave API, costi), **scraping** del sito in `website_url` (fragile, manutenzione), integrazione manuale o da export PG più ricco. |
| **website_url** | Per l’ondata PG è già spesso valorizzato (URL scheda). |
| **Coordinate** | Nominatim restituisce lat/lon nella risposta; oggi **non** sono colonne su `specialists` — servirebbe migrazione + script dedicato se servissero in DB. |


**Ordine operativo sicuro (ondata nuova):**

1. **Backup DB** (`pg_dump`) prima di import massivi.
2. In locale: aggiornare `veterinari.csv` → `npm run build` e smoke UI.
3. `python scripts/import_from_frontend_dataset.py --dry-run` poi batch reali (`--limit` / `--offset` se serve).
4. Su OVH: stesso CSV allineato, `venv`, rieseguire import (o copiare CSV + script aggiornati), poi smoke `POST /requests` / health.
5. **Deploy frontend:** `scp` di `dist/` + `fix_frontend_dist_permissions.sh` (come [`DEPLOY_SAFE_WORKFLOW.md`](DEPLOY_SAFE_WORKFLOW.md)).

**Conteggio produzione (snapshot 2026-04-01):** `SELECT count(*) FROM specialists;` → **10681** su DB OVH (di cui **7657** con `import_batch = 'italia_pg_2026_04'` — ondata PagineGialle). Prima dell’ondata il totale era **3024**. Il file `veterinari.csv` ha **~3147 righe** (incluso header): la differenza rispetto al COUNT storico era da righe scartate in import (`business_status` ≠ OPERATIONAL, ecc.); l’ondata PG è importata da script dedicato, non solo da quel CSV.

**Checkpoint Git** prima di import distruttivi o refactor: vedi [`PROGETTO_OVH_STATO.md`](PROGETTO_OVH_STATO.md) §14 — tag **`checkpoint/ovh-2026-04-01-email-cc-verified`** (rollback codice; il DB va ripristinato dal **backup** se serve tornare indietro sui dati).