# Piano d’azione post-audit (safe)

Documento di continuità dopo l’audit su backend, DB e dati geografici. Ogni fase ha **Definition of Done (DoD)** e **gate** prima di procedere alle fasi successive (ove applicabile).

---

## Contesto

- **Specialisti:** tabella PostgreSQL `specialists` (anagrafica, CAP, indirizzo, M:N con `specialties`). Matching e email admin leggono da DB.
- **Comuni / province SEO:** bundle frontend (`src/data/`), non replica comuni in API salvo futuro requisito (report, vincoli CAP ufficiali).
- **Script utili:** backfill CAP seed — [`scripts/backfill_specialist_cap_address.sql`](../scripts/backfill_specialist_cap_address.sql) / [`.py`](../scripts/backfill_specialist_cap_address.py).

---

## Fase 0 — Documentazione e allineamento produzione (basso rischio)

**Contenuto:** sintesi aggiornate (`ARCHITETTURA.md`, `DATABASE.md`, questo file); su server produzione eseguire `alembic upgrade head` se necessario, poi backfill CAP/indirizzi per record seed (`@example.com`) o dati reali inseriti a mano.

**DoD:** migrazione `0002_specialist_cap_address` applicata; specialisti di test o reali con `cap`/`street_address` valorizzati dove previsto; `GET /health` OK.

**Gate:** smoke manuale o `curl` su API pubblica dopo deploy.

---

## Fase 1 — Dati specialisti reali

**Contenuto:** popolare/aggiornare `specialists` in produzione (email, telefono, CAP, indirizzo, collegamenti specialità) via SQL controllato, import CSV o futuro pannello admin.

**DoD:** nessuna riga “operativa” senza coordinate minime concordate (almeno provincia; CAP consigliato per il boost).

**Gate:** verifica campione su 2–3 record + test invio email admin con tabella completa.

---

## Fase 2 — Testing automatizzato

**Contenuto:** estendere `pytest` con DB (fixture Postgres o CI): `POST /auth/verify-email` → `release_pending_requests_for_user` → messaggio utente in chat + dispatch; test `POST /auth/login` successo/fallimento; opzionale mock per `release_pending`.

E2E (Playwright) su **staging** con API e credenziali di test; flusso completo “mail con token” solo con mailcatcher o account di test.

**DoD:** pipeline locale o CI verde con nuovi test; documentazione comandi in `README` o `sintesi`.

**Gate:** nessuna regressione su test esistenti (`pytest -q`).

---

## Fase 3 — Performance matching (solo se necessario)

**Contenuto:** se il volume di `specialists` cresce molto: ridurre righe caricate (filtro SQL per `province` prima dello score in Python); valutare indici compositi dopo `EXPLAIN ANALYZE` su query reali.

**DoD:** metrica tempo p95 `POST /requests` sotto soglia concordata.

**Gate:** ambiente di load o staging con dataset realistico.

---

## Fase 4 — Prodotto e sicurezza

**Contenuto:** API admin (protetta) per CRUD specialisti; rate limit / idempotenza su `POST /requests` (anti-abuso). Richiede design auth (ruoli, segreti).

**DoD:** specifica OpenAPI o documento minimo + implementazione incrementale.

**Gate:** review sicurezza prima del deploy in produzione.

---

## Fase 5 — Osservabilità

**Contenuto:** metriche (latency endpoint critici, errori SMTP, conteggio richieste `pending_verification`); alert opzionali.

**DoD:** dashboard o log strutturati consultabili dal team.

**Gate:** nessun impatto su path utente in prima iterazione.

---

## Opzioni deliberate (non in produzione senza analisi)

- **Validazione CAP utente** (es. esattamente 5 cifre): impatta UX e casi esteri; valutare solo se obbligatorio.
- **Tabella comuni ISTAT** lato API: solo se requisito business (report, vincoli); altrimenti restare su frontend + testo libero.

---

## Riferimenti

- [`PROGETTO_OVH_STATO.md`](PROGETTO_OVH_STATO.md) — deploy e smoke
- [`DEPLOY.md`](DEPLOY.md) / [`DEPLOY_OVH_DIRECT.md`](DEPLOY_OVH_DIRECT.md) — runbook
- [`API.md`](API.md) — endpoint

---

*Ultimo aggiornamento: allineamento post-audit architettura e backlog operativo.*
