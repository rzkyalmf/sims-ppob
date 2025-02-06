"use server";
import { cookies } from "next/headers";

import { Banner } from "@/types/banner";
import { ListResponse } from "@/types/base-response";

export async function getBanner() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.API_URL}/banner`, {
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

  const data = (await res.json()) as ListResponse<Banner>;

  return data;
}
