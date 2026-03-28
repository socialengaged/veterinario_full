# VeterinarioVicino — monorepo

Struttura consigliata (un solo repository Git):

- `frontend/` — applicazione Vite/React (rinominare `veterinari_frontend` in `frontend` se si unifica il repo).
- `backend/` — API FastAPI (questa cartella).

Se il `.git` è ancora solo sotto `veterinari_frontend/`, opzioni:

1. `git init` nella cartella padre `veterinario_FULL`, aggiungere `backend/` e spostare/rinominare il frontend in `frontend/`; oppure
2. Spostare `backend/` dentro `veterinari_frontend/` e usare quel repo come monorepo.

Commit backend iniziale:

```bash
git add backend
git commit --trailer "Made-with: Cursor" -m "init backend fastapi base"
```

Dettagli API: `backend/README.md` e `backend/sintesi/`.