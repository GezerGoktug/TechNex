import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../UI/Logo";

const data = [
  {
    label: "Home",
    link: "",
  },
  {
    label: "About",
    link: "about",
  },
  {
    label: "Products",
    link: "products",
  },
  {
    label: "Contact",
    link: "contact",
  },
];

const NavLeft = ({ setSideBar }) => {
  return (
    <motion.div
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex items-center gap-3 min-[360px]:gap-6 lg:gap-12 "
    >
      <FaBars
        onClick={() => setSideBar(true)}
        className="pe-3 min-[360px]:pe-6 border-e  w-12   border-slate-100  sm:hidden"
      />
      <Logo />
      <ul className=" hidden sm:flex  sm:border-s-2 sm:ps-6 lg:ps-12 gap-2 lg:gap-4 font-medium">
        {data.map((item, i) => (
          <li key={i}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={item.link}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default NavLeft;
