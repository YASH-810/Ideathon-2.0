"use client";

import { useRouter } from "next/navigation";

export default function UserCard({ name, avatarInitial, onClick }) {
  const router = useRouter();

  return (
    <div 
      onClick={onClick || (() => router.push('/auth/pin/card-swipe'))}
      className="bg-white rounded-2xl p-4 md:p-6 shadow-md border border-blue-100 flex items-center space-x-4 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 group select-none w-full"
      role="button"
      tabIndex={0}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xl md:text-2xl font-extrabold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner shrink-0">
        {avatarInitial}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">{name}</h3>
    </div>
  );
}
