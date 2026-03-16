import pandas as pd
import joblib, pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import numpy as np
import json
import os

df = pd.read_csv("Training.csv")

# Dropping the 'Unnamed: 133' column if it exists (common inside some kaggle datasets)
if "Unnamed: 133" in df.columns:
    df = df.drop(columns=["Unnamed: 133"])

# Separate features and target
X = df.drop(columns=["prognosis"])
y = df["prognosis"]

feature_names = X.columns.tolist()

# Define the exact same array order of diseases used in frontend to ensure class index matches frontend EXPECTATIONS
frontend_classes = [
  'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
  'Peptic ulcer diseae', 'AIDS', 'Diabetes ', 'Gastroenteritis', 'Bronchial Asthma',
  'Hypertension ', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)',
  'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
  'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis',
  'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
  'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism',
  'Hypoglycemia', 'Osteoarthristis', 'Arthritis', '(vertigo) Paroymsal  Positional Vertigo',
  'Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo'
]

# Create a mapping for prognosis text to an integer based on the frontend classes layout
class_dict = {disease: i for i, disease in enumerate(frontend_classes)}

# Filter out rows with unexpected classes, although training dataset should only have these 41. 
# Or we can just map them.
def map_label(x):
    return x if x in class_dict else x

y_mapped = y.apply(map_label)
# However, the RandomForestClassifier's `.classes_` attribute will sort the unique values of `y`.
# If we feed strings, `.classes_` will be sorted alphabetically.
# IN `app.py`, it does: `primary_label = str(model.classes_[primary_idx])`, `primary_label = label_to_name(primary_label)` 
# `label_to_name` accepts indices if numeric.
# If we feed `y` as integers, then `.classes_` will naturally be [0...40]. 
# Let's map strings to integers using `class_dict`!
y_int = y.map(class_dict)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y_int)

# Check classes
print("Classes trained:", model.classes_)
print(f"Number of features: {len(feature_names)}")

# Save to backend
joblib.dump(model, "backend/disease_model (1).pkl", compress=3)
# Save disease_model.pkl just in case
joblib.dump(model, "backend/disease_model.pkl", compress=3)

with open("backend/feature_names.pkl", "wb") as f:
    pickle.dump(feature_names, f)

# Also generate the src/data/featureNames.ts file!
ts_content = f"""// Auto-generated list of features used by the ML model.
// These names must match exactly the strings expected by the backend.

export const FEATURE_SYMPTOMS: string[] = {json.dumps(feature_names, indent=2)};
"""

with open("src/data/featureNames.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Retrained successfully!")
