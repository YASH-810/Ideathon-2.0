export default function TapIndicator() {
  return (
    <div className="flex flex-col items-center space-y-8 mt-12 mb-8 select-none">
      <div className="relative flex justify-center items-center w-24 h-24">
        {/* Pulsing rings */}
        <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-30 animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute w-14 h-14 bg-blue-500 rounded-full opacity-40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
        
        {/* Core circle */}
        <div className="absolute w-10 h-10 bg-white border-4 border-blue-600 rounded-full shadow-lg z-10 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
        
        {/* Hand/Pointer Icon - Bouncing */}
        <div className="absolute translate-y-8 translate-x-6 z-20 animate-bounce cursor-pointer">
          <svg className="w-12 h-12 text-blue-900 drop-shadow-xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
      </div>
      
      <p className="text-2xl md:text-3xl font-medium text-blue-800 animate-pulse tracking-wide">
        Tap anywhere to continue
      </p>
    </div>
  );
}
