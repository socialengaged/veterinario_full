# API

- `GET /health` — pubblico, stato servizio
- `POST /requests` — pubblico, crea richiesta; JWT + redirect in risposta
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