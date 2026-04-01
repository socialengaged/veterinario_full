from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_ROOT = Path(__file__).resolve().parent.parent.parent
_ENV_FILE = _BACKEND_ROOT / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(_ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str
    secret_key: str = Field(..., min_length=32)
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 10080

    frontend_url: str = "http://localhost:8080"
    api_public_url: str = "http://localhost:8000"

    admin_email: str = "seomantis@gmail.com"
    # Copia in CC delle notifiche admin (lista match, WhatsApp, allegati consulenza online). Default: vet.stella@gmail.com
    admin_email_cc: str = Field(
        default="vet.stella@gmail.com",
        validation_alias="ADMIN_EMAIL_CC",
    )
    # Se valorizzato, GET /admin/* richiede header X-Admin-Key uguale a questo valore
    admin_api_key: str | None = Field(default=None, validation_alias="ADMIN_API_KEY")
    # Link mostrato nelle email admin (nessun invio automatico a WhatsApp)
    admin_whatsapp_url: str = "https://wa.me/393204864478"

    smtp_host: str = "localhost"
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from: str = "noreply@localhost"
    smtp_use_tls: bool = True
    # Se true: niente SMTP reale, log su logger (livello INFO)
    email_log_only: bool = Field(default=False, validation_alias="EMAIL_LOG_ONLY")

    # Consulenza online — PayPal (destinatario default; override con ONLINE_CONSULT_PAYPAL_EMAIL)
    online_consult_paypal_email: str = Field(
        default="vet.stella@gmail.com",
        validation_alias="ONLINE_CONSULT_PAYPAL_EMAIL",
    )
    # Allegati modulo consulenza online (PDF/immagini) per email admin
    request_upload_dir: Path = Field(
        default_factory=lambda: _BACKEND_ROOT / "uploads" / "request_files",
        validation_alias="REQUEST_UPLOAD_DIR",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
