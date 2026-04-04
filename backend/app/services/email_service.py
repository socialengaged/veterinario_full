from __future__ import annotations

import logging
import smtplib
from email import encoders
from email.mime.base import MIMEBase
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

    def _admin_cc_recipients(self, primary_to: str) -> list[str]:
        raw = (self.settings.admin_email_cc or "").strip()
        if not raw:
            return []
        out: list[str] = []
        primary_l = primary_to.strip().lower()
        for part in raw.split(","):
            p = part.strip()
            if p and p.lower() != primary_l:
                out.append(p)
        return out

    def _send(
        self,
        to: str,
        subject: str,
        html: str,
        text: str,
        attachments: list[tuple[str, bytes, str]] | None = None,
        cc: list[str] | None = None,
    ) -> None:
        cc = cc or []
        if self.settings.email_log_only:
            logger.info(
                "[EMAIL_LOG_ONLY] to=%s cc=%s subject=%s\n--- text ---\n%s\n--- html (trim) ---\n%s...",
                to,
                cc,
                subject,
                text,
                html[:500],
            )
            if attachments:
                logger.info(
                    "[EMAIL_LOG_ONLY] attachments=%s",
                    [(n, len(b)) for n, b, _ in attachments],
                )
            return

        if not (self.settings.smtp_password or "").strip():
            raise ValueError(
                "SMTP non configurato: imposta SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM nel .env "
                "(es. Gmail: smtp.gmail.com:587 + password per app)"
            )

        if attachments:
            msg = MIMEMultipart("mixed")
            msg["Subject"] = subject
            msg["From"] = self.settings.smtp_from
            msg["To"] = to
            if cc:
                msg["Cc"] = ", ".join(cc)
            alt = MIMEMultipart("alternative")
            alt.attach(MIMEText(text, "plain", "utf-8"))
            alt.attach(MIMEText(html, "html", "utf-8"))
            msg.attach(alt)
            for filename, data, ctype in attachments:
                maintype, subtype = (
                    ctype.split("/", 1) if "/" in (ctype or "") else ("application", "octet-stream")
                )
                part = MIMEBase(maintype, subtype)
                part.set_payload(data)
                encoders.encode_base64(part)
                part.add_header("Content-Disposition", "attachment", filename=filename)
                msg.attach(part)
        else:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = self.settings.smtp_from
            msg["To"] = to
            if cc:
                msg["Cc"] = ", ".join(cc)
            msg.attach(MIMEText(text, "plain", "utf-8"))
            msg.attach(MIMEText(html, "html", "utf-8"))

        envelope_to = [to] + cc
        try:
            if self.settings.smtp_use_tls:
                with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=60) as smtp:
                    smtp.ehlo()
                    smtp.starttls()
                    smtp.ehlo()
                    if self.settings.smtp_user and self.settings.smtp_password:
                        smtp.login(self.settings.smtp_user, self.settings.smtp_password)
                    smtp.sendmail(self.settings.smtp_from, envelope_to, msg.as_string())
            else:
                with smtplib.SMTP(self.settings.smtp_host, self.settings.smtp_port, timeout=60) as smtp:
                    if self.settings.smtp_user and self.settings.smtp_password:
                        smtp.login(self.settings.smtp_user, self.settings.smtp_password)
                    smtp.sendmail(self.settings.smtp_from, envelope_to, msg.as_string())
        except Exception as e:
            logger.exception("SMTP send failed: %s", e)
            raise
        logger.info(
            "Email inviata via SMTP: to=%s cc=%s subject=%s allegati=%s",
            to,
            cc,
            (subject[:100] + "…") if len(subject) > 100 else subject,
            len(attachments) if attachments else 0,
        )

    def send_user_request_confirmation(
        self,
        *,
        to_email: str,
        user_name: str,
        request_id: str,
        verify_url: str,
        is_online_consultation: bool = False,
        paypal_email: str | None = None,
        online_tier_label: str = "",
    ) -> None:
        pe = (paypal_email or self.settings.online_consult_paypal_email or "").strip()
        html = _env.get_template("user_confirmation.html").render(
            user_name=user_name,
            request_id=request_id,
            verify_url=verify_url,
            is_online_consultation=is_online_consultation,
            paypal_email=pe,
            online_tier_label=online_tier_label,
        )
        text = (
            f"Ciao {user_name},\n\n"
            f"Abbiamo ricevuto la tua richiesta (ID {request_id}).\n"
        )
        if is_online_consultation and online_tier_label:
            text += f"Servizio: consulenza online — {online_tier_label}.\n"
            if pe:
                text += f"Pagamento PayPal all'indirizzo: {pe}\n"
        text += f"Verifica email: {verify_url}\n"
        subj = (
            "Conferma consulenza online — VeterinarioVicino.it"
            if is_online_consultation
            else "Conferma richiesta — VeterinarioVicino.it"
        )
        self._send(to_email, subj, html, text)
        logger.info("Email conferma utente inviata: to=%s request_id=%s", to_email, request_id)

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
        team_whatsapp_url_with_text: str,
        user_cap: str | None = None,
        profile_notes: str | None = None,
        is_online_consultation: bool = False,
        attachments: list[tuple[str, bytes, str]] | None = None,
        pending_email_verification: bool = False,
    ) -> None:
        attachment_names = [a[0] for a in attachments] if attachments else []
        html = _env.get_template("admin_request.html").render(
            user_email=user_email,
            user_name=user_name,
            user_phone=user_phone,
            animal_species=animal_species,
            city=city,
            province=province,
            user_cap=user_cap or "",
            specialty_name=specialty_name,
            urgency=urgency,
            description=description or "",
            profile_notes=profile_notes or "",
            matches=matches,
            whatsapp_text=whatsapp_text,
            admin_whatsapp_url=self.settings.admin_whatsapp_url,
            team_whatsapp_url_with_text=team_whatsapp_url_with_text,
            frontend_url=self.settings.frontend_url.rstrip("/"),
            is_online_consultation=is_online_consultation,
            attachment_names=attachment_names,
            pending_email_verification=pending_email_verification,
        )
        text_lines = [
            (
                "[ATTESA VERIFICA EMAIL] "
                + (
                    "[CONSULENZA ONLINE] Nuova richiesta VeterinarioVicino"
                    if is_online_consultation
                    else "Nuova richiesta VeterinarioVicino"
                )
                if pending_email_verification
                else (
                    "[CONSULENZA ONLINE — video Google Meet] Nuova richiesta VeterinarioVicino"
                    if is_online_consultation
                    else "Nuova richiesta VeterinarioVicino"
                )
            ),
            f"Sito web: {self.settings.frontend_url.rstrip('/')}",
            f"Utente: {user_name} <{user_email}> {user_phone}",
            f"Animale: {animal_species}",
            f"Zona: {city} ({province})" + (f" CAP {user_cap}" if user_cap else ""),
            f"Specialità: {specialty_name}",
            f"Urgenza: {urgency}",
        ]
        if profile_notes and str(profile_notes).strip():
            text_lines.append(f"Note profilo utente: {str(profile_notes).strip()}")
        if attachment_names:
            text_lines.append(f"Allegati esami (in questa email): {', '.join(attachment_names)}")
        text_lines.extend([
            "",
            f"WhatsApp team (testo incluso): {team_whatsapp_url_with_text}",
            f"WhatsApp team (base): {self.settings.admin_whatsapp_url}",
            "",
            "Testo da copiare:",
            whatsapp_text,
        ])
        if pending_email_verification:
            subj = (
                f"[Attesa verifica email] [Consulenza online] {city} ({urgency})"
                if is_online_consultation
                else f"[Attesa verifica email] Nuova richiesta - {city} ({urgency})"
            )
        else:
            subj = (
                f"[Consulenza online] Nuova richiesta veterinario - {city} ({urgency})"
                if is_online_consultation
                else f"Nuova richiesta veterinario - {city} ({urgency})"
            )
        cc_list = self._admin_cc_recipients(admin_email)
        self._send(
            admin_email,
            subj,
            html,
            "\n".join(text_lines),
            attachments=attachments,
            cc=cc_list,
        )
        logger.info(
            "Email admin nuova richiesta inviata: admin=%s cc=%s city=%s pending=%s",
            admin_email,
            cc_list,
            city,
            pending_email_verification,
        )

    def send_request_to_specialist(
        self,
        *,
        specialist_email: str,
        specialist_name: str,
        user_name: str,
        user_phone: str,
        animal_species: str,
        city: str,
        province: str,
        specialty_name: str,
        urgency: str,
        description: str | None,
        request_id: str,
        optout_url: str,
    ) -> None:
        html = _env.get_template("specialist_request.html").render(
            specialist_name=specialist_name,
            user_name=user_name,
            user_phone=user_phone,
            animal_species=animal_species,
            city=city,
            province=province,
            specialty_name=specialty_name,
            urgency=urgency,
            description=description or "",
            request_id=request_id,
            optout_url=optout_url,
        )
        text = (
            f"Gentile {specialist_name},\n\n"
            f"Un paziente nella tua zona ha inoltrato una richiesta tramite VeterinarioVicino.it.\n\n"
            f"Animale: {animal_species}\n"
            f"Servizio: {specialty_name}\n"
            f"Zona: {city} ({province})\n"
            f"Urgenza: {urgency}\n"
        )
        if description:
            text += f"Note: {description}\n"
        text += (
            f"\nContatti paziente:\n"
            f"Nome: {user_name}\n"
        )
        if user_phone:
            text += f"Telefono: {user_phone}\n"
        text += (
            f"\nPer rispondere, rispondi direttamente a questa email.\n\n"
            f"---\n"
            f"Se non desideri ricevere richieste: {optout_url}\n"
        )
        subj = f"Richiesta paziente — {animal_species} a {city}"
        self._send(specialist_email, subj, html, text)
        logger.info(
            "Email richiesta inviata a specialista: to=%s request_id=%s",
            specialist_email,
            request_id,
        )

    def send_specialist_reply_notification(
        self,
        *,
        to_email: str,
        user_name: str,
        specialist_name: str,
        message_preview: str,
        chat_url: str,
    ) -> None:
        """Notifica all'utente che un veterinario ha risposto."""
        html = (
            f'<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;">'
            f'<h2 style="color:#0f766e;">Un veterinario ha risposto!</h2>'
            f'<p>Ciao <strong>{user_name}</strong>,</p>'
            f'<p><strong>{specialist_name}</strong> ha risposto alla tua richiesta:</p>'
            f'<blockquote style="background:#f8fafc;border-left:3px solid #0f766e;padding:12px;margin:16px 0;">'
            f'{message_preview[:500]}'
            f'</blockquote>'
            f'<p><a href="{chat_url}" style="background:#0f766e;color:#fff;padding:12px 24px;'
            f'border-radius:6px;text-decoration:none;display:inline-block;">Vedi la conversazione</a></p>'
            f'<p style="font-size:12px;color:#888;">VeterinarioVicino.it</p></div>'
        )
        text = (
            f"Ciao {user_name},\n\n"
            f"{specialist_name} ha risposto alla tua richiesta:\n\n"
            f'"{message_preview[:500]}"\n\n'
            f"Vedi la conversazione: {chat_url}\n"
        )
        self._send(
            to_email,
            f"{specialist_name} ha risposto — VeterinarioVicino.it",
            html,
            text,
        )
        logger.info("Email notifica risposta vet inviata: to=%s", to_email)

    def send_test_ping(self) -> None:
        """Email minima per verificare SMTP in produzione."""
        self._send(
            self.settings.admin_email,
            "[Test] VeterinarioVicino — produzione",
            "<p>Test invio email da produzione (script/API).</p>",
            "Test invio email da produzione (script/API).",
        )
