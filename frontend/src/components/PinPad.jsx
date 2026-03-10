import React from "react";

const PinPad = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <p>Enter Your PIN</p>
      <div className="glass-card p-10 rounded-3xl w-full max-w-sm flex flex-col items-center">
        {/* PIN Dots */}
        <div className={`flex gap-4 mb-8 h-8`}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border border-white/50 transition-colors duration-300 `}
              />
            ))}
          {/* Numpad */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", ">"].map(
              (key) => (
                <button
                  key={key}
                  //   onClick={() => handleNumpadClick(key)}
                  className={`py-4 rounded-full text-2xl font-medium transition-all active:scale-95 flex items-center justify-center
          ${
            key === ">"
              ? "bg-linear-to-r from-[#C8942A] to-[#a1741e] text-white shadow-lg"
              : key === "C"
                ? "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                : "bg-[#0B1F3A] border border-[#C8942A] text-white hover:bg-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          }`}
                >
                  {key === ">" ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  ) : (
                    key
                  )}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinPad;
