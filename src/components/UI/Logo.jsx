import { IoIosPhonePortrait } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("")}
      className="flex items-center cursor-pointer gap-2   text-2xl lg:text-3xl"
    >
      <IoIosPhonePortrait />
      <h1 className="font-semibold">
        Tech
        <span className="font-bold text-gradient-r from-green-600 to-cyan-500">
          Nex
        </span>
      </h1>
    </div>
  );
};

export default Logo;
