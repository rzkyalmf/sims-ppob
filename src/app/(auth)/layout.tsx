import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import serverAuth from "@/lib/server-auth";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const authorization = await serverAuth();

  if (authorization) {
    redirect("/dashboard");
  }

  return (
    <main className="grid h-screen grid-cols-2">
      <div className="flex items-center justify-center">{children}</div>

      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          <Image src="/illustration.png" alt="Illustration" fill className="object-cover" priority />
        </div>
      </div>
    </main>
  );
}
