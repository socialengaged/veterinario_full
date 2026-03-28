# API

- `GET /health` — pubblico, stato servizio
- `POST /requests` — pubblico, crea utente + richiesta + conversazione; risposta con JWT. Campi: `email` obbligatoria; `password` obbligatoria (min. 8 caratteri) per **nuovi** account; se l’email è già registrata va ripetuta la **stessa password** corretta; `email_verification_ack` e `registration_consent` devono essere `true`; `phone` opzionale salvo se `contact_secondary` è `sms` o `whatsapp` (allora obbligatorio); `contact_secondary` `null` | `sms` | `whatsapp`. Senza email verificata la richiesta resta in attesa fino a `POST /auth/verify-email`.
- `POST /auth/login` — email + password
- `POST /auth/logout` — client rimuove token
- `GET /auth/me` — Bearer
- `POST /auth/verify-email` — body `{"token":"..."}`
- `POST /auth/resend-verification` — Bearer
- `GET /users/me/requests` — Bearer
- `GET /users/me/profile` — Bearer: anagrafica, `profile_notes_for_vets`, indirizzi, animali (con `notes`), eventuale `linked_specialist` se `specialists.user_id` collegato
- `PATCH /users/me` — Bearer: `full_name`, `phone`, `profile_notes_for_vets`
- `POST /users/me/addresses` — Bearer; `PATCH/DELETE /users/me/addresses/{id}` — eliminazione bloccata se indirizzo usato da una richiesta
- `POST /users/me/animals` — Bearer; `PATCH/DELETE /users/me/animals/{id}` — eliminazione bloccata se animale usato da una richiesta
- `GET /users/me/animals` — Bearer
- `GET /specialists/specialties` — pubblico, elenco specialità (slug, nome, categoria)
- `POST /specialists/register` — pubblico, iscrizione professionista; consensi e `specialty_slugs` richiesti; se esistono profili `specialists` senza account compatibili → **409** con `detail.candidates`; ripetere la richiesta con `merge_candidate_specialist_id` per unire dopo verifica email (`POST /auth/verify-email` attiva anche il merge)
- `GET /dashboard/chats` — Bearer
- `GET /dashboard/chats/{id}` — Bearer
- `POST /dashboard/chats/{id}/messages` — Bearer, body `{"body":"..."}`

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