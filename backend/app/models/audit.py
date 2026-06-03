from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from app.models.base import Base
import hashlib

class AuditLog(Base):
    """
    Immutable Hash-Chained Audit Trail
    Ensures that log tampering breaks the cryptographic chain.
    """
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Null for system actions
    action = Column(String, nullable=False)
    details = Column(JSON, nullable=True)
    previous_hash = Column(String, nullable=False) # Hash of the previous log entry
    current_hash = Column(String, nullable=False)  # Hash of (timestamp + user_id + action + details + previous_hash)

    @staticmethod
    def generate_hash(timestamp, user_id, action, details, previous_hash):
        payload = f"{timestamp}-{user_id}-{action}-{details}-{previous_hash}"
        return hashlib.sha256(payload.encode()).hexdigest()
