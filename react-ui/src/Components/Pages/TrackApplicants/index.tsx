import { useAuth } from "../../../hooks/useAuth";
import { useGetEmployerPostsQuery } from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { JobPost } from "../../../types";
import TrackBoard from "./TrackBoard";
import ApplicantsTrackerLogo from "./ApplicantsTrackerLogo";
import { Spinner } from "@chakra-ui/react";

const TrackApplicants = () => {
  const { id: postId } = useParams();
  const employerId = useAuth().user?.id;

  const selectPostByID = useMemo(() => {
    return createSelector(
      (res) => res.data,
      (_res, postId) => postId,
      (data: JobPost[], postId) => data?.find((post) => post.id === postId)
    );
  }, []);

  const { postById, isLoading, isSuccess, isError, error } =
    useGetEmployerPostsQuery(employerId!, {
      selectFromResult: (result) => ({
        ...result,
        postById: selectPostByID(result, postId),
      }),
    });

  if (postById?.employer !== employerId) {
    return <div>Not allowed to access this page</div>;
  }

  let trackBoardContent;
  if (isLoading) {
    trackBoardContent = <Spinner />;
  } else if (isSuccess) {
    trackBoardContent = <TrackBoard post={postById!} />;
  } else if (isError) {
    trackBoardContent = <div>{error.toString()}</div>;
  }

  return (
    <Protected id={employerId!}>
      <div className="flex max-h-[93vh]">
        <div className="flex flex-col w-fit max-w-fit">
          <ApplicantsTrackerLogo />
        </div>
        {trackBoardContent}
      </div>
    </Protected>
  );
};

export default TrackApplicants;
