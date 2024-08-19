import { useState } from "react";
import LoginPanel from "../components/authPage/LoginPanel";
import RegisterPanel from "../components/authPage/RegisterPanel";

const Auth = () => {
  const [chancePanel, setChancePanel] = useState(true);
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0,0,0,0.7344187675070029) 0%, rgba(0,0,0,0.15458683473389356) 100%),url(/img/sections/section.jpg)",
      }}
      className="bg-center bg-cover"
    >
      <div className="custom-container  min-h-screen flex-center">
        {chancePanel ? (
          <LoginPanel setChancePanel={setChancePanel} />
        ) : (
          <RegisterPanel setChancePanel={setChancePanel} />
        )}
      </div>
    </div>
  );
};

export default Auth;
