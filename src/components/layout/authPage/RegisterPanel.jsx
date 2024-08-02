import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../../../auth/authFunc";
import { db } from "../../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { authActions } from "../../../redux/slices/authSlice";
import { SUCCESS } from "../../../constants/types";
import { toastNotify } from "../../toastify/toastNotify";
import { useFormik } from "formik";
import { Card } from "flowbite-react";
import Input from "../../UI/Input";
import { RiText } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import Button from "../../UI/Button";
import { GrLinkPrevious } from "react-icons/gr";
import { registerSchema } from "../../../schemas/registerSchema";

const RegisterPanel = ({ setChancePanel }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const { userName, email, password } = values;
    //! Kayıt olma
    const user = await handleRegister(email, password, userName);
    //! Diğer kullanıcıya özel veriler için yeni kullanıcı verilerini hazırla
    const data = {
      cart: {},
      address: "",
      country: "",
      favouritesProducts: {},
      orders: {},
    };
    //! Yeni kullanıcı verilerini kaydet
    await setDoc(doc(db, "users", user?.uid), data);
    const { displayName, email: userEmail, uid, metadata } = user;
    const newUser = {
      userName: displayName,
      email: userEmail,
      photoURL: "/img/sections/defaultprofile.png",
      country: "",
      address: "",
      uid,
      lastLogin: metadata.lastSignInTime,
    };
    //! İlgili sliceın stateini güncelle
    dispatch(authActions.login(newUser));
    navigate("../profile");
    toastNotify(SUCCESS, "Your registration is successful");
    actions.resetForm();
  };
  //! Formik Ayarları
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      receiveOffers: false,
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <Card className="!bg-slate-100  w-[95%] xs:w-[85%] sm:w-3/4 lg:w-1/2  xl:w-[40%] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h4 className="text-4xl text-center  py-2 text-blue-600   font-semibold">
          Register
        </h4>
        <Input
          className={`${
            touched.userName && errors.userName
              ? "!border-red-700 !bg-red-300"
              : touched.userName && "!border-green-700 !bg-green-300"
          }`}
          name="userName"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          required={1}
          type="text"
          rightIcon={<RiText className="text-lg cursor-pointer me-2" />}
          placeholder="Username"
        />
        {touched.userName && (
          <span className="text-red-400 text-sm font-medium block">
            {errors.userName}
          </span>
        )}
        <Input
          className={`${
            touched.email && errors.email
              ? "!border-red-700 !bg-red-300"
              : touched.email && "!border-green-700 !bg-green-300"
          }`}
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required={1}
          type="email"
          rightIcon={
            <MdOutlineAlternateEmail className="text-lg cursor-pointer me-2" />
          }
          placeholder="Email"
        />
        {touched.email && (
          <span className="text-red-400 text-sm font-medium block">
            {errors.email}
          </span>
        )}
        <Input
          className={`${
            touched.password && errors.password
              ? "!border-red-700 !bg-red-300"
              : touched.password && "!border-green-700 !bg-green-300"
          }`}
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={1}
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
          placeholder="Create Password"
        />
        {touched.password && (
          <span className="text-red-400 text-sm font-medium block">
            {errors.password}
          </span>
        )}
        <Input
          className={`${
            touched.confirmPassword && errors.confirmPassword
              ? "!border-red-700 !bg-red-300"
              : touched.confirmPassword && "!border-green-700 !bg-green-300"
          }`}
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required={1}
          type="password"
          placeholder="Confirm password"
        />
        {touched.confirmPassword && (
          <span className="text-red-400 text-sm font-medium block">
            {errors.confirmPassword}
          </span>
        )}
        <div className="flex  gap-2  ">
          <input
            name="agreeTerms"
            value={values.agreeTerms}
            onChange={handleChange}
            type="checkbox"
            required
          />
          <span>
            I agree with the
            <span className="text-blue-500 cursor-pointer font-medium ms-2 ">
              terms and conditions
            </span>
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            name="receiveOffers"
            value={values.receiveOffers}
            onChange={handleChange}
            type="checkbox"
          />
          <span>
            {" "}
            I want to get promotional offers{" "}
            <span className="text-sm">(optional)</span>
          </span>
        </div>
        {errors.agreeTerms && (
          <span className="text-red-400 text-sm font-medium block">
            {errors.agreeTerms}
          </span>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting && "opacity-50"
          } bg-blue-600 text-white rounded-lg hover:bg-blue-700`}
        >
          {isSubmitting ? (
            <FaSpinner className="text-3xl animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
        <span className="mx-auto">
          Already have an account?
          <span
            onClick={() => setChancePanel(true)}
            className="text-blue-700 cursor-pointer font-semibold"
          >
            Login
          </span>
        </span>
        <div
          onClick={() => navigate("../")}
          className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-gray-700"
        >
          <GrLinkPrevious />
          <span>Return to home</span>
        </div>
      </form>
    </Card>
  );
};

export default RegisterPanel;
