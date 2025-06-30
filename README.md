#🤖 Gemini AI Chatbot in HTML CSS & JavaScript

A modern, responsive chatbot built using HTML, CSS, and JavaScript — powered by Google's Gemini 2.0 Flash API. Includes voice input support, typing indicators, and clean UX.

## 🚀 Live Demo

👉 

---

## 🛠 Features

- ✅ Gemini 2.0 Flash API integration
- ✅ Voice-to-text input (SpeechRecognition)
- ✅ Typing indicator & smooth message animation
- ✅ Scroll-to-bottom and clear chat
- ✅ Mobile responsive layout
- ✅ Modern UI with Font Awesome icons

---

## 📁 Project Structure

gemini-chatbot/
├── index.html # Main HTML layout
├── style.css # Responsive and modern UI styles
├── index.js # All chatbot logic (message flow, API call, voice)
└── README.md # Project info and instructions

---

## 🧠 How It Works

- When the user sends a message, it's shown in the chat.
- The Gemini 2.0 API is called via a POST request with the prompt.
- The bot response is parsed and added to the chat.
- Voice input is handled using the Web Speech API.

---

## 🔐 API Key Setup

To use the Gemini API, get your API key from [Google AI Studio](https://makersuite.google.com/) and replace it in index.js:

```js
const API_KEY = "your_API_KEY";

🧪 Tested On
✅ Chrome (Desktop + Android)
✅ Edge
✅ Firefox (partial voice support)
❌ Safari (voice input not supported)

License
This project is open-source under the MIT License.

Copyrights @ 2025 Sura Tejaswani
