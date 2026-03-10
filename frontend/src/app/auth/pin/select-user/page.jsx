"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/UserCard";
import BackgroundGradient from "@/components/BackgroundGradient";
import LogoHeader from "@/components/LogoHeader";

export default function SelectUserPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleUserSelect = (user) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    router.push("/auth/pin/card-swipe");
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">
      <BackgroundGradient>
        <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 w-full max-w-5xl py-4 md:py-8">
          <div className="text-center mb-8 md:mb-10 space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
              Select Account
            </h1>
            <p className="text-lg md:text-xl font-light text-blue-800/90">
              Choose your profile to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-4">
            {users.map((user, idx) => (
              <UserCard 
                key={idx} 
                name={user.name} 
                avatarInitial={user.name.charAt(0)} 
                onClick={() => handleUserSelect(user)} 
              />
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </main>
  );
}
