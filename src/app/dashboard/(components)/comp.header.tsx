import Image from "next/image";
import Link from "next/link";

import { Menu } from "@/components/menu";

export const Header = () => {
  return (
    <header className="pt-20 border-gray-200">
      <div className="mx-auto border-b flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="contents">
            <Image width={28} height={28} src="/favicon.ico" alt="SIMS PPOB Logo" />
            <h4 className="text-lg font-semibold">SIMS PPOB</h4>
          </Link>
        </div>

        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Menu href="/dashboard/topup">Top Up</Menu>
            </li>
            <li>
              <Menu href="/dashboard/transaction">Transaction</Menu>
            </li>
            <li>
              <Menu href="/dashboard/profile">Akun</Menu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
