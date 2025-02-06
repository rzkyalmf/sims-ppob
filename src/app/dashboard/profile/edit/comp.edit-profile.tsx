"use client";

import { Mail, Pencil, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useActionState, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { updateProfile } from "./action.update-profile";

interface Props {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
}

export const EditProfile: React.FC<Props> = ({ name, email, profile_image, first_name, last_name }) => {
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [state, formAction] = useActionState(updateProfile, {
    status: "",
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setPreview("");
      setSelectedFile(null);
      return;
    }
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function handlePencilClick() {
    fileInputRef.current?.click();
  }

  function handleSubmit(formData: FormData) {
    if (selectedFile) {
      formData.set("profile_image", selectedFile);
    }
    formAction(formData);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-44 w-44 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={preview || (profile_image.endsWith("/null") ? "/profile.png" : profile_image)}
              alt="Profile"
              width={176}
              height={176}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCreatePreview}
            name="profile_image"
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={handlePencilClick}
            className="absolute bottom-0 right-0 bg-white rounded-full hover:bg-gray-100 p-3 shadow"
          >
            <Pencil size={23} className="text-gray-500" />
          </button>
        </div>

        <h2 className="font-semibold tracking-tight">{name}</h2>
      </div>

      <div className="relative space-y-2">
        <h5 className="pb-2">Email :</h5>
        <Mail className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
        <Input disabled defaultValue={email} className="w-full pl-11" />
      </div>

      <div className="relative space-y-2">
        <h5 className="pb-2">Nama Depan :</h5>
        <User className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
        <Input required name="first_name" defaultValue={first_name} className="w-full pl-11" />
      </div>

      <div className="relative space-y-2">
        <h5 className="pb-2">Nama Belakang :</h5>
        <User className="pointer-events-none absolute left-3 top-2/3 -translate-y-1/2 transform text-gray-400" size={22} />
        <Input required name="last_name" defaultValue={last_name} className="w-full pl-11" />
      </div>

      <div className="space-y-4 pt-5">
        <Button type="submit" className="w-full border-red-200 hover:border-red-600">
          Simpan
        </Button>

        <Link href="/dashboard/profile" className="block">
          <Button type="button" variant="outline" className="w-full border-red-200 hover:border-red-600">
            Kembali
          </Button>
        </Link>
      </div>

      {state?.status === "error" && <p className="text-red-500">{state.message}</p>}
    </form>
  );
};
