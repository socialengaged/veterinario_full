# API

- `GET /health` — pubblico, stato servizio
- `POST /requests` — pubblico, crea utente + richiesta + conversazione; risposta con JWT. **Body JSON** (`Content-Type: application/json`) come prima, oppure **`multipart/form-data`** per la **consulenza online** con allegati esami: campo testo **`payload`** = stringa JSON con lo stesso schema di `CreateRequestBody`, più uno o più campi **`files`** (PDF o immagini, max 8 file, 8 MB ciascuno). Gli allegati sono accettati solo se `consultation_online: true`. **Email admin:** destinatario principale **`ADMIN_EMAIL`** (es. `seomantis@gmail.com`); copia in **`Cc`** verso **`ADMIN_EMAIL_CC`** (default `vet.stella@gmail.com`, vuoto = nessun Cc). Stesso invio SMTP per richiesta generica (tabella match in HTML) e consulenza online (template senza tabella match; note + allegati se presenti). Oggetto con prefisso `[Attesa verifica email]` se l’account non è ancora verificato; senza prefisso se l’email utente è già verificata. Con account in attesa verifica, gli allegati della consulenza online sono inclusi nell’email admin **subito** se caricati; dopo `POST /auth/verify-email` arriva un secondo messaggio admin con l’inoltro effettivo ai match. Directory server: `REQUEST_UPLOAD_DIR` (default `backend/uploads/request_files`), scrivibile dal processo uvicorn. Campi: `email` obbligatoria; `password` obbligatoria (min. 8 caratteri) per **nuovi** account; se l’email è già registrata va ripetuta la **stessa password** corretta; `email_verification_ack` e `registration_consent` devono essere `true`; `phone` opzionale salvo se `contact_secondary` è `sms` o `whatsapp` (allora obbligatorio); `contact_secondary` `null` | `sms` | `whatsapp`. Senza email verificata la richiesta resta in attesa fino a `POST /auth/verify-email`.
- `POST /auth/login` — email + password
- `POST /auth/logout` — client rimuove token
- `GET /auth/me` — Bearer
- `POST /auth/verify-email` — body `{"token":"..."}`
- `POST /auth/resend-verification` — Bearer
- `GET /users/me/requests` — Bearer: elenco richieste con `specialty_name`, `conversation_id`, `description` / `description_preview`, dati **animale** e **zona** (`animal_species`, `animal_name`, `city`, `province`, `cap`), `contact_method`, `sub_service` (oltre a `specialty_slug`, stato, urgenza). Caricamento tramite ORM (`selectinload`) su relazioni `VetRequest`.
- `GET /users/me/profile` — Bearer: anagrafica, `profile_notes_for_vets`, indirizzi, animali (con `notes`), eventuale `linked_specialist` se `specialists.user_id` collegato
- `PATCH /users/me` — Bearer: `full_name`, `phone`, `profile_notes_for_vets`
- `POST /users/me/addresses` — Bearer; `PATCH/DELETE /users/me/addresses/{id}` — eliminazione bloccata se indirizzo usato da una richiesta
- `POST /users/me/animals` — Bearer; `PATCH/DELETE /users/me/animals/{id}` — eliminazione bloccata se animale usato da una richiesta
- `GET /users/me/animals` — Bearer
- `GET /specialists/specialties` — pubblico, elenco specialità (slug, nome, categoria)
- `POST /specialists/register` — pubblico, iscrizione professionista; consensi e `specialty_slugs` richiesti; se esistono profili `specialists` senza account compatibili → **409** con `detail.candidates`; ripetere la richiesta con `merge_candidate_specialist_id` per unire dopo verifica email (`POST /auth/verify-email` attiva anche il merge)
- `GET /dashboard/chats` — Bearer; ogni voce può includere `specialty_name` per la lista
- `GET /dashboard/chats/{id}` — Bearer; include `messages` e opzionale `request_context` (riepilogo richiesta: servizio, animale, zona, stato, testo richiesta)
- `POST /dashboard/chats/{id}/messages` — Bearer, body `{"body":"..."}`

- `GET /specialists/optout?id=<uuid>&sig=<hmac>` — pubblico, disiscrizione veterinario (HMAC-signed). Imposta `is_active=false`. Ritorna pagina HTML di conferma.

### Admin (header `X-Admin-Key` = `ADMIN_API_KEY` nel `.env`)

- `GET /admin/stats` — contatori: specialisti totali, con email reale, richieste, match, match contattati.
- `GET /admin/requests?limit=50&offset=0` — lista richieste con paginazione, user email/name.
- `GET /admin/matches?request_id=<uuid>` — match per richiesta: score, contacted, contacted_at, outcome, dati specialist (nome, email, phone).
- `POST /admin/match/{match_id}/update` — body `{"outcome":"success"|"no_answer"|"busy"|"refused"}`. Match ID formato: `{request_id}_{specialist_id}`.
- `POST /admin/conversations/{conv_id}/specialist-message` — body `{"specialist_id":"<uuid>","body":"..."}`. Inserisce messaggio `sender_role=specialist` nella conversazione + invia email notifica all’utente.

### Internal SEO (stesso header admin)

Vedi router `/internal/...` in OpenAPI.

Documentazione interattiva: `/docs`, `/openapi.json`.

## Test automatici (backend)

In `backend/tests/`:

- **`test_auth_guards`** — route con Bearer (`/users/me/profile`, `/auth/me`, `/dashboard/chats`, …) rispondono **401** senza token (comportamento “utente non loggato”).
- **`test_specialists_register_validation`** — `POST /specialists/register` rifiuta consensi mancanti senza dipendere da dati reali in DB.
- **`test_specialist_registration_unit`** — normalizzazione CAP/via/nome per deduplica (senza DB).
- **`test_users_profile_integration`** — flusso “utente loggato”: login, `GET/PATCH` profilo, CRUD indirizzo/animale, `DELETE` 204. **Opzionale:** eseguire solo con PostgreSQL raggiungibile e `ENABLE_PROFILE_INTEGRATION=1` (vedi docstring nel file), per non bloccare CI senza database.

Altri test: schema richieste, payload admin, health/header; integrazione email duplicata se `DATABASE_URL` è esportato.

## Test automatici (frontend)

`npm run test` (Vitest): es. `ProtectedRoute` — senza token in `localStorage` si viene reindirizzati verso `/accedi/`; con token mock la dashboard protetta si renderizza.

**Playwright** (`veterinari_frontend/`, `npm run test:e2e` o `npm run test:e2e:journeys`): percorsi anonimi (moduli, combinazioni servizio/animale), autenticati (chat, profilo, login). Variabili `E2E_BASE_URL` e `E2E_API_URL`; opzionale `E2E_START_WEBSERVER=1` per avviare Vite (vedi `playwright.config.ts`).