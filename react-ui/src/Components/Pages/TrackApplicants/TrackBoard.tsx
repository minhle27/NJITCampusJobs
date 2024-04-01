import { useState } from "react";
import { JobPost, Student } from "../../../types";
import SearchBar from "../../Modules/SearchBar";

interface StudentWithStatus {
  student: Student;
  status: string;
}

const StatBar = ({ post }: { post: JobPost }) => {
  const accepted = post.applicants.accepted.length;
  const rejected = post.applicants.rejected.length;
  const pending = post.applicants.pending.length;
  const all = accepted + rejected + pending;

  return (
    <div className="flex justify-between font-bold px-2">
      <p className="mr-5">Accepted: {accepted}</p>
      <p className="mr-5">Rejected: {rejected}</p>
      <p className="mr-5">In review: {pending}</p>
      <p>All: {all}</p>
    </div>
  );
};

const Applicants = ({ student }: { student: StudentWithStatus }) => {
  return (
    <div>
      <p>{student.student.fullName}</p>
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

  const allList : StudentWithStatus[] = acceptedList
    .map((student) => ({ student, status: "accepted" }))
    .concat(rejectedList.map((student) => ({ student, status: "rejected" })))
    .concat(pendingList.map((student) => ({ student, status: "pending" })));

  return (
    <div className="flex flex-col">
      {allList.map((each) => (
        <Applicants key={each.student.id} student={each} />
      ))}
      <p>{searchValue}</p>
    </div>
  );
};

const TrackBoard = ({ post }: { post: JobPost }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col w-full max-w-[70%] bg-gray-200 p-5 m-7 shadow-lg rounded-lg divide-y divide-dashed">
      <StatBar post={post} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ApplicantsList post={post} searchValue={searchValue} />
    </div>
  );
};

export default TrackBoard;
