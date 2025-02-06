"use client";

import { Banknote } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { transactionAction } from "./action.post-transaction";

interface CompBuyProps {
  service_code: string;
  service_tariff: number;
}

export const CompBuy: React.FC<CompBuyProps> = ({ service_tariff, service_code }) => {
  const [state, formAction] = useActionState(transactionAction, {
    status: "",
    message: "",
  });

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="service_code" defaultValue={service_code} />
      <div className="relative">
        <Banknote className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={22} />
        <Input defaultValue={service_tariff} type="number" placeholder="Masukkan nominal Top Up" className="w-full pl-11" disabled />
      </div>
      <Button className="w-full">Bayar</Button>
      {state?.status === "error" && <p className="text-red-500">{state.message}</p>}
      {state?.status === "success" && <p className="text-green-500">{state.message}</p>}{" "}
    </form>
  );
};
