import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Navbar from "./Navbar/Navbar";

const Header = ({ setSideBar }) => {
  const { pathname } = useLocation();

  return (
    <header
      className={` ${
        pathname === "/" && "min-h-screen"
      } relative    text-white  `}
    >
      <Navbar setSideBar={setSideBar} />
      {pathname === "/" && <Hero />}
    </header>
  );
};

export default Header;
