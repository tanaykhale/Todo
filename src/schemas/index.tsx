import * as Yup from "yup";

const validateSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(20, "Name can't be longer than 20 characters")
    .required("Please enter the name"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter the email correctly"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Please enter the password"),
});
export default validateSchema;
