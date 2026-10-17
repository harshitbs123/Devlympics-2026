import asyncio
import cv2
import numpy as np
import base64
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.ai.pipeline import SignRecognitionPipeline
from app.ai.session import session_manager

router = APIRouter(tags=["Sign Translator WebSocket"])

# Initialize pipeline once on module load
pipeline = SignRecognitionPipeline()

@router.websocket("/ws/sign-translator/{session_id}")
async def websocket_sign_translator(websocket: WebSocket, session_id: str):
    await websocket.accept()
    session = session_manager.get_or_create(session_id)
    session.reset()
    print(f"🔌 Client connected to Sign Translator WebSocket: {session_id}")

    try:
        while True:
            message = await websocket.receive()
            if "type" in message and message["type"] == "websocket.disconnect":
                break

            frame_bytes = None

            # 1. Direct binary frame bytes (highest performance, zero base64 overhead)
            if "bytes" in message and message["bytes"]:
                frame_bytes = message["bytes"]

            # 2. Text / JSON / Base64 fallback
            elif "text" in message and message["text"]:
                text_data = message["text"]
                if text_data.startswith("{"):
                    try:
                        data = json.loads(text_data)
                        if data.get("action") == "reset":
                            session.reset()
                            await websocket.send_json({"type": "reset", "status": "ok"})
                            continue
                        raw_b64 = data.get("frame", "")
                        if "," in raw_b64:
                            raw_b64 = raw_b64.split(",", 1)[1]
                        frame_bytes = base64.b64decode(raw_b64)
                    except Exception:
                        continue
                else:
                    if "," in text_data:
                        text_data = text_data.split(",", 1)[1]
                    try:
                        frame_bytes = base64.b64decode(text_data)
                    except Exception:
                        continue

            if not frame_bytes:
                continue

            # Decode image into BGR numpy array
            nparr = np.frombuffer(frame_bytes, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if frame is None:
                continue

            # Run MediaPipe landmark detection and PyTorch LSTM in worker thread
            result = await asyncio.to_thread(pipeline.process_frame, frame, session)

            # Send prediction payload back to the client
            await websocket.send_json(result)

    except WebSocketDisconnect:
        session_manager.remove(session_id)
        print(f"🔌 Client disconnected normally: {session_id}")
    except Exception as e:
        print(f"⚠️ WebSocket error for session {session_id}: {e}")
        session_manager.remove(session_id)
