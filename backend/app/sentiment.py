import re

POS_WORDS = {"good","great","support","supportive","welcome","appreciate","helpful",
             "positive","beneficial","excellent","fair","clear","transparent",
             "progressive","needed","glad","happy","effective","strong","commendable",
             "useful","balanced","trust","nice"}
NEG_WORDS = {"bad","against","oppose","unfair","burden","confusing","harmful",
             "concerned","worried","poor","weak","unclear","excessive","costly",
             "complicated","disappointed","fails","fail","problematic","vague",
             "delay","delayed","unnecessary","hurt","struggle","tight","bankrupt"}

def tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z']+", text.lower())

def classify(text: str) -> str:
    words = tokenize(text )
    pos = sum(1 for w in words if w in POS_WORDS)
    neg = sum(1 for w in words if w in NEG_WORDS)
    if pos == neg:
        return "neutral"
    return "positive" if pos > neg else "negative"