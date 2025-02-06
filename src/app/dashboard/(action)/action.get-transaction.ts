"use server";
import { cookies } from "next/headers";

import { TransactionResponse } from "@/types/transaction";

export async function getTransaction(offset = 0) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.API_URL}/transaction/history?offset=${offset.toString()}&limit=5`, {
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

  const data = (await res.json()) as TransactionResponse;

  return data;
}
