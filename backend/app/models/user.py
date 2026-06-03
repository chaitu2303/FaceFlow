from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=True) # Null for root superadmins
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, nullable=True) # For SMS Notifications
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student") # student, faculty, admin, superadmin
    approval_status = Column(String, default="pending") # pending, approved, rejected
    is_active = Column(Boolean, default=True)
    has_consented = Column(Boolean, default=False) # Biometric Consent Agreement
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    tenant = relationship("Tenant", backref="users")
