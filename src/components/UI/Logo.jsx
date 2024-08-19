import { IoIosPhonePortrait } from "react-icons/io";
import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <Link to="../">
    <div
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
    </Link>
  );
};

export default Logo;
