"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundGradient from "@/components/BackgroundGradient";
import PinDisplay from "@/components/PinDisplay";
import PinKeypad from "@/components/PinKeypad";

export default function PinEntryPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      setPin(prev => prev + digit);
      setErrorMsg("");
    }
  };

  const handleClear = () => {
    setPin(""); 
    setErrorMsg("");
  };

  const handleCancel = () => {
    router.push('/auth');
  };

  const handleEnter = async () => {
    if (pin.length === 4) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
        const response = await fetch("http://localhost:8000/auth/pin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ card_number: storedUser.card_number, pin })
        });
        const data = await response.json();
        
        if (data.status === "success") {
          localStorage.setItem("authenticatedUser", JSON.stringify({ user_id: data.user_id, name: data.name }));
          router.push('/language');
        } else {
          setErrorMsg(data.detail || "Invalid PIN");
          setPin("");
        }
      } catch (err) {
        setErrorMsg("Failed to verify PIN");
        setPin("");
      }
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">
      <BackgroundGradient>
        <div className="flex-1 flex flex-col items-center justify-center z-10 px-4 md:px-6 w-full max-w-3xl py-4 mt-6">
          <div className="text-center mb-2 space-y-1">
            <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
              Enter Your PIN
            </h1>
            <p className="text-lg md:text-xl font-light text-blue-800/90">
              Please enter your 4-digit PIN
            </p>
          </div>

          {errorMsg && <p className="text-red-500 font-semibold mb-2">{errorMsg}</p>}

          <PinDisplay pin={pin} maxLength={4} />

          <PinKeypad 
            onKeyPress={handleKeyPress}
            onClear={handleClear}
            onCancel={handleCancel}
            onEnter={handleEnter}
            isEnterEnabled={pin.length === 4}
          />
        </div>
      </BackgroundGradient>
    </main>
  );
}
