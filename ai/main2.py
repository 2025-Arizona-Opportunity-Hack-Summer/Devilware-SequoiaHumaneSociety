import os
import joblib
import certifi
import pandas as pd
from flask import Flask, request, jsonify
from pymongo import MongoClient
from model import SimplePetMatcherClassifier

# Helper: convert matchQuestions to flat adopter_info

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

# Helper: find the first doc with matchQuestions

def fetch_adopter_doc(db):
    for coll_name in db.list_collection_names():
        doc = db[coll_name].find_one({"matchQuestions": {"$exists": True}})
        if doc:
            return doc
    raise RuntimeError("No document with 'matchQuestions' found.")

# App setup
app = Flask(__name__)

# Load the trained classifier once at startup
env_model_path = os.getenv("MODEL_PATH", "model.joblib")
_model: SimplePetMatcherClassifier = joblib.load(env_model_path)

# MongoDB connection
db_uri ="mongodb+srv://khoacode1305:0opVku5gamFs8WmZ@cluster0.2w7bffk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(db_uri, tls=True, tlsCAFile=certifi.where())
db = client.get_default_database()  # uses database in URI or 'test'

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/matchmaker")
def predict():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Missing or invalid JSON body"}), 400
    # 1) Fetch adopter and build preferences
    adopter_doc = fetch_adopter_doc(db)
  
    mq = {
        "a1": data["a1"],
        "a3": data["a3"],
        "p1": ["Dog"],
        "p2": data["p2"],
        "p3": data["p3"],
        "p4": data["p4"]
    }
    print(data["a1"])
    print(mq.get("p1", ""))
    adopter_info = build_adopter_info_from_match_questions(
        mq
    )

    # 2) Load all pets into DataFrame
    pets = list(db["pets"].find())
    df_pets = pd.DataFrame(pets).rename(columns={
        "animal_id": "Animal_ID", "species": "Species",
        "breed": "Breed", "age": "Age",
        "weight": "Weight", "sex": "Sex"
    })

    # 3) Generate top-15 matches
    matches = _model.predict(
        pets_df=df_pets,
        adopter_info=adopter_info,
        top_k=15
    )
    return jsonify({"predictions": matches})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
