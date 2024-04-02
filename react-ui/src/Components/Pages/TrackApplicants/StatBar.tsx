import { JobPost } from "../../../types";

const StatBar = ({ post }: { post: JobPost }) => {
  const accepted = post.applicants.accepted.length;
  const rejected = post.applicants.rejected.length;
  const pending = post.applicants.pending.length;
  const all = accepted + rejected + pending;

  return (
    <div className="flex justify-between font-bold pt-1 pb-4 border-b-2 border-slate-700">
      <p className="mr-5">Accepted: {accepted}</p>
      <p className="mr-5">Rejected: {rejected}</p>
      <p className="mr-5">In review: {pending}</p>
      <p>All: {all}</p>
    </div>
  );
};

export default StatBar;