"use client";

import { useRouter } from 'next/navigation';
import LogoHeader from '@/components/LogoHeader';
import TapIndicator from '@/components/TapIndicator';
import BackgroundGradient from '@/components/BackgroundGradient';

export default function HomePage() {
  const router = useRouter();

  const handleScreenTap = () => {
    router.push('/auth');
  };

  return (
    <main 
      className="relative min-h-screen w-full cursor-pointer select-none overflow-hidden"
      onClick={handleScreenTap}
      role="button"
      tabIndex={0}
      aria-label="Tap anywhere on the screen to continue"
    >
      <BackgroundGradient>
        {/* Header */}
        <div className="w-full z-10">
          <LogoHeader />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 text-center transform transition duration-500 hover:scale-[1.01]">
          <div className="space-y-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
              Welcome to SmartBank
            </h1>
            <p className="text-2xl md:text-4xl text-blue-800/90 font-light mt-4">
              Powered by <strong className="font-bold text-blue-700">ARIA</strong> &mdash; Your AI Banking Assistant
            </p>
          </div>
        </div>

        {/* Bottom Content / Tap Indicator */}
        <div className="w-full z-10 flex flex-col items-center pb-12">
          <TapIndicator />
          <p className="mt-8 text-sm font-semibold text-blue-900/50 uppercase tracking-[0.2em]">
            Secure Self-Service Banking
          </p>
        </div>
      </BackgroundGradient>
    </main>
  );
}
