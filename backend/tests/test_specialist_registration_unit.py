"""Unit test su normalizzazione deduplica (senza DB)."""
from __future__ import annotations

from app.services.specialist_registration_service import _norm_cap, _norm_name, _norm_street


def test_norm_cap_strips_non_digits() -> None:
    assert _norm_cap("  70121  ") == "70121"
    assert _norm_cap("IT-70121") == "70121"


def test_norm_street_collapses_whitespace() -> None:
    assert _norm_street("  Via Roma  1  ") == "via roma 1"


def test_norm_name_lowercase_trim() -> None:
    assert _norm_name("  Mario  Rossi  ") == "mario rossi"
