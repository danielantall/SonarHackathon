from flask import Flask, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv
from flask_cors import CORS
from sonar_voice_therapy import SonarVoiceTherapyAssistant
import requests
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
API_KEY = os.getenv("SONAR_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please ensure SONAR_API_KEY is set in your .env file.")

client = OpenAI(api_key=API_KEY, base_url="https://api.perplexity.ai")

@app.route('/api/dailyprompt', methods=['POST'])
def perplexity_chat():
    data = request.json
    
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant that generates unique journal prompts"
                "which help the user reflect introspectively on their life experiences, feelings, and current things which bother them."
                "respond with only the journal prompt, and it must be under 175 characters."
            ),
        },
        {
            "role": "user",
            "content": "Generate a journal prompt for today based on the user's previous entries and current mood",
        },
    ]

    try:
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        # Extract the assistant's reply
        reply = response.choices[0].message.content
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/morningguidance', methods=['POST'])
def morning_guidance():
    data = request.json
    
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant that provides morning guidance to help the user start their day positively."
                "respond with only the guidance, and it must be under 400 characters. The final sentence should be about a specific action the user should consider doing today"
            ),
        },
        {
            "role": "user",
            "content": "Provide morning guidance for today based on the user's previous entries and current mood",
        },
    ]

    try:
        response = client.chat.completions.create(
            model="sonar-pro",
            messages=messages,
        )
        # Extract the assistant's reply
        reply = response.choices[0].message.content
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


import requests

@app.route('/api/tts', methods=['POST'])
def tts_endpoint():
    data = request.json
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        return jsonify({"error": "No ElevenLabs API key found"}), 500

    # ElevenLabs API endpoint and voice_id (replace with your preferred voice)
    voice_id = "Xb7hH8MSUJpSbSDYk0k2"  # Default ElevenLabs voice
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }
    payload = {
        "text": text,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        # Return audio as a file/stream
        return response.content, 200, {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "inline; filename=output.mp3"
        }
    else:
        return jsonify({"error": response.text}), response.status_code


assistant = SonarVoiceTherapyAssistant(API_KEY)

@app.route('/api/journal', methods=['POST'])
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
