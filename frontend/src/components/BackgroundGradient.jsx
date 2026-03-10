export default function BackgroundGradient({ children }) {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-blue-50 to-blue-200">
      {/* Subtle decorative abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-100 opacity-60 blur-3xl"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[70%] h-[70%] rounded-full bg-blue-300 opacity-30 blur-3xl"></div>
      </div>
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-between">
        {children}
      </div>
    </div>
  );
}
