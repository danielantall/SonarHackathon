"""
Example integration of the Sonar Voice Therapy Assistant.
This shows how frontend and backend teams can call the model.
"""

import sys
import os
import json
from dotenv import load_dotenv
# Import the assistant, from /deployment_package (.py file)
from sonar_voice_therapy import SonarVoiceTherapyAssistant

#load env vars
load_dotenv()

# Add the model directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'model'))

API_KEY = os.getenv("SONAR_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please ensure SONAR_API_KEY is set in your .env file.")

# Initialize the assistant
assistant = SonarVoiceTherapyAssistant(API_KEY)

# Example of how backend can call the model
def get_therapy_response(user_input, strategy="emotion_severity"):
    """
    Backend function to get a response from the model.
    
    Args:
        user_input: The user's message
        strategy: The prompt strategy to use
        
    Returns:
        dict: Response containing the model output and metadata
    """
    # Get emotion and severity
    emotion, severity = assistant.detect_emotion_and_severity(user_input)
    
    # Get response
    response = assistant.get_response(user_input, strategy)
    
    # Return structured response for API
    return {
        "response": response,
        "metadata": {
            "emotion": emotion,
            "severity": severity,
            "strategy": strategy,
            "input_length": len(user_input),
            "response_length": len(response)
        }
    }

# Example of a simple API endpoint 
"""
@app.route('/api/therapy', methods=['POST'])
def therapy_endpoint():
    data = request.json
    user_input = data.get('message', '')
    strategy = data.get('strategy', 'emotion_severity')
    
    result = get_therapy_response(user_input, strategy)
    
    return jsonify(result)
"""

# Example usage
if __name__ == "__main__":
    # Test with a few examples
    examples = [
        "My voice feels strained after teaching all day.",
        "I'm really worried about my upcoming presentation because my voice keeps cracking.",
        "I've been practicing the exercises you suggested and I think they're helping!"
    ]
    
    for example in examples:
        result = get_therapy_response(example)
        print(f"\nUser: {example}")
        print(f"Emotion: {result['metadata']['emotion']}, Severity: {result['metadata']['severity']}")
        print(f"Response: {result['response']}")
