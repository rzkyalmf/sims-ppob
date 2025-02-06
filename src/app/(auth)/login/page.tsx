"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { loginAction } from "./action";

export default function Page() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, pending] = useActionState(loginAction, {
    status: "",
    message: "",
    data: {
      email: "",
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image width={28} height={28} src="/favicon.ico" alt="SIMS PPOB Logo" />
          <h4 className="font-semibold">SIMS PPOB</h4>
        </div>
        <h3 className="w-[70%] tracking-normal font-bold mx-auto m-8 text-center">Masuk atau buat akun untuk memulai</h3>

        <form action={formAction} className="space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="email"
              type="email"
              placeholder="Masukkan Email Anda"
              className="w-full pl-10"
              defaultValue={state.data.email}
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Masukan Password Anda"
              className="w-full pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {state.status === "error" && <p className="text-red-500">{state.message}</p>}

          <div className="pt-6">
            <Button className="w-full" variant="default" disabled={pending}>
              Masuk
            </Button>
          </div>
        </form>
        <div className="mt-4 font-normal text-center">
          belum punya akun? registrasi{" "}
          <Link className="text-red-600 font-bold" href="/register">
            disini
          </Link>
        </div>
      </div>
    </section>
  );
}
