"use client";

import { useRouter } from "next/navigation";
import LanguageCard from "./LanguageCard";

export default function LanguageGrid() {
  const router = useRouter();

  const languages = [
    { code: 'en', language: 'English', nativeName: 'English' },
    { code: 'hi', language: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'mr', language: 'Marathi', nativeName: 'मराठी' },
  ];

  const handleLanguageSelect = (langCode) => {
    // Save language to localStorage as persistence between full flow steps
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred_language", langCode);
    }
    
    // Navigate straight to the Assistant flow
    router.push("/assistant");
  };

  return (
    <div className="w-full max-w-4xl px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {languages.map((lang) => (
          <LanguageCard 
            key={lang.code}
            language={lang.language}
            nativeName={lang.nativeName}
            onClick={() => handleLanguageSelect(lang.code)}
          />
        ))}
      </div>
    </div>
  );
}
