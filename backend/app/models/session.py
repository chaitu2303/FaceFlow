from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.models.base import Base

class ClassSession(Base):
    """
    Auto-Session Management
    Records when a class opens, closes, and its designated geofenced boundaries.
    """
    __tablename__ = "class_sessions"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    course_name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    
    # Geofencing center for this specific classroom (overrides tenant default if set)
    geofence_lat = Column(String, nullable=True)
    geofence_lng = Column(String, nullable=True)
    
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    
    is_active = Column(Boolean, default=False)
    auto_close = Column(Boolean, default=True) # If true, session auto-closes at end_time
    
    tenant = relationship("Tenant")
