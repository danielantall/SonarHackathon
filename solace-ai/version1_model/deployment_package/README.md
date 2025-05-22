# Sonar Voice Therapy Assistant

This package contains optimized prompts and code for a voice therapy assistant using the Perplexity Sonar API.

## Features

- **Emotion Detection**: Automatically detects user emotions and adjusts responses
- **Severity Assessment**: Evaluates the severity of voice concerns
- **Optimized Prompts**: System messages tailored to different emotions and severity levels
- **Multiple Strategies**: Supports different prompt engineering strategies

## Files

- `optimized_prompts.json`: Contains system prompts optimized for different emotion and severity combinations
- `few_shot_examples.json`: Contains example interactions for few-shot learning
- `sonar_voice_therapy.py`: Implementation of the voice therapy assistant

## Usage

1. Replace `<YOUR_SONAR_API_KEY>` in the script with your actual API key
2. Import and instantiate the `SonarVoiceTherapyAssistant` class
3. Use the `get_response` method to interact with the assistant

```python
from sonar_voice_therapy import SonarVoiceTherapyAssistant

assistant = SonarVoiceTherapyAssistant("your_api_key")
response = assistant.get_response("My voice feels strained after teaching all day.", strategy="emotion_severity")
print(response)
```

## Available Strategies

- `base`: Simple system message without tailoring
- `emotion_only`: Tailored to detected emotion
- `severity_only`: Tailored to detected severity
- `emotion_severity`: Tailored to both emotion and severity (recommended)
- `few_shot`: Includes a relevant example before the user query

## Integration

This assistant can be easily integrated into:
- Web applications (using Flask, FastAPI, etc.)
- Mobile apps (through API calls)
- Voice interfaces (by connecting to speech-to-text and text-to-speech services)

