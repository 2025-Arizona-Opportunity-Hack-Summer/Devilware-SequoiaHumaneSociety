import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score, classification_report

def train_data():

    #Load the data
    df = pd.read_csv('Matching_Info.csv')

    #Prep the data (y value, which is the value of the result)
    label_encoder_y = LabelEncoder() #Label Enconder is the tool that convert any string value to integer value since ML cant understand string 
    old_y = df['Match']
    y = label_encoder_y.fit_transform(old_y)

    #Prep the data (x value, which is the value of the independent values)
    label_encoder_x = LabelEncoder()
    old_x = df[['Owner_Personality', 'Owner_Activity_Level', 'Living_Space', 
            'Pet_Preference', 'Allergies', 'Species', 'Pet_Personality', 
            'Pet_Activity_Need', 'Pet_Size', 'Shedding']]
    label_encoders_x = {}
    for col in old_x:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders_x[col] = le

    X = df[old_x.columns]

    #Split the value into testing, and training
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 42)
    #Utilize the Classification model to train
    clf = RandomForestClassifier()
    clf.fit(X_train, y_train)

    return clf, label_encoders_x, label_encoder_y, old_x.columns.tolist()

def predict_top_matches(clf, label_encoders_x, label_encoder_y, feature_cols, all_pet_options, input_data, top_n=5):
    """
    Predict and rank top N pet matches for the given owner input.

    Parameters:
    - clf: trained classifier
    - label_encoders_x: dict of LabelEncoders for each feature
    - label_encoder_y: LabelEncoder for target (e.g., 'Yes', 'No')
    - feature_cols: list of feature column names used in training
    - all_pet_options: list of dicts, each representing a pet's features
    - input_data: owner's features (dict)
    - top_n: how many matches to return
    """

    results = []

    for pet in all_pet_options:
        combined_input = input_data.copy()
        combined_input.update(pet)

        # Filter 1: Allergy-safe
        if combined_input.get('Allergies') == 'Yes' and combined_input.get('Shedding') not in ['Low', 'None']:
            continue

        # Filter 2: Match pet preference
        if input_data.get('Pet_Preference') and combined_input.get('Species') != input_data.get('Pet_Preference'):
            continue

        # Encode features
        encoded_features = []
        for col in feature_cols:
            le = label_encoders_x[col]
            value = combined_input.get(col)
            if value not in le.classes_:
                encoded_value = 0  
            else:
                encoded_value = le.transform([value])[0]
            encoded_features.append(encoded_value)

        # Predict match probability
        prob = clf.predict_proba([encoded_features])[0]
        match_index = list(label_encoder_y.classes_).index('Yes')
        match_prob = prob[match_index]

        results.append((match_prob, pet))

    # Sort and return top matches
    top_matches = sorted(results, key=lambda x: x[0], reverse=True)[:top_n]
    return top_matches

if __name__ == "__main__":
    clf, label_encoders_x, label_encoder_y, feature_cols = train_data()

    new_input = {
        'Owner_Personality': 'Calm',
        'Owner_Activity_Level': 'Low',
        'Living_Space': 'Apartment',
        'Pet_Preference': 'Dog',
        'Allergies': 'No',
    }

    all_pet_options = [
        {'Species': 'Dog', 'Pet_Personality': 'Playful', 'Pet_Activity_Need': 'High', 'Pet_Size': 'Big', 'Shedding': 'High'},
        {'Species': 'Cat', 'Pet_Personality': 'Calm', 'Pet_Activity_Need': 'Low', 'Pet_Size': 'Big', 'Shedding': 'Low'},
        {'Species': 'Rabbit', 'Pet_Personality': 'Gentle', 'Pet_Activity_Need': 'Medium','Pet_Size': 'Big', 'Shedding': 'Low'},
        {'Species': 'Dog', 'Pet_Personality': 'Social', 'Pet_Activity_Need': 'High', 'Pet_Size': 'Big', 'Shedding': 'None'},
        {'Species': 'Hamster', 'Pet_Personality': 'Independent', 'Pet_Activity_Need': 'Medium','Pet_Size': 'Big', 'Shedding': 'Low'},
        {'Species': 'Dog', 'Pet_Personality': 'Loyal', 'Pet_Activity_Need': 'Medium','Pet_Size': 'Big', 'Shedding': 'Medium'},
        {'Species': 'Cat', 'Pet_Personality': 'Quiet', 'Pet_Activity_Need': 'Low','Pet_Size': 'Big', 'Shedding': 'None'},
    ]

    result = predict_top_matches(clf, label_encoders_x, label_encoder_y, feature_cols, all_pet_options, new_input)
    print("Top Pet Matches:")
    for score, pet in result:
        print(f"Match Score: {score*100:.2f}%| Pet Info: {pet}")