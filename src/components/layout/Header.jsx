import Hero from "../Home/Hero/Hero";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <header className=" relative text-white">
      <Navbar />
      <Hero />
    </header>
  );
};

export default Header;
