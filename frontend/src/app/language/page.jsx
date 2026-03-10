import BackgroundGradient from "@/components/BackgroundGradient";
import LogoHeader from "@/components/LogoHeader";
import LanguageGrid from "@/components/LanguageGrid";

export default function LanguageSelectionPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">
      <BackgroundGradient>
        <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 w-full max-w-5xl py-10 mt-2">
          <div className="text-center mb-8 md:mb-10 space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
              Select Your Language
            </h1>
            <p className="text-lg md:text-xl font-light text-blue-800/90">
              Choose a language to continue
            </p>
          </div>

          <LanguageGrid />
        </div>
      </BackgroundGradient>
    </main>
  );
}
