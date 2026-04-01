"""CC admin: seomantis (To) + vet.stella (Cc) sulle notifiche nuova richiesta."""
from __future__ import annotations

from unittest.mock import MagicMock

from app.services.email_service import EmailService


def test_admin_cc_recipients_splits_and_skips_primary():
    svc = EmailService()
    svc.settings = MagicMock()
    svc.settings.admin_email_cc = " vet.stella@gmail.com , other@x.com "
    assert svc._admin_cc_recipients("seomantis@gmail.com") == [
        "vet.stella@gmail.com",
        "other@x.com",
    ]


def test_admin_cc_recipients_empty_when_unset():
    svc = EmailService()
    svc.settings = MagicMock()
    svc.settings.admin_email_cc = ""
    assert svc._admin_cc_recipients("seomantis@gmail.com") == []


def test_admin_cc_skips_duplicate_of_primary():
    svc = EmailService()
    svc.settings = MagicMock()
    svc.settings.admin_email_cc = "seomantis@gmail.com,vet.stella@gmail.com"
    assert svc._admin_cc_recipients("seomantis@gmail.com") == ["vet.stella@gmail.com"]
