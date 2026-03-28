"""Route protette: 401 senza Bearer (nessuna dipendenza da dati nel DB per la guard)."""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient


@pytest.mark.parametrize(
    "method, path",
    [
        ("GET", "/users/me/profile"),
        ("PATCH", "/users/me"),
        ("GET", "/users/me/requests"),
        ("GET", "/users/me/animals"),
        ("GET", "/dashboard/chats"),
        ("POST", "/auth/resend-verification"),
    ],
)
def test_protected_routes_require_bearer(client: TestClient, method: str, path: str) -> None:
    if method == "GET":
        r = client.get(path)
    elif method == "PATCH":
        r = client.patch(path, json={})
    elif method == "POST":
        r = client.post(path, json={})
    else:
        raise AssertionError(method)
    assert r.status_code == 401, r.text


def test_auth_me_requires_bearer(client: TestClient) -> None:
    r = client.get("/auth/me")
    assert r.status_code == 401
