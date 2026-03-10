"use client";

export default function PinDisplay({ pin, maxLength = 4 }) {
  // Determine an array of elements where each denotes if a dot is filled or not
  const circles = Array.from({ length: maxLength }, (_, i) => i < pin.length);

  return (
    <div className="flex justify-center space-x-6 md:space-x-8 my-8 md:my-10">
      {circles.map((isFilled, index) => (
        <div 
          key={index}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-[3px] transition-all duration-300 ${
            isFilled 
              ? 'bg-blue-700 border-blue-700 scale-110 shadow-md' 
              : 'bg-transparent border-blue-300 scale-100'
          }`}
        ></div>
      ))}
    </div>
  );
}
