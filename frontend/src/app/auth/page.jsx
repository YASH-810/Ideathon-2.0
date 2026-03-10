import AuthOptionCard from "@/components/AuthOptionCard";
import BackgroundGradient from "@/components/BackgroundGradient";
import LogoHeader from "@/components/LogoHeader";

export default function AuthSelectionPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">
      <BackgroundGradient>
      

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 w-full max-w-5xl pb-10 mt-12">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
              SmartBank Authentication
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-blue-800/90">
              Choose how you want to access your account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full md:px-8">
            <AuthOptionCard
              title="ATM / Debit Card"
              description="Insert your debit card and authenticate using your PIN"
              buttonLabel="Use ATM Card"
              navigateTo="/auth/pin/select-user"
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              }
            />
            
            <AuthOptionCard
              title="Account Number"
              description="Enter account number and verify with OTP"
              buttonLabel="Use Account Number"
              navigateTo="/auth/otp"
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="w-full z-10 flex flex-col items-center pb-8 mt-auto">
          <p className="text-sm font-semibold text-blue-900/50 uppercase tracking-[0.2em] mb-4">
            Secure Banking Powered by ARIA
          </p>
        </div>
      </BackgroundGradient>
    </main>
  );
}
