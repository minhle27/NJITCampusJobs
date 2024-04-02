import { ApplicationWithStatus, JobPost } from "../../../types";
import { useGetStudentQuery } from "../../../services/apiSlice";
import { Spinner } from "@chakra-ui/react";

const Applicant = ({ application }: { application: ApplicationWithStatus }) => {
  const {
    data: student,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetStudentQuery(application.student);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess && student) {
    content = (
      <div className="my-5 bg-green-300 p-3 rounded-md">
        <p>{student.email}</p>
      </div>
    );
    console.log(content);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
};

const ApplicantsList = ({
  post,
  searchValue,
}: {
  post: JobPost;
  searchValue: string;
}) => {
  const acceptedList = post.applicants.accepted;
  const rejectedList = post.applicants.rejected;
  const pendingList = post.applicants.pending;

  const allList: ApplicationWithStatus[] = acceptedList
    .map((student) => ({ ...student, status: "accepted" }))
    .concat(rejectedList.map((student) => ({ ...student, status: "rejected" })))
    .concat(pendingList.map((student) => ({ ...student, status: "pending" })));

  console.log(searchValue);
  if (allList.length <= 0) {
    return (
      <div className="text-center font-semibold">No applicants to display</div>
    );
  }

  return (
    <div className="flex flex-col">
      {allList.map((application) => {
        return <Applicant key={application.id} application={application} />;
      })}
    </div>
  );
};

export default ApplicantsList;