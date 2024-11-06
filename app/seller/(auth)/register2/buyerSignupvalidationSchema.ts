import * as Yup from "yup";

export const buyerSignupValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  userName: Yup.string().required("Username is required."),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have minimum 6 characters."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});
