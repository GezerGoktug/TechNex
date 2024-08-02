import * as Yup from "yup";

export const registerSchema = Yup.object({
  userName: Yup.string()
    .required("Required username")
    .min(3, "Too short username!"),
  email: Yup.string()
    .required("Required email")
    .email("Enter a valid email address"),
  password: Yup.string()
    .required("Required Password")
    .min(8, "Too short password!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[a-zA-z].*[a-zA-z].*[a-zA-z].*[a-zA-z]/,
      "Password must contain at least 4 letters"
    ),
  confirmPassword: Yup.string()
    .required("Required confirm password")
    .oneOf([Yup.ref("password")], "Password must match"),
  agreeTerms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions.")
    .required("You must accept the terms and conditions."),
  receiveOffers: Yup.bool(),
});
