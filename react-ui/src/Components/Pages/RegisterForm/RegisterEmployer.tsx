import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

interface Modal {
  isVisible: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

interface AdditionalRegister {
  department: string;
  phone: string;
}

interface FileName {
  profilePicture: string;
}

const RegisterStudent = (props: Modal) => {
  type FileRead = string | ArrayBuffer | null;
  const [profilePicture, setProfilePicture] = useState<FileRead>("");
  const [fileNames, setFileNames] = useState<FileName>({
    profilePicture: "",
  });

  const depts: string[] = [
    "Department of Biomedical Engineering",
    "Otto H. York Department of Chemical and Materials Engineering",
    "John A. Reif, Jr. Department of Civil and Environmental Engineering",
    "Helen and John C. Hartmann Department of Electrical and Computer Engineering",
    "School of Applied Engineering and Technology",
    "Department of Mechanical & Industrial Engineering",
    "Department of Aerospace Studies (AFROTC)",
    "Department of Chemistry and Environmental Science",
    "Department of Humanities and Social Sciences",
    "Department of Mathematical Sciences",
    "Department of Physics",
    "Federated Department of Biological Sciences",
    "Federated Department of History",
    "Rutgers/NJIT Theatre Arts Program",
    "NJ School of Architecture",
    "School of Art and Design",
    "Department of Computer Science",
    "Department of Data Science",
    "Department of Informatics",
  ];

  const endpoint = "";

  const formik = useFormik<AdditionalRegister>({
    initialValues: {
      phone: "",
      department: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string().required("Please enter your phone number"),
      department: Yup.string().required("Please select your department"),
    }),
    onSubmit: () => {
      const newUser = {
        phone: formik.values.phone,
        department: formik.values.department,
        profilePicture: profilePicture,
      };
      axios
        .post(endpoint, newUser)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    },
  });

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    setFileNames({ ...fileNames, profilePicture: file.name });
  };

  if (!props.isVisible) return null;
  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 flex flex-col h-5/6 justify-center">
        <div className="bg-white p-2 rounded-3xl font-montserat">
          <div className="h-1/7 py-3 px-3">
            <div className="flex justify-end items-center">
              <button
                className="text-black text-xs place-self-end"
                onClick={props.onClose}
              >
                <CloseOutlined />
              </button>
            </div>
            <div className="text-center text-2xl font-extrabold">
              Create your profile
            </div>
          </div>
          <form
            className="px-4 overflow-auto scrollbar-thin"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="degree" className="font-bold block p-2">
              Department
            </label>
            <div className="rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
              <select
                name="department"
                id="department"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.department}
                className="py-2 mr-3 pl-5 bg-transparent text-lg text-center focus:outline-0 w-full"
              >
                <option value="">Department</option>
                {depts.map((dept) => (
                  <option value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="h-6 py-1 pl-2">
              {formik.errors.department && formik.touched.department ? (
                <div className="text-red-500">{formik.errors.department}</div>
              ) : null}
            </div>

            <div className="font-bold block p-2">Phone</div>
            <input
              className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
              placeholder="What is your phone number"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="h-6 py-1 pl-2">
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-red-500">{formik.errors.phone}</div>
              ) : null}
            </div>

            <div className="font-bold block p-2">Profile Picture</div>
            <label htmlFor="profilePicture">
              <div className="rounded-full w-full p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer flex flex-auto">
                {fileNames.profilePicture === "" ? (
                  <div className="w-full leading-3 text-lg flex justify-center items-center text-gray-500">
                    Choose file
                  </div>
                ) : (
                  <div className="w-full leading-3 flex justify-center items-center">
                    {fileNames.profilePicture}
                  </div>
                )}
                <UploadOutlined />
              </div>
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              className="hidden"
              onChange={handleProfilePicChange}
            />

            <button
              type="submit"
              className="rounded-full text-center mt-11 mb-5 p-2 w-full placeholder:text-center text-lg bg-black text-white cursor-pointer font-semibold"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterStudent;
