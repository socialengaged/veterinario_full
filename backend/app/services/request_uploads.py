"""Salvataggio allegati modulo consulenza online (PDF / immagini) per email admin dopo verifica."""
from __future__ import annotations

import re
from pathlib import Path
from uuid import UUID

# Limite per file singolo e numero allegati (Gmail ~25MB totali consigliati)
REQUEST_UPLOAD_MAX_FILES = 8
REQUEST_UPLOAD_MAX_BYTES = 8 * 1024 * 1024

_ALLOWED_EXT = frozenset({".pdf", ".png", ".jpg", ".jpeg", ".webp", ".gif"})


def sanitize_filename(name: str) -> str:
    base = Path(name).name
    if not base or ".." in name or "/" in name or "\\" in name:
        return "file.bin"
    safe = re.sub(r"[^\w.\-]", "_", base)
    return (safe or "file.bin")[:180]


def _ext_ok(name: str) -> bool:
    suf = Path(name).suffix.lower()
    return suf in _ALLOWED_EXT


def validate_upload_file_meta(filename: str, size: int) -> None:
    if size > REQUEST_UPLOAD_MAX_BYTES:
        raise ValueError(f"File troppo grande (max {REQUEST_UPLOAD_MAX_BYTES // (1024 * 1024)} MB): {filename}")
    if not _ext_ok(filename):
        raise ValueError(
            "Formato non consentito. Carica solo PDF o immagini (PNG, JPG, JPEG, WEBP, GIF)."
        )


def validate_upload_bytes(filename: str, data: bytes) -> None:
    """Controlla dimensione, estensione e firma minima del file."""
    validate_upload_file_meta(filename, len(data))
    if len(data) < 12:
        raise ValueError("File troppo piccolo o non valido.")
    low = filename.lower()
    if low.endswith(".pdf"):
        if not data.startswith(b"%PDF"):
            raise ValueError("Il file non risulta un PDF valido.")
    elif low.endswith((".jpg", ".jpeg")):
        if not data.startswith(b"\xff\xd8\xff"):
            raise ValueError("Il file non risulta un'immagine JPEG valida.")
    elif low.endswith(".png"):
        if not data.startswith(b"\x89PNG\r\n\x1a\n"):
            raise ValueError("Il file non risulta un'immagine PNG valida.")
    elif low.endswith(".webp"):
        if not (data.startswith(b"RIFF") and len(data) >= 12 and data[8:12] == b"WEBP"):
            raise ValueError("Il file non risulta un'immagine WEBP valida.")
    elif low.endswith(".gif"):
        if not (data.startswith(b"GIF87a") or data.startswith(b"GIF89a")):
            raise ValueError("Il file non risulta un'immagine GIF valida.")


def save_request_uploads(
    base_dir: Path,
    request_id: UUID,
    files: list[tuple[str, bytes, str]],
) -> None:
    """Scrive su disco uploads/request_files/<uuid>/0_nome.pdf"""
    if not files:
        return
    d = base_dir / str(request_id)
    d.mkdir(parents=True, exist_ok=True)
    for i, (name, data, _ctype) in enumerate(files):
        validate_upload_bytes(name, data)
        safe = sanitize_filename(name)
        path = d / f"{i}_{safe}"
        path.write_bytes(data)


def load_request_uploads(
    base_dir: Path,
    request_id: UUID,
) -> list[tuple[str, bytes, str]]:
    """Legge allegati salvati; ritorna (nome_originale_stimato, bytes, mime)."""
    d = base_dir / str(request_id)
    if not d.is_dir():
        return []
    out: list[tuple[str, bytes, str]] = []
    for path in sorted(d.iterdir(), key=lambda p: p.name):
        if not path.is_file():
            continue
        data = path.read_bytes()
        # nome file: 0_lab.pdf -> lab.pdf
        name = path.name
        if "_" in name:
            _, rest = name.split("_", 1)
            display_name = rest
        else:
            display_name = name
        mime = _guess_mime(display_name)
        out.append((display_name, data, mime))
    return out


def _guess_mime(filename: str) -> str:
    suf = Path(filename).suffix.lower()
    if suf == ".pdf":
        return "application/pdf"
    if suf in (".jpg", ".jpeg"):
        return "image/jpeg"
    if suf == ".png":
        return "image/png"
    if suf == ".webp":
        return "image/webp"
    if suf == ".gif":
        return "image/gif"
    return "application/octet-stream"
