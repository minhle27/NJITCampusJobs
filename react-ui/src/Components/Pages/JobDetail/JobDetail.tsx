import PostExcerpt from "../EmployerDashboard/PostExcerpt";
import { useGetAllPostsQuery } from "../../../services/apiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { JobPost } from "../../../types";

const JobDetailOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectPostByID = useMemo(() => {
    return createSelector(
      (res) => res.data,
      (_res, postId) => postId,
      (data: JobPost[], postId) => data?.find((post) => post.id === postId)
    );
  }, []);

  const { postById } = useGetAllPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postById: selectPostByID(result, id),
    }),
  });

  return <></>;
};

const JobDetail = ({ post }) => {
  return <></>;
};

export default JobDetail;
