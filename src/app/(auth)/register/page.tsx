"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registerAction } from "./action";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, pending] = useActionState(registerAction, {
    status: "",
    message: "",
    data: {
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image width={28} height={28} src="/favicon.ico" alt="SIMS PPOB Logo" />
          <h4 className="font-semibold">SIMS PPOB</h4>
        </div>
        <h3 className="w-[70%] tracking-normal font-bold mx-auto m-8 text-center">Lengkapi data untuk membuat akun</h3>

        <form action={formAction} className="space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="email"
              type="email"
              placeholder="Masukkan Email Anda"
              className="w-full pl-10"
              defaultValue={state.data?.email}
            />
          </div>

          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="first_name"
              type="text"
              placeholder="Nama Depan"
              className="w-full pl-10"
              defaultValue={state.data?.first_name}
            />
          </div>

          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="last_name"
              type="text"
              placeholder="Nama Belakang"
              className="w-full pl-10"
              defaultValue={state.data?.last_name}
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Buat Password"
              className="w-full pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
            <Input
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi Password"
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
              Registrasi
            </Button>
          </div>
        </form>

        {state.status === "success" && <p className="text-green-500 pt-3">{state.message}</p>}

        <div className="mt-4 font-normal text-center">
          sudah punya akun? login{" "}
          <Link className="text-red-600 font-bold" href="/login">
            disini
          </Link>
        </div>
      </div>
    </section>
  );
}
