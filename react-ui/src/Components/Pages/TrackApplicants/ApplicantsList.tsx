import { useRef } from "react";
import { Application } from "../../../types";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import DetailsForm, { DetailsFormFields } from "./DetailsForm";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";
import { useApplicationSearch } from "../../../hooks/useApplicationSearch";
import { useUpdateApplicationStatusMutation } from "../../../services/apiSlice";

interface Props {
  application: Application;
}

const Applicant = ({ application }: Props) => {
  const detailsFormRef = useRef<ToggleHandle>(null);
  const toast = useToast();
  const [updateStatus, { error, isLoading }] =
    useUpdateApplicationStatusMutation();

  const handleClick = () => {
    if (detailsFormRef.current) {
      detailsFormRef.current.toggleVisibility();
    }
  };

  const status = application.status;
  const student = application.student;

  let styleByStatus =
    "my-4 p-4 rounded-md border-solid border-2 border-slate-400 flex ";
  if (status === "accepted") {
    styleByStatus += "bg-lime-100";
  } else if (status === "rejected") {
    styleByStatus += "bg-rose-200";
  } else {
    styleByStatus += "bg-neutral-300";
  }

  const initialFormValues = {
    status,
  };

  const handleUpdateStatus = async (value: DetailsFormFields) => {
    console.log(value);
    const oldStatus = status;
    const newStatus = value.status;

    if (oldStatus === newStatus) {
      toast({
        status: "warning",
        title: "Error",
        description: "Must choose a new status",
        isClosable: true,
      });
    } else {
      const newStatusObject = {
        status: newStatus,
        applicationId: application.id,
      };
      try {
        if (!isLoading) await updateStatus(newStatusObject).unwrap();
        toast({
          status: "success",
          title: "New job.",
          description: "Successfully updated this application.",
          isClosable: true,
        });

        if (detailsFormRef.current) {
          detailsFormRef.current.toggleVisibility();
        }
      } catch (err) {
        console.error("Failed to updated this job: ", err);
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
    <div className={styleByStatus}>
      <div className="flex items-center">
        <img
          src={student.profilePicture.fileUrl}
          className="object-contain w-11 h-11 rounded-full mr-3"
          alt="profilePicture"
        />
        <p className="font-semibold">{student.fullName}</p>
      </div>
      <div className="ml-auto">
        <button onClick={handleClick} className="btn-2">
          View Details
        </button>
        <DetailsForm
          resumeUrl={application.resumeUrl}
          detailsFormRef={detailsFormRef}
          initialFormValues={initialFormValues}
          handleSubmit={handleUpdateStatus}
        />
      </div>
    </div>
  );
};

const ApplicantsList = ({
  applications,
  searchValue,
  filterBy,
}: {
  applications: Application[];
  searchValue: string;
  filterBy: string;
}) => {
  let applicationsToShow = useApplicationSearch(searchValue, applications);

  if (applicationsToShow.length <= 0) {
    return (
      <div className="text-center font-semibold">No applicants to display</div>
    );
  }

  if (filterBy !== "all") {
    applicationsToShow = applicationsToShow.filter((application) => application.status === filterBy);
  }

  console.log(searchValue);
  return (
    <div className="flex flex-col overflow-auto">
      {applicationsToShow.map((application) => {
        return <Applicant key={application.id} application={application} />;
      })}
    </div>
  );
};

export default ApplicantsList;
