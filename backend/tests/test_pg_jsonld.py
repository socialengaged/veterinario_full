"""Test parser JSON-LD PagineGialle (senza rete)."""

from pathlib import Path

import pytest

from app.services.pg_jsonld_parse import (
    extract_local_business_dict,
    parse_paginegialle_html,
    split_fixed_mobile,
)

_FIXTURE = Path(__file__).resolve().parent / "fixtures" / "pg_veterinariofedra_snippet.html"


@pytest.fixture
def sample_html() -> str:
    if _FIXTURE.is_file():
        return _FIXTURE.read_text(encoding="utf-8")
    # fallback minimo se fixture non presente
    return """
    <html><head>
    <script type="application/ld+json">
    {"@context":["http://schema.org"],"@type":"LocalBusiness","name":"Test Vet","telephone":"+39 0864 251856",
    "contactPoint":[{"@type":"ContactPoint","telephone":"+39 345 7924934","email":"fedravet@iol.it"}],
    "address":{"@type":"PostalAddress","streetAddress":"Viale del Lavoro, 7","postalCode":"67039","addressLocality":"Sulmona"},
    "sameAs":"https://www.example-vet.it","openingHours":["Mo 09:30 - 12:30"],"description":"Ambulatorio test."}
    </script></head><body></body></html>
    """


def test_extract_local_business(sample_html: str) -> None:
    ld = extract_local_business_dict(sample_html)
    assert ld is not None
    assert ld.get("name")


def test_parse_fedra_like_phones_and_email(sample_html: str) -> None:
    p = parse_paginegialle_html(sample_html, "https://www.paginegialle.it/veterinariofedra")
    assert p["found_ld"] is True
    assert p["phone_fixed"] or p["phone_mobile"]
    assert p["combined_phone"]
    if p["contact_email"]:
        assert "@" in p["contact_email"]
    assert p["combined_phone"] and len(p["combined_phone"]) >= 8


def test_split_fixed_mobile() -> None:
    f, m = split_fixed_mobile(["0864 251856", "345 7924934"])
    assert f and "251856" in f.replace(" ", "")
    assert m and "345" in m.replace(" ", "")
