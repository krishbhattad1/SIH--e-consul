import os
import io
import csv
from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from google import genai
from app.db import db, comments_collection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

gemini_client = genai.Client()
modules_collection = db["modules"]

class FeedbackData(BaseModel):
    name: str
    email: str
    ruleId: str
    language: str
    feedback: str
    opinion: str

class SummaryRequest(BaseModel):
    ruleId: str

# Updated to include Description and File Name
class ModuleData(BaseModel):
    id: str
    title: str
    department: str = "Ministry of Heavy Industries"
    sector: str = "Transport"
    closingDate: str = "31 December 2026"
    description: str = "No description provided."
    fileName: str = ""

def translate_and_summarize(text: str) -> str:
    prompt = (
        "Translate the following citizen feedback into clear, professional English. "
        "If it is already in English, return it as-is. Output only the translated text.\n\n"
        f"Feedback: {text}"
    )
    try:
        response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        return response.text.strip()
    except Exception:
        return text

def classify(text: str) -> str:
    prompt = (
        "Analyze the sentiment of the following citizen feedback. "
        "Classify it into exactly one of these three words: 'support', 'concern', or 'neutral'. "
        "Output only the single word.\n\n"
        f"Feedback: {text}"
    )
    try:
        response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        result = response.text.strip().lower()
        if "support" in result: return "support"
        elif "concern" in result or "negative" in result: return "concern"
        else: return "neutral"
    except Exception:
        return "neutral"

@app.get("/modules")
def get_modules():
    custom_modules = list(modules_collection.find({}, {"_id": 0}))
    return {"modules": custom_modules}

@app.post("/modules")
def add_module(data: ModuleData):
    modules_collection.update_one(
        {"id": data.id}, 
        {"$set": data.model_dump()}, 
        upsert=True
    )
    return {"status": "success", "message": "Module added successfully"}

@app.post("/feedback")
def submit_feedback(data: FeedbackData):
    english_text = translate_and_summarize(data.feedback)
    sentiment = classify(data.feedback)
    
    document = data.model_dump()
    document["english_feedback"] = english_text
    document["computed_sentiment"] = sentiment
    
    comments_collection.insert_one(document)
    document.pop("_id", None)
    return {"status": "success", "data": document}

@app.get("/comments")
def get_comments():
    comments = list(comments_collection.find({}, {"_id": 0}))
    return {"comments": comments}

@app.post("/generate-module-summary")
def generate_summary(req: SummaryRequest):
    query = {"ruleId": req.ruleId} if req.ruleId != "all" else {}
    comments = list(comments_collection.find(query, {"_id": 0}))
    
    if not comments:
        return {"summary": "No feedback available for this section yet."}
    
    compiled_feedback = "\n".join([f"- {c.get('english_feedback', c.get('feedback'))}" for c in comments])
    prompt = (
        f"Analyze this public consultation feedback for rule/module '{req.ruleId}'. "
        f"Provide a brief executive summary and 3 key actionable takeaways.\n\nFeedback:\n{compiled_feedback}"
    )
    try:
        response = gemini_client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))