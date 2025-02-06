"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";

import { logoutAction } from "./action.logout";

export const LogoutButton = () => {
  const [_, formAction, pending] = useActionState(logoutAction, null);

  return (
    <form action={formAction}>
      <Button variant="default" className=" w-full" disabled={pending}>
        Logout
      </Button>
    </form>
  );
};
