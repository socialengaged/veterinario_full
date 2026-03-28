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