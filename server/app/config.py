import os
from pathlib import Path

# Load .env file
env_path = Path(__file__).resolve().parent.parent / ".env"
if env_path.exists():
    try:
        from dotenv import load_dotenv
        load_dotenv(dotenv_path=env_path)
    except ImportError:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    k = k.strip()
                    v = v.strip().strip("'\"")
                    if k not in os.environ:
                        os.environ[k] = v

class Settings:
    PORT: int = int(os.getenv("PORT", 3003))
    MONGO_URI: str = os.getenv("MONGO_URI", "mongodb://localhost:27017/devlympics")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "default_jwt_secret")
    CLIENT_ORIGIN: str = os.getenv("CLIENT_ORIGIN", "http://localhost:5173")
    COOKIE_SECRET: str = os.getenv("COOKIE_SECRET", "default_cookie_secret")
    NODE_ENV: str = os.getenv("NODE_ENV", "development")

settings = Settings()
