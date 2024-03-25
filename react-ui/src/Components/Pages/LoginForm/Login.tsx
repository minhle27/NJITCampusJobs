import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/NJIT Campus Job-logos_transparent.svg";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLoginUserMutation } from "../../../services/apiSlice";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials } from "../../../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ErrorType } from "../../../types";
interface InputForm {
  email: string;
  password: string;
  accountType: string;
}

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik<InputForm>({
    initialValues: {
      email: "",
      password: "",
      accountType: "Choose account type",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter a valid email")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email"
        ),
      password: Yup.string().required(
        "Please enter the password for your NCJ account"
      ),
      accountType: Yup.string().matches(
        /student|employer/,
        "Please choose account type"
      ),
    }),
    onSubmit: async (value) => {
      console.log(value);
      if (!isLoading) {
        try {
          const user = await loginUser(value).unwrap();
          console.log(user);
          dispatch(setCredentials(user));
          navigate("/");
        } catch (err) {
          console.log(err);
          const errorMessage = (err as ErrorType).data.error;
          toast({
            status: "error",
            title: "Error",
            description: errorMessage,
            isClosable: true,
          });
        }
      }
    },
  });

  return (
    <div className="font-montserat flex justify-center items-center h-screen">
      <section className="w-5/12 bg-gradient-to-b from-gray-700 h-full flex items-center">
        <img src={logo} className="" />
      </section>
      <section className="w-7/12">
        <div className="block mb-10 font-bold text-center m-auto align-middle w-4/5 p-auto text-2xl	">
          Sign in to your account
        </div>
        <form
          className="w-4/5 align-middle m-auto block"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center w-4/5">
              <select
                name="accountType"
                id="accountType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accountType}
                className="py-2.5 mr-3 pl-5 bg-transparent text-lg text-center focus:outline-0 w-full"
              >
                <option value="" hidden>
                  Choose account type
                </option>
                <option value="student" className="bg-gray-200">
                  Student
                </option>
                <option value="employer" className="bg-gray-200">
                  Employer
                </option>
              </select>
            </div>
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.accountType && formik.touched.accountType ? (
                <div className="text-red-500 align-middle flex-initial">
                  {formik.errors.accountType}
                </div>
              ) : null}
            </div>
            <input
              className="rounded-full text-center py-2 px-5 w-4/5 mx-8 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg focus:outline-0"
              placeholder="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 text-center align-middle flex-initial">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="rounded-full bg-gray-200 w-4/5 mx-8 hover:bg-gray-300 text-xl flex justify-between items-center">
              <input
                className="py-2 ml-10 border-none text-center placeholder:text-center text-lg w-full bg-transparent focus:outline-0"
                placeholder="Password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div
                className="px-2 pb-2 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 text-center align-middle flex-initial">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="rounded p-2 w-4/5 mx-8 mb-8 placeholder:text-center text-lg bg-black text-white font-semibold"
            >
              SIGN IN
            </button>
            <button
              type="button"
              className="rounded p-2 w-4/5 mx-8 mb-8 placeholder:text-center text-lg bg-gray-500 text-white font-semibold"
              onClick={() => navigate("/register")}
            >
              CREATE NEW ACCOUNT
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
