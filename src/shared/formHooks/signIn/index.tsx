import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .when("password", (password, field) =>
      password ? field.required().oneOf([yup.ref("password")]) : field
    ),
  selfie: yup.string().required("Selfie is required"),
});

const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(SignUpSchema),
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    selfie: "",
  },
});

export { control, handleSubmit, errors };
