# Config simple sin .env: solo paths y flags
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]      # carpeta backend/
LOGS_DIR = Path(os.getenv("LOGS_DIR", BASE_DIR / "logs"))

# Un único CSV para todos los eventos
NAV_CSV = str(Path(os.getenv("NAV_CSV", LOGS_DIR / "analytics_events.csv")))

# DEMO: guardar contraseña en CLARO (para tu tarea)
# Si quisieras enmascarar/hashear, cambia estos flags a True.
MASK_PASSWORDS = False
HASH_PASSWORDS = False
