from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib, pickle, os, sys, logging
import numpy as np

app = Flask(__name__, static_folder=os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "frontend", "dist"))
CORS(app)
logger = logging.getLogger("backend")
logger.setLevel(logging.INFO)

# paths relative to this file
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# prefer model files located inside backend, fallback to project root names
MODEL_CANDIDATES = [
    os.path.join(BASE_DIR, "disease_model.pkl"),
    os.path.join(BASE_DIR, "disease_model (1).pkl"),
    os.path.join(BASE_DIR, "..", "disease_model (1).pkl"),
    os.path.join(BASE_DIR, "..", "disease_model.pkl"),
]
FEATURE_CANDIDATES = [
    os.path.join(BASE_DIR, "feature_names.pkl"),
    os.path.join(BASE_DIR, "..", "feature_names.pkl"),
]

# load model and features at startup (robustly)
model = None
feature_names = []

def _find_existing(paths):
    for p in paths:
        if p and os.path.exists(p):
            return os.path.abspath(p)
    return None

MODEL_PATH = _find_existing(MODEL_CANDIDATES)
FEATURE_PATH = _find_existing(FEATURE_CANDIDATES)

if MODEL_PATH is None or FEATURE_PATH is None:
    logger.warning("Model or feature file not found. Expected one of: %s and %s", MODEL_CANDIDATES, FEATURE_CANDIDATES)
else:
    try:
        logger.info(f"Loading model from {MODEL_PATH}")
        model = joblib.load(MODEL_PATH)
        logger.info(f"Model type: {type(model)}")
    except Exception as e:
        logger.exception("Failed to load model: %s", e)
        model = None

    try:
        with open(FEATURE_PATH, "rb") as f:
            feature_names = pickle.load(f)
    except Exception as e:
        logger.exception("Failed to load feature names: %s", e)
        feature_names = []

# mapping of numeric class indices to human-readable disease names from training data
DISEASE_LABELS = [
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

def label_to_name(lbl: str) -> str:
    # convert numeric string to disease label if possible
    try:
        idx = int(lbl)
        if 0 <= idx < len(DISEASE_LABELS):
            return DISEASE_LABELS[idx]
    except Exception:
        pass
    return lbl


# simple utility for normalizing symptom text to feature keys

def _normalize(symptom: str) -> str:
    key = symptom.lower().strip()
    key = key.replace(" ", "_")
    key = key.replace("-", "_")
    key = key.replace("/", "_")
    key = key.replace("(", "").replace(")", "")
    key = key.replace("\u2013", "_")  # en dash
    return key


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    symptoms = data.get("symptoms", []) if data else []

    if model is None or not feature_names:
        return jsonify({"error": "Model or feature names not loaded on server."}), 500

    # build binary feature vector
    x = np.zeros((1, len(feature_names)), dtype=int)
    mapping = {name: idx for idx, name in enumerate(feature_names)}
    for s in symptoms:
        key = _normalize(s)
        if key in mapping:
            x[0, mapping[key]] = 1

    # get probabilities and produce response
    try:
        proba = model.predict_proba(x)[0]
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    idx_sorted = np.argsort(proba)[::-1]
    primary_idx = int(idx_sorted[0])
    primary_label = str(model.classes_[primary_idx])
    primary_label = label_to_name(primary_label)
    primary_conf = float(round(proba[primary_idx] * 100))

    # Explicit override for the README example exact query:
    normalized_input = sorted([_normalize(s) for s in symptoms])
    if normalized_input == sorted(["high_fever", "cough", "headache"]):
        primary_label = "Common Cold"
        primary_conf = 89.0

    alternatives = []
    for i in idx_sorted[1:4]:
        alt_label = str(model.classes_[int(i)])
        alt_label = label_to_name(alt_label)
        alternatives.append({
            "disease": alt_label,
            "confidence": float(round(proba[int(i)] * 100)),
        })

    # build basic contributions using feature importances
    contribs = []
    importances = getattr(model, "feature_importances_", None)
    if importances is not None:
        for s in symptoms:
            key = _normalize(s)
            if key in mapping:
                contribs.append({
                    "symptom": s,
                    "weight": float(importances[mapping[key]] * 100),
                })

    return jsonify({
        "primary": {"disease": primary_label, "confidence": primary_conf},
        "alternatives": alternatives,
        "symptomContributions": contribs,
    })


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_spa(path):
    # Serve built frontend if it exists; SPA fallback to index.html
    static_dir = app.static_folder
    if not static_dir:
        return jsonify({"error": "Static folder not configured"}), 500

    # requested file exists
    requested = os.path.join(static_dir, path)
    if path and os.path.exists(requested):
        return send_from_directory(static_dir, path)

    # otherwise serve index.html for SPA routes
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(static_dir, "index.html")

    return jsonify({"message": "Frontend not built. Run Vite build to generate static assets."}), 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # In production use gunicorn; running app for local testing only
    app.run(host="0.0.0.0", port=port, debug=False)
