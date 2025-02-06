"use server";

export async function registerAction(_state: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  if (password !== confirm_password) {
    return {
      status: "error",
      message: "Password tidak sama",
      data: {
        email,
        first_name,
        last_name,
      },
    };
  }

  const res = await fetch(`${process.env.API_URL}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, first_name, last_name, password }),
  });

  const data = (await res.json()) as { message: string };

  if (!res.ok) {
    return {
      message: data.message,
      token: "",
      status: "error",
      data: {
        email,
        first_name,
        last_name,
      },
    };
  }

  return {
    status: "success",
    message: data.message,
  };
}
