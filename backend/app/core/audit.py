from sqlalchemy.orm import Session
from app.models.audit import AuditLog
from datetime import datetime

def create_audit_log(db: Session, action: str, details: dict = None, user_id: int = None):
    # Lock or serialize this in production to prevent race conditions on previous_hash
    last_log = db.query(AuditLog).order_by(AuditLog.id.desc()).first()
    previous_hash = last_log.current_hash if last_log else "GENESIS_HASH_00000000000000000"
    
    current_time = datetime.utcnow()
    current_hash = AuditLog.generate_hash(current_time, user_id, action, details, previous_hash)
    
    new_log = AuditLog(
        timestamp=current_time,
        user_id=user_id,
        action=action,
        details=details,
        previous_hash=previous_hash,
        current_hash=current_hash
    )
    
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

def verify_audit_chain(db: Session) -> bool:
    """Verifies the cryptographic integrity of the entire audit log."""
    logs = db.query(AuditLog).order_by(AuditLog.id.asc()).all()
    if not logs:
        return True
        
    expected_previous_hash = "GENESIS_HASH_00000000000000000"
    for log in logs:
        if log.previous_hash != expected_previous_hash:
            return False
        
        calculated_hash = AuditLog.generate_hash(
            log.timestamp, log.user_id, log.action, log.details, log.previous_hash
        )
        if calculated_hash != log.current_hash:
            return False
            
        expected_previous_hash = log.current_hash
        
    return True
