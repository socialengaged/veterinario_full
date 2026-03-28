from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import auth as auth_router
from app.api.routers import dashboard_route
from app.api.routers import requests_route
from app.api.routers import users_route
from app.core.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="VeterinarioVicino API", version="1.0.0")

    origins = [
        settings.frontend_url.rstrip("/"),
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:5173",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router.router)
    app.include_router(requests_route.router)
    app.include_router(users_route.router)
    app.include_router(dashboard_route.router)

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()
