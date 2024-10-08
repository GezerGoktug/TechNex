
import { useState } from "react";
import ProfilePanel from "../components/Profile/ProfilePanel";
import Orders from "../components/Profile/Orders";
import Settings from "../components/Profile/Settings";


const Profile = () => {
  const [chanceProfilePanel, setChanceProfilePanel] = useState(true);

  return (
    <div className="custom-container grid lg:grid-cols-3 my-32 gap-4">
      <ProfilePanel setChanceProfilePanel={setChanceProfilePanel} />
      <div className="lg:col-span-2 bg-slate-200 rounded-lg overflow-x-auto">
        {chanceProfilePanel ? <Settings /> : <Orders />}
      </div>
    </div>
  );
};

export default Profile;
