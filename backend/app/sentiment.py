import os
from google import genai

gemini_client = genai.Client()

def classify(text: str) -> str:
    """
    Classifies sentiment into 'support', 'concern', or 'neutral' using Gemini, 
    handling translation and sentiment context natively.
    """
    prompt = (
        "Analyze the sentiment of the following citizen feedback (which may be in English, Hindi, or Marathi). "
        "Classify it into exactly one of these three words: 'support', 'concern', or 'neutral'. "
        "Output only the single word.\n\n"
        f"Feedback: {text}"
    )
    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        result = response.text.strip().lower()
        if "support" in result:
            return "support"
        elif "concern" in result or "negative" in result:
            return "concern"
        else:
            return "neutral"
    except Exception as e:
        print(f"Gemini sentiment classification failed: {e}")
        return "neutral"