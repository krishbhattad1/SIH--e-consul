import json
from pathlib import Path
from typing import List,Dict

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "comments.json"

def load_comments() ->List[Dict]:
    if not DATA_FILE.exists():
        return []
    with open(DATA_FILE,"r",encoding="utf-8") as file:
        return json.load(file)


def get_all_comments() -> List[Dict]:
    return load_comments()