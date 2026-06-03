from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.tenant import Tenant
from app.models.user import User
from app.core.security import get_password_hash
from pydantic import BaseModel, EmailStr

router = APIRouter()

class ProvisioningRequest(BaseModel):
    institution_name: str
    domain: str
    admin_email: EmailStr
    admin_password: str
    geofence_lat: str = None
    geofence_lng: str = None

@router.post("/onboard")
def onboard_enterprise(request: ProvisioningRequest, db: Session = Depends(get_db)):
    """
    Real Production Login / Enterprise Tenant Management
    Creates an isolated workspace and root administrator for a new institution.
    """
    # 1. Check if domain exists
    if db.query(Tenant).filter(Tenant.domain == request.domain).first():
        raise HTTPException(status_code=400, detail="Domain already registered.")
        
    # 2. Create Workspace
    new_tenant = Tenant(
        name=request.institution_name,
        domain=request.domain,
        contact_email=request.admin_email,
        geofence_center_lat=request.geofence_lat,
        geofence_center_lng=request.geofence_lng
    )
    db.add(new_tenant)
    db.commit()
    db.refresh(new_tenant)
    
    # 3. Create Root Administrator for this workspace
    admin_user = User(
        tenant_id=new_tenant.id,
        name=f"Admin ({request.institution_name})",
        email=request.admin_email,
        hashed_password=get_password_hash(request.admin_password),
        role="admin",
        has_consented=True
    )
    db.add(admin_user)
    db.commit()
    
    return {
        "status": "success",
        "message": f"Enterprise workspace created for {request.institution_name}",
        "tenant_id": new_tenant.id
    }
