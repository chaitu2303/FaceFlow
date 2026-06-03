from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings
from cryptography.fernet import Fernet
import base64
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load RS256 Keys
PRIVATE_KEY_PATH = os.path.join(os.path.dirname(__file__), "../../keys/private.pem")
PUBLIC_KEY_PATH = os.path.join(os.path.dirname(__file__), "../../keys/public.pem")

try:
    with open(PRIVATE_KEY_PATH, "r") as f:
        PRIVATE_KEY = f.read()
    with open(PUBLIC_KEY_PATH, "r") as f:
        PUBLIC_KEY = f.read()
except FileNotFoundError:
    PRIVATE_KEY = "dummy"
    PUBLIC_KEY = "dummy"

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    # RS256 Upgrade
    encoded_jwt = jwt.encode(to_encode, PRIVATE_KEY, algorithm="RS256")
    return encoded_jwt

def decode_access_token(token: str):
    return jwt.decode(token, PUBLIC_KEY, algorithms=["RS256"])

class BiometricKeyManager:
    """
    Advanced Biometric Vault Key Rotation Service
    Simulates hardware-backed key management and periodic key rollover.
    """
    def __init__(self):
        # In production, this would interface with AWS KMS or HashiCorp Vault.
        self.active_key_id = "v1-2026"
        self.keys = {
            self.active_key_id: os.getenv("BIOMETRIC_VAULT_KEY_V1", Fernet.generate_key().decode()),
            "v0-legacy": os.getenv("BIOMETRIC_VAULT_KEY_V0", Fernet.generate_key().decode())
        }
        self.fernets = {kid: Fernet(k.encode()) for kid, k in self.keys.items()}

    def encrypt_biometric_data(self, data: str) -> dict:
        """Encrypts data and returns the ciphertext and the key_id used."""
        ciphertext = self.fernets[self.active_key_id].encrypt(data.encode()).decode()
        return {"ciphertext": ciphertext, "key_id": self.active_key_id}

    def decrypt_biometric_data(self, encrypted_data: str, key_id: str) -> str:
        """Decrypts data using the specific key_id it was encrypted with."""
        if key_id not in self.fernets:
            raise ValueError("Unknown Key ID. Potential data corruption or key loss.")
        return self.fernets[key_id].decrypt(encrypted_data.encode()).decode()

    def rotate_keys(self):
        """Simulates periodic key rollover."""
        new_key_id = f"v{len(self.keys)}-{datetime.utcnow().year}"
        new_key = Fernet.generate_key().decode()
        self.keys[new_key_id] = new_key
        self.fernets[new_key_id] = Fernet(new_key.encode())
        self.active_key_id = new_key_id
        return new_key_id

biometric_key_manager = BiometricKeyManager()
