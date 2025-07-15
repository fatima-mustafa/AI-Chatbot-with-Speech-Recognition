# AI-Chatbot-with-Speech-Recognition

Inspired by https://www.smashingmagazine.com/2017/08/ai-chatbot-web-speech-api-node-js/

A full-stack AI-powered chatbot application with a React frontend and Node.js backend, integrating with the Ollama API for conversational AI and browser-based text-to-speech.

## Features
- Conversational AI using Ollama API
- Modern React frontend with chat UI
- Voice output using browser's SpeechSynthesis API (selects high-quality female voice if available)
- Loading animation while waiting for AI response
- Easy to run locally

## Project Structure
```
AI_Chatbot/
  backend/      # Node.js/Express backend server
  frontend/     # React frontend app
```

## Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-repo-url>
cd AI_Chatbot
```

### 2. Backend Setup
```
cd backend
npm install
# Start the backend server
npm start
```

### 3. Frontend Setup
Open a new terminal:
```
cd frontend
npm install
# Start the React app
npm run dev
```

### 4. Environment Variables
- If you use any API keys or secrets, create a `.env` file in the appropriate directory (not committed to git).

## Usage
- Open your browser at the URL shown in the frontend terminal (usually `http://localhost:5173`)
- Type your message and interact with the AI chatbot
- Listen to responses spoken in a natural female voice (if available)

## Customization
- To change the voice, edit the `getFemaleVoice` function in `frontend/src/App.jsx`.
- To connect to a different AI API, modify the backend API call in `backend/server.js`.

## License
MIT 