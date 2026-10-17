from collections import deque
from typing import Dict, Optional

class UserSession:
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.sequence = deque(maxlen=30)
        self.prediction_buffer = deque(maxlen=20)
        self.previous_landmarks = None
        self.current_prediction = "Waiting..."
        self.last_confirmed_gesture = "Idle"
        self.confidence = 0.0
        self.history = []

    def reset(self):
        self.sequence.clear()
        self.prediction_buffer.clear()
        self.previous_landmarks = None
        self.current_prediction = "Waiting..."
        self.last_confirmed_gesture = "Idle"
        self.confidence = 0.0
        self.history.clear()

class SessionManager:
    def __init__(self):
        self.sessions: Dict[str, UserSession] = {}

    def get_or_create(self, session_id: str) -> UserSession:
        if session_id not in self.sessions:
            self.sessions[session_id] = UserSession(session_id)
        return self.sessions[session_id]

    def remove(self, session_id: str):
        if session_id in self.sessions:
            del self.sessions[session_id]

session_manager = SessionManager()
