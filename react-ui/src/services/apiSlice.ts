import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { Employer } from "../types";
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
        ...result.map(({ id }: { id: string }) => ({
          type: "Post" as const,
          id,
        })),
      ],
    }),
    getEmployer: builder.query<Employer, string>({
      query: (employerId) => `/employer/${employerId}`,
    }),
    addNewUser: builder.mutation({
      query: (registerInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: registerInfo,
      }),
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
        return {
          url: `/post/${id}`,
          method: "PATCH",
          body: post,
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),

    getAllPosts: builder.query<JobPost[], void>({
      query: () => "/post",
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginUserMutation,
  useGetEmployerPostsQuery,
  useGetEmployerQuery,
  useCreateNewJobMutation,
  useEditPostMutation,
  useGetAllPostsQuery,
} = apiSlice;
