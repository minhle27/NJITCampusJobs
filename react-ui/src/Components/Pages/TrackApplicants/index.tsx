import { useAuth } from "../../../hooks/useAuth";
import { useGetEmployerPostsQuery } from "../../../services/apiSlice";
import Protected from "../../Modules/Protected";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { JobPost } from "../../../types";

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

  if (postById?.employer !== employerId) {
    return (
      <div>
        Not allowed to access this page
      </div>
    );
  }

  return (
    <Protected id={employerId!}>
      <div>{postById?.jobDescription}</div>
    </Protected>
  );
};

export default TrackApplicants;
