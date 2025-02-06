import { getBalance } from "@/app/dashboard/(action)/action.get-balance";
import { CompDashboard } from "@/app/dashboard/(components)/comp.dashboard";

import getProfile from "../(action)/action.get-profile";

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  const balance = await getBalance();

  if (!profile || !balance) {
    return null;
  }

  const name = profile.data.first_name + " " + profile.data.last_name;

  return (
    <>
      <main>
        <CompDashboard name={name} balance={balance || 0} profile_image={profile.data.profile_image} />
        <div>{children}</div>
      </main>
    </>
  );
}
