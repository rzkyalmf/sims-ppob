"use client";
import { Banknote } from "lucide-react";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { topUpAction } from "./action.post-topup";

const NOMINAL_OPTIONS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function Page() {
  const [nominal, setNominal] = useState("");
  const [state, formAction] = useActionState(topUpAction, {
    status: "",
    message: "",
  });

  return (
    <section className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-1">
          <h4 className="text-gray-600 tracking-normal">Silahkan masukan</h4>
          <h2 className="font-semibold tracking-tight">Nominal Top Up</h2>
        </div>

        <form action={formAction}>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="space-y-6">
              <div className="relative">
                <Banknote className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={22} />
                <Input
                  type="number"
                  name="top_up_amount"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Masukkan nominal Top Up"
                  className="w-full pl-11"
                />
              </div>

              <Button className="w-full">Top Up</Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {NOMINAL_OPTIONS.map((value) => (
                <Button key={value} type="button" variant="outline" onClick={() => setNominal(value.toString())}>
                  Rp{value.toLocaleString("id")}
                </Button>
              ))}
            </div>
          </div>
          {state?.status === "error" && <p className="text-red-500 pt-3">{state.message}</p>}
          {state?.status === "success" && <p className="text-green-500 pt-3">{state.message}</p>}
        </form>
      </div>
    </section>
  );
}
