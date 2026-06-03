from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, recognition, provisioning
from app.core.middleware import ZeroTrustMiddleware

app = FastAPI(
    title="SentinelFRS API",
    description="Privacy-Preserving AI-Powered Intelligent Face Recognition Attendance Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(ZeroTrustMiddleware)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(provisioning.router, prefix="/api/v1/enterprise", tags=["provisioning"])
app.include_router(recognition.router, tags=["recognition"])

@app.get("/api/health")
def health_check():
    return {"status": "online", "service": "SentinelFRS Backend Core"}
