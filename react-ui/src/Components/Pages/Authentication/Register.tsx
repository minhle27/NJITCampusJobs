import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/NJIT Campus Job-logos_transparent.svg";

interface InputFormReg {
  accType: string;
  email: string;
  password: string;
  name: string;
}

const Register = () => {
  const formik = useFormik<InputFormReg>({
    initialValues: {
      accType: "Choose account type",
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      accType: Yup.string().matches(
        /Student|Employer/,
        "Please choose account type"
      ),
      email: Yup.string()
        .required("Please enter a valid email")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email"
        ),
      password: Yup.string()
        .required("Please enter the password for your NCJ account")
        .matches(
          /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/,
          "Password must have at least 8 characters, a letter and a number"
        )
        .matches(
          /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/,
          "Password must have at least one uppercase letter and one lowercase letter"
        )
        .matches(
          /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/,
          "Password must have at least one special character"
        ),
      name: Yup.string().required("Please enter your full name"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
};

export default Register;
