import ReactDOM from "react-dom";
import { Backdrop } from "./Backdrop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../redux/slices/modalSlice";

const ModalOverlay = ({ children }) => {
  const overlay = document.getElementById("overlay");
  const dispatch = useDispatch()
  useEffect(() => {
    //! Modalın dışında bi yere tıklanırsa modal kapa
    const clickWindowModalHandle = (e) => {
      if (e.target.classList.contains("backdrop"))
        dispatch(modalActions.closeModal())
    };
    overlay.addEventListener("click", clickWindowModalHandle);

    return () => overlay.removeEventListener("click", clickWindowModalHandle);
  }, []);

  return <>{ReactDOM.createPortal(<Backdrop>{children}</Backdrop>, overlay)}</>;
};

export default ModalOverlay;
