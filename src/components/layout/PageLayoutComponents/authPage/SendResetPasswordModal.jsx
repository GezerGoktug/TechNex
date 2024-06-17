import { useState } from "react";
import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import { MdSend } from "react-icons/md";
import { sendResetPassword } from "../../../../auth/authFunc";
import { toastNotify } from "../../../toastify/toastNotify";
import types from "../../../../constants/types";

const SendResetPasswordModal = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordHandle = async () => {
    //! Şifre sıfırlama bağlantısını emaile gönder
    await sendResetPassword(email);
    toastNotify(
      types.SUCCESS,
      "Password reset link has been sent to your e-mail."
    );
  };

  return (
    <>
      <h5 className=" text-3xl font-medium mt-3">
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
    </>
  );
};

export default SendResetPasswordModal;
