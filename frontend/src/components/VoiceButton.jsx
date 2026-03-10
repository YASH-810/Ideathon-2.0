"use client";

import { useState } from "react";

export default function VoiceButton({ onVoiceInput }) {
  const [isListening, setIsListening] = useState(false);

  const handlePress = () => {
    if (isListening) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim() !== "") {
        onVoiceInput(transcript);
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  return (
    <button 
      onClick={handlePress}
      disabled={isListening}
      className={`relative flex items-center justify-center bg-white rounded-full pl-6 pr-8 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-blue-100 transition-all duration-300 select-none group focus:outline-none w-full max-w-sm mx-auto ${
        isListening 
          ? 'scale-[1.02] shadow-blue-400/40 border-blue-400' 
          : 'hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl active:scale-[0.98]'
      }`}
    >
      {/* Pulsing indicator if listening */}
      {isListening && (
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-30"></div>
      )}
      
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 z-10 shadow-inner ${
        isListening ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
      }`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Microphone Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </div>
      
      <span className="text-xl font-extrabold text-blue-900 z-10">
        {isListening ? "ARIA Listening..." : "Speak with ARIA"}
      </span>
    </button>
  );
}
