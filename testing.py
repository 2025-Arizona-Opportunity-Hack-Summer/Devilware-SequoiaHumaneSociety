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

def predict_match(clf, label_encoders_x, label_encoder_y, feature_cols, input_data):
    """
    input_data: dict, keys = feature_cols, values = input strings (same format as original CSV)
    """

    if 'Allergies' in input_data and 'Shedding' in input_data:
        if input_data['Allergies'] == 'Yes' and input_data['Shedding'] != 'Low':
            return 'No'  # Or whatever label represents "Not a Match"
        
    # Encode input features using saved label encoders
    encoded_features = []
    for col in feature_cols:
        le = label_encoders_x[col]
        value = input_data[col]
        # Handle unseen labels by assigning a default or raise error
        if value not in le.classes_:
            print(f"Warning: '{value}' not seen in training for feature '{col}'. Prediction may be inaccurate.")
            # Option 1: assign a default (e.g., first class)
            encoded_value = 0
        else:
            encoded_value = le.transform([value])[0]
        encoded_features.append(encoded_value)

    

    # Predict
    prediction_encoded = clf.predict([encoded_features])[0]
    prediction_label = label_encoder_y.inverse_transform([prediction_encoded])[0]

    return prediction_label

if __name__ == "__main__":
    clf, label_encoders_x, label_encoder_y, feature_cols = train_data()

    # Example input from user
    new_input = {
        'Owner_Personality': 'Friendly',
        'Owner_Activity_Level': 'Low',
        'Living_Space': 'Apartment',
        'Pet_Preference': 'Dog',
        'Allergies' : 'Yes',

        'Species': 'Cat',
        'Pet_Personality': 'Calm',
        'Pet_Activity_Need': 'High',
        'Pet_Size': 'Medium',
        'Shedding': 'Low'
    }

    result = predict_match(clf, label_encoders_x, label_encoder_y, feature_cols, new_input)
    print("Match result:", result)

