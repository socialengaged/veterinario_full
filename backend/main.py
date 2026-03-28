"""ASGI entry.

Locale (cwd=backend): uvicorn main:app --reload
Root repo: uvicorn backend.main:app (PYTHONPATH deve includere la root del monorepo).
"""
from __future__ import annotations

import sys
from pathlib import Path

_backend_root = Path(__file__).resolve().parent
if str(_backend_root) not in sys.path:
    sys.path.insert(0, str(_backend_root))

from app.main import app

__all__ = ["app"]
