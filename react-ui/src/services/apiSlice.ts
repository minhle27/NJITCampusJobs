import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { JobPost } from "../types";
import { Employer } from "../types";

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
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getEmployerPosts: builder.query<Array<JobPost>, string>({
      query: (employerId) => `/post/employer/${employerId}`,
      providesTags: ['Post']
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
      invalidatesTags: ['Post']
    }),
    loginUser: builder.mutation({
      query: (loginInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInfo,
      }),
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useLoginUserMutation,
  useGetEmployerPostsQuery,
  useGetEmployerQuery,
  useCreateNewJobMutation
} = apiSlice;
