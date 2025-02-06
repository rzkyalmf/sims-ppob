"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { BaseResponse } from "@/types/base-response";

export async function transactionAction(_state: unknown, formData: FormData) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const service_code = formData.get("service_code") as string;

  const res = await fetch(`${process.env.API_URL}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ service_code }),
  });

  const data = (await res.json()) as BaseResponse;

  if (!res.ok) {
    return {
      status: "error",
      message: data.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    status: "success",
    message: data.message,
  };
}
