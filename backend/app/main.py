"""
FastAPI application entry point.
"""
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan events.

    Startup: Initialize database connection pool, cache, etc.
    Shutdown: Close connections, cleanup resources.
    """
    # Startup
    print(f"🚀 Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    print(f"📍 Environment: {settings.ENVIRONMENT}")
    print(f"🔗 API docs: http://localhost:8000/docs")

    yield

    # Shutdown
    print(f"👋 Shutting down {settings.PROJECT_NAME}")


# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Online Driving School Platform API",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
    }


# Root endpoint
@app.get("/", tags=["Root"])
async def root() -> dict[str, str]:
    """Root endpoint with API information."""
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/health",
    }


# Include API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc: Exception) -> JSONResponse:
    """
    Global exception handler for unhandled exceptions.

    In production, log the error and return a generic message.
    """
    if settings.ENVIRONMENT == "development":
        return JSONResponse(
            status_code=500,
            content={
                "detail": str(exc),
                "type": type(exc).__name__,
            },
        )

    # In production, don't expose internal errors
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
    )
