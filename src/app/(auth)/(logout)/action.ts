"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction(_state: unknown, _formData: FormData) {
  const cookieStore = cookies();

  (await cookieStore).set("token", "", {
    expires: new Date(0),
    path: "/",
  });

  redirect("/login");
}
