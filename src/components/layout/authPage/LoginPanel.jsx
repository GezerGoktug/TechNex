import { Card } from "flowbite-react";
import Input from "../../UI/Input";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaSpinner,
  FaXTwitter,
} from "react-icons/fa6";
import Button from "../../UI/Button";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";
import { toastNotify } from "../../toastify/toastNotify";
import { SUCCESS } from "../../../constants/types";
import { FacebookProvider, GoggleProvider, db } from "../../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cartActions } from "../../../redux/slices/cartSlice";
import { modalActions } from "../../../redux/slices/modalSlice";
import { handleLogin, handleLoginApps } from "../../../auth/authFunc";
import SendResetPasswordModal from "../../UI/Modals/SendResetPasswordModal";

const LoginPanel = ({ setChancePanel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //! Farklı uygulama türleri ile giriş yapmayı sağlar
  const loginWithApps = async (provider) => {
    //!  Belirtilen sağlayıcı ile giriş yap
    const user = await handleLoginApps(provider);
    const docRef = doc(db, "users", user?.uid);
    const userDocData = await getDoc(docRef);
    let userAddress = "";
    let userCountry = "";
    if (!userDocData.exists()) {
      //! Eğer ilk defa giriş yapılıyorsa diğer kullanıcı verileri için
      //! Veritabanında yeni kullanıcı verisi oluştur
      const data = {
        cart: {},
        address: "",
        country: "",
        favouritesProducts: {},
        orders: {},
      };
      await setDoc(docRef, data);
    } else {
      //! Eğer kullanıcı veritabanında varsa kullanıcı verilerini al
      const { cart, address, country } = userDocData.data();
      userAddress = address;
      userCountry = country;
      //! Cart işlemleri slicedaki stateleri güncelliyoruz
      dispatch(cartActions.updateİnitialCartState({ cart }));
    }
    const { displayName, email, photoURL, uid, metadata } = user;
    //! Giriş yapılan kullanıcının verileri
    const loggedUser = {
      userName: displayName,
      email,
      photoURL,
      country: userCountry,
      address: userAddress,
      uid,
      lastLogin: metadata.lastSignInTime,
    };

    //! İlgili sliceın statelerini  güncelliyoruz
    dispatch(authActions.login(loggedUser));
    navigate("../profile");
    toastNotify(SUCCESS, "Login successful");
  };

  //! Şifre sıfırlama için email isteme modalını açar
  const openInputEmailModal = () => dispatch(modalActions.openModal());

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    //! Kullanıcı giriş işlemi
    const user = await handleLogin(email, password);
    //! Giriş yapılan kullanıcının diğer verilerine veritabaından ulaşıyoruz
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);
    //! İlgili kullanıcının sepet adres ve ülke bilgilerini alıyoruz
    const { cart, address, country } = docSnap.data();
    //! Sepet ile alakalı işlemlerin yapıldığı slice daki
    //! state bilgilerini güncelliyoruz
    dispatch(cartActions.updateİnitialCartState({ cart }));
    //! Kullanıcı bilgilerinin bulunduğu slice daki state bilgilerini guncellemek
    //! için giriş yapılan kullanıcının bilgilerini alıyoruz
    const { displayName, email: userEmail, photoURL, uid, metadata } = user;
    const loggedUser = {
      userName: displayName,
      email: userEmail,
      photoURL,
      country,
      address,
      uid,
      lastLogin: metadata.lastSignInTime,
    };
    //! Auth slice da state de user i güncelliyoruz
    dispatch(authActions.login(loggedUser));
    navigate("../profile");
    toastNotify(SUCCESS, "Login succesfully");
    actions.resetForm();
  };

  //! Login Panel Formik Form ayarları
  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit,
  });

  return (
    <>
      <SendResetPasswordModal />
      <Card className=" !bg-slate-100  w-[95%] xs:w-[85%] sm:w-3/4 lg:w-1/2  xl:w-[40%] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h4 className="text-4xl text-center  py-2 text-blue-600   font-semibold">
            Login
          </h4>
          <Input
            type="email"
            name="email"
            required={1}
            value={values.email}
            onChange={handleChange}
            rightIcon={
              <MdOutlineAlternateEmail className="text-lg cursor-pointer me-2" />
            }
            placeholder="Email"
          />
          <Input
            name="password"
            onChange={handleChange}
            value={values.password}
            required={1}
            type={!showPassword && "password"}
            id="loginPassword"
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
          <span
            onClick={openInputEmailModal}
            className="text-blue-400 hover:text-blue-500 w-max text-sm hover:underline cursor-pointer font-medium"
          >
            Forgot password?
          </span>
          <Button
            disabled={isSubmitting}
            type="submit"
            className={`bg-blue-600 ${
              isSubmitting && "opacity-50"
            } text-white rounded-lg hover:bg-blue-700`}
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin text-3xl" />
            ) : (
              "Login"
            )}
          </Button>
          <span className="mx-auto">
            Don{"'"}t have an account?{" "}
            <span
              onClick={() => setChancePanel(false)}
              className="text-blue-700 cursor-pointer font-semibold"
            >
              Sign Up
            </span>
          </span>
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-400"></div>
            <span className="flex-shrink mx-4 text-slate-700 ">Or</span>
            <div className="flex-grow border-t border-slate-400"></div>
          </div>
          <Button
            onClick={() => loginWithApps(GoggleProvider)}
            className="bg-slate-200 hover:bg-slate-300 rounded-lg !py-3"
          >
            <FcGoogle className="text-3xl" />
            <span className="mx-auto ">Login with Google</span>
          </Button>
          <Button
            onClick={() => loginWithApps(FacebookProvider)}
            className="bg-blue-900 text-white hover:bg-blue-950 rounded-lg !py-3"
          >
            <FaFacebook className="text-2xl" />
            <span className="mx-auto">Login with Facebook</span>
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-950 rounded-lg !py-3">
            <FaXTwitter className="text-2xl" />
            <span className="mx-auto">Login with X Account</span>
          </Button>
          <div
            onClick={() => navigate("../")}
            className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <GrLinkPrevious />
            <span>Return to home</span>
          </div>
        </form>
      </Card>
    </>
  );
};

export default LoginPanel;
