import * as Yup from "yup";
export const payFormSchema = Yup.object({
  couponCode: Yup.string().max(15, "Must be 15 characters or less"),
  payType: Yup.string().required("Required"),
  cardNumber: Yup.string().min(19, "Card is not valid").required("Required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date is not valid")
    .required("Required expiry date"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV is not valid")
    .required("Required cvv"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Required"),
});
