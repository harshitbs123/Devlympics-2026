from fastapi import Request, HTTPException, status, Depends
from bson import ObjectId
from app.database import get_users_collection
from app.utils.security import decode_token

def extract_cookie_token(raw_cookie: str | None) -> str | None:
    """Extract token supporting both raw JWT and Express signed cookies (s:token.sig)"""
    if not raw_cookie:
        return None
    if raw_cookie.startswith("s:"):
        # Format is s:<token>.<signature>
        token_part = raw_cookie[2:]
        return token_part.split(".")[0]
    return raw_cookie

async def get_current_user(request: Request):
    token = None

    # 1. Try reading from cookie
    raw_cookie = request.cookies.get("token")
    if raw_cookie:
        token = extract_cookie_token(raw_cookie)

    # 2. Fallback to Authorization Header (Bearer <token>)
    if not token and "Authorization" in request.headers:
        auth_header = request.headers["Authorization"]
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Please log in."
        )

    try:
        payload = decode_token(token)
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload."
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token. Please log in again."
        )

    users_col = get_users_collection()
    user = await users_col.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or session invalid."
        )

    user["_id"] = str(user["_id"])
    if "password" in user:
        del user["password"]

    return user
