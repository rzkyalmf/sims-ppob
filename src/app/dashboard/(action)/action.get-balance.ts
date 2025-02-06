"use server";

import { cookies } from "next/headers";

import { Balance } from "@/types/balance";
import { SingleResponse } from "@/types/base-response";

export async function getBalance() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.API_URL}/balance`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("HTTP error!");
  }

  const data = (await res.json()) as SingleResponse<Balance>;

  return data.data.balance;
}
