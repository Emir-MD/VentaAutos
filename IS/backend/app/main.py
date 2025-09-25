# FastAPI app — SOLO logs CSV
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import analytics

app = FastAPI(title="Analytics Backend — CSV only")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # en prod: limita a tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(analytics.router)

@app.get("/")
async def root():
    return {"status": "ok"}
