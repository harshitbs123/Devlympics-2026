import re
from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal
from datetime import datetime

class AssistivePreferences(BaseModel):
    highContrast: bool = False
    largeCaptions: bool = False
    hapticAlerts: bool = True

class EmergencyContact(BaseModel):
    name: str = ""
    phone: str = ""

DisabilityType = Literal[
    "deaf_hard_of_hearing",
    "speech_impaired",
    "motor_impaired",
    "low_vision",
    "none_ally",
    "other"
]

CommunicationType = Literal[
    "sign_language",
    "spoken_voice",
    "text_captions",
    "assisted_gestures"
]

SignDialectType = Literal["ISL", "ASL", "BSL", "IS"]

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Full name")
    email: str = Field(..., description="Email address")
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters")
    disability: DisabilityType = "deaf_hard_of_hearing"
    primaryCommunication: CommunicationType = "sign_language"
    preferredLanguage: str = "en"
    signDialect: SignDialectType = "ISL"
    assistivePreferences: Optional[AssistivePreferences] = None
    emergencyContact: Optional[EmergencyContact] = None

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", v):
            raise ValueError("Enter a valid email")
        return v

class LoginRequest(BaseModel):
    email: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        return v.strip().lower()

class UserProfileResponse(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    email: str
    disability: str
    primaryCommunication: str
    preferredLanguage: str
    signDialect: str
    assistivePreferences: AssistivePreferences
    emergencyContact: EmergencyContact
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True

class AuthResponse(BaseModel):
    success: bool = True
    user: UserProfileResponse
    token: str

class MessageResponse(BaseModel):
    success: bool = True
    message: str
