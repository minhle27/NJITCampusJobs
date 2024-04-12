import { useGetStudentApplicationsQuery } from "../../../services/apiSlice";
import PostExcerpt from "../EmployerDashboard/PostExcerpt";
import { Application } from "../../../types";
import Confirmation from "../../Modules/Confirmation";
import { Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import { formatDate, getErrorMessage } from "../../../utils";
import { useWithdrawApplicationMutation } from "../../../services/apiSlice";

interface ApplicationsListProps {
  studentId: string;
  searchValue: string;
}

interface StudentPostOptionsProps {
  application: Application;
}

const StudentPostOptions = ({ application }: StudentPostOptionsProps) => {
  const status = application.status;
  const [withdraw, { isLoading, error }] = useWithdrawApplicationMutation();
  const toast = useToast();
  const { onClose } = useDisclosure();

  let styleByStatus = "font-semibold mr-3 ";
  if (status === "accepted") {
    styleByStatus += "text-green-500";
  } else if (status === "rejected") {
    styleByStatus += "text-rose-600";
  } else {
    styleByStatus += "text-slate-500";
  }

  const handleWithdraw = async () => {
    if (!isLoading) {
      try {
        await withdraw(application.id).unwrap();
        toast({
          status: "success",
          title: "Withdraw application.",
          description: "Successfully withdrawed this job.",
          isClosable: true,
        });
        onClose();
      } catch (err) {
        console.error("Failed to delete this job: ", err);
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
    <section className="flex flex-col">
      <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700 mt-auto"></hr>
      <div className="flex justify-end items-center">
        <div className="mr-auto ml-3 items-center">
          <Confirmation
            outerBtnLabel="Withdraw"
            actionBtnLable="Withdraw"
            handleAction={handleWithdraw}
            header="Withdraw this application"
            body="Are you sure? You cannot undo this"
          />
        </div>
        <p className="font-semibold mr-3">
          Submitted on: {formatDate(application.createdAt.toString())}
        </p>
        <p className={styleByStatus}>Status: {application.status}</p>
      </div>
    </section>
  );
};

const ApplicationsList = ({
  studentId,
  searchValue,
}: ApplicationsListProps) => {
  const { data: applications, isSuccess } =
    useGetStudentApplicationsQuery(studentId);

  const bySearchField = (p: Application) =>
    p.job.title.toLowerCase().includes(searchValue.toLowerCase());
  const applicationsToShow =
    searchValue && applications
      ? applications.filter(bySearchField)
      : applications;

  let content;
  if (isSuccess && applicationsToShow) {
    content = applicationsToShow.map((application) => (
      <PostExcerpt key={application.id} post={application.job}>
        <StudentPostOptions application={application} />
      </PostExcerpt>
    ));
  } else {
    content = <Spinner />;
  }

  return (
    <div className="flex flex-col items-center grow overflow-y-auto mb-2">
      {content}
    </div>
  );
};

export default ApplicationsList;
