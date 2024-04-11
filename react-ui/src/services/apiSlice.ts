import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { Employer, Student } from "../types";
import { JobPost } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getEmployerPosts: builder.query<JobPost[], string>({
      query: (employerId) => `/post/employer/${employerId}`,
      providesTags: (result = []) => [
        "Post",
        ...result.map(({ id }: { id: string }) => ({ type: "Post" as const, id })),
      ],
    }),
    getEmployer: builder.query<Employer, string>({
      query: (employerId) => `/employer/${employerId}`,
    }),
    getStudent: builder.query<Student, string>({
      query: (studentId) => `/student/${studentId}`,
    }),
    addNewUser: builder.mutation({
      query: (registerInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: registerInfo,
      }),
    }),
    updateApplicantStatus: builder.mutation({
      query: (application) => {
        const postId = application.postId;
        delete application.postId;
        return ({
          url: `/post/${postId}/applicants`,
          method: "PATCH",
          body: application,
        })
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    createNewJob: builder.mutation({
      query: (newJob) => ({
        url: "/post",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ["Post"],
    }),
    loginUser: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
    editPost: builder.mutation({
      query: (post) => {
        const id = post.id;
        delete post.id;
        return ({
          url: `/post/${id}`,
          method: "PATCH",
          body: post,
        })
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetEmployerPostsQuery,
  useGetEmployerQuery,
  useGetStudentQuery,
  useCreateNewJobMutation,
  useEditPostMutation,
  useAddNewUserMutation,
  useLoginUserMutation,
  useDeletePostMutation,
  useUpdateApplicantStatusMutation
} = apiSlice;
