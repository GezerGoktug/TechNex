import { useEffect } from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "../layout/Backdrop";

const Overlay = ({ children, onClose }) => {
  const overlay = document.getElementById("overlay");
  useEffect(() => {
    //! Sidebarın dışında bi yere tıklanırsa sidebar kapa
    const handleClickBackdrop = (e) => {
      if (e.target.classList.contains("backdrop")) onClose();
    };
    overlay.addEventListener("click", handleClickBackdrop);

    return () => {
      overlay.removeEventListener("click", handleClickBackdrop);
    };
  }, []);

  return ReactDOM.createPortal(<Backdrop>{children}</Backdrop>, overlay);
};
export default Overlay;
