"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateProfile(_state: unknown, formData: FormData) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const profile_image = formData.get("profile_image") as File;

  if (profile_image.size > 0) {
    const maxSize = 100 * 1024;

    if (profile_image.size > maxSize) {
      return {
        status: "error",
        message: "Ukuran file tidak boleh melebihi 100KB",
      };
    }

    const imageFormData = new FormData();
    imageFormData.append("file", profile_image);

    const imageResponse = await fetch(`${process.env.API_URL}/profile/image`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageFormData,
    });

    if (!imageResponse.ok) {
      return {
        status: "error",
        message: "Gagal upload gambar",
      };
    }
  }

  const response = await fetch(`${process.env.API_URL}/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      first_name,
      last_name,
    }),
  });

  await response.json();

  redirect("/dashboard/profile");
}
