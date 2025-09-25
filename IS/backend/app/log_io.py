from pathlib import Path
from typing import Dict
import pandas as pd

def append_row_csv(csv_path: str | Path, row: Dict) -> None:
    p = Path(csv_path)
    p.parent.mkdir(parents=True, exist_ok=True)
    df = pd.DataFrame([row])
    header = not p.exists()
    df.to_csv(p, mode="a", index=False, header=header, encoding="utf-8")
