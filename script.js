// API Configuration
const API_KEY = "AIzaSyBlTH0qhHyKSDHuEbcv8YTjLugccpQUsDw";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}";

// DOM Elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messagesinput");
const voiceBtn = document.getElementById("voicebtn");
const scrollBtn = document.getElementById("scrollBtn");

function addMessage(message, isUser = false) {
    const msg = document.createElement("div");
    msg.classList.add("messages", isUser ? "user-message" : "bot-message");
    msg.textContent = message;
    messagesDiv.appendChild(msg);
    scrollToBottom();
    updateScrollButton();
}

function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.id = "typing";
    typingDiv.classList.add("typing-indicator");
    typingDiv.textContent = "Typing...";
    messagesDiv.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById("typing");
    if (typingDiv) {
        messagesDiv.removeChild(typingDiv);
    }
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    messageInput.value = "";
    showTypingIndicator();

    try {
        const response = await callGeminiAPI(message);
        removeTypingIndicator();
        addMessage(response);
    } catch (error) {
        removeTypingIndicator();
        addMessage("Oops! Something went wrong: ${error.message}");
    }
}

async function callGeminiAPI(message) {
    const requestBody = {
        contents: [
            {
                parts: [{ text: message }]
            }
        ]
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error("API request failed");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onerror = (event) => {
        addMessage("Voice input failed: ${event.error}");
        voiceBtn.classList.remove("recording");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        messageInput.value = transcript;
    };

    recognition.onend = () => {
        voiceBtn.classList.remove("recording");
    };

    recognition.start();
    voiceBtn.classList.add("recording");
}

function clearChat() {
    messagesDiv.innerHTML = "";
    scrollBtn.style.display = "none";
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateScrollButton() {
    const isScrolledToBottom = messagesDiv.scrollHeight - messagesDiv.scrollTop - messagesDiv.clientHeight < 1;
    scrollBtn.style.display = isScrolledToBottom ? "none" : "flex";
}

// Event Listeners
messagesDiv.addEventListener("scroll", updateScrollButton);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
voiceBtn.addEventListener("click", startVoiceRecognition);
scrollBtn.addEventListener("click", scrollToBottom);