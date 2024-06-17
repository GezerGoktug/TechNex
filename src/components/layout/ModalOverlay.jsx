import ReactDOM from "react-dom";
import { Backdrop } from "./Backdrop";
import { useEffect } from "react";

const ModalOverlay = ({ children, setModal }) => {
  const overlay = document.getElementById("overlay");
  useEffect(() => {
    //! Modalın dışında bi yere tıklanırsa modal kapa
    const clickWindowModalHandle = (e) => {
      if (e.target.classList.contains("backdrop"))
        setModal({ isOpen: false, content: null });
    };
    overlay.addEventListener("click", clickWindowModalHandle);

    return () => overlay.removeEventListener("click", clickWindowModalHandle);
  }, []);

  return <>{ReactDOM.createPortal(<Backdrop>{children}</Backdrop>, overlay)}</>;
};

export default ModalOverlay;
