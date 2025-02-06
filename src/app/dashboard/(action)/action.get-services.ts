"use server";
import { cookies } from "next/headers";

import { ListResponse } from "@/types/base-response";
import { Service } from "@/types/services";

export async function getServices() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.API_URL}/services`, {
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

  const data = (await res.json()) as ListResponse<Service>;

  return data;
}
