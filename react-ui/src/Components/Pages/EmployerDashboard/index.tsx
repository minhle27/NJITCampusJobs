import { useRef, useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import { useParams } from "react-router-dom";
import JobsList from "./JobsList";
import Protected from "../../Modules/Protected";
import JobForm, { JobFormFields } from "./JobForm";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import { useCreateNewJobMutation } from "../../../services/apiSlice";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";

const EmployerDashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const jobFormRef = useRef<ToggleHandle>(null);
  const [addNewJob, { isLoading, error }] = useCreateNewJobMutation();
  const toast = useToast();

  const handleClickCreateNew = () => {
    if (jobFormRef.current) {
      jobFormRef.current.toggleVisibility();
    }
  };

  const initialFormValues = {
    title: "",
    externalApplication: "",
    jobDescription: "",
    location: "",
    salary: "",
  };

  const handleSubmitNewJob = async (values: JobFormFields) => {
    if (!isLoading) {
      try {
        await addNewJob(values).unwrap();
        toast({
          status: "success",
          title: "New job.",
          description: "Successfully saved this job.",
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

  return (
    <div className="flex flex-col max-h-[93vh]">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <JobsList employerId={id!} searchValue={searchValue} />
      <Protected id={id!}>
        <>
          <div className="flex justify-center mt-5 mb-5">
            <button
              onClick={handleClickCreateNew}
              className="grow max-w-sm py-2 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none"
            >
              Create New Jobs
            </button>
          </div>
          <JobForm
            jobFormRef={jobFormRef}
            initialFormValues={initialFormValues}
            isUpdate={false}
            handleSubmit={handleSubmitNewJob}
          />
        </>
      </Protected>
    </div>
  );
};

export default EmployerDashboard;
