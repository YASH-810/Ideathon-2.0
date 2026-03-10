"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CardSwipeVideo() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    // If the video throws an error or fails to render, gracefully handle fallback timing
    let timer;
    if (isVideoError) {
      timer = setTimeout(() => {
        router.push('/auth/pin');
      }, 3500); 
    }
    return () => clearTimeout(timer);
  }, [router, isVideoError]);

  const handleVideoEnd = () => {
    router.push('/auth/pin');
  };

  const handleError = () => {
    console.log("Card swipe video not found. Rendering fallback mock spinner.");
    setIsVideoError(true);
  };

  return (
    <div className="relative w-full max-w-2xl lg:max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.5)] border-4 border-white/20 bg-blue-950 flex items-center justify-center shrink-0">
      {/* Fallback spinner placeholder if video is missing */}
      <div className={`absolute inset-0 flex items-center justify-center bg-blue-900/50 backdrop-blur-sm z-0 ${!isVideoError ? 'hidden' : ''}`}>
         <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent flex rounded-full animate-spin"></div>
      </div>
      
      {/* Video Element representing card swipe inserted in public/ folder */}
      {!isVideoError && (
        <video 
          ref={videoRef}
          src="/card-swipe.mp4" 
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd}
          onError={handleError}
          className="relative z-10 w-full h-full object-cover"
        />
      )}
    </div>
  );
}
