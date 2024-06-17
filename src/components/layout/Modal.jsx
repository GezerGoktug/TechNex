import { Card } from "flowbite-react";
import ModalOverlay from "./ModalOverlay";
import { FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";

const Modal = ({ setModal, modal }) => {
  return (
    <ModalOverlay setModal={setModal}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto w-[90%] xs:w-[90%] md:w-1/2 "
      >
        <Card className=" !bg-slate-100 mt-[10vh] relative  max-h-[80vh] overflow-auto  ">
          {modal.content}
          <FaXmark
            onClick={() => setModal({ isOpen: false, content: null })}
            className="absolute top-5 right-5 text-4xl cursor-pointer"
          />
        </Card>
      </motion.div>
    </ModalOverlay>
  );
};

export default Modal;
