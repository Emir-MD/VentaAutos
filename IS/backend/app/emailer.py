"""Envío de correos con Postmark (uno por uno) + plantillas.

- `send_email_pm` manda un solo correo (lo usamos para pacear cada N segundos).
- `render_templates` arma los cuerpos HTML/TXT con el nombre y el link único.
"""
from postmarker.core import PostmarkClient
from .config import get_settings

settings = get_settings()

# ---------------- Plantillas simples ----------------
HTML_TEMPLATE = """
<html>
  <body>
    <p>Hola {{nombre}},</p>
    <p>Por favor ingresa a tu portal desde el siguiente enlace:</p>
    <p><a href="{{link}}">Acceder</a></p>
    <p>Si el botón no funciona, copia y pega este link: {{link}}</p>
  </body>
</html>
"""

TEXT_TEMPLATE = (
    "Hola {nombre},\n\n"
    "Por favor ingresa a tu portal desde el siguiente enlace: {link}\n\n"
)

def render_templates(nombre: str, link: str) -> tuple[str, str]:
    """Inyecta nombre y link en las plantillas."""
    html = HTML_TEMPLATE.replace("{{nombre}}", nombre).replace("{{link}}", link)
    text = TEXT_TEMPLATE.format(nombre=nombre, link=link)
    return html, text

# --------------- Cliente Postmark -------------------
def _client() -> PostmarkClient:
    """Devuelve un cliente autenticado con tu Server Token."""
    return PostmarkClient(server_token=settings.POSTMARK_SERVER_TOKEN)

def send_email_pm(to_email: str, subject: str, html_body: str, text_body: str) -> None:
    """Envía un correo individual vía Postmark en el stream configurado."""
    pm = _client()
    resp = pm.emails.send(
        From=settings.FROM_EMAIL,                 # remitente verificado en Postmark
        To=to_email,                              # destinatario
        Subject=subject,                          # asunto
        HtmlBody=html_body,                       # cuerpo HTML
        TextBody=text_body,                       # cuerpo texto
        MessageStream=settings.POSTMARK_MESSAGE_STREAM,  # 'broadcast' o 'outbound'
        TrackOpens=False,                         # tracking por link, no píxel
    )
    # Log ligero para depurar (MessageID ayuda a ubicarlo en Activity)
    print(f"[Postmark] Sent to {to_email}, MessageID={resp.get('MessageID')}")
