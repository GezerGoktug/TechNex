import { Badge, Tooltip } from "flowbite-react";
import { FaHeart, FaShoppingBasket, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const data = [
  {
    icon: <FaShoppingBasket />,
    link: "cart",
  },
  {
    icon: <FaHeart />,
    link: "favourites",
  },
  {
    icon: <FaUser />,
    link: "profile",
  },
];

const NavRight = () => {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  return (
    <motion.ul
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex gap-4"
    >
      {data.map((item, i) => (
        <Tooltip key={i} className="capitalize" content={item.link}>
          <li className="relative">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-400"
                  : "transition-colors hover:text-emerald-400"
              }
              to={isLoggedIn ? item.link : "auth"}
            >
              {item.icon}
            </NavLink>
            {item.link === "cart" && (
              <Badge
                className="rounded-full absolute -right-3 -top-2 w-4  h-4 items-center justify-center"
                color="failure"
              >
                {cart.length}
              </Badge>
            )}
          </li>
        </Tooltip>
      ))}
    </motion.ul>
  );
};

export default NavRight;
