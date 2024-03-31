import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPostMutation,
  useGetEmployerPostsQuery,
} from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import PostExcerpt from "./PostExcerpt";
import { JobPost } from "../../../types";
import { useRef } from "react";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import JobForm from "./JobForm";
import { useToast } from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";
import { JobFormFields } from "./JobForm";

interface JobsListProps {
  employerId: string;
  searchValue: string;
}

const EmployerPostOptions = ({ post }: { post: JobPost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobFormRef = useRef<ToggleHandle>(null);
  const [updatePost, { isLoading, error }] = useEditPostMutation();
  const toast = useToast();

  const initialFormValues = {
    title: post.title,
    externalApplication: post.externalApplication,
    jobDescription: post.jobDescription,
    location: post.location,
    salary: post.salary.toString(),
  };

  const handleEditClick = () => {
    if (jobFormRef.current) {
      jobFormRef.current.toggleVisibility();
    }
  };

  const handleUpdateJob = async (value: JobFormFields) => {
    console.log(value);
    if (!isLoading) {
      try {
        await updatePost({ ...value, id: post.id }).unwrap();
        toast({
          status: "success",
          title: "New job.",
          description: "Successfully updated this job.",
          isClosable: true,
        });
        if (jobFormRef.current) {
          jobFormRef.current.toggleVisibility();
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
    <Protected id={id!}>
      <section className="flex flex-col">
        <hr className="h-px bg-gray-400 border-0 dark:bg-gray-700 mt-auto"></hr>
        <div className="flex justify-end items-center">
          <button
            onClick={handleEditClick}
            className="btn-primary my-3 mx-3 bg-purple-400 hover:bg-purple-300"
          >
            Edit Post
          </button>
          <button
            onClick={() => navigate(`/trackjob/${post.id}`)}
            className="btn-primary my-3 mx-3 bg-lime-400 hover:bg-lime-300"
          >
            Track Applicants
          </button>
        </div>
      </section>
      <JobForm
        jobFormRef={jobFormRef}
        initialFormValues={initialFormValues}
        isUpdate={true}
        handleSubmit={handleUpdateJob}
      />
    </Protected>
  );
};

const JobsList = ({ employerId, searchValue }: JobsListProps) => {
  const { data: posts, isSuccess } = useGetEmployerPostsQuery(employerId);

  const bySearchField = (p: JobPost) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase());
  const postsToShow =
    searchValue && posts ? posts.filter(bySearchField) : posts;

  let content;
  if (isSuccess && postsToShow) {
    content = postsToShow.map((post) => (
      <PostExcerpt key={post.id} post={post}>
        <EmployerPostOptions post={post} />
      </PostExcerpt>
    ));
  } else {
    content = <div>Posts is not available</div>;
  }

  return (
    <div className="flex flex-col items-center grow overflow-y-auto">
      {content}
    </div>
  );
};

export default JobsList;
