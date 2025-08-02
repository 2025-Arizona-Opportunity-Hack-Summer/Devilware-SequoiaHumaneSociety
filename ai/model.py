# model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.preprocessing import LabelEncoder

# This file holds the "blueprint" for your model.
class SimplePetMatcherClassifier:
    def __init__(self):
        self.label_encoders = {}
        self.model = RandomForestClassifier(random_state=42)
        self.feature_cols = []

    def _prepare_training_data(self, df):
        df = df.dropna(subset=["Match_Type"]).copy()
        df["Match_Type"] = df["Match_Type"].map({"correct": 1, "incorrect": 0})
        cols = ["Species","Breed","Age","Weight","Sex","Adopter_Housing_Type","Adopter_Allergies","Adopter_Activity_Level","Adopter_Size_Pref","Adopter_Age_Min","Adopter_Age_Max","Adopter_Animal_Pref"]
        df = df[cols + ["Match_Type"]]
        for col in cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le
        self.feature_cols = cols
        return df[cols], df["Match_Type"]

    def train(self, labeled_df):
        X, y = self._prepare_training_data(labeled_df)
        X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
        param_grid = {"n_estimators": [50, 100, 200],"max_depth": [None, 10, 20, 30],"min_samples_split": [2, 5, 10],"min_samples_leaf": [1, 2, 4]}
        gs = GridSearchCV(self.model, param_grid, cv=3, n_jobs=1, scoring="accuracy")
        gs.fit(X_tr, y_tr)
        self.model = RandomForestClassifier(**gs.best_params_, random_state=42)
        self.model.fit(X_tr, y_tr)
        print("Best hyperparameters:", gs.best_params_)

    def predict(self, pets_df, adopter_info, top_k=5):
        df = pets_df[["Animal_ID", "Species", "Breed", "Age", "Weight", "Sex"]].copy()
        pref = adopter_info.get("Adopter_Animal_Pref", "")
        if pref:
            df = df[df["Species"].str.lower() == pref.lower()]
        for k, v in adopter_info.items():
            df[k] = v
        for col in self.feature_cols:
            if col in df.columns:
                le = self.label_encoders[col]
                df[col] = df[col].astype(str).apply(lambda x: le.transform([x])[0] if x in le.classes_ else 0)
        probs = self.model.predict_proba(df[self.feature_cols])[:, 1] * 100
        df["match%"] = probs.round(2)
        df = df.sort_values("match%", ascending=False).head(top_k)
        return list(zip(df["Animal_ID"], df["match%"]))