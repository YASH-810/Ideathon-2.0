"use client";

import { useState, useEffect } from "react";
import AssistantHeader from "@/components/AssistantHeader";
import ServiceOptions from "@/components/ServiceOptions";
import VoiceButton from "@/components/VoiceButton";
import ChatArea from "@/components/ChatArea";
import { getText } from "@/data/translations";

export default function AssistantPage() {
  const [isInteracting, setIsInteracting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ user_id: 1, name: "Guest" });
  const [language, setLanguage] = useState("en");
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Text-To-Speech implementation
  const speakText = (textToSpeak, langCode) => {
    if (!speechEnabled) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // clear previous talks
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    
    if (langCode === "hi") speech.lang = "hi-IN";
    else if (langCode === "mr") speech.lang = "mr-IN";
    else speech.lang = "en-US";
    
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    // Read session settings when the assistant page loads
    const storedUser = localStorage.getItem("authenticatedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedLang = localStorage.getItem("preferred_language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const sendMessage = async (messageText, isVoice = false) => {
    setIsInteracting(true);
    setMessages((prev) => [...prev, { sender: "user", text: messageText, isVoice }]);

    try {
      const response = await fetch("http://localhost:8000/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageText, 
          user_id: user.user_id,
          language: language
        })
      });
      const data = await response.json();
      
      if (data.error) {
        showToast(data.error);
        setMessages((prev) => [...prev, { sender: "ARIA", text: data.error, options: [] }]);
        speakText(data.error, language);
        return;
      }
      
      const replyData = data.reply;
      
      setMessages((prev) => [...prev, { sender: "ARIA", text: replyData, options: data.options }]);
      speakText(replyData, language);
    } catch (error) {
      console.error("Error connecting to AI:", error);
      const fallbackMsg = "AI service temporarily unavailable. Please try again.";
      showToast(fallbackMsg);
      setMessages((prev) => [...prev, { sender: "ARIA", text: fallbackMsg, options: ["Check Balance", "Main Menu"] }]);
      speakText(fallbackMsg, language);
    }
  };

  // Handles clicking a quick service chip
  const handleServiceSelect = (service) => {
    sendMessage(service, false);
  };

  // Handles resolving the voice logic input
  const handleVoiceInput = (voiceText) => {
    sendMessage(voiceText, true);
  };

  return (
    <main className="flex flex-col h-screen w-full bg-gradient-to-b from-blue-50 to-blue-100">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in font-medium max-w-sm border border-red-600">
          {toast}
        </div>
      )}

      {/* Fixed top header */}
      <AssistantHeader 
        userName={user.name} 
        language={language}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
      />

      {/* Main Content Area filling remaining space */}
      <div className="flex-1 flex flex-col w-full pt-[70px] relative">
        {!isInteracting ? (
          // ================= Initial Landing State =================
          <div className="flex-1 flex flex-col items-center justify-center w-full px-4 animate-fade-in z-10">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-tight">
                {getText(language, "welcome")}
              </h1>
              <p className="text-xl md:text-2xl font-light text-blue-800">
                {getText(language, "howCanIHelp")}
              </p>
            </div>
            
            <div className="w-full">
              <ServiceOptions onSelect={handleServiceSelect} />
            </div>
          </div>
        ) : (
          // ================= Full-Screen Chat Mode =================
          <div className="flex-1 w-full flex flex-col h-full bg-transparent z-10 relative">
            {/* The Chat Area natively scrolls and handles all inner layout */}
            <ChatArea messages={messages} onOptionClick={(opt) => sendMessage(opt, false)} />
          </div>
        )}
      </div>

      {/* Floating Global Microphone inside view bounds safely at the bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-md flex justify-center">
        <VoiceButton onVoiceInput={handleVoiceInput} />
      </div>

    </main>
  );
}
