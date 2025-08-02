import os
from pathlib import Path
from dotenv import load_dotenv

import joblib
import certifi
import pandas as pd
from flask import Flask, request, jsonify
from pymongo import MongoClient

from model import SimplePetMatcherClassifier  

# ---------- load .env ----------
load_dotenv()                                    

BASE_DIR   = Path(__file__).resolve().parent     
MODEL_PATH = (BASE_DIR / os.getenv("MODEL_PATH", "model.joblib")).resolve()
MONGO_URI  = os.getenv("MONGO_URI")             
PORT       = int(os.getenv("PORT", 8080))

# ---------- init ----------
app = Flask(__name__)
_model: SimplePetMatcherClassifier = joblib.load(MODEL_PATH)

client = MongoClient(MONGO_URI, tls=True, tlsCAFile=certifi.where())
db = client.get_default_database()

# ---------- helpers ----------
def build_adopter_info_from_match_questions(mq: dict) -> dict:
    def _to_int(val, default):
        try:
            return int(val)
        except (TypeError, ValueError):
            return default

    return {
        "Adopter_Housing_Type": mq.get("a1", "").lower(),
        "Adopter_Allergies": "yes" if mq.get("a3") else "no",
        "Adopter_Activity_Level": (mq.get("p4", [""])[0]).lower(),
        "Adopter_Size_Pref": (mq.get("p3", [""])[0]).lower(),
        "Adopter_Age_Min": _to_int(mq.get("p2", {}).get("fromAge", ""), 0),
        "Adopter_Age_Max": _to_int(mq.get("p2", {}).get("toAge", ""), 999),
        "Adopter_Animal_Pref": (mq.get("p1", [""]))[0].lower(),
    }

def fetch_adopter_doc(db):
    for coll_name in db.list_collection_names():
        doc = db[coll_name].find_one({"matchQuestions": {"$exists": True}})
        if doc:
            return doc
    raise RuntimeError("No document with 'matchQuestions' found.")

# ---------- routes ----------
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/matchmaker")
def predict():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Missing or invalid JSON body"}), 400

    # build adopter info from request payload
    mq = {
        "a1": data["a1"],
        "a3": data["a3"],
        "p1": data["p1"],             
        "p2": data["p2"],
        "p3": data["p3"],
        "p4": data["p4"]
    }
    adopter_info = build_adopter_info_from_match_questions(mq)

    # load pets collection into DataFrame
    pets = list(db["pets"].find())
    df_pets = pd.DataFrame(pets).rename(columns={
        "animal_id": "Animal_ID",
        "species": "Species",
        "breed": "Breed",
        "age": "Age",
        "weight": "Weight",
        "sex": "Sex"
    })

    # get top-15 matches
    matches = _model.predict(
        pets_df=df_pets,
        adopter_info=adopter_info,
        top_k=15
    )
    return jsonify({"predictions": matches})

# ---------- main ----------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
