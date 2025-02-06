import { Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/app/(auth)/(logout)/logout-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import getProfile from "../(action)/action.get-profile";

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  const name = profile.data.first_name + " " + profile.data.last_name;

  return (
    <section className="max-w-3xl mx-auto p-4 my-14">
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="h-44 w-44 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={profile.data.profile_image.endsWith("/null") ? "/profile.png" : profile.data.profile_image}
                alt="Profile"
                width={120}
                height={120}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <h2 className="font-semibold tracking-tight">{name}</h2>
        </div>

        <div className="space-y-4">
          <div className="relative space-y-2">
            <h5 className="pb-2">Email :</h5>
            <Mail className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
            <Input disabled defaultValue={profile.data.email} className="w-full pl-11" />
          </div>

          <div className="relative space-y-2">
            <h5 className="pb-2">Nama Depan :</h5>
            <User className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
            <Input disabled defaultValue={profile.data.first_name} className="w-full pl-11" />
          </div>

          <div className="relative space-y-2">
            <h5 className="pb-2">Nama Belakang :</h5>
            <User className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
            <Input disabled defaultValue={profile.data.last_name} className="w-full pl-11" />
          </div>
        </div>

        <div className="space-y-4 pt-5">
          <Link href="/dashboard/profile/edit" className="contents">
            <Button variant={"outline"} className="w-full border-red-200 hover:border-red-600 ">
              Edit Profile
            </Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}
