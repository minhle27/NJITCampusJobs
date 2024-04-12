import { Application } from "../../../types";

interface Props {
  applications: Application[];
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
}

const StatBar = ({ applications, setFilterBy }: Props) => {
  const accepted = applications.filter(
    (each) => each.status === "accepted"
  ).length;
  const rejected = applications.filter(
    (each) => each.status === "rejected"
  ).length;
  const pending = applications.filter(
    (each) => each.status === "pending"
  ).length;
  const all = accepted + rejected + pending;

  const handleAcceptedClick = () => {
    setFilterBy("accepted");
  };

  const handleRejectedClick = () => {
    setFilterBy("rejected");
  };

  const handlePendingClick = () => {
    setFilterBy("pending");
  };

  const handleAllClick = () => {
    setFilterBy("all");
  };

  return (
    <div className="flex justify-between font-bold pt-1 pb-4 border-b-2 border-slate-700">
      <button
        onClick={handleAcceptedClick}
        className="mr-5 font-semibold rounded-md shadow-md py-2 px-5 bg-lime-100"
      >
        Accepted: {accepted}
      </button>
      <button
        onClick={handleRejectedClick}
        className="mr-5 font-semibold rounded-md shadow-md py-2 px-5 bg-rose-200"
      >
        Rejected: {rejected}
      </button>
      <button
        onClick={handlePendingClick}
        className="mr-5 font-semibold rounded-md shadow-md py-2 px-5 bg-neutral-300"
      >
        In review: {pending}
      </button>
      <button
        onClick={handleAllClick}
        className="mr-5 font-semibold rounded-md shadow-md py-2 px-5 bg-orange-200"
      >
        All: {all}
      </button>
    </div>
  );
};

export default StatBar;
