from pathlib import Path
import json
from app.db import comments_collection

DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "comments.json"

with open(DATA_FILE) as f:
    comments = json.load(f)

comments_collection.delete_many({})
result = comments_collection.insert_many(comments)
print(f"Inserted {len(result.inserted_ids)} comments")