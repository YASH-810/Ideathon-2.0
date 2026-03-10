import BackgroundGradient from "@/components/BackgroundGradient";
import CardSwipeVideo from "@/components/CardSwipeVideo";
import LogoHeader from "@/components/LogoHeader";

export default function CardSwipePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none bg-blue-900">
      {/* Dark overlay specifically requested for matching dark blue gradient theme on video screen */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-blue-500 opacity-10 blur-3xl mix-blend-screen pointer-events-none"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen w-full pb-8">
        <div className="w-full pt-4 md:pt-6 opacity-60">
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center w-full px-6 md:px-12 mt-4 max-w-5xl">
          <CardSwipeVideo />
        </div>
        
        <div className="pb-4 mt-auto">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-[0.2em] opacity-60">
            Secure Banking Powered by ARIA
          </p>
        </div>
      </div>
    </main>
  );
}
