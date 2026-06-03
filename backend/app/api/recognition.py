from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import cv2
import numpy as np
import base64
import json
import random
from app.core.ai.liveness import liveness_detector
from app.core.ai.face_recognition import face_recognizer

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

manager = ConnectionManager()

CHALLENGES = ["TURN_LEFT", "TURN_RIGHT", "BLINK_TWICE", "SMILE"]

@router.websocket("/ws/recognize")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Step 1: Send a random challenge to the client
        current_challenge = random.choice(CHALLENGES)
        await websocket.send_text(json.dumps({
            "status": "challenge_issued",
            "challenge": current_challenge
        }))
        
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            if "frame" in payload:
                encoded_data = payload["frame"].split(',')[1]
                nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                # 1. Multi-Layer Liveness Detection (Simulated depth & GAN detection)
                liveness_result = liveness_detector.detect_liveness(img)
                
                # Simulated XAI (Explainable AI) Telemetry
                xai_telemetry = {
                    "gan_artifact_prob": round(random.uniform(0.001, 0.05), 4),
                    "depth_consistency_score": round(random.uniform(0.85, 0.99), 4),
                    "texture_frequency": "natural",
                    "challenge_passed": True # Simulating the challenge was met
                }
                
                if liveness_result["is_live"] and xai_telemetry["challenge_passed"]:
                    # 2. Face Recognition
                    embedding = face_recognizer.get_embedding(img)
                    
                    response = {
                        "status": "success",
                        "liveness": liveness_result,
                        "xai": xai_telemetry,
                        "match": {
                            "user_id": 1,
                            "name": "Jane Doe",
                            "confidence": 0.98
                        }
                    }
                else:
                    response = {
                        "status": "spoof_detected",
                        "liveness": liveness_result,
                        "xai": xai_telemetry,
                        "detail": "Multi-layer anti-spoofing validation failed."
                    }
                    
                await websocket.send_text(json.dumps(response))
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
