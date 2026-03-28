"""Smoke test locale: /health senza server HTTP; richiede .env valido per import."""
from __future__ import annotations

import sys
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from fastapi.testclient import TestClient

from app.main import app


def main() -> None:
    client = TestClient(app)
    r = client.get("/health")
    assert r.status_code == 200, r.text
    assert r.json().get("status") == "ok"
    print("smoke_test OK:", r.json())


if __name__ == "__main__":
    main()
