import * as yup from "yup";

const SignUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must contain at least 4 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  selfie: yup.string().required("Selfie is required"),
});

export default SignUpSchema;
