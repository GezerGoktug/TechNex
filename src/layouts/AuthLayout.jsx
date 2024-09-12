import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="overflow-x-hidden">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
