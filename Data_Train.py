import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

def train_data(): 
    # Load the data
    df = pd.read_csv('data.csv')
    print(df.head())  # Preview first few rows

    # Encode the target column (fix: use lowercase 'match')
    label_encoder_y = LabelEncoder()
    y = label_encoder_y.fit_transform(df['match'])

    # Select features (excluding 'pet_id' and 'patron_id')
    feature_cols = ['preferred_species', 'preferred_age_min', 'preferred_age_max', 
                    'preferred_weight_min', 'preferred_weight_max', 'preferred_sex',
                    'activity_level', 'temperament_preference', 'size_preference',
                    'bonded_pair_ok', 'first_time_owner', 'has_children', 
                    'living_situation']
    
    X = df[feature_cols].copy()

    # Encode categorical features
    label_encoders_x = {}
    for col in X.columns:
        if X[col].dtype == 'object':  # Only encode non-numeric columns
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col])
            label_encoders_x[col] = le

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train classifier
    clf = RandomForestClassifier(random_state=42)
    clf.fit(X_train, y_train)

    # Optional: Evaluate on test set
    y_pred = clf.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    return clf, label_encoders_x, label_encoder_y, feature_cols

def predict_top_matches(clf, label_encoders_x, label_encoder_y, feature_cols, all_pet_options, input_data, top_n=5): 
    results = []
    for pet in all_pet_options: 
        combined_input = input_data.copy()
        combined_input.update(pet)

        # Fix: correct the typo and logic for species filtering
        if input_data.get('preferred_species') and pet.get('species') != input_data.get('preferred_species'):
            continue
    
        encoded_features = []
        for col in feature_cols:
            if col in label_encoders_x:
                le = label_encoders_x[col]
                value = combined_input.get(col)
                if value is None or value not in le.classes_:
                    encoded_value = 0  
                else:
                    encoded_value = le.transform([value])[0]
            else:
                # For numeric columns
                value = combined_input.get(col, 0)
                encoded_value = value
            encoded_features.append(encoded_value)

        # Predict match probability
        prob = clf.predict_proba([encoded_features])[0]
        # Fix: handle case where 'Yes' might be encoded as 1
        if 1 in label_encoder_y.classes_:
            match_index = list(label_encoder_y.classes_).index(1)
        else:
            match_index = list(label_encoder_y.classes_).index('Yes') if 'Yes' in label_encoder_y.classes_ else 1
        match_prob = prob[match_index]

        results.append((match_prob, pet))

    # Sort and return top matches
    top_matches = sorted(results, key=lambda x: x[0], reverse=True)[:top_n]
    return top_matches

if __name__ == "__main__":
    clf, label_encoders_x, label_encoder_y, feature_cols = train_data()
    
    # Fix: Use column names that match the CSV data
    new_input = {
        'preferred_species': 'Cat',
        'preferred_age_min': 1,
        'preferred_age_max': 3,
        'preferred_weight_min': 7,
        'preferred_weight_max': 12,
        'preferred_sex': 'No_Preference',
        'activity_level': 'Low',
        'temperament_preference': 'Calm',
        'size_preference': 'Small',
        'bonded_pair_ok': 'Yes',
        'first_time_owner': 'Yes',
        'has_children': 'No',
        'living_situation': 'Apartment'
    }

    # Fix: Use meaningful pet data that matches the input format
    all_pet_options = [
        {
            'species': 'Dog',
            'preferred_species': 'Dog',
            'preferred_age_min': 2,
            'preferred_age_max': 4,
            'preferred_weight_min': 60,
            'preferred_weight_max': 80,
            'preferred_sex': 'Male',
            'activity_level': 'High',
            'temperament_preference': 'Active',
            'size_preference': 'Large',
            'bonded_pair_ok': 'No',
            'first_time_owner': 'No',
            'has_children': 'Yes',
            'living_situation': 'House_Large_Yard'
        },
        {
            'species': 'Cat',
            'preferred_species': 'Cat',
            'preferred_age_min': 1,
            'preferred_age_max': 3,
            'preferred_weight_min': 8,
            'preferred_weight_max': 12,
            'preferred_sex': 'No_Preference',
            'activity_level': 'Low',
            'temperament_preference': 'Calm',
            'size_preference': 'Small',
            'bonded_pair_ok': 'Yes',
            'first_time_owner': 'Yes',
            'has_children': 'No',
            'living_situation': 'Apartment'
        },
        {
            'species': 'Cat',
            'preferred_species': 'Cat',
            'preferred_age_min': 1,
            'preferred_age_max': 2,
            'preferred_weight_min': 8,
            'preferred_weight_max': 10,
            'preferred_sex': 'Male',
            'activity_level': 'Low',
            'temperament_preference': 'Shy',
            'size_preference': 'Small',
            'bonded_pair_ok': 'Yes',
            'first_time_owner': 'Yes',
            'has_children': 'No',
            'living_situation': 'Apartment'
        }
    ]

    # Fix: Use correct function name
    result = predict_top_matches(clf, label_encoders_x, label_encoder_y, feature_cols, all_pet_options, new_input)
    print("Top Pet Matches:")
    for score, pet in result:
        print(f"Match Score: {score*100:.2f}% | Pet Info: {pet}")