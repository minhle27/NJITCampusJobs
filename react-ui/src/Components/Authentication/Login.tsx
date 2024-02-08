import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface InputForm {
  email: string;
  password: string;
}

const Login = () => {
  const formik = useFormik<InputForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section>
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <input
          placeholder="Email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="errorMsg">{formik.errors.email}</p>
        ) : null}
        <input
          placeholder="Password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <p className="errorMsg">{formik.errors.password}</p>
        ) : null}
        <button type="submit">Continue</button>
      </form>
    </section>
  );
};

export default Login;
