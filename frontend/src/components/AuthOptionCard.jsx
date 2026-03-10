"use client";

import { useRouter } from "next/navigation";

export default function AuthOptionCard({ title, description, buttonLabel, navigateTo, icon }) {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(navigateTo)}
      className="bg-white rounded-3xl p-6 md:p-8 md:px-10 shadow-xl border border-blue-100 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300 group select-none h-full w-full max-w-sm md:max-w-none mx-auto"
      role="button"
      tabIndex={0}
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-3 md:mb-4">{title}</h3>
      <p className="text-lg md:text-xl text-blue-700/80 mb-8 flex-grow font-medium leading-relaxed">{description}</p>
      <button 
        className="w-full py-4 bg-blue-600 text-white rounded-2xl text-lg md:text-xl font-bold shadow-md group-hover:bg-blue-700 transition-colors uppercase tracking-wider mt-auto"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
