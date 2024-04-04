import { useFormik } from "formik";
import FormFrameModal from "../../Modules/FormFrameModal";
import { ToggleHandle } from "../../Modules/FormFrameModal";

interface Props {
  detailsFormRef: React.MutableRefObject<ToggleHandle | null>;
  initialFormValues: {
    status: string;
  };
  resumeUrl: string;
  handleSubmit: (value: DetailsFormFields) => Promise<void>;
}

export interface DetailsFormFields {
  status: string;
}

const DetailsForm = ({
  resumeUrl,
  detailsFormRef,
  initialFormValues,
  handleSubmit,
}: Props) => {
  const formik = useFormik<DetailsFormFields>({
    initialValues: initialFormValues,
    onSubmit: handleSubmit,
  });

  const statusList = ["accepted", "rejected", "pending"];

  return (
    <FormFrameModal
      title={"Application Details"}
      handleSubmit={formik.handleSubmit}
      ref={detailsFormRef}
    >
      <div className="flex flex-col">
        <div className="flex mb-2">
          <p className="font-semibold mr-2 text-base">Resume:</p>
          <a
            href={resumeUrl}
            target="_blank"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View applicant's resume
          </a>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block font-semibold mb-2 text-base text-gray-900 dark:text-white"
          >
            Update Status
          </label>
          <select
            id="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {statusList.map((status, id) => (
              <option value={status} key={id} className="text-black">
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-full text-center mt-5 mb-5 p-2 w-full placeholder:text-center text-lg bg-black text-white cursor-pointer font-semibold"
        >
          Save
        </button>
      </div>
    </FormFrameModal>
  );
};

export default DetailsForm;
