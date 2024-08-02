import * as Yup from "yup";

export const chanceUserİnfoSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Too short username!")
    .max(12, "Too long username"),
  password: Yup.string()
    .min(8, "Too short password!")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[a-zA-z].*[a-zA-z].*[a-zA-z].*[a-zA-z]/,
      "Password must contain at least 4 letters"
    ),
  photoUrl: Yup.string().url("Enter a valid URL."),
  country: Yup.string(),
  address: Yup.string(),
});
