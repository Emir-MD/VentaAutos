# Uso rápido (sin DB)

1) Instala deps
   python -m venv .venv
   source .venv/bin/activate    # Windows: .venv\Scripts\activate
   pip install -r requirements.txt

2) Copia .env.example a .env y completa:
   POSTMARK_SERVER_TOKEN, FROM_EMAIL, FRONT_LOGIN_URL

3) Coloca tu Excel de entrada en data/contacts.xlsx con columnas:
   id, nombre, correo

4) Inicia
   uvicorn app.main:app --reload --port 8000

5) Dispara el envío
   POST http://localhost:8000/contacts/import-and-send

   => Se crean/actualizan logs:
      logs/sent.csv/.xlsx
      logs/opens.csv/.xlsx
      logs/registrations.csv/.xlsx

6) El enlace en el correo abre GET /t/{token}:
   - registra apertura (opens.*)
   - redirige a FRONT_LOGIN_URL?token=...

7) Tu frontend llama POST /register con:
   { "token": "...", "nombre": "...", "correo": "..." }
   => registra en registrations.* (aunque el usuario no ponga datos, la apertura ya quedó)

Notas:
- Envío por lotes Postmark (500 máximo por request).
- Logs duplicados en CSV y Excel para compatibilidad.
- Si quieres paginar o consultar, abre los CSV en cualquier analizador.
