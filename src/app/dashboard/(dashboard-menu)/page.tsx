import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getBanner } from "@/app/dashboard/(action)/action.get-banner";
import { getServices } from "@/app/dashboard/(action)/action.get-services";

export default async function Page() {
  const dataServices = await getServices();
  const services = dataServices?.data;

  const dataBanner = await getBanner();
  const banners = dataBanner?.data;

  if (!banners || !services) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* services */}
        <div className="grid grid-cols-12 gap-4">
          {services.map((service) => (
            <div
              key={service.service_code}
              className="flex flex-col cursor-pointer items-center space-y-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Link href={`/dashboard/${service.service_code}`} className="contents">
                <div className="rounded-lg bg-gray-100">
                  <Image src={service.service_icon} alt={service.service_name} width={64} height={64} className="w-13 h-13" />
                </div>
                <p className="text-xs text-gray-600 text-center pt-2">{service.service_name}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* banner */}
        <div className="space-y-6">
          <h4 className="font-bold">Temukan promo menarik</h4>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
            {banners.map((banner, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={banner.banner_image}
                  alt={banner.banner_name}
                  width={300}
                  height={100}
                  className="object-cover w-[300px] h-full rounded-xl"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
