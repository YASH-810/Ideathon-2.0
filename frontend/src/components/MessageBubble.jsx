export default function MessageBubble({ message, onOptionClick }) {
  const isARIA = message.sender === "ARIA";
  
  return (
    <div className={`flex w-full mb-6 animate-fade-in-up ${isARIA ? "justify-start" : "justify-end"}`}>
      <div className={`flex items-end max-w-[80%] md:max-w-[70%] space-x-3 ${!isARIA ? "flex-row-reverse space-x-reverse" : ""}`}>
        
        {isARIA && (
          <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        )}
        
        <div className="flex flex-col space-y-3 max-w-full">
          <div className={`px-6 py-4 rounded-3xl shadow-sm text-lg md:text-xl font-medium leading-relaxed ${
            isARIA 
              ? "bg-white border border-blue-50 text-blue-900 rounded-bl-sm" 
              : "bg-blue-600 text-white rounded-br-sm shadow-md"
          }`}>
            {message.isVoice && !isARIA && (
               <span className="text-xl shrink-0 mr-2" role="img" aria-label="voice">🎤</span>
            )}
            <span className="whitespace-pre-wrap">{message.text}</span>
          </div>
          
          {/* Options Renderer */}
          {isARIA && message.options && message.options.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {message.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => onOptionClick(option)}
                  className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-full border border-blue-200 transition-colors shadow-sm active:scale-[0.98]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
