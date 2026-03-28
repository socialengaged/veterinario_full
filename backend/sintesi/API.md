# API

- `GET /health` — pubblico, stato servizio
- `POST /requests` — pubblico, crea richiesta; JWT + redirect in risposta. Campi: `email` obbligatoria; `phone` opzionale salvo se `contact_secondary` è `sms` o `whatsapp` (allora obbligatorio); `email_verification_ack` deve essere `true`; `contact_secondary` `null` | `sms` | `whatsapp`. Senza email verificata la richiesta non viene inoltrata ai veterinari fino a `POST /auth/verify-email`.
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