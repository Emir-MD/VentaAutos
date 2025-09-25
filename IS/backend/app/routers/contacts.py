"""Importa el Excel de contactos y envía correos (sin DB).

- Baraja contactos (shuffle).
- Envía uno por uno (send_email_pm) con pausa `pace_seconds` (5s por defecto).
- Permite `limit` para mandar solo N correos.
- Evita repetir si ya existen en sent.csv (skip_already_sent).
- Loguea cada envío exitoso en sent.csv / sent.xlsx (incluye el stream usado).
"""

from pathlib import Path
from datetime import datetime
import time
import pandas as pd
import logging
from fastapi import APIRouter, HTTPException, Query

from ..config import get_settings
from ..utils import generate_token
from ..emailer import send_email_pm, render_templates
from ..log_io import append_row_logs, get_sent_emails

router = APIRouter(prefix="/contacts", tags=["contacts"])
settings = get_settings()

# Logging consola
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

@router.post("/import-and-send")
def import_and_send(
    subject: str = "Acceso a portal",
    limit: int | None = Query(default=None, ge=1, description="Máximo de correos a enviar en esta ejecución"),
    pace_seconds: float = Query(default=5.0, ge=0.0, description="Segundos de espera entre envíos"),
    shuffle: bool = Query(default=True, description="Aleatorizar el orden de los contactos"),
    skip_already_sent: bool = Query(default=True, description="Saltar correos ya enviados (según sent.csv)"),
):
    # 1) Leer Excel de entrada
    path = Path(settings.INPUT_EXCEL)
    if not path.exists():
        raise HTTPException(status_code=400, detail=f"No existe INPUT_EXCEL: {path}")
    logger.info(f"Leyendo contactos desde {path}")

    df = pd.read_excel(path)
    df.columns = [c.lower().strip() for c in df.columns]
    required = {"id", "nombre", "correo"}
    if not required.issubset(set(df.columns)):
        raise HTTPException(status_code=400, detail="El Excel debe tener columnas: id, nombre, correo")

    # 2) Aleatorio (opcional)
    if shuffle:
        df = df.sample(frac=1).reset_index(drop=True)
    total_contactos = len(df)
    logger.info(f"Se encontraron {total_contactos} contactos. Aleatorio={shuffle}. Límite={limit or 'sin límite'}.")

    # 3) Set de ya enviados (para reanudar sin duplicar)
    already = get_sent_emails(settings.SENT_CSV) if skip_already_sent else set()
    if skip_already_sent:
        logger.info(f"Se saltarán {len(already)} correos ya enviados previamente (según sent.csv).")

    enviados, errores = 0, []

    # 4) Enviar uno por uno respetando pace_seconds
    for _, row in df.iterrows():
        contact_id = str(row["id"])
        nombre = str(row["nombre"])
        correo = str(row["correo"]).strip()

        # Saltar si ya fue enviado antes
        if skip_already_sent and correo.lower() in already:
            logger.info(f"⏭️  Ya enviado antes: {nombre} <{correo}>")
            continue

        # Respetar límite (si se indicó)
        if limit is not None and enviados >= limit:
            break

        # Token y link único
        token = generate_token()
        link = f"{settings.BACKEND_BASE_URL}/t/{token}"
        html, text = render_templates(nombre, link)

        try:
            # Enviar
            send_email_pm(correo, subject, html, text)
            enviados += 1

            # Log solo si se envió OK (CSV + Excel)
            sent_row = {
                "id": contact_id,
                "nombre": nombre,
                "correo": correo,
                "token": token,
                "stream": settings.POSTMARK_MESSAGE_STREAM,  # para saber en qué stream se mandó
                "sent_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
            append_row_logs(settings.SENT_CSV, settings.SENT_EXCEL, sent_row)
            logger.info(f"✅ Enviado a {nombre} <{correo}> (token {token[:8]}..., stream {settings.POSTMARK_MESSAGE_STREAM})")

        except Exception as e:
            msg = str(e)
            errores.append({"to": correo, "error": msg})
            logger.error(f"❌ Error al enviar a {correo}: {msg}")

        # Pausa entre envíos (pace)
        if pace_seconds and pace_seconds > 0:
            time.sleep(pace_seconds)

    logger.info(f"Resumen: OK={enviados}, errores={len(errores)}")
    return {
        "requested": total_contactos,
        "ok": enviados,
        "failed": len(errores),
        "errors": errores,
    }
