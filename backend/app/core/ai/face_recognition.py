import cv2
import numpy as np
import onnxruntime as ort

class FaceRecognizer:
    def __init__(self, model_path: str = "models/arcface_r100_v1.onnx"):
        # Placeholder for actual ONNX model loading. 
        # In a real environment, we'd ensure the model file is downloaded.
        self.model_path = model_path
        self.session = None
        self._init_model()

    def _init_model(self):
        try:
            # We'd use CUDAExecutionProvider if GPU is available
            self.session = ort.InferenceSession(self.model_path, providers=['CPUExecutionProvider'])
        except Exception as e:
            print(f"Failed to load ONNX model. Ensure {self.model_path} exists. {e}")
            self.session = None

    def preprocess_image(self, face_image: np.ndarray) -> np.ndarray:
        # standard 112x112 ArcFace input
        resized = cv2.resize(face_image, (112, 112))
        # Normalize to [-1, 1]
        img_blob = (resized / 127.5) - 1.0
        # HWC to CHW
        img_blob = np.transpose(img_blob, (2, 0, 1))
        # Add batch dimension
        img_blob = np.expand_dims(img_blob, axis=0).astype(np.float32)
        return img_blob

    def get_embedding(self, face_image: np.ndarray) -> list[float]:
        if self.session is None:
            # Return dummy 512-dim embedding for development if model is missing
            return np.random.randn(512).tolist()
            
        input_name = self.session.get_inputs()[0].name
        processed_img = self.preprocess_image(face_image)
        
        # Inference
        embedding = self.session.run(None, {input_name: processed_img})[0][0]
        # Normalize the embedding (L2)
        embedding = embedding / np.linalg.norm(embedding)
        return embedding.tolist()
        
face_recognizer = FaceRecognizer()
