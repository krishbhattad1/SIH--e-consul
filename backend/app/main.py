from fastapi import FastAPI
from app.db import comments_collection
from app.sentiment import classify
from fastapi import UploadFile, File
import csv, io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.get("/")
def root():
    return{"Message" : "Welcome to fastapi"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/analyze")
def analyze_comments():
    comments = list(comments_collection.find({}, {"_id": 0}))
    comments = [c for c in comments if c.get("text")]  # skip any bad/incomplete documents
    results = [{**c, "sentiment": classify(c["text"])} for c in comments]
    counts = {"positive": 0, "negative": 0, "neutral": 0}
    for r in results:
        counts[r["sentiment"]] += 1 
    return {"total": len(results), "counts": counts, "comments": results}



@app.post("/analyze-upload")
async def analyze_upload(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = contents.decode("utf-8")
        reader = csv.DictReader(io.StringIO(text))
        comments = [row for row in reader if row.get("text")]

        if comments:
            comments_collection.insert_many([dict(c) for c in comments])  # insert copies

        results = [{**c, "sentiment": classify(c["text"])} for c in comments]  # original list, still clean
        counts = {"positive": 0, "negative": 0, "neutral": 0}
        for r in results:
            counts[r["sentiment"]] += 1

        return {"total": len(results), "counts": counts, "comments": results}
    except Exception as e:
        return {"error": str(e)}