# AI Symptom Pro

**AI Symptom Pro** is an AI-based symptom checker with remedies and precautions. It uses machine learning to provide quick health insights based on the symptoms you provide, detecting multiple common diseases with high accuracy.

## Features

- **Symptom Analysis**: Comprehensive symptom input with intelligent matching.
- **Real-time Predictions**: Instant medical condition insights using a trained machine learning model.
- **Targeted Advice**: Get personalized health tips, diet suggestions, remedies, and preventive measures for each detected disease.
- **Beautiful UI**: Modern, responsive interface with intuitive design and dark mode support.
- **Secure & Fast**: Powered by a lightweight Flask backend API and a modern React frontend framework.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python, Flask, Flask-CORS
- **Machine Learning**: scikit-learn (Random Forest Classifier), NumPy, Pandas
- **Database / Storage**: Local file system (CSV datasets / serialized models)

## Setup Instructions

### Prerequisites
- Node.js 16+
- Python 3.8+ 

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ai-health-advisor-main
   ```

2. **Frontend Setup:**
   ```bash
   npm install
   ```

3. **Backend Setup:**
   ```bash
   # Create a virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r backend/requirements.txt
   # (If your python requirements are in the root directory, run: pip install -r requirements.txt)
   ```

### Running the Application

1. **Start the ML Backend:**
   ```bash
   npm run start:api
   # Or run manually: python backend/app.py
   ```
   The Flask server will typically start on `http://localhost:5000`.

2. **Start the Frontend:**
   ```bash
   npm run dev
   ```
   Visit the URL provided in your terminal in your browser (usually `http://localhost:8080` or `http://localhost:5173`).

## Project Author

- **SHUBH GUPTA**
  - GitHub: [Shubhh-007](https://github.com/Shubhh-007)

## Disclaimer

**⚠️ Medical Disclaimer**: This application is for educational and informational purposes only. It should NOT be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for medical concerns.

## License

MIT License
