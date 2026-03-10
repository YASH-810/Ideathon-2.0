export default function UserMessage({ text, isVoice = false }) {
  return (
    <div className="flex w-full justify-end mb-6 animate-fade-in-up">
      <div className="bg-blue-600 text-white px-6 py-4 rounded-3xl rounded-br-sm shadow-lg max-w-[80%] md:max-w-[70%] text-lg md:text-xl font-medium leading-relaxed flex items-center space-x-3">
        {isVoice && (
          <span className="text-xl shrink-0" role="img" aria-label="voice">🎤</span>
        )}
        <span>{text}</span>
      </div>
    </div>
  );
}
