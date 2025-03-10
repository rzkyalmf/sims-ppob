import { cookies } from "next/headers";

import { AuthPayload } from "@/types/auth";
import { SingleResponse } from "@/types/base-response";

export default async function getProfile() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const res = await fetch(`${process.env.API_URL}/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("HTTP error!");
  }

  const payload = (await res.json()) as SingleResponse<AuthPayload>;
  return payload;
}
