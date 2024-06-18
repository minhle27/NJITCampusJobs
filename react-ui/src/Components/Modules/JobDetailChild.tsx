import { JobPost } from "../../types";
import JobApply from "./JobApply";

interface JobDetailChildProps {
  post: JobPost;
}

const JobDetailChild = ({ post }: JobDetailChildProps) => {
  return (
    <section className="font-montserat h-job-description flex flex-col">
      <JobApply post={post} />
      <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700 mt-auto"></hr>
      <div className="m-4 bg-white grow overflow-y-auto">
        <div className="text-job-description font-semibold p-3">
          JOB DESCRIPTION
        </div>
        <div className="px-3 pb-3">{post.jobDescription}</div>
      </div>
    </section>
  );
};

export default JobDetailChild;
