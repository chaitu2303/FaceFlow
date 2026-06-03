from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import hashlib

class ZeroTrustMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 1. Request Fingerprinting (Simulated)
        client_ip = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("User-Agent", "unknown")
        
        fingerprint = hashlib.sha256(f"{client_ip}-{user_agent}".encode()).hexdigest()
        
        # 2. Geo/Behavioral Anomaly Detection (Simulated)
        # In production, check Redis for previous IP geolocations of this user
        trust_score = 100
        if "curl" in user_agent.lower() or "python-requests" in user_agent.lower():
            trust_score -= 50
            
        # Optional: Fail fast if trust score is too low
        # if trust_score < 50:
        #     return JSONResponse(status_code=403, content={"detail": "Zero Trust Validation Failed"})
            
        request.state.fingerprint = fingerprint
        request.state.trust_score = trust_score
        
        response = await call_next(request)
        
        # Add security headers
        response.headers["X-Trust-Score"] = str(trust_score)
        return response
