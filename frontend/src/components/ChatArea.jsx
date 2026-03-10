import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

export default function ChatArea({ messages, onOptionClick }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 pt-4 pb-28">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} onOptionClick={onOptionClick} />
        ))}
        {/* Dummy element for smooth scrolling to the bottom */}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
}
