// calling backend API with js

// EXAMPLE 1

// Function to send user message and get response
async function sendMessage(message) {
  try {
    const response = await fetch('https://your-api-endpoint.com/api/therapy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        strategy: 'emotion_severity'
      } ),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: 'Failed to get response' };
  }
}

// Example usage
const userInput = document.getElementById('user-input').value;
sendMessage(userInput).then(data => {
  // Display the response
  document.getElementById('response').textContent = data.response;
  
  // Optionally use metadata for UI enhancements
  const emotion = data.metadata.emotion;
  const severity = data.metadata.severity;
  
  // Example: Change UI based on emotion
  updateUIForEmotion(emotion);
});

// Example 2 - Speech to textContent

// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

// Start listening
document.getElementById('voice-button').addEventListener('click', () => {
  recognition.start();
  document.getElementById('voice-button').classList.add('listening');
});

// Process speech result
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  document.getElementById('user-input').value = transcript;
  document.getElementById('voice-button').classList.remove('listening');
};

// Handle errors
recognition.onerror = (event) => {
  console.error('Speech recognition error', event.error);
  document.getElementById('voice-button').classList.remove('listening');
};



// Example 3 - Creating a chat interface

// Add message to chat
function addMessage(message, isUser) {
  const chatContainer = document.getElementById('chat-container');
  const messageElement = document.createElement('div');
  messageElement.className = isUser ? 'user-message' : 'assistant-message';
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle user input
document.getElementById('send-button').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input');
  const message = userInput.value.trim();
  
  if (message) {
    // Add user message to chat
    addMessage(message, true);
    userInput.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.textContent = 'Assistant is typing...';
    document.getElementById('chat-container').appendChild(typingIndicator);
    
    // Get response from API
    const data = await sendMessage(message);
    
    // Remove typing indicator
    typingIndicator.remove();
    
    // Add assistant response to chat
    addMessage(data.response, false);
    
    // Optional: Add emotion indicator
    if (data.metadata && data.metadata.emotion) {
      updateEmotionIndicator(data.metadata.emotion);
    }
  }
});
