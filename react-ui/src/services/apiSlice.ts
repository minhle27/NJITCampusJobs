import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import {
  Application,
  BaseUser,
  Conversation,
  Employer,
  Message,
  Student,
} from "../types";
import { JobPost } from "../types";
import { socket } from "../client-socket";

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
  tagTypes: ["Post", "Application"],
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
    getStudentApplications: builder.query<Application[], string>({
      query: (studentId) => `/application/student/${studentId}`,
      providesTags: (result = []) => [
        "Application",
        ...result.map(({ id }: { id: string }) => ({
          type: "Application" as const,
          id,
        })),
      ],
    }),
    getApplicationsByPost: builder.query<Application[], string>({
      query: (postId) => `/application/post/${postId}`,
      providesTags: (result = []) => [
        "Application",
        ...result.map(({ id }: { id: string }) => ({
          type: "Application" as const,
          id,
        })),
      ],
    }),
    getEmployer: builder.query<Employer, string>({
      query: (employerId) => `/employer/${employerId}`,
    }),
    getStudent: builder.query<Student, string>({
      query: (studentId) => `/student/${studentId}`,
    }),
    getUserById: builder.query<BaseUser, string>({
      query: (userId) => `/user/${userId}`,
    }),
    addNewUser: builder.mutation({
      query: (registerInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: registerInfo,
      }),
    }),

    addNewApplication: builder.mutation({
      query: (applicationInfo) => ({
        url: "/application",
        method: "POST",
        body: applicationInfo,
      }),
    }),

    updateApplicationStatus: builder.mutation({
      query: ({ status, applicationId }) => {
        return {
          url: `/application/${applicationId}`,
          method: "PATCH",
          body: { status },
        };
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "Application", id: arg.id },
      ],
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
    initSocket: builder.mutation({
      query: (socketid) => ({
        url: "/initsocket",
        method: "POST",
        body: { socketid },
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

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    withdrawApplication: builder.mutation({
      query: (id) => ({
        url: `/application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Application", id: arg.id },
      ],
    }),
    sendNewMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/message",
        method: "POST",
        body: newMessage,
      }),
    }),
    getConversationByUser: builder.query<Conversation[], string>({
      query: (userId) => `/conversation/${userId}`,
    }),
    getMessageByConversation: builder.query<Message[], string>({
      query: (conversationId) => `/message/conversation/${conversationId}`,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const addMessages = (message: Message) => {
          console.log(message);
          updateCachedData((draft) => {
            draft.push(message);
          });
        };
        try {
          await cacheDataLoaded;
          socket.on("message", addMessages);
        } catch (err) {
          console.error(err);
        }
        await cacheEntryRemoved;
        socket.off("message", addMessages);
      },
    }),

    getAllPosts: builder.query<JobPost[], void>({
      query: () => "/post",
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
  useGetStudentApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useGetApplicationsByPostQuery,
  useSendNewMessageMutation,
  useGetConversationByUserQuery,
  useGetUserByIdQuery,
  useGetMessageByConversationQuery,
  useWithdrawApplicationMutation,
  useGetAllPostsQuery,
  useAddNewApplicationMutation,
  useInitSocketMutation,
} = apiSlice;
