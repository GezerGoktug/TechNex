import { useState } from "react";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa6";
import {
  handleDeleteUser,
  handleReauthenticate,
  handleUpdateProfile,
} from "../../../../auth/authFunc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/slices/authSlice";
import types from "../../../../constants/types";
import { toastNotify } from "../../../toastify/toastNotify";
import { FcGoogle } from "react-icons/fc";
import { FacebookProvider, GoggleProvider } from "../../../../firebase/config";
import { User } from "../../../../class/class";

const ReauthenticateModal = ({ setModal, oprType, formData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleReauth = async (provider) => {

    //! Reauthenticate işlemini yapar 
    if (!provider) await handleReauthenticate(password);
    else await handleReauthenticate(null, provider);

    //! Eğer kullanıcı silincek iken yeniden giriş gerekli ise
    //! Reathenticate yapıldıktan sonra kullanıcı silinir.
    if (oprType === types.DELETE) {
      await handleDeleteUser();
      dispatch(authActions.logout());
      navigate("../auth");
      toastNotify(types.SUCCESS, "Your account has been successfully deleted.");
    } else {
      //! Diğer durumda profil bilgileri güncellemesi yapılır
      const { updatedPassword, userName, photoUrl, country, address } =
        formData;
      const {user} = await handleUpdateProfile(
        updatedPassword,
        userName,
        photoUrl,
        country,
        address
      );
      const updatedUser = new User(
        user?.displayName,
        user?.email,
        user?.photoURL,
        country,
        address,
        user?.uid,
        user?.metadata.lastSignInTime
      );
      dispatch(authActions.update(updatedUser));
      toastNotify(types.SUCCESS, "Your account has been successfully updated.");
    }
    //! Modalı kapa
    setModal({ isOpen: false, content: null });
  };
  return (
    <>
      <h5 className="mt-4 text-3xl font-semibold">Re-Authenticate</h5>

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={!showPassword && "password"}
        rightIcon={
          showPassword ? (
            <FaEye
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="text-lg cursor-pointer me-2"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword((prevState) => !prevState)}
              className="text-lg cursor-pointer me-2"
            />
          )
        }
        placeholder="Password"
      />
      <div className="flex flex-wrap gap-2 items-center ">
        <Button
          onClick={() => handleReauth(null)}
          className="bg-indigo-600 w-max text-white hover:bg-indigo-700 rounded-lg"
        >
          Re-authenticate
        </Button>
        <span className="font-semibold mx-4">Or</span>
        <Button
          onClick={() => handleReauth(GoggleProvider)}
          className="bg-slate-200 w-max hover:bg-slate-300 rounded-lg !py-3"
        >
          <FcGoogle className="text-2xl" />
        </Button>
        <Button
          onClick={() => handleReauth(FacebookProvider)}
          className=" w-max bg-blue-900 text-white hover:bg-blue-950 rounded-lg !py-3"
        >
          <FaFacebook className="text-2xl" />
        </Button>
      </div>
      <Button />
    </>
  );
};

export default ReauthenticateModal;
