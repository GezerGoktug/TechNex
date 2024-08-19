import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateProfile } from "../../auth/authFunc";
import { modalActions } from "../../redux/slices/modalSlice";
import { authActions } from "../../redux/slices/authSlice";
import { useFormik } from "formik";
import { UPDATE } from "../../constants/types";
import { motion } from "framer-motion";
import Input from "../UI/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Select } from "flowbite-react";
import Button from "../UI/Button";
import { FaSave } from "react-icons/fa";
import ReauthenticateModal from "./ReauthenticateModal";
import { fadeInUp } from "../../animations/variants";
import {chanceUserİnfoSchema} from "../../schemas/chanceUserİnfoSchema"


const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const onSubmit = async (values, actions) => {
    const { password, photoUrl, userName, country, address } = values;
    const result = await handleUpdateProfile(values);
    //! Eğer oturum açma süresinin üzerinde fazla vakit geçti ise
    //! Reauthenticate gerekli.Bu işlemin yapılabilmesi için gerekli modalı açar
    if (result.error === "auth/requires-recent-login") {
      setFormData({password,photoUrl,userName,country,address,});
      dispatch(modalActions.openModal());
    }
    if (result.user) {
      const updatedUser = {
        userName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        country,
        address,
        uid: result.user.uid,
        lastLogin: result.user.metadata.lastSignInTime,
      };
      dispatch(authActions.update(updatedUser));
      actions.resetForm();
    }
  };
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        userName: user?.userName,
        password: "",
        photoUrl: user?.photoURL,
        country: user?.country,
        address: user?.address,
      },
      validationSchema: chanceUserİnfoSchema,
      onSubmit,
    });
  return (
    <>
      <ReauthenticateModal oprType={UPDATE} formData={formData} />
      <motion.section
        className="p-8"
        variants={fadeInUp}
        whileInView="open"
        initial="close"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h4 className="text-3xl font-bold mb-6 ">Profile Settings</h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col min-[540px]:grid   min-[540px]:grid-cols-2 font-semibold gap-4"
        >
          <div>
            <label htmlFor="userName">Name:</label>
            <Input
              className={`${
                touched.userName && errors.userName
                  ? "!border-red-700 !bg-red-300"
                  : touched.userName && "!border-green-700 !bg-green-300"
              } `}
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              placeholder="Name"
              onBlur={handleBlur}
            />
            {touched.userName && (
              <span className="text-red-400 text-sm font-medium block">
                {errors.userName}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
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
            {touched.password && (
              <span className="text-red-400 text-sm font-medium block">
                {errors.password}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="photoUrl">Photo url:</label>
            <Input
              className={`${
                touched.photoUrl && errors.photoUrl
                  ? "!border-red-700 !bg-red-300"
                  : touched.photoUrl && "!border-green-700 !bg-green-300"
              }`}
              id="photoUrl"
              name="photoUrl"
              value={values.photoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Photo url"
            />
            {touched.photoUrl && (
              <span className="text-red-400 text-sm font-medium block">
                {errors.photoUrl}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <Select
              id="country"
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              color=""
              required={false}
            >
              <option disabled value="">
                Selected live country
              </option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Turkey">Turkey</option>
            </Select>
          </div>
          <div className="col-span-2">
            <label htmlFor="address">Address:</label>
            <textarea
              className="w-full p-3 mt-2 resize-none min-h-32 rounded-lg"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Address"
            ></textarea>
          </div>
          <Button
            type="submit"
            className="col-span-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 w-max ms-auto"
          >
            <FaSave />
            Save new info
          </Button>
        </form>
      </motion.section>
    </>
  );
};

export default Settings;
