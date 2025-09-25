"""
API de analítica (CSV) — login + visitas + marcas, SIN emails/servicios externos.
Guarda contraseña en claro (solo DEMO).
"""
from __future__ import annotations
from fastapi import APIRouter, HTTPException, Request, Query
from fastapi.responses import JSONResponse
from datetime import datetime
from typing import Optional
import json, hashlib, secrets
import pandas as pd
from pathlib import Path

from .. import config
from ..log_io import append_row_csv

router = APIRouter(prefix="/analytics", tags=["analytics"])

# ---------- Esquema único de columnas (todas las filas comparten orden) -----
CSV_COLUMNS = [
    "action", "timestamp",
    "interface", "page", "step", "progress_pct",
    "user_id", "session_id",
    "email", "password", "pwd_salt", "pwd_algo",
    "label", "position", "value",
    "extra", "user_agent", "ip",
]

def _row_with_schema(base: dict) -> dict:
    """Rellena vacíos y respeta el orden de columnas."""
    row = {k: "" for k in CSV_COLUMNS}
    for k, v in base.items():
        row[k] = "" if v is None else v
    return row

# ------------------------ Helpers -------------------------

def _now_str() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def _ua_ip(request: Request) -> tuple[Optional[str], Optional[str]]:
    ua = request.headers.get("user-agent")
    ip = request.client.host if request.client else None
    return ua, ip

def _mask_or_hash_password(pwd: Optional[str]) -> tuple[str, Optional[str], Optional[str]]:
    """
    Devuelve (stored_value, salt, algo) según flags de config:
      - MASK_PASSWORDS → "******"
      - HASH_PASSWORDS → sha256(salt+pwd)
      - ninguno → pwd en claro (DEMO)
    """
    if pwd is None:
        return "", None, None
    if config.MASK_PASSWORDS:
        return "******", None, "masked"
    if config.HASH_PASSWORDS:
        salt = secrets.token_hex(8)
        h = hashlib.sha256()
        h.update((salt + str(pwd)).encode("utf-8"))
        return h.hexdigest(), salt, "sha256(salt+pwd)"
    # DEMO: texto plano
    return str(pwd), None, "plaintext"

# ------------------------ ENDPOINTS ------------------------

@router.post("/login")
async def login(request: Request, payload: dict):
    """
    Registra intento de login (no autentica).
    Body:
    {
      "email": "user@dominio.com",
      "password": "secreta",
      "success": true,
      "method": "password",
      "session_id": "s123",
      "user_id": "u123",
      "extra": {...}
    }
    """
    email = str(payload.get("email") or "").strip()
    password = payload.get("password")
    success = payload.get("success")
    method = (payload.get("method") or "password").strip()
    session_id = payload.get("session_id") or ""
    user_id = payload.get("user_id") or ""

    ua, ip = _ua_ip(request)
    stored_pwd, salt, algo = _mask_or_hash_password(password)

    base = {
        "action": "login",
        "timestamp": _now_str(),
        "email": email,
        "password": stored_pwd,
        "pwd_salt": salt or "",
        "pwd_algo": algo or "",
        "user_id": user_id,
        "session_id": session_id,
        # guardamos success/method dentro de extra para no proliferar columnas
        "extra": json.dumps(
            {"success": success, "method": method, **(payload.get("extra") or {})},
            ensure_ascii=False
        ),
        "user_agent": ua,
        "ip": ip,
    }
    row = _row_with_schema(base)
    append_row_csv(config.NAV_CSV, row)
    return JSONResponse({"ok": True})

@router.post("/visit")
async def visit(request: Request, payload: dict):
    """
    Body:
    {
      "interface": "AT",             # requerido
      "page": "/dashboard/step-2",   # requerido
      "step": 2,                     # opcional
      "progress_pct": 66.7,          # opcional
      "user_id": "u123",             # opcional
      "session_id": "s123",          # opcional
      "extra": {...}                 # opcional
    }
    """
    interface = str(payload.get("interface") or "").strip()
    page = str(payload.get("page") or "").strip()
    if not interface or not page:
        raise HTTPException(status_code=400, detail="interface y page son requeridos")

    ua, ip = _ua_ip(request)
    base = {
        "action": "visit",
        "timestamp": _now_str(),
        "interface": interface,
        "page": page,
        "step": payload.get("step"),
        "progress_pct": payload.get("progress_pct"),
        "user_id": payload.get("user_id") or "",
        "session_id": payload.get("session_id") or "",
        "extra": json.dumps(payload.get("extra") or {}, ensure_ascii=False),
        "user_agent": ua,
        "ip": ip,
    }
    row = _row_with_schema(base)
    append_row_csv(config.NAV_CSV, row)
    return JSONResponse({"ok": True})

@router.post("/mark")
async def mark(request: Request, payload: dict):
    """
    Body:
    {
      "interface": "AT",             # requerido
      "label": "favorito",           # requerido
      "position": "left",            # opcional
      "value": true,                 # opcional
      "user_id": "u123",             # opcional
      "session_id": "s123",          # opcional
      "extra": {...}                 # opcional
    }
    """
    interface = str(payload.get("interface") or "").strip()
    label = str(payload.get("label") or "").strip()
    if not interface or not label:
        raise HTTPException(status_code=400, detail="interface y label son requeridos")

    ua, ip = _ua_ip(request)
    base = {
        "action": "mark",
        "timestamp": _now_str(),
        "interface": interface,
        "label": label,
        "position": payload.get("position"),
        "value": payload.get("value"),
        "user_id": payload.get("user_id") or "",
        "session_id": payload.get("session_id") or "",
        "extra": json.dumps(payload.get("extra") or {}, ensure_ascii=False),
        "user_agent": ua,
        "ip": ip,
    }
    row = _row_with_schema(base)
    append_row_csv(config.NAV_CSV, row)
    return JSONResponse({"ok": True})

@router.get("/trail")
async def trail(
    interface: Optional[str] = Query(default=None),
    email: Optional[str] = Query(default=None),
    user_id: Optional[str] = Query(default=None),
    session_id: Optional[str] = Query(default=None),
):
    """
    Devuelve eventos ordenados por tiempo y último 'visit'.
    Filtros opcionales: interface, email, user_id, session_id
    """
    p = Path(config.NAV_CSV)
    if not p.exists():
        return {"ok": True, "events": [], "last": None}

    df = pd.read_csv(p, dtype=str, keep_default_na=False)

    if "timestamp" in df.columns:
        df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
        df = df.sort_values("timestamp")

    # filtros
    if interface:
        df = df[df.get("interface", "") == interface]
    if email:
        df = df[df.get("email", "") == email]
    if user_id:
        df = df[df.get("user_id", "") == user_id]
    if session_id:
        df = df[df.get("session_id", "") == session_id]

    if df.empty:
        return {"ok": True, "events": [], "last": None}

    events = df.fillna("").to_dict(orient="records")

    last = None
    for _, r in df.iterrows():
        if r.get("action") == "visit":
            last = {
                "page": r.get("page"),
                "step": r.get("step"),
                "progress_pct": r.get("progress_pct"),
                "timestamp": str(r.get("timestamp")),
            }

    return {"ok": True, "events": events, "last": last}
