"""Validazione CreateRequestBody (contatti, verifica email)."""
from __future__ import annotations

import pytest
from pydantic import ValidationError

from app.schemas.requests import CreateRequestBody


def _base_kwargs(**overrides):
    base = {
        "email": "user@example.com",
        "city": "Milano",
        "province": "MI",
        "full_name": "Mario Rossi",
        "animal_species": "cane",
        "service": "visita_generica",
        "email_verification_ack": True,
    }
    base.update(overrides)
    return base


def test_ok_email_only_no_phone():
    b = CreateRequestBody(**_base_kwargs(phone=None, contact_secondary=None))
    assert b.contact_method == "email"
    assert b.phone is None


def test_ok_email_plus_sms_requires_phone():
    b = CreateRequestBody(**_base_kwargs(contact_secondary="sms", phone="+39 333 1234567"))
    assert b.contact_method == "email+sms"


def test_fail_sms_without_phone():
    with pytest.raises(ValidationError) as ei:
        CreateRequestBody(**_base_kwargs(contact_secondary="sms", phone=None))
    assert "cellulare" in str(ei.value).lower()


def test_fail_ack_false():
    with pytest.raises(ValidationError) as ei:
        CreateRequestBody(**_base_kwargs(email_verification_ack=False))
    assert "verificare" in str(ei.value).lower()


def test_fail_invalid_contact_secondary():
    with pytest.raises(ValidationError):
        CreateRequestBody(**_base_kwargs(contact_secondary="telegram"))
