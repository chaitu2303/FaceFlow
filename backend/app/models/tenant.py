from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.models.base import Base

class Tenant(Base):
    """
    Enterprise Tenant Model for Multi-Institution Support
    Isolates data for universities and corporate campuses.
    """
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False) # e.g. "ABC University"
    domain = Column(String, unique=True, index=True, nullable=False) # e.g. "abc.edu"
    contact_email = Column(String, nullable=False)
    geofence_center_lat = Column(String, nullable=True)
    geofence_center_lng = Column(String, nullable=True)
    geofence_radius_meters = Column(Integer, default=500)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
