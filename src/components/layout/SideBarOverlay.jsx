import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "./Backdrop";


const Overlay = ({ children, setSideBar }) => {
    const overlay = document.getElementById("overlay");
    useEffect(() => {
      //! Sidebarın dışında bi yere tıklanırsa sidebar kapa
      const handleSideBar = (e) => {
        if (!e.target.matches("aside")) setSideBar(false);
      };
      overlay.addEventListener("click", handleSideBar);
  
      return () => {
        overlay.removeEventListener("click", handleSideBar);
      };
    }, []);
  
    return ReactDOM.createPortal(<Backdrop>{children}</Backdrop>, overlay);
  };
export default Overlay;