import { useState } from "react";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  //! Eğer scroll yeterince kaydırılmış ise navbarı yukarıya sabitle
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 730) setShowNav(true);
    else setShowNav(false);
  });
  return (
    <nav
      className={` z-10  ${
        pathname !== "/" || showNav
          ? "fixed top-0 shadow-xl  left-0 right-0 animate-navAnimate2 bg-white   text-black"
          : "absolute top-0 left-0 right-0 bg-transparent"
      } `}
    >
      <div
        id="nav"
        className={`${
          (pathname !== "/" || showNav) && "after:hidden "
        }  custom-container relative flex-between  text-base lg:text-xl h-24`}
      >
        <NavLeft />
        <NavRight />
      </div>
    </nav>
  );
};

export default Navbar;
