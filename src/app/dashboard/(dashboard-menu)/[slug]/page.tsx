import Image from "next/image";
import React from "react";

import { Service } from "@/types/services";

import { getServices } from "../../(action)/action.get-services";
import { CompBuy } from "./comp.buy";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const dataServices = await getServices();

  const findService = dataServices?.data.find((service: Service) => service.service_code === params.slug);

  if (!findService) {
    throw new Error(`Service dengan kode ${params.slug} tidak ditemukan`);
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-gray-600">PemBayaran</h4>
          <div className="flex items-center gap-3">
            <div className="rounded-lg">
              <Image src={findService.service_icon} alt={findService.service_name} width={34} height={34} className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold">{findService.service_name}</h4>
          </div>
        </div>

        <CompBuy service_tariff={findService.service_tariff} service_code={findService.service_code} />
      </div>
    </section>
  );
}
