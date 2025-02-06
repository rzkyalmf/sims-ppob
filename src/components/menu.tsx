"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={pathname === href ? "text-red-600" : "text-gray-600 hover:text-red-600"}>
      {children}
    </Link>
  );
};
