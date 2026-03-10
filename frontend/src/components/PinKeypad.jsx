"use client";

export default function PinKeypad({ onKeyPress, onClear, onCancel, onEnter, isEnterEnabled }) {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
        {digits.map((digit) => (
          <button
            key={digit}
            onClick={() => onKeyPress(digit.toString())}
            className="h-12 md:h-16 bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-50 text-xl md:text-2xl font-extrabold text-blue-900 active:bg-blue-100 active:scale-[0.97] transition-all duration-150 flex items-center justify-center select-none hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] hover:border-blue-200"
          >
            {digit}
          </button>
        ))}
        
        {/* Bottom row wrapping the '0' digit */}
        <button
          onClick={onCancel}
          className="h-12 md:h-16 bg-red-50 rounded-2xl md:rounded-3xl shadow-sm border border-red-100 text-sm md:text-base font-bold text-red-600 active:bg-red-100 active:scale-[0.97] transition-all duration-150 flex items-center justify-center select-none hover:shadow-md"
        >
          Cancel
        </button>
        
        <button
          onClick={() => onKeyPress("0")}
          className="h-12 md:h-16 bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-blue-50 text-xl md:text-2xl font-extrabold text-blue-900 active:bg-blue-100 active:scale-[0.97] transition-all duration-150 flex items-center justify-center select-none hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] hover:border-blue-200"
        >
          0
        </button>

        <button
          onClick={onClear}
          className="h-12 md:h-16 bg-yellow-50 rounded-2xl md:rounded-3xl shadow-sm border border-yellow-100 text-sm md:text-base font-bold text-yellow-600 active:bg-yellow-100 active:scale-[0.97] transition-all duration-150 flex items-center justify-center select-none hover:shadow-md"
        >
          Clear
        </button>
      </div>

      <button
        onClick={onEnter}
        disabled={!isEnterEnabled}
        className={`w-full py-3 md:py-4 rounded-2xl md:rounded-3xl text-lg md:text-xl font-bold uppercase tracking-widest shadow-lg transition-all duration-300 ${
          isEnterEnabled 
            ? 'bg-green-600 text-white hover:bg-green-500 active:scale-[0.98] active:bg-green-700 hover:shadow-green-600/30 shadow-2xl' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-80'
        }`}
      >
        Enter
      </button>
    </div>
  );
}
