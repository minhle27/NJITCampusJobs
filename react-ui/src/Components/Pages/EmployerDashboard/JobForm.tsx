import { useFormik } from "formik";
import FormFrameModal from "../../Modules/FormFrameModal";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

interface Props {
  jobFormRef: React.MutableRefObject<ToggleHandle | null>;
  initialFormValues: JobFormFields;
  isUpdate: boolean;
  handleSubmit: (value: JobFormFields) => Promise<void>;
}

export interface JobFormFields {
  title: string;
  externalApplication: string;
  jobDescription: string;
  location: string;
  salary: string;
}

const JobForm = ({
  jobFormRef,
  initialFormValues,
  isUpdate,
  handleSubmit,
}: Props) => {
  const toast = useToast();
  const formik = useFormik<JobFormFields>({
    initialValues: initialFormValues,

    validationSchema: Yup.object({
      title: Yup.string().required(
        "Please provide job title at least 5 characters"
      ),
      externalApplication: Yup.string().url(),
      jobDescription: Yup.string().required("Please provide job Description"),
      location: Yup.string().required("Please provide location"),
      salary: Yup.number().required("Please provide salary per hour"),
    }),
    onSubmit: () =>{
      if (formik.dirty) {
        handleSubmit(formik.values);
      } else {
        toast({
          status: "warning",
          title: "Warning",
          description: "Make modification before save changes",
          isClosable: true,
        });
      }
    },
  });

  return (
    <FormFrameModal
      title={isUpdate ? "Edit This Job" : "Create A New Job"}
      handleSubmit={formik.handleSubmit}
      ref={jobFormRef}
    >
      <div>
        <div className="field-title">Job Title</div>
        <input
          className="rounded-full w-full p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-lg text-center focus:outline-0"
          placeholder="Job title"
          id="title"
          name="title"
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
          placeholder="External Application Link (Optional)"
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
        <textarea
          className="text-justify rounded-lg w-full min-h-56 p-1.5 bg-gray-200 hover:bg-gray-300 placeholder:text-center text-base focus:outline-0"
          placeholder="Job Description"
          id="jobDescription"
          name="jobDescription"
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
          {isUpdate ? "Save" : "Update"}
        </button>
      </div>
    </FormFrameModal>
  );
};

export default JobForm;
