from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware

from app.api.routers import auth as auth_router
from app.http_middleware import SecurityHeadersMiddleware
from app.api.routers import dashboard_route
from app.api.routers import requests_route
from app.api.routers import specialists_public_route
from app.api.routers import users_route
from app.core.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="VeterinarioVicino API", version="1.0.0")

    origins = list(
        {
            settings.frontend_url.rstrip("/"),
            "http://localhost:8080",
            "http://127.0.0.1:8080",
            "http://localhost:5173",
            "http://veterinariovicino.it",
            "http://www.veterinariovicino.it",
            "https://veterinariovicino.it",
            "https://www.veterinariovicino.it",
            "http://80.225.90.151",
            "http://57.131.16.162",
        }
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(GZipMiddleware, minimum_size=512)
    app.add_middleware(SecurityHeadersMiddleware)

    app.include_router(auth_router.router)
    app.include_router(requests_route.router)
    app.include_router(users_route.router)
    app.include_router(dashboard_route.router)
    app.include_router(specialists_public_route.router)

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()
