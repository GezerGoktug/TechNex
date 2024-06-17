import { FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="border-t py-3 my-6 border-slate-600 flex flex-wrap gap-4 justify-center  lg:justify-between ">
      <div className="italic text-center">
        &copy;2024 <span className="font-semibold">TechNex</span> - All Rights
        Reserved - Powered by{" "}
        <span className="font-semibold">Göktuğ Gezer</span>
      </div>
      <div className="flex-center flex-wrap  text-xl gap-2">
        <div className="flex gap-2">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
        </div>
        <ul className="text-[10px] xs:text-sm flex gap-2 ">
          <li>
            <Link>Privacy Policy</Link>
          </li>
          <li className="border-x px-3 border-slate-700">
            <Link>Returns Policy</Link>
          </li>
          <li>
            <Link>Terms and Conditions</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterBottom;
