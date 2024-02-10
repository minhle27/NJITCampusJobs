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
        .matches(/.{8,}/, "Password must have at least 8 characters")
        .matches(
          /(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]/,
          "Password must have at a letter and a number"
        )
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
          "Password must have at least one uppercase letter and one lowercase letter"
        )
        .matches(
          /(?=.*[\W_])[^\s]{8,}/,
          "Password must have at least one special character"
        ),
      name: Yup.string().required("Please enter your full name"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="font-montserat flex justify-center items-center h-screen">
      <section className="w-5/12 bg-gradient-to-b from-cyan-500 h-full flex items-center">
        <img src={logo} className="" />
      </section>
      <section className="w-7/12">
        <div className="block mb-10 font-bold text-center m-auto align-middle w-4/5 p-auto text-2xl	">
          Let's get you started
        </div>
        <form
          className="w-4/5 align-middle m-auto block"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col justify-center items-center">
            <input
              className="rounded-full py-2 px-5 w-4/5 mx-8 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg"
              placeholder="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 align-middle flex-initial">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <input
              className="rounded-full py-2 px-5 w-4/5 mx-8 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg"
              placeholder="Password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 align-middle flex-initial">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <input
              className="rounded-full py-2 px-5 w-4/5 mx-8 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg"
              placeholder="Full Name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div className="h-10 w-4/5 ml-8 pl-1 flex justify-start items-center">
              {formik.errors.name && formik.touched.name ? (
                <div className="text-red-500 align-middle flex-initial">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="rounded-full p-2 w-4/5 mx-8 mb-8 placeholder:text-center text-lg bg-cyan-400 hover:bg-cyan-600 text-white"
            >
              CONTINUE
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
