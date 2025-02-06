"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { BaseResponse } from "@/types/base-response";

export async function topUpAction(_state: unknown, formData: FormData) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const top_up_amount = formData.get("top_up_amount") as string;

  console.log(top_up_amount);

  if (Number(top_up_amount) > 1000000) {
    return {
      status: "error",
      message: "Maksimal top up Rp 1.000.000",
    };
  }

  const res = await fetch(`${process.env.API_URL}/topup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ top_up_amount }),
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
