import * as Yup from "yup";

export const card = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Please enter your name"),
  card: Yup.number()
    .min(20000000000000, "Must be 14 characters")
    .max(4999999999999999, "Must be less than 16 digits")
    .required("Please enter valid card number"),
  expiry: Yup.string()
    .min(4, "Please enter in MMYY format")
    .max(4, "Please enter in MMYY format")
    .required("Please enter expiry date"),
  cvv: Yup.number()
    .min(100, "CVV should be 3 digit")
    .max(999, "CVV should be 3 digit")
    .required(),
});
