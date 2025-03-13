import { MdSend } from "react-icons/md";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { sendResetPassword } from "../../auth/authFunc";
import { useState } from "react";


const SendResetPasswordModal = () => {
  const [email, setEmail] = useState("");

  //! Şifre sıfırlama bağlantısını emaile gönder
  const forgotPasswordHandle = async () => await sendResetPassword(email);

  return (
    <Modal>
      <h5 className=" text-3xl font-medium    mt-3">
        Send Reset Password Link to You Email
      </h5>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <Button
        onClick={forgotPasswordHandle}
        className="bg-indigo-600 w-max text-white hover:bg-indigo-700 rounded-lg"
      >
        <MdSend />
        Send mail
      </Button>
    </Modal>
  );
};

export default SendResetPasswordModal;
