import certifi
import pandas as pd
from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score
import warnings
warnings.filterwarnings('ignore')

class SimplePetMatcherClassifier:
    def __init__(self):
        self.label_encoders = {}
        self.model = RandomForestClassifier(random_state=42)
        self.model_trained = False
        self.feature_cols = []

    def load_labeled_data(self, df):
        df = df.copy()
        df = df.dropna(subset=['Match_Type'])
        df['Match_Type'] = df['Match_Type'].map({'correct': 1, 'incorrect': 0})
        return df

    def preprocess_features(self, df):
        selected_cols = [
            'Species', 'Breed', 'Age', 'Weight', 'Sex',
            'Adopter_Housing_Type', 'Adopter_Allergies',
            'Adopter_Activity_Level', 'Adopter_Size_Pref', 
            'Adopter_Age_Min', 'Adopter_Age_Max', 'Adopter_Animal_Pref'
        ]

        df = df[selected_cols + ['Match_Type']].copy()

        for col in selected_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le

        self.feature_cols = selected_cols
        X = df[selected_cols]
        y = df['Match_Type']
        return X, y

    def train_model(self, df):
        df = self.load_labeled_data(df)
        X, y = self.preprocess_features(df)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        self.model_trained = True

    def predict_match(self, pets_df, adopter_info):
        df = pets_df.copy()
        df = df[['Animal_ID', 'Species', 'Breed', 'Age', 'Weight', 'Sex']].copy()

        # Rules 1: Pet Preference
        preferred_species = adopter_info.get('Adopter_Animal_Pref')
        if preferred_species:
            df = df[df['Species'].str.lower() == preferred_species.lower()]

        # Add adopter preferences to each pet row
        for key, value in adopter_info.items():
            df[key] = value

        # Encode all features
        for col in self.feature_cols:
            le = self.label_encoders.get(col)
            if le:
                df[col] = df[col].astype(str)
                df[col] = df[col].apply(lambda x: le.transform([x])[0] if x in le.classes_ else 0)

        X = df[self.feature_cols]
        probs = self.model.predict_proba(X)[:, 1]  # class 1 = correct match
        results = list(zip(df['Animal_ID'], (probs * 100).round(2)))
        return results


if __name__ == "__main__":
    pet_url = "mongodb+srv://khoacode1305:0opVku5gamFs8WmZ@cluster0.2w7bffk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(pet_url, tls=True, tlsCAFile=certifi.where())
    db = client['test']
    collection = db['pets']
    pets = list(collection.find())
    client.close()

    # Convert to DataFrame
    df_pets = pd.DataFrame(pets)
    df_pets = df_pets.rename(columns={
        'animal_id': 'Animal_ID',
        'species': 'Species',
        'breed': 'Breed',
        'age': 'Age',
        'weight': 'Weight',
        'sex': 'Sex'
    })
    print("df_pets.columns:", df_pets.columns.tolist())
    

    # Load labeled training data
    df_labeled = pd.read_csv("https://raw.githubusercontent.com/2025-Arizona-Opportunity-Hack-Summer/Devilware-SequoiaHumaneSociety/refs/heads/main/Data.csv")  # or GitHub raw CSV

    # Train classifier
    matcher = SimplePetMatcherClassifier()
    matcher.train_model(df_labeled)

    # Define adopter input (replace with actual form inputs)
    adopter_info = {
        'Adopter_Housing_Type': 'apartment',
        'Adopter_Allergies': 'yes',
        'Adopter_Activity_Level': 'moderate',
        'Adopter_Size_Pref': 'medium',
        'Adopter_Age_Min': 0,
        'Adopter_Age_Max': 6,
        'Adopter_Animal_Pref': 'dog'
    }
    
    # Predict match %
    results = matcher.predict_match(df_pets, adopter_info)

    # Print top 5 matches
    print("\nTop Pet Matches:")
    for pet_id, match_percent in sorted(results, key=lambda x: x[1], reverse=True)[:5]:
        print(f"Pet {pet_id}: {match_percent}% match")

