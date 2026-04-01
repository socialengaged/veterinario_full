"""Validazione allegati consulenza online."""
from __future__ import annotations

import pytest

from app.services.request_uploads import validate_upload_bytes

_MIN_PNG = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\nIDATx\x9cc\x00\x01"
    b"\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
)


def test_validate_png_ok() -> None:
    validate_upload_bytes("referto.png", _MIN_PNG)


def test_validate_pdf_ok() -> None:
    pdf = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"
    validate_upload_bytes("doc.pdf", pdf)


def test_validate_pdf_wrong_magic() -> None:
    with pytest.raises(ValueError, match="PDF"):
        validate_upload_bytes("fake.pdf", b"not-a-pdf-" + b"x" * 20)


def test_validate_rejects_bad_extension() -> None:
    with pytest.raises(ValueError, match="Formato"):
        validate_upload_bytes("x.exe", b"MZ" + b"\x00" * 100)
