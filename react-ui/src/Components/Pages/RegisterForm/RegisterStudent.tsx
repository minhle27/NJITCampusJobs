import { UploadOutlined } from "@ant-design/icons";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useAddNewUserMutation } from "../../../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";
import FormFrameModal, { ToggleHandle } from "../../Modules/FormFrameModal";
import { GeneralInfoType } from "./Register";

interface Modal {
  newUser: GeneralInfoType;
  registerStudentRef: React.MutableRefObject<ToggleHandle | null>;
}

interface AdditionalRegister {
  major: string;
  phone: string;
  start: number;
  end: number;
  degree: string;
}

interface FileName {
  profilePicture: string;
  resume: string;
}

const RegisterStudent = ({ newUser, registerStudentRef }: Modal) => {
  type FileRead = string | ArrayBuffer | null;
  const [profilePicture, setProfilePicture] = useState<FileRead>("");
  const [resume, setResume] = useState<FileRead>("");
  const [fileNames, setFileNames] = useState<FileName>({
    profilePicture: "",
    resume: "",
  });
  const [addNewStudent, { isLoading, error }] = useAddNewUserMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const classYear: number[] = [];
  for (let i = 2022; i < 2029; i++) classYear.push(i);
  const degrees = [
    "Associate degree",
    "Bachelor's degree",
    "Master's degree",
    "Doctoral degree",
  ];

  const formik = useFormik<AdditionalRegister>({
    initialValues: {
      major: "",
      phone: "",
      start: -1,
      end: -1,
      degree: "",
    },

    validationSchema: Yup.object({
      major: Yup.string().required("Please enter your major"),
      phone: Yup.string().required("Please enter your phone number"),
      start: Yup.number().positive("Please select your start year"),
      end: Yup.number().positive("Please select your end year"),
      degree: Yup.string().required("Please select your degree"),
    }),
    onSubmit: async () => {
      const registerInfo = {
        ...newUser,
        major: formik.values.major,
        phone: formik.values.phone,
        classYear: {
          start: formik.values.start,
          end: formik.values.end,
        },
        degree: formik.values.degree,
        profilePicture: profilePicture,
        resume: resume,
      };
      console.log(registerInfo);
      if (!isLoading) {
        try {
          await addNewStudent(registerInfo).unwrap();
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
          console.error("Failed to register new Student: ", err);
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

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setResume(reader.result);
    };
    setFileNames({ ...fileNames, resume: file.name });
  };

  return (
    <FormFrameModal
      title={"Create your profile"}
      handleSubmit={formik.handleSubmit}
      ref={registerStudentRef}
    >
      <>
        <label htmlFor="degree" className="font-bold block p-2">
          Degree
        </label>
        <div className="rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
          <select
            name="degree"
            id="degree"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.degree}
            className={
              "py-2 mr-3 pl-5 bg-transparent text-lg text-center focus:outline-0 w-full"
            }
          >
            <option value="">Degree of Study</option>
            {degrees.map((degree, id) => (
              <option key={id} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
        <div className="h-6 py-1 pl-2">
          {formik.errors.degree && formik.touched.degree ? (
            <div className="text-red-500">{formik.errors.degree}</div>
          ) : null}
        </div>

        <label htmlFor="major" className="font-bold block p-2">
          Major
        </label>
        <input
          className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="What is your major"
          id="major"
          name="major"
          value={formik.values.major}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.major && formik.touched.major ? (
            <div className="text-red-500">{formik.errors.major}</div>
          ) : null}
        </div>
        <div className="font-bold block p-2">Class Year</div>
        <div className="flex space-x-2.5">
          <div className="flex-auto rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <select
              name="start"
              id="start"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start}
              className="py-2 mr-3 pl-5 bg-transparent text-lg text-center focus:outline-0 w-full"
            >
              <option value="year" hidden>
                Start
              </option>
              {classYear.map((year, id) => (
                <option value={year} key={id} className="text-black">
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-auto rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <select
              name="end"
              id="end"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.end}
              className="py-2 mr-3 pl-5 bg-transparent text-lg text-center focus:outline-0 w-full"
            >
              <option value="" hidden>
                End
              </option>
              {classYear.map((year, id) => (
                <option value={year} key={id} className="text-black">
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-auto h-4">
          <div className="w-1/2">
            {formik.errors.start && formik.touched.start ? (
              <div className="text-red-500 text-center">
                {formik.errors.start}
              </div>
            ) : null}
          </div>
          <div className="w-1/2">
            {formik.errors.end && formik.touched.end ? (
              <div className="text-red-500 text-center">
                {formik.errors.end}
              </div>
            ) : null}
          </div>
        </div>

        <label htmlFor="phone" className="font-bold block p-2">
          Phone
        </label>
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

        <label htmlFor="profilePicture">
          <div className="font-bold block p-2">Profile Picture</div>
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

        <label htmlFor="resume">
          <div className="font-bold block p-2">Upload Resume</div>
          <div className="rounded-full w-full p-3 bg-gray-200 hover:bg-gray-300 cursor-pointer flex flex-auto">
            {fileNames.resume === "" ? (
              <div className="w-full leading-3 text-lg flex justify-center items-center text-gray-400">
                Choose file
              </div>
            ) : (
              <div className="w-full leading-3 flex justify-center items-center">
                {fileNames.resume}
              </div>
            )}
            <UploadOutlined />
          </div>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          className="hidden"
          onChange={handleResumeChange}
        />
        <button
          type="submit"
          className="rounded-full text-center mt-7 mb-5 p-2 w-full placeholder:text-center text-lg bg-black text-white cursor-pointer font-semibold"
        >
          Create Profile
        </button>
      </>
    </FormFrameModal>
  );
};

export default RegisterStudent;
