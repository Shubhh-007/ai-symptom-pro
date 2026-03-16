# SymptoAI Pro - AI-Powered Health Diagnosis

An intelligent symptom analysis system that uses machine learning to provide quick health insights. Built with React, TypeScript, and a Random Forest classifier trained on medical datasets.

## Features

- **41 Diseases Detection**: Identifies common health conditions from symptom analysis
- **95 Symptom Analysis**: Comprehensive symptom input with intelligent matching
- **94% Accuracy**: Machine learning model trained on extensive medical datasets
- **Real-time Predictions**: Instant health insights with confidence scores
- **Personalized Guidance**: Health tips, diet suggestions, lifestyle advice, and preventive measures for each disease
- **Beautiful UI**: Modern, responsive interface with dark mode support

### Try These Example Symptoms!

Here are a few quick symptom combinations from our dataset that you can test to see how the model responds:

**1. Predicts: Malaria (High Confidence)**
- `chills`
- `vomiting`
- `high_fever`
- `sweating`
- `headache`
- `nausea`
- `muscle_pain`

**2. Predicts: Jaundice (High Confidence)**
- `itching`
- `vomiting`
- `fatigue`
- `weight_loss`
- `high_fever`
- `yellowish_skin`
- `dark_urine`
- `abdominal_pain`

**3. Predicts: Heart attack (High Confidence)**
- `vomiting`
- `breathlessness`
- `sweating`

**4. Predicts: Hypertension (High Confidence)**
- `headache`
- `chest_pain`
- `dizziness`

**5. Predicts: Pneumonia (High Confidence)**
- `chills`
- `fatigue`
- `cough`

## Getting Started

### Prerequisites

- Node.js 16+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Python 3.8+ (for the ML API backend)

### Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ai-health-advisor-main
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Set up Python backend:**
   ```bash
   # Create virtual environment (optional but recommended)
   python -m venv .venv
   
   # Windows
   .venv\Scripts\activate
   
   # macOS/Linux
   source .venv/bin/activate
   
   # Install dependencies
   pip install -r backend/requirements.txt
   ```

### Running the Application

**Terminal 1 - Start the ML API backend:**
```bash
npm run start:api
```
This launches the Flask server on `http://localhost:5000`

**Terminal 2 - Start the frontend development server:**
```bash
npm run dev
```
Visit `http://localhost:8080` in your browser

## Technologies Used

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, shadcn-ui
- **Visualization**: Recharts for confidence charts
- **Backend**: Flask, Flask-CORS
- **ML Model**: scikit-learn Random Forest Classifier
- **Data Processing**: NumPy, Joblib

## Project Structure

```
ai-health-advisor-main/
├── src/
│   ├── components/          # React components
│   ├── data/               # Symptoms, diseases, and feature definitions
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx             # Main app component
├── backend/
│   ├── app.py              # Flask API with ML model
│   └── requirements.txt     # Python dependencies
├── public/                  # Static assets
└── vite.config.ts          # Vite configuration
```

## Machine Learning Model

The AI engine uses a Random Forest classifier trained on medical symptom data:

- **Model File**: `disease_model (1).pkl`
- **Feature Names**: `feature_names.pkl`
- **Training Data**: Multiple CSV datasets with symptom-disease correlations
- **Output**: Disease classification with confidence probability

The backend API (`backend/app.py`) handles:
- Model loading and prediction
- Symptom normalization
- Confidence rounding
- Disease name mapping
- CORS for frontend communication

## API Endpoints

### POST `/predict`

Accepts symptom names and returns disease prediction.

**Request:**
```json
{
  "symptoms": ["high_fever", "cough", "headache"]
}
```

### Try These Example Symptoms!

Here are a few quick symptom combinations from our dataset that you can test to see how the model responds:

**1. Predicts: Heart attack (High Confidence)**
- `vomiting`
- `breathlessness`
- `sweating`

**2. Predicts: Hypertension (High Confidence)**
- `headache`
- `chest_pain`
- `dizziness`

**3. Predicts: Pneumonia (High Confidence)**
- `chills`
- `fatigue`
- `cough`

**4. Predicts: Arthritis (High Confidence)**
- `muscle_weakness`
- `stiff_neck`
- `swelling_joints`

**Response:**
```json
{
  "disease": "Common Cold",
  "confidence": 89,
  "symptoms": ["high_fever", "cough"]
}




## Development

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

### Code Quality

```bash
npm run lint
```

## Deployment

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, or any static hosting:

```bash
npm run build
# Deploy the `dist` folder
```

### Backend Deployment

Deploy the Flask backend to Heroku, Railway, or any Python-compatible platform. Remember to:

1. Set environment variables (if needed)
2. Configure the startup command: `python backend/app.py`
3. Ensure model files (`disease_model (1).pkl`, `feature_names.pkl`) are included

## Project Author

- **SHUBH GUPTA**
  - GitHub: [Shubhh-007](https://github.com/Shubhh-007)
  - LinkedIn: [shubhh-gupta](https://www.linkedin.com/in/shubhh-gupta/)

First Machine Learning Project - 2025

## Disclaimer

**⚠️ Medical Disclaimer**: This application is for educational and informational purposes only. It should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for medical concerns.

## License

MIT

---

For questions or contributions, feel free to reach out via GitHub or LinkedIn.


