from fastapi import APIRouter, Response, HTTPException, status, Depends
from datetime import datetime
from bson import ObjectId
from app.database import get_users_collection
from app.schemas.auth import RegisterRequest, LoginRequest
from app.utils.security import hash_password, verify_password, generate_token
from app.middleware.auth import get_current_user
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Auth"])

COOKIE_MAX_AGE = 30 * 24 * 60 * 60  # 30 days in seconds

def serialize_user(user_doc: dict) -> dict:
    """Format MongoDB user document for JSON responses"""
    if not user_doc:
        return {}
    res = dict(user_doc)
    res["_id"] = str(res.get("_id", ""))
    res["id"] = res["_id"]
    if "password" in res:
        del res["password"]
    for k in ["createdAt", "updatedAt"]:
        if k in res and isinstance(res[k], datetime):
            res[k] = res[k].isoformat()
    return res

def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="token",
        value=token,
        max_age=COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        secure=(settings.NODE_ENV == "production"),
        path="/"
    )

def clear_auth_cookie(response: Response):
    response.delete_cookie(
        key="token",
        httponly=True,
        samesite="lax",
        secure=(settings.NODE_ENV == "production"),
        path="/"
    )

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, response: Response):
    users_col = get_users_collection()

    email_clean = body.email.lower().strip()
    existing_user = await users_col.find_one({"email": email_clean})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    now = datetime.utcnow()
    user_doc = {
        "name": body.name.strip(),
        "email": email_clean,
        "password": hash_password(body.password),
        "disability": body.disability,
        "primaryCommunication": body.primaryCommunication,
        "preferredLanguage": body.preferredLanguage.strip(),
        "signDialect": body.signDialect,
        "assistivePreferences": (body.assistivePreferences.model_dump() if body.assistivePreferences else {
            "highContrast": False,
            "largeCaptions": False,
            "hapticAlerts": True
        }),
        "emergencyContact": (body.emergencyContact.model_dump() if body.emergencyContact else {
            "name": "",
            "phone": ""
        }),
        "createdAt": now,
        "updatedAt": now
    }

    result = await users_col.insert_one(user_doc)
    user_id = str(result.inserted_id)
    user_doc["_id"] = user_id

    token = generate_token(user_id)
    set_auth_cookie(response, token)

    return {
        "success": True,
        "user": serialize_user(user_doc),
        "token": token
    }

@router.post("/login")
async def login(body: LoginRequest, response: Response):
    users_col = get_users_collection()

    email_clean = body.email.lower().strip()
    user = await users_col.find_one({"email": email_clean})

    if not user or not verify_password(body.password, user.get("password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user_id = str(user["_id"])
    token = generate_token(user_id)
    set_auth_cookie(response, token)

    return {
        "success": True,
        "user": serialize_user(user),
        "token": token
    }

@router.post("/logout")
async def logout(response: Response):
    clear_auth_cookie(response)
    return {
        "success": True,
        "message": "Logged out successfully"
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "success": True,
        "user": serialize_user(current_user)
    }
