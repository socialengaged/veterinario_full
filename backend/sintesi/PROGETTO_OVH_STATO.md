# VeterinarioVicino — stato progetto, deploy OVH, riferimenti tecnici

Documento unico per continuità: architettura, server, comandi, problemi noti e modifiche recenti. Aggiornare questo file quando cambiano infrastruttura o flussi critici.

**Standard operativo deploy produzione (checklist, regole ferree, merge):** [`sintesi/DEPLOY_SAFE_WORKFLOW.md`](DEPLOY_SAFE_WORKFLOW.md).

---

## 1. Panoramica

| Componente | Tecnologia | Note |
|------------|------------|------|
| Frontend SPA | React 18 + Vite 5 + TypeScript + Tailwind + shadcn | Cartella `veterinari_frontend/` |
| Backend API | FastAPI + SQLAlchemy + Alembic + PostgreSQL | Cartella `backend/` |
| Repository Git | monorepo unico | [github.com/socialengaged/veterinario_full](https://github.com/socialengaged/veterinario_full) |
| DB produzione | PostgreSQL (`veterinari`) | Utente DB dedicato (es. `vetuser`) |
| Email | **SMTP Gmail** (password per le app), **non** Resend | Variabili `SMTP_*` in `.env` |
| Server | VPS OVH Ubuntu, Nginx, systemd | SSH: `ssh ovh` → vedi §3 |

### Super sintesi — stato progetto (snapshot)

- **Prodotto:** portale VeterinarioVicino.it + API `api.veterinariovicino.it`; utente invia richiesta assistenza, crea account (email/password), chat guidata, verifica email obbligatoria prima dell’inoltro ai veterinari.
- **Repo:** monorepo [veterinario_full](https://github.com/socialengaged/veterinario_full) (`backend/` FastAPI, `veterinari_frontend/` Vite/React). Branch principale `master`.
- **Produzione (OVH):** VPS `57.131.16.162`; API su `127.0.0.1:8060` (systemd `veterinari`), Nginx verso HTTPS; statiche in `/var/www/veterinari/frontend/dist/`. DB PostgreSQL `veterinari`. Email via SMTP (es. Gmail), non Resend.
- **Deploy attuale:** backend aggiornabile con **`git pull`** solo se il server ha clone Git in `/var/www/veterinari`; altrimenti pacchetto (`tar` estratto in `backend/`) + **`scp`** del `dist/` frontend. Dopo ogni upload frontend: **permessi** (§2) obbligatori.
- **Qualità:** pytest schema in CI/backend; `validate_preprod.py` utile su DB “vergine” o email di test uniche; su DB già popolato i conteggi possono fallire senza indicare regressione (vedi §15).
- **Prossimi miglioramenti consigliati:** clone Git sul VPS per allineamento al runbook; `FRONTEND_URL` sempre `https://…` nei link email; backup DB prima di migrazioni; smoke Playwright/E2E dopo deploy.

Il **frontend** (build Vite) chiama l’API pubblica tramite **`VITE_API_BASE_URL`** (es. `https://api.veterinariovicino.it` in produzione). Flussi implementati: **`/richiedi-assistenza/`** e **`/registrati/`** → `POST /requests` (JWT + redirect a **`/dashboard/chat/:id`**, alias **`/dashboard/chats/:id`**), **`/accedi/`** → `POST /auth/login`, area **`/dashboard/chat`** (lista + dettaglio messaggi), pagina **`/verify-email?token=...`** → `POST /auth/verify-email`. Payload richieste: `email_verification_ack`, **`registration_consent`**, **`password`** (nuovo utente o stessa password se email già registrata).

**Verifica email e inoltro ai veterinari:** finché l’utente non conferma l’email (link nella posta, anche spam), la richiesta resta in stato **pending verification** e **non** viene ancora creato l’inoltro (match) ai veterinari nel DB. L’**email all’admin** (`ADMIN_EMAIL`) viene comunque inviata **subito** con tabella specialisti, testo WhatsApp e link (come per utente già verificato), oggetto **`[Attesa verifica email]`**; viene anche creato un record **`admin_notifications`** con lo stesso `payload_json` WhatsApp (titolo con suffisso “attesa verifica email”). Dopo `POST /auth/verify-email` si persistono i `request_matches` e arriva un **secondo** messaggio admin (inoltro effettivo); **non** si duplica una seconda `admin_notifications` alla verifica. La mail minimale *«Test invio email da produzione (script/API)»* proviene solo da test SMTP (`EmailService.send_test_ping`), non dai moduli. In dashboard compare un **banner** con reinvio link (`POST /auth/resend-verification`) se l’email non è ancora verificata.

**Contatti:** email sempre obbligatoria; telefono **facoltativo** se contatto solo email; se l’utente sceglie **SMS** o **WhatsApp** come canale aggiuntivo, il cellulare diventa obbligatorio. Payload: `email_verification_ack: true`, `contact_secondary` `null` | `"sms"` | `"whatsapp"`.

Password **obbligatoria** sul modulo **`/richiedi-assistenza/`**, su **`/registrati/`** e nei form inline (es. pagine servizio+animale) per creare l’account e aprire la chat (`password` su `CreateRequestBody`, hash per **utente nuovo**).

**Build frontend produzione:** il file committato **`veterinari_frontend/.env.production`** imposta `VITE_API_BASE_URL=https://api.veterinariovicino.it`, così `npm run build` **senza** `.env` locale non punta più al fallback `127.0.0.1:8060` (causa tipica di login/registrazione e form “non agganciati” in produzione). Per sviluppo locale usare **`.env`** da **`.env.example`** con `http://127.0.0.1:8060`.

**`FRONTEND_URL`** nel backend (`.env` sul server) deve coincidere con l’URL pubblico del sito (link nelle email di verifica → `/verify-email`). **Best practice:** usare **`https://veterinariovicino.it`** (senza `http://`, senza slash finale errato): evita link di verifica in chiaro e mismatch con cookie/HSTS.

---

## 2. Accesso server (deploy safe)

### SSH da Windows (PowerShell / CMD)

File `~/.ssh/config`:

```
Host ovh
    HostName 57.131.16.162
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
```

Comando: `ssh ovh`

**Nota IP:** il VPS ha IP pubblico **`57.131.16.162`**. I record DNS **A** di `veterinariovicino.it` e `www` devono puntare a questo IP (non a IP failover non associati).

### Path principali sul server

| Path | Contenuto |
|------|-----------|
| `/var/www/veterinari/backend/` | Codice API, `venv`, `.env`, `alembic`, `main.py` (con o senza `.git` — vedi §15) |
| `/var/www/veterinari/frontend/dist/` | Build statica Vite (`npm run build` in locale → upload) |
| `/etc/nginx/sites-available/veterinari-*.conf` | Virtual host dominio + API + IP |
| `/etc/letsencrypt/live/veterinariovicino.it/` | Certificati Let’s Encrypt |
| `/etc/systemd/system/veterinari.service` | Unit systemd API (uvicorn `127.0.0.1:8060`) |

### API (porta interna)

- **Uvicorn:** `127.0.0.1:8060` (8000/8001 spesso occupati da altri progetti sullo stesso VPS)
- **Pubblico:** `https://api.veterinariovicino.it` → proxy Nginx → `8060`

### Deploy backend (schema)

```bash
cd /var/www/veterinari/backend
source venv/bin/activate
git pull   # se usi git
pip install -r requirements.txt
pytest -q   # test schema richieste (opzionale ma consigliato)
alembic upgrade head
sudo systemctl restart veterinari
curl -s http://127.0.0.1:8060/health
```

### Deploy frontend (schema)

Sul PC di sviluppo (dalla root del clone Git):

```bash
cd veterinari_frontend
npm ci
npm run build
```

La build di produzione legge **`veterinari_frontend/.env.production`** (API HTTPS). Per test locale prima della build: copiare `.env.example` → `.env` con `VITE_API_BASE_URL=http://127.0.0.1:8060` (sovrascrive in dev).

Upload della cartella `dist/` su `/var/www/veterinari/frontend/dist/`:

```bash
# Esempio (Linux/macOS Git Bash), da veterinari_frontend/ dopo build:
scp -r dist/* ovh:/var/www/veterinari/frontend/dist/
```

PowerShell (Windows), dalla cartella `veterinari_frontend\dist`:

```powershell
scp -r * ovh:/var/www/veterinari/frontend/dist/
```

**Obbligatorio dopo ogni upload:** i file creati da `scp` possono lasciare `assets/` con permessi `700`. **Nginx (`www-data`) non può leggere `/assets/*.js` → HTTP 403 → schermata bianca con spinner infinito.**

**Cache PWA / Service Worker:** dopo un deploy frontend, se la UI non cambia (es. banner, nuove route), provare **navigazione in incognito**, **svuota cache** per il sito, o **hard refresh** (Ctrl+F5). Il worker precache può servire ancora il vecchio `index.html` fino a aggiornamento.

**Checklist rapida post-deploy UI:** confermare che le modifiche siano nel **bundle** (es. testo del banner presente in `App.tsx` e componente **montato** nel JSX, non solo importato).

Eseguire sul server:

```bash
sudo bash /var/www/veterinari/backend/deploy/fix_frontend_dist_permissions.sh /var/www/veterinari/frontend/dist
```

Oppure (equivalente):

```bash
sudo chmod 755 /var/www/veterinari/frontend/dist/assets
sudo chmod -R a+rX /var/www/veterinari/frontend/dist
```

Lo script è in repo: `backend/deploy/fix_frontend_dist_permissions.sh` (copiare sul server se non presente).

---

## 3. Nginx — domini

- **HTTP :80** — `veterinari-frontend.conf`, `veterinari-api.conf`, `veterinari-ovh-ip` (IP diretto)
- **HTTPS :443** — file aggiornato da Certbot (es. `veterinari-ssl-selfsigned.conf` rinominato logicamente: ora usa **Let’s Encrypt**, non più self-signed)

Certbot:

```bash
sudo certbot --nginx -d veterinariovicino.it -d www.veterinariovicino.it -d api.veterinariovicino.it
```

Rinnovo automatico: timer systemd di certbot.

**Conflitto risolto:** il virtual host `performance-analyzer` su `server_name 57.131.16.162` è stato **disabilitato** (`sites-enabled` rimosso) perché intercettava l’IP e generava redirect errati; il traffico sul **nome host** usa `Host: veterinariovicino.it` e va al blocco corretto.

---

## 4. Variabili ambiente backend (`.env`)

Obbligatori: `DATABASE_URL`, `SECRET_KEY` (≥32 caratteri).

Esempi utili:

- `FRONTEND_URL=https://veterinariovicino.it`
- `API_PUBLIC_URL=https://api.veterinariovicino.it`
- `ADMIN_EMAIL=seomantis@gmail.com`
- `EMAIL_LOG_ONLY=false` per invio reale
- **SMTP Gmail:** `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USE_TLS=true`, `SMTP_USER`, `SMTP_FROM` (solitamente stesso indirizzo Gmail), `SMTP_PASSWORD` = *password per le app* Google.

**Resend:** rimosso dal codice; eventuali `RESEND_*` nel `.env` sono ignorate.

- **`REQUEST_UPLOAD_DIR`** (opzionale): cartella per allegati PDF/immagini del modulo **consulenza online** (default relativo al backend: `uploads/request_files`). Sul VPS assicurarsi che esista e sia scrivibile dall’utente del servizio (es. `sudo mkdir -p …/uploads/request_files && sudo chown -R www-data:www-data …/uploads` se il processo gira come `www-data`, altrimenti allineare a `User=` di `systemd`).

---

## 5. CORS

`backend/app/main.py` elenca origini consentite (localhost, dominio produzione, `www`, IP dove serve).

---

## 6. Email e notifiche “WhatsApp”

- Invio tramite **SMTP** (Gmail o altro).
- **Nessun** invio automatico a WhatsApp: testo riutilizzabile in `admin_notifications.payload_json` e nell’email admin; link team configurabile (`ADMIN_WHATSAPP_URL`, default `https://wa.me/393204864478`).

---

## 7. SSL / browser

- Dopo il passaggio a **Let’s Encrypt**, il sito deve aprirsi con lucchetto valido.
- Se Chrome mostrava errore HSTS con certificato vecchio (self-signed): cancellare policy HSTS per il dominio in `chrome://net-internals/#hsts`.

---

## 8. Test rapidi post-deploy

**E2E (Playwright)** — dalla cartella `veterinari_frontend/`:

```bash
npm install
npx playwright install chromium
# Default: produzione (stessi URL di `E2E_*` sotto)
npm run test:e2e
# Esplicito:
E2E_BASE_URL=https://veterinariovicino.it E2E_API_URL=https://api.veterinariovicino.it npm run test:e2e
```

Copre: `/health`, home, `/accedi/` (POST `/auth/login` verso API pubblica), `/registrati/`, `/richiedi-assistenza/`, `/verify-email` senza token.

```bash
curl -s https://api.veterinariovicino.it/health
curl -sI https://veterinariovicino.it/assets/index-*.js   # sostituire hash reale; deve essere 200, non 403
```

**Consulenza online + allegati:** pagina **`/consulenza-veterinaria-online/`** — testo tariffe (15 min / 30 min / specialistica) e campo **esami già eseguiti** (PDF/immagini). Dopo deploy backend, verificare che la directory upload sul server sia scrivibile e che l’email a `ADMIN_EMAIL` arrivi con allegati dopo invio (utente già verificato) o dopo verifica email (account nuovo).

**Smoke test flusso utente (browser):**

1. Aprire `https://veterinariovicino.it/richiedi-assistenza/`, compilare email, **password** (≥8 caratteri), provincia, città, specie animale, servizio, spuntare conferme (verifica email, **registrazione al sito**, GDPR) e inviare → redirect a **`/dashboard/chat/<uuid>`** (o `/dashboard/chats/…` equivalente).
2. Verificare **banner** “Conferma la tua email” se l’account non è ancora verificato; aprire il link ricevuto per email (anche spam) → pagina **`/verify-email`** con successo → banner scompare al ricaricamento.
3. Dopo verifica email, controllare che l’inoltro ai veterinari (e notifiche interne) avvenga come previsto (DB/log lato server).
4. Opzionale: **Accedi** con email/password se impostate al primo invio o da registrazione.
5. Da **Le mie chat** aprire una conversazione e inviare un messaggio di prova.

**Nota:** in produzione il bundle deve contenere l’URL API HTTPS. È garantito da **`veterinari_frontend/.env.production`** committato nel repo; senza di esso (o senza `.env` con `VITE_*` in build) Vite usa il fallback `http://127.0.0.1:8060` e login/form chiamano il PC dell’utente.

---

## 9. Deploy completo via SSH (ordine consigliato)

1. **Clone / pull** sul server nella cartella usata in produzione (es. `/var/www/veterinari/` con sottocartelle `backend/` e sorgente frontend oppure monorepo intero).
2. **Backend:** `cd backend`, `venv`, `pip install -r requirements.txt`, `pytest -q`, `alembic upgrade head`, verificare `.env` (`DATABASE_URL`, `SECRET_KEY`, `FRONTEND_URL`, `API_PUBLIC_URL`, SMTP), `sudo systemctl restart veterinari`, `curl http://127.0.0.1:8060/health`.
3. **Frontend:** sulla macchina di build, `cd veterinari_frontend`, `npm ci`, `npm run build`, caricare **`dist/*`** sul server, poi **script permessi** (§2).
4. **Verifica:** §8 (curl health, asset 200, browser login + richiesta test).

Repository GitHub: [https://github.com/socialengaged/veterinario_full](https://github.com/socialengaged/veterinario_full) — `git pull` sul server **solo se** la directory di deploy è un clone Git (vedi §15).

---

## 10. Documenti collegati nel repo

- `README.md` (root) — panoramica monorepo e comandi `git push`
- `sintesi/DEPLOY_OVH_DIRECT.md` — runbook passo-passo OVH
- `sintesi/API.md` — endpoint API
- `sintesi/DATABASE.md` — schema / entità
- `sintesi/ARCHITETTURA.md` — panoramica componenti
- `sintesi/PIANO_AZIONE_POST_AUDIT.md` — roadmap post-audit (fasi, gate, testing)
- `deploy/veterinari.service` — unit systemd
- `deploy/nginx-veterinari-*.conf` — template Nginx (adattare `server_name`)

---

## 11. Problemi risolti (cronologia sintetica)

| Problema | Causa | Fix |
|----------|--------|-----|
| Sito bianco + spinner | `/assets/*.js` → **403** | `chmod` su `dist/` e `assets/` (vedi §Deploy frontend). Verifica rapida: `curl -sI https://veterinariovicino.it/assets/index-*.js` (sostituire hash da `index.html`) — deve essere **200**, non 403. |
| DNS “down” | A record puntavano a IP errato | A → `57.131.16.162` |
| Certificato non attendibile | Solo self-signed | Certbot Let’s Encrypt |
| Email solo in test Resend | Limite destinatari | Solo SMTP Gmail + password app |
| Email admin saltata se falliva utente | Un solo `try` | Due `try/except` separati in `request_service.py` |
| Login/registrazione OK in dev, no in prod | Build senza `VITE_API_BASE_URL` → fallback localhost | `.env.production` nel repo + `npm run build` + upload `dist/` |
| **502** su `api.*` | Uvicorn su porta diversa da `proxy_pass` Nginx (es. unit su 8000, Nginx → 8060) | Allineare `ExecStart --port` e `nginx-veterinari-api.conf`; `daemon-reload` + `restart veterinari` |
| **502** / API assente | Crash all’avvio (es. FastAPI: DELETE con `status_code=204` e annotazione `-> None` con `from __future__ import annotations` → `response_model` implicito non valido per 204) | Su `@router.delete(..., status_code=204)` impostare **`response_model=None`** esplicito |

---

## 12. Modifiche in corso / TODO consigliati

- Verificare dominio email alternativo se non si usa solo Gmail.
- Dopo ogni `scp` del frontend: **sempre** script permessi (§2).
- Allineare il server a **deploy via Git** (§15) per ridurre errori manuali.
- Controllare `FRONTEND_URL` = `https://veterinariovicino.it` se i link email usano ancora `http://`.

---

## 13. Esempio `POST /requests` (curl)

Sostituire `https://api.veterinariovicino.it` se usi altro host. Email obbligatoria; telefono omesso se solo email; con `contact_secondary` `"sms"` o `"whatsapp"` includere `phone`.

```bash
curl -sS -X POST "https://api.veterinariovicino.it/requests" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "full_name": "Mario Rossi",
    "city": "Milano",
    "province": "MI",
    "animal_species": "cane",
    "service": "visita_generica",
    "email_verification_ack": true,
    "registration_consent": true,
    "password": "EsempioSicuro123!",
    "contact_secondary": null
  }'
```

---

*Ultimo aggiornamento significativo: form `/richiedi-assistenza/` e inline servizio×animale con password obbligatoria, `POST /requests` + redirect chat; query `servizio` risolta da slug pagina; sintesi aggiornate.*

---

## 14. Modifiche recenti (marzo 2026)

| Area | Modifica |
|------|----------|
| Deploy | **`DEPLOY_SAFE_WORKFLOW.md`**: procedura fissa branch → test → backup → `git pull` → `pip` → `alembic` → restart → health → E2E → log → aggiornamento sintesi → merge |
| Priorità contatto / admin | Ordinamento match per **priorità** (score + tentativi/successi/ultimo contatto); email admin con **priorità**, `tel:`, WA, link **firmati** per esito contatto; API `GET /admin/matches`, `POST /admin/match/{id}/update`, `GET .../contact-done`; `GET /admin/requests` espone **`matches_url`** |
| DB | Migrazione Alembic **`0008_contact_tracking_priority`**: colonne su `specialists` e `request_matches` per tracking contatti |
| Admin auth | `X-Admin-Key` opzionale anche come **`?admin_key=`** (client interni) |
| `/richiedi-assistenza/` | Password obbligatoria; consensi email + registrazione al sito + GDPR; prefill `animale`, `servizio`, `citta`/`localita`; submit → account + redirect `/dashboard/chat/:id` |
| Pagine servizio × animale | Form inline reale (non stub): stesso flusso API + redirect chat; link CTA con `animale` + `servizio` (slug) |
| `request-taxonomy.ts` | `resolveTaxonomyFromQuery` per mappare slug servizio → categoria/sottoservizio |
| Codice morto | Rimossi `RequestForm.tsx` e `web3forms.ts` (flusso unico `POST /requests`) |
| Chat post-verifica | Messaggio utente (note dal form) come `Message` ruolo `user` in chat; poi messaggio di sistema |
| Specialist | Colonne `cap`, `street_address`; matching con boost CAP utente; email admin con tabella + link mailto / `wa.me` per specialista; link team WhatsApp con `?text=` |
| DB | Migrazione Alembic `0002_specialist_cap_address` (idempotente se colonne già create da `create_all`) |
| Dashboard / profilo | `GET/PATCH /users/me`, CRUD indirizzi e animali; pagina `/dashboard/profilo/` |
| **Area riservata (hub)** | `/dashboard` con panoramica, **Le mie richieste** (`GET /users/me/requests` con `conversation_id`, `specialty_name`, anteprima descrizione), **Account**, chat e profilo in layout unico; **messaggio utente** con note modulo sempre in `create_request` (no duplicato post-verify); **`request_context`** su `GET /dashboard/chats/{id}`; lista chat con `specialty_name`; header desktop **Area riservata** / Esci; login → `/dashboard`; E2E aggiornati |
| **Deploy produzione** | **2026-03-30:** commit `b8b1ca4` su `master`; tag rollback **`checkpoint/ovh-2026-03-30-pre-dashboard`** → `bd21f78`; OVH: `git pull` backend, `pip`, `alembic upgrade head` (nessuna migrazione nuova), `systemctl restart veterinari`, health OK; frontend: build locale + `scp` su `/var/www/veterinari/frontend/dist/` + script permessi |
| **Footer / dashboard richieste** | Footer **Contatti**: solo **email** (link `mailto`); **`GET /users/me/requests`** riscritto con **`selectinload`** su `specialty`, `animal`, `address`, `conversation` (evita errori di serializzazione/join); payload esteso (testo completo, animale, zona, CAP, `contact_method`, `sub_service`); pagina **Le mie richieste** con scheda dettagliata; panoramica `/dashboard` con **`Promise.allSettled`** (un endpoint in errore non blocca gli altri) |
| **Checkpoint rollback** | Tag **`checkpoint/ovh-2026-03-30-pre-dashboard-footer-requests`** → commit **`8a92d71`** (stato immediatamente prima della release footer/richieste); release merge: **`def8143`**; docs commit **`81a0192`** |
| **Deploy produzione (3)** | **2026-03-30:** `git pull` OVH fino a **`81a0192`**, `alembic` OK, restart API, health OK; frontend **`scp`** `dist/` + permessi |
| **UX / richiesta e registrazione** | Pulsanti **Richiedi assistenza** e **Registrati** non più disabilitati in silenzio: messaggio **“Completa ancora: …”** al submit; commit **`1c3d080`**; deploy: build locale + **`scp`** su `/var/www/veterinari/frontend/dist/` + script permessi; health OK, asset JS **200** |
| **Consulenza online** | Pagina **`/consulenza-veterinaria-online/`** (solo cani/gatti): tariffe 15′/30′/specialistica, Meet, PayPal **`vet.stella@gmail.com`** (`VITE_ONLINE_CONSULT_PAYPAL_EMAIL` / `ONLINE_CONSULT_PAYPAL_EMAIL`); **banner** `PromoBanner` in `App.tsx` (deve essere **renderizzato**, non solo importato); API `consultation_online` + `consultation_tier`; oggetto email admin **`[Consulenza online]`**; email utente **Conferma consulenza online** |
| **Fix banner consulenza online** | Bug: `PromoBanner` importato ma non in JSX → nessuna barra in produzione; correzione + redeploy `dist/`; sintesi: ordine deploy in [`DEPLOY_SAFE_WORKFLOW.md`](DEPLOY_SAFE_WORKFLOW.md) sezione *Deploy produzione OVH* |
| Veterinari | `POST /specialists/register`, `GET /specialists/specialties`; footer link `/iscrizione-veterinari/`; migrazione Alembic `0003_usr_prof_spec` (`profile_notes_for_vets`, `specialists.user_id`, `pending_specialist_profile`) |

**Checkpoint Git (rollback rapido):** tag annotato **`checkpoint/ovh-2026-03-30-pre-dashboard`** sul commit `master` immediatamente **prima** del merge/deploy di questa release. Rollback codice: `git checkout checkpoint/ovh-2026-03-30-pre-dashboard` (o `git reset --hard` su quel tag), poi `git push --force` solo se il team accetta sovrascrittura remota; in alternativa `git revert` del commit di release. Sul server: `git fetch && git checkout` sul tag o commit precedente, poi `pip` / `alembic` / `restart` come da [`DEPLOY_SAFE_WORKFLOW.md`](DEPLOY_SAFE_WORKFLOW.md).

**Deploy dopo questo blocco:** obbligatorio `alembic upgrade head` sul server; se `specialists.cap` / `street_address` sono NULL (seed non rieseguito), usare **`backend/scripts/backfill_specialist_cap_address.sql`** o **`python scripts/backfill_specialist_cap_address.py`** (vedi anche `sintesi/DATABASE.md`). **Release dashboard (mar 2026):** nessuna nuova migrazione Alembic; obbligatorio **build frontend** + upload `dist/` + **permessi** asset (vedi §2 `PROGETTO_OVH_STATO`).

---

## 15. Best practice — deploy, Git e verifiche

Procedura completa passo-passo (branch, backup, checklist output, regole ferree): **[`DEPLOY_SAFE_WORKFLOW.md`](DEPLOY_SAFE_WORKFLOW.md)**.

### Due modalità di aggiornamento backend sul VPS

| Modalità | Quando | Passi |
|----------|--------|--------|
| **A — Git (consigliato)** | `/var/www/veterinari` è un **clone** del monorepo | `cd /var/www/veterinari && git pull`, poi `cd backend`, `venv`, `pip install -r requirements.txt`, `pytest -q`, `alembic upgrade head`, `sudo systemctl restart veterinari` |
| **B — Pacchetto senza Git** | Solo cartelle copiate (nessun `.git`) | Da root repo: **`backend/deploy/package_backend_for_ovh.ps1`** (Windows) o **`bash backend/deploy/package_backend_for_ovh.sh`** (Git Bash/Linux) → genera **`backend-deploy.tgz`** escludendo **`venv`**, **`.env`**, cache pytest. Poi `scp backend-deploy.tgz ovh:/tmp/`, sul server `cd /var/www/veterinari && tar xzf /tmp/backend-deploy.tgz` (non sovrascrivere il `.env` già presente sul server se si estrae solo `backend/` sovrascrivendo file: meglio estrarre e poi **ripristinare** `.env` da backup o non includere `.env` nel tar — lo script già lo esclude). Frontend: `scp -r dist/*` → `frontend/dist/` + permessi (§2). |

Per nuovi server, preferire **`git clone` del monorepo** in `/var/www/veterinari`, poi `venv` solo sotto `backend/` (come in `DEPLOY_OVH_DIRECT.md`), così `git pull` allinea codice e sintesi.

### `validate_preprod.py`

- Pensato per DB con **seed** e **email di test** (`test1@email.com`) **non** già presente.
- In **produzione** con dati reali: se l’utente di test esiste già, i conteggi (`users +1`, `request_matches`, ecc.) possono fallire **senza** indicare un bug di deploy.
- **Verifica alternativa post-deploy:** `curl https://api…/health` + `POST /requests` con **email univoca** (es. `probe+$(date +%s)@example.com`) e campi completi (`email_verification_ack`, `registration_consent`, `password`, …).

### Sicurezza e operatività

- **Backup DB** prima di `alembic upgrade` su migrazioni non banali: `pg_dump` (vedi `DEPLOY.md`).
- **Secret:** `SECRET_KEY` e `DATABASE_URL` mai in repo; solo `.env.example` documentato. Copia locale consentita in **`secrets/`** (cartella in `.gitignore`, vedi `secrets/README.md`): lì puoi salvare `ovh_database.env` con la `DATABASE_URL` di produzione **solo sul PC**, mai in commit.
- **Risposte API:** header minimi `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e compressione **GZip** per payload ≥ 512 byte (`backend/app/main.py`).
- **CORS e domini:** aggiornare `backend/app/main.py` se aggiungi un nuovo origin frontend.
- **Monitoraggio:** `systemctl status veterinari`, log journal (`journalctl -u veterinari -n 100`), `curl` health locale e pubblico.

### CI locale prima del push

```bash
cd backend && python -m pytest -q && python scripts/smoke_test.py
cd ../veterinari_frontend && npm ci && npm run test -- --run && npm run build
```

**Test aggiunti (profilo / pubblici):** backend — guard 401 senza Bearer, validazione consensi iscrizione vet, unit su normalizzazione deduplica; integrazione profilo opzionale con `ENABLE_PROFILE_INTEGRATION=1` (vedi `backend/sintesi/API.md`). Frontend — Vitest su `ProtectedRoute` (redirect se non loggato).

**Playwright (E2E “massivi”):** in `veterinari_frontend/e2e/` — `journeys-anonymous.spec.ts` (navigazione anonima, modulo richiesta, query string, WhatsApp, iscrizione vet); `journeys-combos.spec.ts` (parallelo: più combinazioni animale × servizio × sottoservizio, più SMS); `journeys-authenticated.spec.ts` (serial: creazione utente via `POST /requests`, chat, profilo, login UI). Helper: `e2e/helpers.ts`, `e2e/helpers-forms.ts`. Variabili: `E2E_BASE_URL` (frontend), `E2E_API_URL` (API per `request` e fetch nel browser). Opzionale avvio Vite: `E2E_START_WEBSERVER=1` con `E2E_BASE_URL=http://127.0.0.1:8080` (vedi `playwright.config.ts`). Comando tipico locale: API su `8060`, poi `cd veterinari_frontend` e `npm run test:e2e:journeys` con `E2E_BASE_URL` / `E2E_API_URL` puntati al proprio ambiente. Su produzione l’API può rispondere 502 temporanei: ripetere o usare locale.

**Aggiornamenti E2E / UX (modulo richiesta):** label collegate ai campi con `htmlFor` / `id` (`vv-request-*`) su `RequestPage` per accessibilità e per `getByLabel` in Playwright; `isApiHealthy()` con retry su `GET /health`; suite che dipendono dall’API saltano con messaggio se l’API non risponde; smoke `GET /health` con retry; worker Playwright predefiniti `4` (override `PLAYWRIGHT_WORKERS`). Schemi Pydantic: `ConfigDict(from_attributes=True)` al posto di `class Config` (nessun warning deprecazione in pytest).
