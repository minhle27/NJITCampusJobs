import { useFormik } from "formik";
import FormFrameModal from "../../Modules/FormFrameModal";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import * as Yup from "yup";

interface Props {
  jobFormRef: React.MutableRefObject<ToggleHandle | null>;
}

interface JobFormFields {
  title: string;
  externalApplication: string;
  jobDescription: string;
  location: string;
  salary: string;
}

const JobForm = ({ jobFormRef }: Props) => {
  const formik = useFormik<JobFormFields>({
    initialValues: {
      title: "",
      externalApplication: "",
      jobDescription: "",
      location: "",
      salary: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please provide job title"),
      externalApplication: Yup.string(),
      jobDescription: Yup.string().required("Please provide job Description"),
      location: Yup.string().required("Please provide job title"),
      salary: Yup.number().required("Please provide salary per hour"),
    }),
    onSubmit: async () => {
      console.log("Hello");
    },
  });

  return (
    <FormFrameModal
      title={"Create A New Job"}
      handleSubmit={formik.handleSubmit}
      ref={jobFormRef}
    >
      <>
        <div className="field-title">Job Title</div>
        <input
          className="field-input"
          placeholder="Job title"
          id="jobTitle"
          name="jobTitle"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.title && formik.touched.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="field-title">External Application</div>
        <input
          className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="External Application Link"
          id="externalApplication"
          name="externalApplication"
          value={formik.values.externalApplication}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.externalApplication &&
          formik.touched.externalApplication ? (
            <div className="text-red-500">
              {formik.errors.externalApplication}
            </div>
          ) : null}
        </div>

        <div className="field-title">Job Description</div>
        <input
          className="rounded-md w-full min-h-36 p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="Job Description"
          id="jobDescription"
          name="jobDescription"
          type="text"
          value={formik.values.jobDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.jobDescription && formik.touched.jobDescription ? (
            <div className="text-red-500">{formik.errors.jobDescription}</div>
          ) : null}
        </div>

        <div className="field-title">Location</div>
        <input
          className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="Location"
          id="location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.location && formik.touched.location ? (
            <div className="text-red-500">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="field-title">Salary</div>
        <input
          className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="Salary"
          id="salary"
          name="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="h-6 py-1 pl-2">
          {formik.errors.salary && formik.touched.salary ? (
            <div className="text-red-500">{formik.errors.salary}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="rounded-full text-center mt-5 mb-5 p-2 w-full placeholder:text-center text-lg bg-black text-white cursor-pointer font-semibold"
        >
          Save
        </button>
      </>
    </FormFrameModal>
  );
};

export default JobForm;
