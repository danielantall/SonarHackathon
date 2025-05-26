from flask import Flask, request, jsonify
from sonar_voice_therapy import SonarVoiceTherapyAssistant
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

app = Flask(__name__)
CORS(app) 
# Load API key from environment
API_KEY = os.getenv("SONAR_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please ensure SONAR_API_KEY is set in your .env file.")

# Initialize the assistant
assistant = SonarVoiceTherapyAssistant(API_KEY)

@app.route('/api/journalentry', methods=['POST'])
def journal_endpoint():
    data = request.json
    journal_entry = data.get('entry', '')
    strategy = data.get('strategy', 'emotion_severity')

    # Detect emotion and severity
    emotion, severity = assistant.detect_emotion_and_severity(journal_entry)

    # Get response (could be feedback, summary, or supportive message)
    response = assistant.get_response(journal_entry, strategy)

    return jsonify({
        "response": response,
        "metadata": {
            "emotion": emotion,
            "severity": severity,
            "strategy": strategy,
            "entry_length": len(journal_entry),
            "response_length": len(response)
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)