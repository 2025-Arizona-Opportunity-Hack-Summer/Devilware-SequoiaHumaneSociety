import os
import joblib
import certifi
import pandas as pd
from flask import Flask, request, jsonify
from pymongo import MongoClient
from model import SimplePetMatcherClassifier

# Helper: convert matchQuestions to flat adopter_info

def build_adopter_info_from_match_questions(data: dict) -> dict:
    def _to_int(val, default):
        try:
            return int(val)
        except (TypeError, ValueError):
            return default

    return {
        "Adopter_Housing_Type": data.get("a1", "").lower(),
        "Adopter_Allergies": "yes" if data.get("a3") else "no",
        "Adopter_Activity_Level": data.get("p4", [""])[0].lower(),
        "Adopter_Size_Pref": data.get("p3", [""])[0].lower(),
        "Adopter_Age_Min": _to_int(data.get("p2", {}).get("fromAge", ""), 0),
        "Adopter_Age_Max": _to_int(data.get("p2", {}).get("toAge", ""), 999),
        "Adopter_Animal_Pref": data.get("p1", [""])[0].lower()
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
db_uri = os.getenv("MONGO_URI")
client = MongoClient(db_uri, tls=True, tlsCAFile=certifi.where())
db = client.get_default_database()  # uses database in URI or 'test'

@app.get("/health")
def health():
    data = request.get_json(silent=True)
    if data is None:
        return "No value"
    return data

@app.get("/predict")
def predict():
    # 1. Get adopter data from request
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Missing or invalid JSON body"}), 400

    # 2. Build adopter info dict
    try:
        adopter_info = build_adopter_info_from_match_questions(data)
    except Exception as e:
        return jsonify({"error": f"Failed to parse adopter info: {str(e)}"}), 400

    print("✅ Adopter info:", adopter_info)

    # 3. Fetch pet documents from DB
    pets = list(db["pets"].find())
    if not pets:
        return jsonify({"error": "No pets found in the database"}), 500

    # 4. Build pet DataFrame
    df_pets = pd.DataFrame(pets).rename(columns={
        "animal_id": "Animal_ID",
        "species":   "Species",
        "breed":     "Breed",
        "age":       "Age",
        "weight":    "Weight",
        "sex":       "Sex",
        "active_level":"Active Level"
    })

    if df_pets.empty:
        return jsonify({"error": "Pet DataFrame is empty"}), 500

    # 5. Check if all model-required features are present
    # print(_model.feature_cols)
    # print(df_pets.columns)
    # missing_cols = [col for col in _model.feature_cols if col not in df_pets.columns]
    # print(missing_cols)
    # if missing_cols:
    #     return jsonify({"error": f"Missing required columns: {missing_cols}"}), 500

    # 6. Make prediction
    print(df_pets)
    try:
        matches = _model.predict(
            pets_df=df_pets,
            adopter_info=adopter_info,
            top_k=15
        )
        return jsonify({"predictions": matches})
    except Exception as e:
        return jsonify({"error": f"Model prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
