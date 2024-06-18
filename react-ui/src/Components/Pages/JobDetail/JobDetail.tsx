import PostExcerpt from "../EmployerDashboard/PostExcerpt";
import { useGetAllPostsQuery } from "../../../services/apiSlice";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { JobPost } from "../../../types";
import JobDetailChild from "../../Modules/JobDetailChild";
import { Spinner } from "@chakra-ui/react";

const JobDetail = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

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

  if (!postById) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <section className="flex flex-col h-full overflow-auto">
      <section className="flex flex-col justify-center items-center grow">
        <PostExcerpt post={postById!}>
          <JobDetailChild post={postById!} />
        </PostExcerpt>
      </section>
    </section>
  );
};

export default JobDetail;
