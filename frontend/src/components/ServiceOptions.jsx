export default function ServiceOptions({ onSelect }) {
  const options = [
    "Check Balance",
    "Mini Statement",
    "Loans",
    "Card Services",
    "Other Help"
  ];

  return (
    <div className="w-full max-w-[95%] mx-auto px-2 mt-6 z-10">
      <div className="flex flex-nowrap overflow-x-auto pb-4 gap-3 md:gap-4 justify-start xl:justify-center items-center snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option)}
            className="flex-shrink-0 whitespace-nowrap snap-center bg-white border-2 border-blue-200 text-blue-800 rounded-full px-5 md:px-8 py-3 md:py-4 text-base md:text-xl font-bold shadow-sm hover:shadow-md hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all duration-200 select-none"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
