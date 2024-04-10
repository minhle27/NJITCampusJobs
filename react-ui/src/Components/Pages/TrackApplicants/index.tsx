import { useAuth } from "../../../hooks/useAuth";
import { useGetEmployerPostsQuery } from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { JobPost } from "../../../types";
import TrackBoard from "./TrackBoard";
import ApplicantsTrackerLogo from "./ApplicantsTrackerLogo";

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

  const { postById } = useGetEmployerPostsQuery(employerId!, {
    selectFromResult: (result) => ({
      ...result,
      postById: selectPostByID(result, postId),
    }),
  });

  if (!postById) {
    return <div></div>;
  }

  return (
    <Protected id={postById!.employer}>
      <div className="flex max-h-[93vh]">
        <div className="flex flex-col w-fit max-w-fit">
          <ApplicantsTrackerLogo />
        </div>
        <TrackBoard postId={postId!} />
      </div>
    </Protected>
  );
};

export default TrackApplicants;
