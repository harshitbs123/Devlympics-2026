from datetime import datetime, timedelta
from app.config import settings

try:
    import bcrypt
except ImportError:
    bcrypt = None

try:
    import jwt
except ImportError:
    jwt = None

def hash_password(password: str) -> str:
    """Hash a password using bcrypt with 10 salt rounds to match Node.js bcrypt"""
    if bcrypt is None:
        raise RuntimeError("Missing 'bcrypt' package. Install with: pip install bcrypt")
    salt = bcrypt.gensalt(rounds=10)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against bcrypt hash"""
    if bcrypt is None:
        raise RuntimeError("Missing 'bcrypt' package. Install with: pip install bcrypt")
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False

def generate_token(user_id: str) -> str:
    """Generate 30-day JWT token matching Node.js generateToken"""
    if jwt is None:
        raise RuntimeError("Missing 'pyjwt' package. Install with: pip install pyjwt")
    payload = {
        "id": str(user_id),
        "exp": datetime.utcnow() + timedelta(days=30),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

def decode_token(token: str) -> dict:
    """Decode and verify JWT token"""
    if jwt is None:
        raise RuntimeError("Missing 'pyjwt' package. Install with: pip install pyjwt")
    return jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
