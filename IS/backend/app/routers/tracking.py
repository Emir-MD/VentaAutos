"""Tracking de apertura y de registro (sin DB, resuelve token desde sent.csv)."""
from datetime import datetime
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse
from ..config import get_settings
from ..log_io import append_row_logs, find_contact_by_token

router = APIRouter(tags=["tracking"])
settings = get_settings()

@router.get("/t/{token}")
async def track_open(token: str, request: Request):
    # Buscar al contacto por token en sent.csv
    sent = find_contact_by_token(settings.SENT_CSV, token)
    if sent is not None:
        ua = request.headers.get("user-agent")
        ip = request.client.host if request.client else None
        open_row = {
            "id": sent.get("id"),
            "nombre": sent.get("nombre"),
            "correo": sent.get("correo"),
            "token": token,
            "opened_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "user_agent": ua,
            "ip": ip,
        }
        append_row_logs(settings.OPENS_CSV, settings.OPENS_EXCEL, open_row)

    # Redirección al frontend de login
    url = f"{settings.FRONT_LOGIN_URL}?token={token}"
    return RedirectResponse(url=url, status_code=307)

@router.post("/register")
async def register(form: dict):
    """
    Espera JSON:
    {
      "token": "...",
      "correo": "...",   # opcional (si tu login lo recaba)
      "contrasena": "..."    # opcional
    }
    """
    token = str(form.get("token")) if form.get("token") is not None else ""
    correo = form.get("correo")
    contrasena = form.get("contrasena")

    sent = find_contact_by_token(settings.SENT_CSV, token)
    if sent is None:
        return JSONResponse({"ok": False, "message": "Token inválido"}, status_code=400)

    reg_row = {
        "id": sent.get("id"),
        "nombre": sent.get("nombre"),
        "correo": sent.get("correo"),
        "token": token,
        "submitted_name": correo,
        "submitted_email": contrasena,
        "registered_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    #append_row_logs(settingsREGS_CSV, settings.REGS_EXCEL, reg_row)  # <-- nota: settingsREGS_CSV es un typo, corrígelo a settings.REGS_CSV si pegas sin revisar
    # CORRECTO:
    append_row_logs(settings.REGS_CSV, settings.REGS_EXCEL, reg_row)

    return JSONResponse({"ok": True, "message": "Registro guardado"})
