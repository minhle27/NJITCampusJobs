import { ApplicationWithStatus, JobPost } from "../../../types";

const Applicant = ({ application }: { application: ApplicationWithStatus }) => {
  const handleClick = () => {
    console.log("hello");
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
      </div>
    </div>
  );
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
    .map((application) => ({ ...application, status: "accepted" }))
    .concat(
      rejectedList.map((application) => ({
        ...application,
        status: "rejected",
      }))
    )
    .concat(
      pendingList.map((application) => ({ ...application, status: "pending" }))
    );

  if (allList.length <= 0) {
    return (
      <div className="text-center font-semibold">No applicants to display</div>
    );
  }

  const bySearchField = (p: ApplicationWithStatus) =>
    p.student.fullName.toLowerCase().includes(searchValue.toLowerCase());
  const applicationsToShow =
    searchValue && allList ? allList.filter(bySearchField) : allList;

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
