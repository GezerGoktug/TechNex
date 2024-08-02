import { Card } from "flowbite-react";
import ModalOverlay from "../../layout/ModalOverlay";
import { FaXmark } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../redux/slices/modalSlice";

const Modal = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay>
          <motion.div
            initial={{ scale: 0.5, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-[90%] xs:w-[90%] md:w-1/2"
          >
            <Card className="!bg-slate-100 mt-[10vh] relative max-h-[80vh] overflow-auto">
              {children}
              <FaXmark
                onClick={() => dispatch(modalActions.closeModal())}
                className="absolute top-5 right-5 text-4xl cursor-pointer"
              />
            </Card>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
