"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { currencyFormat } from "@/lib/currency-format";

interface CompDashboardProps {
  name: string;
  balance: number;
  profile_image: string;
}

export const CompDashboard: React.FC<CompDashboardProps> = ({ name, balance, profile_image }) => {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <section className="mx-auto max-w-7xl py-6 pt-10">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={profile_image.endsWith("/null") ? "/profile.png" : profile_image}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="text-gray-600 tracking-normal">Selamat datang,</h4>
            <h2 className="font-semibold tracking-tight">{name}</h2>
          </div>
        </div>

        <div className="bg-red-500 rounded-2xl p-10  text-white">
          <h4 className=" mb-2">Saldo anda</h4>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-bold ">{showBalance ? currencyFormat(balance) : "Rp •••••••"}</h2>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            Lihat Saldo
            {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
};
