import sys
import os

# Auto-switch to .venv python if started with global python
_venv_python = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".venv", "bin", "python")
if os.path.exists(_venv_python) and sys.executable != _venv_python and __name__ == "__main__":
    os.execv(_venv_python, [_venv_python] + sys.argv)

os.environ.setdefault("MPLCONFIGDIR", "/tmp/matplotlib")

import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.database import connect_db, close_db
from app.routes import auth, translator

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    await connect_db()
    yield
    # Shutdown: Close MongoDB connection
    await close_db()

app = FastAPI(
    title="Devlympics Unified Backend & AI Services",
    description="Unified FastAPI Backend handling Auth, Accessible Profiles, and Real-Time AI Sign Language Services",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
allowed_origins = [
    settings.CLIENT_ORIGIN,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Error Handlers to match frontend error expectations
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    msg = errors[0]["msg"] if errors else "Validation error"
    if errors and len(errors) > 0 and "loc" in errors[0]:
        field = errors[0]["loc"][-1]
        msg = f"{field}: {msg}"
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"success": False, "message": msg}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"success": False, "message": str(exc)}
    )

# Base health check route matching Express
@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "message": "Server is running smoothly"}

# Mount Routes
app.include_router(auth.router)
app.include_router(translator.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=(settings.NODE_ENV == "development"))
