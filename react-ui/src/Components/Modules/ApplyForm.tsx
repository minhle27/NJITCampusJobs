import { useFormik } from "formik";
// import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import FormFrameModal, { ToggleHandle } from "./FormFrameModal";
import { JobPost, Student } from "../../types";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAddNewApplicationMutation } from "../../services/apiSlice";
import { getErrorMessage } from "../../utils";

interface ApplyFormFields {
  resume: string;
}

interface ResumeStateType {
  url: string;
  date: string;
}

interface ApplyFormProps {
  post: JobPost;
  jobFormRef: React.MutableRefObject<ToggleHandle | null>;
  initialFormValues: ApplyFormFields;
}

const ApplyForm = ({ post, jobFormRef, initialFormValues }: ApplyFormProps) => {
  const toast = useToast();
  const auth = useAuth();
  const [addNewApplication, { isLoading, error }] =
    useAddNewApplicationMutation();
  const user = auth.user as Student;

  const initialResumeState = user.resume?.map((res) => ({
    url: res.fileUrl,
    date: res.updatedAt,
  }));

  const [resumeList, setResumeList] = useState<ResumeStateType[] | undefined>(
    initialResumeState
  );
  const [applyResume, setApplyResume] = useState<string | undefined>("");
  console.log(applyResume);

  const [preventSubmit, setPreventSubmit] = useState<boolean>(
    post.externalApplication !== ""
  );

  const handleUploadResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setResumeList([
      ...resumeList,
      { url: file.name, date: `${month}/${day}/${year}` },
    ]);
  };

  const handleCreateNewApplication = async (values: ApplyFormFields) => {
    if (!isLoading) {
      try {
        await addNewApplication(values).unwrap();
        toast({
          status: "success",
          title: "Application Sent",
          description: "Employers received your application",
          isClosable: true,
        });
        if (jobFormRef.current) {
          jobFormRef.current.toggleVisibility();
        }
      } catch (err) {
        console.error("Failed to create new job: ", err);
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
  };

  const formik = useFormik<ApplyFormFields>({
    initialValues: initialFormValues,
    onSubmit: () => {
      if (!applyResume) {
        toast({
          status: "warning",
          title: "Please upload an updated resume",
          description: "Application submitted unsuccessfully",
          duration: 2000,
          isClosable: true,
        });
      } else if (preventSubmit) {
        toast({
          status: "warning",
          title: "Please submit external application",
          description: "Application submitted unsuccessfully",
          duration: 2000,
          isClosable: true,
        });
      } else if (formik.isValid && !preventSubmit) {
        handleCreateNewApplication(formik.values);
        toast({
          status: "success",
          title: "Submitted",
          description: "Application submitted successfully",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          status: "warning",
          title: "Failed",
          description: "Application submitted unsuccessfully",
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <FormFrameModal
      title={post.title}
      handleSubmit={formik.handleSubmit}
      ref={jobFormRef}
    >
      <section className="font-montserat flex flex-col">
        <div className="font-bold">Resume</div>
        <div>Be sure to include an updated resume *</div>
        <div className="flex flex-col space-y-2">
          {resumeList?.map((resume, id) => (
            <div
              key={id}
              className={`flex cursor-default justify-between items-center border-2 border-black rounded-xl ${applyResume === resume.url ? "bg-gray-300" : ""}`}
              onClick={() => setApplyResume(resume.url)}
            >
              <div className="flex items-center">
                <div className="bg-gray-400 rounded-l-xl px-4 py-6 font-semibold">
                  {resume.url.split(".")[
                    // eslint-disable-next-line no-unexpected-multiline
                    resume.url.split(".").length - 1
                  ].toUpperCase()}
                </div>
                <div className="text-14 px-4">
                  <div>
                    {resume.url.split("/")[resume.url.split("/").length - 1]
                      .length < 30
                      ? resume.url.split("/")[resume.url.split("/").length - 1]
                      : resume.url.split("/")[
                          // eslint-disable-next-line no-unexpected-multiline
                          resume.url.split("/").length - 1
                        ].substring(0, 30) + "..."}
                  </div>
                  <div>Last used on {resume.date}</div>
                </div>
              </div>
              <Link
                to={resume.url}
                target="_blank"
                className="text-blue-600 mr-10 hover:underline"
              >
                View
              </Link>
            </div>
          ))}
        </div>
        <label
          htmlFor="uploadResume"
          className="border-black border-2 rounded-full p-2 hover:bg-slate-300 font-medium cursor-pointer w-fit my-3"
        >
          Upload resume
        </label>
        <input
          name="uploadResume"
          id="uploadResume"
          type="file"
          className="hidden"
          accept=".pdf,.docx,.doc"
          onChange={handleUploadResume}
        />
        <div className="text-xs">DOC, DOCX, PDF (2 MB)</div>
        {post.externalApplication ? (
          <div className="my-3">
            <div>
              Please submit the survey below in order to process the application
            </div>
            <Link
              to={post.externalApplication}
              target="_blank"
              className="text-blue-500 flex items-center space-x-2 py-2"
              onClick={() => setPreventSubmit(false)}
            >
              <div>Apply Externally</div>
              <ExportOutlined />
            </Link>
          </div>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="w-fit ml-auto bg-black rounded-full text-white py-1 px-4"
        >
          Submit
        </button>
      </section>
    </FormFrameModal>
  );
};

export default ApplyForm;
