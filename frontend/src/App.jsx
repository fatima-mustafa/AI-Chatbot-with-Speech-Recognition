import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Avatar from "./components/Avatar";
import TalkButton from "./components/Talk";
import ChatUI from "./components/Chat";
import "./App.css";

const socket = io("http://localhost:5000");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    function loadVoices() {
      const voicesList = window.speechSynthesis.getVoices();
      setVoices(voicesList);
    }

    // Some browsers may not have voices immediately
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Try loading immediately as well

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setMessages((prev) => [...prev, { sender: "You", text }]);
      socket.emit("chat message", text);
    };
  };

  useEffect(() => {
    const handleBotReply = (reply) => {
      setMessages((prev) => [...prev, { sender: "AI", text: reply }]);
      speak(reply);
    };

    socket.on("bot reply", handleBotReply);

    // Cleanup function to remove the listener
    return () => {
      socket.off("bot reply", handleBotReply);
    };
  }, []);

  // Get all voices and select a female one
  function getFemaleVoice() {
    const voices = window.speechSynthesis.getVoices();
    // Try to get your preferred voice by name, fallback to others if not found
    return (
      voices.find(voice => voice.name === "Microsoft Zira - English (United States)") ||
      voices.find(voice => voice.name === "Google US English") ||
      voices.find(voice => voice.name === "Google UK English Female") ||
      voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')) ||
      voices[0] // fallback
    );
  }

  // Speak the text using the selected voice
  function speak(text) {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.voice = getFemaleVoice();
    utterance.rate = 1.1; // adjust as desired
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="center-container">
      <Avatar isSpeaking={isSpeaking} />
      <TalkButton onClick={startListening} />
      <ChatUI messages={messages} />
    </div>
  );
}
