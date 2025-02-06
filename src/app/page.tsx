import { redirect } from "next/navigation";

import serverAuth from "@/lib/server-auth";

export default async function Home() {
  const authorization = await serverAuth();

  if (!authorization) {
    redirect("/login");
  }

  redirect("/dashboard");
}
