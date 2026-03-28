# API

- `GET /health` — pubblico, stato servizio
- `POST /requests` — pubblico, crea utente + richiesta + conversazione; risposta con JWT. Campi: `email` obbligatoria; `password` obbligatoria (min. 8 caratteri) per **nuovi** account; se l’email è già registrata va ripetuta la **stessa password** corretta; `email_verification_ack` e `registration_consent` devono essere `true`; `phone` opzionale salvo se `contact_secondary` è `sms` o `whatsapp` (allora obbligatorio); `contact_secondary` `null` | `sms` | `whatsapp`. Senza email verificata la richiesta resta in attesa fino a `POST /auth/verify-email`.
- `POST /auth/login` — email + password
- `POST /auth/logout` — client rimuove token
- `GET /auth/me` — Bearer
- `POST /auth/verify-email` — body `{"token":"..."}`
- `POST /auth/resend-verification` — Bearer
- `GET /users/me/requests` — Bearer
- `GET /users/me/animals` — Bearer
- `GET /dashboard/chats` — Bearer
- `GET /dashboard/chats/{id}` — Bearer
- `POST /dashboard/chats/{id}/messages` — Bearer, body `{"body":"..."}`

Documentazione interattiva: `/docs`, `/openapi.json`.