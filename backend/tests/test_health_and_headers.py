"""Smoke su /health e header di sicurezza minimi."""

from fastapi.testclient import TestClient

from app.main import app


def test_health_ok() -> None:
    client = TestClient(app)
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_security_headers_present() -> None:
    client = TestClient(app)
    r = client.get("/health")
    assert r.headers.get("X-Content-Type-Options") == "nosniff"
    assert r.headers.get("X-Frame-Options") == "DENY"
    assert r.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
    assert r.headers.get("X-Request-ID")


def test_request_id_header_uuid_like() -> None:
    client = TestClient(app)
    r = client.get("/health")
    rid = r.headers.get("X-Request-ID")
    assert rid and len(rid) >= 32
