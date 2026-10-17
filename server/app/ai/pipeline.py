import os
import cv2
import numpy as np
import torch
import time
from pathlib import Path
from collections import Counter
from app.ai.model import SignLanguageLSTM, DYNAMIC_CLASSES
from app.ai.session import UserSession

# Suppress TensorFlow logging from MediaPipe
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

try:
    import mediapipe as mp
    MEDIAPIPE_AVAILABLE = True
except ImportError:
    MEDIAPIPE_AVAILABLE = False
    mp = None

DYNAMIC_SEQUENCE_LENGTH = 30
DYNAMIC_KEYPOINT_DIM = 258
DYNAMIC_EMA_ALPHA = 0.5
DYNAMIC_CONFIDENCE_THRESHOLD = 0.70
DYNAMIC_VOTING_THRESHOLD = 8
DYNAMIC_BUFFER_SIZE = 20

class SignRecognitionPipeline:
    def __init__(self, weights_path: str = None):
        if weights_path is None:
            weights_path = str(Path(__file__).parent / "weights" / "sign_lstm_best.pt")

        self.device = torch.device('cpu')
        self.model = None
        self.model_loaded = False

        if os.path.exists(weights_path):
            try:
                self.model = SignLanguageLSTM(input_size=DYNAMIC_KEYPOINT_DIM, num_classes=len(DYNAMIC_CLASSES)).to(self.device)
                self.model.load_state_dict(torch.load(weights_path, map_location=self.device, weights_only=True))
                self.model.eval()
                self.model_loaded = True
                print(f"✅ AI Pipeline: SignLanguageLSTM loaded on {self.device}")
            except Exception as e:
                print(f"⚠️ AI Pipeline: Failed to load LSTM weights: {e}")
        else:
            print(f"⚠️ AI Pipeline: Weights file not found at {weights_path}")

        # MediaPipe initialization matching RTSLR (model_complexity=1 for full landmark accuracy)
        self.mp_pose = None
        self.mp_hands = None
        if MEDIAPIPE_AVAILABLE and mp:
            try:
                self.mp_pose = mp.solutions.pose.Pose(
                    static_image_mode=False,
                    model_complexity=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5
                )
                self.mp_hands = mp.solutions.hands.Hands(
                    static_image_mode=False,
                    max_num_hands=2,
                    model_complexity=1,
                    min_detection_confidence=0.5,
                    min_tracking_confidence=0.5
                )
                print("✅ AI Pipeline: MediaPipe Pose & Hands initialized (RTSLR full accuracy mode)")
            except Exception as e:
                print(f"⚠️ AI Pipeline: MediaPipe initialization error: {e}")

    def extract_keypoints(self, pose_results, hand_results):
        """Extract 258 keypoint dimensions matching RTSLR architecture"""
        try:
            if pose_results and pose_results.pose_landmarks:
                pose = np.array([[lm.x, lm.y, lm.z, lm.visibility]
                                 for lm in pose_results.pose_landmarks.landmark]).flatten()
            else:
                pose = np.zeros(33 * 4)

            lh, rh = np.zeros(21 * 3), np.zeros(21 * 3)
            if hand_results and hand_results.multi_hand_landmarks and hand_results.multi_handedness:
                for hand_lms, handedness in zip(hand_results.multi_hand_landmarks, hand_results.multi_handedness):
                    label = handedness.classification[0].label
                    coords = np.array([[lm.x, lm.y, lm.z] for lm in hand_lms.landmark]).flatten()
                    if label == 'Left':
                        lh = coords
                    else:
                        rh = coords

            return np.concatenate([pose, lh, rh])
        except Exception:
            return np.zeros(DYNAMIC_KEYPOINT_DIM)

    def normalize_frame(self, frame):
        """Normalize keypoints relative to body and hand centers"""
        try:
            frame = frame.copy()
            pose = frame[0:132].reshape(33, 4)
            left_hip, right_hip = pose[23, :3], pose[24, :3]
            left_shoulder, right_shoulder = pose[11, :3], pose[12, :3]

            if np.any(left_hip) and np.any(right_hip):
                center = (left_hip + right_hip) / 2.0
                shoulder_dist = max(np.linalg.norm(left_shoulder - right_shoulder), 0.01)
                for j in range(33):
                    pose[j, :3] = (pose[j, :3] - center) / shoulder_dist
                frame[0:132] = pose.flatten()

            lh = frame[132:195].reshape(21, 3)
            if np.any(lh):
                lh_center = lh[0].copy()
                lh_scale = max(np.linalg.norm(lh[0] - lh[9]), 0.01)
                for j in range(21):
                    lh[j] = (lh[j] - lh_center) / lh_scale
                frame[132:195] = lh.flatten()

            rh = frame[195:258].reshape(21, 3)
            if np.any(rh):
                rh_center = rh[0].copy()
                rh_scale = max(np.linalg.norm(rh[0] - rh[9]), 0.01)
                for j in range(21):
                    rh[j] = (rh[j] - rh_center) / rh_scale
                frame[195:258] = rh.flatten()

            return frame
        except Exception:
            return frame

    def apply_ema(self, current_lms, prev_lms, alpha=DYNAMIC_EMA_ALPHA):
        if prev_lms is None:
            return current_lms
        return current_lms * alpha + prev_lms * (1 - alpha)

    def process_frame(self, frame_bgr: np.ndarray, session: UserSession) -> dict:
        """Process a single frame for a specific user session and return real-time predictions"""
        if not self.model_loaded or not self.mp_pose or not self.mp_hands:
            return {
                "gesture": "Model Offline",
                "confidence": 0.0,
                "is_new": False,
                "landmarks": None
            }

        # 1. Flip frame horizontally to mirror (EXACTLY matching RTSLR app.py: frame = cv2.flip(frame, 1))
        # This aligns user right hand -> right hand channel and prevents inverted keypoint coordinates
        mirrored_frame = cv2.flip(frame_bgr, 1)

        # 2. Color conversion for MediaPipe
        img_rgb = cv2.cvtColor(mirrored_frame, cv2.COLOR_BGR2RGB)
        img_rgb.flags.writeable = False

        pose_res = self.mp_pose.process(img_rgb)
        hand_res = self.mp_hands.process(img_rgb)

        # 3. Extract 2D landmarks for frontend overlay rendering
        # Landmarks are in mirrored screen coordinates (0 = left, 1 = right)
        frontend_landmarks = {
            "pose": [[round(lm.x, 3), round(lm.y, 3)] for lm in pose_res.pose_landmarks.landmark] if pose_res and pose_res.pose_landmarks else [],
            "hands": []
        }
        if hand_res and hand_res.multi_hand_landmarks:
            for hand in hand_res.multi_hand_landmarks:
                frontend_landmarks["hands"].append([[round(lm.x, 3), round(lm.y, 3)] for lm in hand.landmark])

        # 4. Extract & smooth keypoint vector (258 dimensions)
        keypoints = self.extract_keypoints(pose_res, hand_res)
        normalized = self.normalize_frame(keypoints)
        smoothed = self.apply_ema(normalized, session.previous_landmarks, DYNAMIC_EMA_ALPHA)
        session.previous_landmarks = smoothed
        session.sequence.append(smoothed)

        # 5. Predict once sequence buffer fills to 30 frames
        is_new_commit = False
        winning_gesture = session.current_prediction
        confidence = session.confidence

        if len(session.sequence) == DYNAMIC_SEQUENCE_LENGTH:
            seq_array = np.array(session.sequence)
            motion_variance = float(np.var(seq_array, axis=0).mean())

            # Power saving & idle detection
            if motion_variance < 0.0008:
                local_prediction = "Idle"
                local_confidence = 0.0
                session.candidate = "Idle"
            else:
                input_tensor = torch.tensor(seq_array, dtype=torch.float32).unsqueeze(0).to(self.device)
                with torch.no_grad():
                    res = self.model(input_tensor)
                    probs = torch.softmax(res, dim=1).cpu().numpy()[0]

                max_idx = int(np.argmax(probs))
                local_confidence = float(probs[max_idx])
                pred_label = DYNAMIC_CLASSES[max_idx]

                # RTSLR logic with hysteresis:
                # If confidence exceeds threshold, accept candidate.
                # If confidence dips slightly (>= 0.50) while sustaining the same gesture, keep it active!
                current_cand = getattr(session, 'candidate', None)
                if local_confidence >= DYNAMIC_CONFIDENCE_THRESHOLD:
                    local_prediction = pred_label
                    session.candidate = pred_label
                elif local_confidence >= 0.50 and current_cand == pred_label:
                    local_prediction = pred_label
                else:
                    local_prediction = "Waiting..."
                    if current_cand != pred_label:
                        session.candidate = None

            session.prediction_buffer.append(local_prediction)

            # Majority voting filter across buffer (e.g. 8 votes out of 20)
            if len(session.prediction_buffer) > 0:
                vote_tally = Counter(session.prediction_buffer).most_common(1)[0]
                top_vote, count = vote_tally
                if count >= DYNAMIC_VOTING_THRESHOLD and top_vote not in ["Idle", "Waiting...", "Thinking..."]:
                    winning_gesture = top_vote
                    confidence = local_confidence

                    if winning_gesture != session.last_confirmed_gesture:
                        session.last_confirmed_gesture = winning_gesture
                        is_new_commit = True
                        session.history.insert(0, winning_gesture)
                        session.history = session.history[:20]

        session.current_prediction = winning_gesture
        session.confidence = confidence

        return {
            "gesture": winning_gesture,
            "confidence": round(confidence * 100, 1),
            "is_new": is_new_commit,
            "history": session.history[:8],
            "landmarks": frontend_landmarks
        }
