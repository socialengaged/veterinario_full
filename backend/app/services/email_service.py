from __future__ import annotations

import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from typing import Any

from jinja2 import Environment, FileSystemLoader, select_autoescape

from app.core.config import get_settings

logger = logging.getLogger(__name__)

_TEMPLATE_DIR = Path(__file__).resolve().parent.parent / "templates" / "email"
_env = Environment(
    loader=FileSystemLoader(str(_TEMPLATE_DIR)),
    autoescape=select_autoescape(["html", "xml"]),
)


class EmailService:
    def __init__(self) -> None:
        self.settings = get_settings()

    def _send(self, to: str, subject: str, html: str, text: str) -> None:
        if self.settings.email_log_only:
            logger.info(
                "[EMAIL_LOG_ONLY] to=%s subject=%s\n--- text ---\n%s\n--- html (trim) ---\n%s...",
                to,
                subject,
                text,
                html[:500],
            )
            return

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = self.settings.smtp_from
        msg["To"] = to
        msg.attach(MIMEText(text, "plain", "utf-8"))
        msg.attach(MIMEText(html, "html", "utf-8"))

        try:
            if self.settings.smtp_use_tls:
                with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=30) as smtp:
                    smtp.ehlo()
                    smtp.starttls()
                    smtp.ehlo()
                    if self.settings.smtp_user and self.settings.smtp_password:
                        smtp.login(self.settings.smtp_user, self.settings.smtp_password)
                    smtp.sendmail(self.settings.smtp_from, [to], msg.as_string())
            else:
                with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=30) as smtp:
                    if self.settings.smtp_user and self.settings.smtp_password:
                        smtp.login(self.settings.smtp_user, self.settings.smtp_password)
                    smtp.sendmail(self.settings.smtp_from, [to], msg.as_string())
        except Exception as e:
            logger.exception("SMTP send failed: %s", e)
            raise

    def send_user_request_confirmation(
        self,
        *,
        to_email: str,
        user_name: str,
        request_id: str,
        verify_url: str,
    ) -> None:
        html = _env.get_template("user_confirmation.html").render(
            user_name=user_name,
            request_id=request_id,
            verify_url=verify_url,
        )
        text = (
            f"Ciao {user_name},\n\n"
            f"Abbiamo ricevuto la tua richiesta (ID {request_id}).\n"
            f"Verifica email: {verify_url}\n"
        )
        self._send(to_email, "Conferma richiesta — VeterinarioVicino.it", html, text)

    def send_admin_new_request(
        self,
        *,
        admin_email: str,
        user_email: str,
        user_name: str,
        user_phone: str,
        animal_species: str,
        city: str,
        province: str,
        specialty_name: str,
        urgency: str,
        description: str | None,
        matches: list[dict[str, Any]],
        whatsapp_text: str,
    ) -> None:
        html = _env.get_template("admin_request.html").render(
            user_email=user_email,
            user_name=user_name,
            user_phone=user_phone,
            animal_species=animal_species,
            city=city,
            province=province,
            specialty_name=specialty_name,
            urgency=urgency,
            description=description or "",
            matches=matches,
            whatsapp_text=whatsapp_text,
        )
        text_lines = [
            "Nuova richiesta VeterinarioVicino",
            f"Utente: {user_name} <{user_email}> {user_phone}",
            f"Animale: {animal_species}",
            f"Zona: {city} ({province})",
            f"Specialità: {specialty_name}",
            f"Urgenza: {urgency}",
            "",
            "WhatsApp:",
            whatsapp_text,
        ]
        self._send(admin_email, f"[Admin] Nuova richiesta — {city}", html, "\n".join(text_lines))
