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

    smtp_host: str = "localhost"
    smtp_port: int = 587
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from: str = "noreply@localhost"
    smtp_use_tls: bool = True
    # Se true: niente SMTP reale, log su logger (livello INFO)
    email_log_only: bool = Field(default=False, validation_alias="EMAIL_LOG_ONLY")


@lru_cache
def get_settings() -> Settings:
    return Settings()
