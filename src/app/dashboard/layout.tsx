import { redirect } from "next/navigation";

import { Header } from "@/app/dashboard/(components)/comp.header";
import serverAuth from "@/lib/server-auth";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const authorization = await serverAuth();

  if (!authorization) {
    redirect("/login");
  }

  return (
    <>
      <main>
        <Header />
        <div>{children}</div>
      </main>
    </>
  );
}
