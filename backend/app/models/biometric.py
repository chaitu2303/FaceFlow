from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from pgvector.sqlalchemy import Vector
from app.models.base import Base

class BiometricVault(Base):
    __tablename__ = "biometric_vault"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    # Using 512 dimensions for Face Embeddings as standard for ArcFace/InsightFace
    face_embedding = Column(Vector(512), nullable=False)
    # Optional: AES Encrypted format or reference key
    encryption_key_reference = Column(String, nullable=True)
    metadata_json = Column(JSONB, nullable=True) # Device fingerprint, consent timestamp
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    tenant = relationship("Tenant")

    user = relationship("User", backref="biometric")
