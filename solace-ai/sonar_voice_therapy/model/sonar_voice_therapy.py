
import requests
import json


"""
    Voice therapy assistant using the Sonar API with optimized prompts. 
"""
class SonarVoiceTherapyAssistant:

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.perplexity.ai"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        # Load optimized prompts
        with open("optimized_prompts.json", "r") as f:
            self.prompts = json.load(f)

        # Load few-shot examples
        with open("few_shot_examples.json", "r") as f:
            self.few_shot_examples = json.load(f)

        print("Sonar Voice Therapy Assistant initialized")

    def detect_emotion_and_severity(self, text):
        """
        Detect emotion and severity from text.
        """
        if not text:
            return "neutral", "low"

        text = text.lower()

        # Simple keyword matching for emotions
        emotion_keywords = {
            "anxiety": ["anxious", "worry", "nervous", "panic", "stress", "tense", "uneasy"],
            "sadness": ["sad", "depressed", "unhappy", "miserable", "down", "blue", "grief"],
            "frustration": ["frustrated", "annoyed", "irritated", "angry", "upset", "mad"],
            "hope": ["hope", "optimistic", "better", "improve", "progress", "positive"],
            "fear": ["afraid", "scared", "terrified", "fear", "dread", "frightened"],
            "gratitude": ["thank", "grateful", "appreciate", "thankful", "blessed"],
            "neutral": []  # Default
        }

        # Count keyword matches for each emotion
        emotions = ["anxiety", "sadness", "frustration", "hope", "neutral", "fear", "gratitude"]
        emotion_scores = {emotion: 0 for emotion in emotions}

        for emotion, keywords in emotion_keywords.items():
            for keyword in keywords:
                if keyword in text:
                    emotion_scores[emotion] += 1

        # Determine dominant emotion
        dominant_emotion = max(emotion_scores.items(), key=lambda x: x[1])[0]
        if emotion_scores[dominant_emotion] == 0:
            dominant_emotion = "neutral"

        # Simple heuristic for severity
        severity_indicators = {
            "high": ["very", "extremely", "severe", "terrible", "worst", "unbearable", "always", "constantly"],
            "medium": ["quite", "moderately", "somewhat", "often", "frequently", "regularly"],
            "low": ["slightly", "mild", "occasionally", "sometimes", "a bit", "a little", "rarely"]
        }

        # Count severity indicators
        severity_levels = ["low", "medium", "high"]
        severity_scores = {level: 0 for level in severity_levels}

        for level, indicators in severity_indicators.items():
            for indicator in indicators:
                if indicator in text:
                    severity_scores[level] += 1

        # Determine severity level
        if severity_scores["high"] > 0:
            severity = "high"
        elif severity_scores["medium"] > 0:
            severity = "medium"
        else:
            severity = "low"

        return dominant_emotion, severity

    def get_response(self, user_input, strategy="emotion_severity"):
        """
        Get a response from the Sonar API using the specified prompt strategy.

        Strategies:
        - base: Simple system message
        - emotion_only: Tailored to detected emotion
        - severity_only: Tailored to detected severity
        - emotion_severity: Tailored to both emotion and severity
        - few_shot: Includes a relevant example before the user query
        """
        # Detect emotion and severity
        emotion, severity = self.detect_emotion_and_severity(user_input)
        print(f"Detected emotion: {emotion}, severity: {severity}")

        # Get the appropriate prompt key
        prompt_key = f"{emotion}_{severity}"

        # Prepare messages based on strategy
        messages = []

        if strategy == "base":
            messages.append({
                "role": "system",
                "content": "You are a helpful voice therapy assistant. Provide supportive, empathetic responses to users seeking help with voice-related concerns."
            })
        elif strategy == "emotion_only":
            messages.append({
                "role": "system",
                "content": self.prompts[f"{emotion}_medium"]["system_message"]
            })
        elif strategy == "severity_only":
            messages.append({
                "role": "system",
                "content": self.prompts[f"neutral_{severity}"]["system_message"]
            })
        elif strategy == "emotion_severity":
            messages.append({
                "role": "system",
                "content": self.prompts[prompt_key]["system_message"]
            })
        elif strategy == "few_shot":
            messages.append({
                "role": "system",
                "content": self.prompts[prompt_key]["system_message"]
            })

            # Add few-shot example if available
            if prompt_key in self.few_shot_examples:
                few_shot = self.few_shot_examples[prompt_key]
                if few_shot["input"] != "No example available for this combination":
                    messages.append({
                        "role": "user",
                        "content": few_shot["input"]
                    })
                    messages.append({
                        "role": "assistant",
                        "content": few_shot["output"]
                    })
        else:
            # Default to emotion_severity
            messages.append({
                "role": "system",
                "content": self.prompts[prompt_key]["system_message"]
            })

        # Add user input
        messages.append({
            "role": "user",
            "content": user_input
        })

        # Prepare request
        url = f"{self.base_url}/chat/completions"
        payload = {
            "model": "sonar",
            "messages": messages
        }

        try:
            # Make API call
            response = requests.post(url, headers=self.headers, json=payload)

            if response.status_code == 200:
                response_data = response.json()
                return response_data["choices"][0]["message"]["content"]
            else:
                error_message = f"Error: {response.status_code} - {response.text}"
                print(error_message)
                return error_message

        except Exception as e:
            error_message = f"Exception: {str(e)}"
            print(error_message)
            return error_message

# Example usage
if __name__ == "__main__":
    API_KEY = my_api_key
    assistant = SonarVoiceTherapyAssistant(API_KEY)

    # Example queries
    queries = [
        "My voice feels strained after teaching all day. What can I do?",
        "I'm really worried about my upcoming presentation because my voice keeps cracking.",
        "I've been practicing the exercises you suggested and I think they're helping!",
        "My throat hurts so badly when I try to sing. Is this normal?"
    ]

    # Test with different strategies
    strategies = ["base", "emotion_only", "severity_only", "emotion_severity", "few_shot"]

    for query in queries:
        print(f"\nQuery: {query}")

        for strategy in strategies:
            print(f"\nStrategy: {strategy}")
            response = assistant.get_response(query, strategy)
            print(f"Response: {response[:200]}..." if len(response) > 200 else f"Response: {response}")
