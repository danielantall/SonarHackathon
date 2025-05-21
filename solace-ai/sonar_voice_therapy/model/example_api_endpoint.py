from flask import Flask, request, jsonify
from sonar_voice_therapy import SonarVoiceTherapyAssistant
from dotenv import load_dotenv
import os

#### EXAMPLE 0 - *RATE LIMITING to avoid API overuse if necessary*

# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address

# limiter = Limiter(
#     app,
#     key_func=get_remote_address,
#     default_limits=["5 per minute", "100 per hour"]
# )

# @app.route('/api/therapy', methods=['POST'])
# @limiter.limit("5 per minute")
# def therapy_endpoint():
#     # code here...



#### EXAMPLE 1

app = Flask(__name__)

# name the API key SONAR_API_KEY in your .env
API_KEY = os.getenv("SONAR_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please ensure SONAR_API_KEY is set in your .env file.")

# Initialize the assistant
assistant = SonarVoiceTherapyAssistant(API_KEY)

@app.route('/api/therapy', methods=['POST'])
def therapy_endpoint():
    data = request.json
    user_input = data.get('message', '')
    strategy = data.get('strategy', 'emotion_severity')
    
    # Get emotion and severity
    emotion, severity = assistant.detect_emotion_and_severity(user_input)
    
    # Get response
    response = assistant.get_response(user_input, strategy)
    
    # Return structured response
    return jsonify({
        "response": response,
        "metadata": {
            "emotion": emotion,
            "severity": severity,
            "strategy": strategy,
            "input_length": len(user_input),
            "response_length": len(response)
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

#### EXAMPLE 2

app = Flask(__name__)
API_KEY = os.getenv("SONAR_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please ensure SONAR_API_KEY is set in your .env file.")

# Initialize the assistant
assistant = SonarVoiceTherapyAssistant(API_KEY)

@app.route('/api/therapy', methods=['POST'])
def therapy_endpoint():
    data = request.json
    user_input = data.get('message', '')
    strategy = data.get('strategy', 'emotion_severity')
    
    # Get emotion and severity
    emotion, severity = assistant.detect_emotion_and_severity(user_input)
    
    # Get response
    response = assistant.get_response(user_input, strategy)
    
    # Return structured response
    return jsonify({
        "response": response,
        "metadata": {
            "emotion": emotion,
            "severity": severity,
            "strategy": strategy,
            "input_length": len(user_input),
            "response_length": len(response)
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


#### ADDING CONVO HISTORY
## may need to be chnaged or use SQL ALCHEMY

# Store conversation history in a database
def save_conversation(user_id, user_input, assistant_response, emotion, severity):
    # Example using SQLAlchemy
    conversation = Conversation(
        user_id=user_id,
        user_input=user_input,
        assistant_response=assistant_response,
        emotion=emotion,
        severity=severity,
        timestamp=datetime.now()
    )
    db.session.add(conversation)
    db.session.commit()

# Retrieve conversation history
def get_conversation_history(user_id, limit=5):
    # Example using SQLAlchemy
    return Conversation.query.filter_by(user_id=user_id).order_by(Conversation.timestamp.desc()).limit(limit).all()

