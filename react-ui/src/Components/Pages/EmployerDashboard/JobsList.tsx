import { useNavigate, useParams } from "react-router-dom";
import {
  useEditPostMutation,
  useGetEmployerPostsQuery,
  useDeletePostMutation,
} from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import PostExcerpt from "./PostExcerpt";
import { JobPost } from "../../../types";
import { useRef } from "react";
import { ToggleHandle } from "../../Modules/FormFrameModal";
import JobForm from "./JobForm";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getErrorMessage } from "../../../utils";
import { JobFormFields } from "./JobForm";
import { DeleteOutlined } from "@ant-design/icons";
import { useJobSearch } from "../../../hooks/useJobSearch";

interface JobsListProps {
  employerId: string;
  searchValue: string;
}

const EmployerPostOptions = ({ post }: { post: JobPost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobFormRef = useRef<ToggleHandle>(null);
  const [updatePost, { isLoading: isLoadingUpdate, error: updateError }] =
    useEditPostMutation();
  const [deletePost, { isLoading: isLoadingDelete, error: deleteError }] =
    useDeletePostMutation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

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
    if (!isLoadingUpdate) {
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
          updateError && "data" in updateError
            ? JSON.stringify(updateError.data)
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

  const handleDeletePost = async () => {
    if (!isLoadingDelete) {
      try {
        await deletePost(post.id).unwrap();
        toast({
          status: "success",
          title: "New job.",
          description: "Successfully deleted this job.",
          isClosable: true,
        });
        onClose();
      } catch (err) {
        console.error("Failed to delete this job: ", err);
        const errorMessage =
          deleteError && "data" in deleteError
            ? JSON.stringify(deleteError.data)
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
          <div className="mr-auto ml-3 items-center">
            <button
              className="text-black text-xs place-self-end"
              onClick={onOpen}
            >
              <DeleteOutlined />
            </button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete This Job
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDeletePost} ml={3}>
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </div>
          <button
            onClick={handleEditClick}
            className="btn-primary my-3 mx-3 bg-purple-400 hover:bg-purple-300"
          >
            Edit Post
          </button>
          <button
            onClick={() => navigate(`/applicants/${post.id}`)}
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

  const postsToShow = useJobSearch(searchValue, posts);

  let content;
  if (isSuccess && postsToShow) {
    content = postsToShow.map((post) => (
      <PostExcerpt key={post.id} post={post}>
        <EmployerPostOptions post={post} />
      </PostExcerpt>
    ));
  } else {
    content = <Spinner />;
  }

  return (
    <div className="flex flex-col items-center grow overflow-y-auto">
      {content}
    </div>
  );
};

export default JobsList;
