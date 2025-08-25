# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sport AI - Backend (dev)")

# Permettre l'accès depuis Expo / navigateur pendant le dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # DEV seulement : restreindre en prod !
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdjustRequest(BaseModel):
    user_id: int
    planned_session: Dict[str, Any]
    metrics: Optional[Dict[str, Any]] = None

class AdjustResponse(BaseModel):
    adjusted_session: Dict[str, Any]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/api/v1/adjust", response_model=AdjustResponse)
async def adjust(req: AdjustRequest):
    session = dict(req.planned_session)  # shallow copy
    metrics = req.metrics or {}
    sleep = metrics.get("sleep_hours", 7)
    hrv = metrics.get("hrv", 1.0)

    # logique d'exemple : réduire intensité si sommeil faible ou HRV bas
    if sleep < 6 or (isinstance(hrv, (int, float)) and hrv < 0.85):
        session["intensity"] = round(session.get("intensity", 1.0) * 0.75, 2)
        session["note"] = "Intensité réduite (sommeil/HRV faible)"
    else:
        session["note"] = "Aucun ajustement nécessaire"

    return {"adjusted_session": session}
