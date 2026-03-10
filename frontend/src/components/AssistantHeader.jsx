import { getText } from "@/data/translations";

export default function AssistantHeader({ userName = "Guest", language = "en", speechEnabled, onToggleSpeech }) {
  return (
    <div className="fixed top-0 left-0 w-full h-[70px] bg-white border-b border-gray-100 shadow-sm px-6 flex items-center justify-between z-50">
      <div className="flex items-center space-x-3 select-none">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md transform rotate-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-blue-900 tracking-tighter">
          SmartBank
        </h2>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        {onToggleSpeech && (
          <button 
            onClick={onToggleSpeech} 
            className={`px-3 py-1.5 md:hidden lg:flex rounded-full text-sm font-bold shadow-sm border transition-colors ${
              speechEnabled ? "bg-blue-100/50 border-blue-200 text-blue-700" : "bg-gray-100/50 border-gray-200 text-gray-500"
            }`}
          >
            {speechEnabled ? getText(language, "speechOn") : getText(language, "speechOff")}
          </button>
        )}

        <span className="text-base md:text-lg font-medium text-gray-700 hidden md:block">
          {getText(language, "welcomeUser")}, {userName}
        </span>
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold shadow-inner">
          {userName.charAt(0)}
        </div>
      </div>
    </div>
  );
}
