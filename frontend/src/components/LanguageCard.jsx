"use client";

import { useRouter } from "next/navigation";

export default function LanguageCard({ language, nativeName, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[2rem] p-6 shadow-md border-2 border-blue-100 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 group select-none w-full h-40 md:h-48 active:scale-[0.98] active:bg-blue-50"
      role="button"
      tabIndex={0}
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors mb-2">
        {nativeName}
      </h3>
      {language !== nativeName && (
        <p className="text-lg md:text-xl font-medium text-blue-600/70 uppercase tracking-widest mt-1">
          {language}
        </p>
      )}
    </div>
  );
}
