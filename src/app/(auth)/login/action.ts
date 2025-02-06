"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Auth } from "@/types/auth";
import { SingleResponse } from "@/types/base-response";

export async function loginAction(_state: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as SingleResponse<Auth>;

  if (!res.ok) {
    return {
      status: "error",
      message: data.message,
      data: {
        email,
      },
    };
  }

  const cookieStore = cookies();

  (await cookieStore).set("token", data.data.token, {
    httpOnly: true,
    path: "/",
  });

  redirect("/dashboard");
}
