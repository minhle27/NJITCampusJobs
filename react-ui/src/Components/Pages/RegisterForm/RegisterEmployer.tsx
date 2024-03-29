import { UploadOutlined } from "@ant-design/icons";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { GeneralInfoType } from "./Register";
import { FileReadType } from "../../../types";
import { useAddNewUserMutation } from "../../../services/apiSlice";
import { Spinner } from "../../Modules/Spinner";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";
import FormFrameModal from "../../Modules/FormFrameModal";
import { ToggleHandle } from "../../Modules/FormFrameModal";

interface Modal {
  newUser: GeneralInfoType;
  registerEmployerRef: React.MutableRefObject<ToggleHandle | null>;
}

interface AdditionalRegister {
  department: string;
  phone: string;
}

interface FileName {
  profilePicture: string;
}

const RegisterEmployer = ({ newUser, registerEmployerRef }: Modal) => {
  const [profilePicture, setProfilePicture] = useState<FileReadType>("");
  const [fileNames, setFileNames] = useState<FileName>({
    profilePicture: "",
  });
  const [addNewEmployer, { isLoading, error }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const toast = useToast();

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

  const formik = useFormik<AdditionalRegister>({
    initialValues: {
      phone: "",
      department: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string().required("Please enter your phone number"),
      department: Yup.string().required("Please select your department"),
    }),
    onSubmit: async () => {
      const registerInfo = {
        ...newUser,
        phone: formik.values.phone,
        department: formik.values.department,
        profilePicture: profilePicture,
      };
      if (!isLoading) {
        try {
          await addNewEmployer(registerInfo).unwrap();
          toast({
            status: "success",
            title: "Account created.",
            description: "We've created your account for you.",
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } catch (err) {
          console.error("Failed to register new Employer: ", err);
          const errorMessage =
            error && "data" in error
              ? JSON.stringify(error.data)
              : JSON.stringify(getErrorMessage(err));
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

  return (
    <FormFrameModal
      title={"Create your profile"}
      handleSubmit={formik.handleSubmit}
      ref={registerEmployerRef}
    >
      <>
        <label htmlFor="degree" className="field-title">
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
            {depts.map((dept, id) => (
              <option value={dept} key={id}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="h-6 py-1 pl-2">
          {formik.errors.department && formik.touched.department ? (
            <div className="text-red-500">{formik.errors.department}</div>
          ) : null}
        </div>

        <div className="field-title">Phone</div>
        <input
          className="field-input"
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

        <div className="field-title">Profile Picture</div>
        <label htmlFor="profilePicture">
          <div className="rounded-full w-full p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer flex flex-auto">
            {fileNames.profilePicture === "" ? (
              <div className="w-full leading-3 text-lg flex justify-center items-center text-gray-400">
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
          className="rounded-full text-center mt-7 mb-5 p-2 w-full placeholder:text-center text-lg bg-black text-white cursor-pointer font-semibold"
        >
          Create Profile
        </button>
        {isLoading ? <Spinner /> : <></>}
      </>
    </FormFrameModal>
  );
};

export default RegisterEmployer;
