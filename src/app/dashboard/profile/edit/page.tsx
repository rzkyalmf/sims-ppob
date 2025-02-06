import React from "react";

import getProfile from "../../(action)/action.get-profile";
import { EditProfile } from "./comp.edit-profile";

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  const name = profile.data.first_name + " " + profile.data.last_name;

  return (
    <section className="max-w-3xl mx-auto p-4 my-14">
      <EditProfile
        name={name}
        email={profile.data.email}
        profile_image={profile.data.profile_image}
        first_name={profile.data.first_name}
        last_name={profile.data.last_name}
      />
    </section>
  );
}
