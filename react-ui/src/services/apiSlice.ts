import type { RootState } from '../app/store';
import type {
  Application,
  BaseUser,
  Conversation,
  Employer,
  JobPost,
  Message,
  Student,
  UploadedFileType,
  UploadFile,
} from '../types';
import type ListResponse from './interface/ListResponse';
import type PaginationParams from './interface/PaginationParams';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { socket } from '@/utils/client-socket';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Post', 'Application', 'Employer', 'Student', 'Conversation'],
  endpoints: builder => ({
    getEmployer: builder.query<Employer, string>({
      query: employerId => `/employer/${employerId}`,
      providesTags: ['Employer'],
    }),

    updateEmployerInformation: builder.mutation({
      query: ({ employerId, newEmployerInformation }) => {
        return {
          url: `/employer/${employerId}`,
          method: 'PATCH',
          body: newEmployerInformation,
        };
      },
      invalidatesTags: ['Employer'],
    }),

    getPostById: builder.query({
      query: id => `/posts/${id}`,
    }),
    getStudent: builder.query<Student, string>({
      query: studentId => `/student/${studentId}`,
    }),
    getUserById: builder.query<BaseUser, string>({
      query: userId => `/user/${userId}`,
    }),
    addNewUser: builder.mutation({
      query: registerInfo => ({
        url: '/auth/register',
        method: 'POST',
        body: registerInfo,
      }),
    }),

    uploadFile: builder.mutation<UploadedFileType, UploadFile>({
      query: fileData => ({
        url: '/upload',
        method: 'POST',
        body: fileData,
      }),
    }),

    addNewApplication: builder.mutation({
      query: ({ jobId, applicationInfo }) => ({
        url: `/posts/${jobId}/applications`,
        method: 'POST',
        body: applicationInfo,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Application', id: arg.id }],
    }),

    updateApplicationStatus: builder.mutation({
      query: ({ status, applicationId }) => {
        return {
          url: `/applications/${applicationId}`,
          method: 'PATCH',
          body: { status },
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: 'Application', id: arg.id }],
    }),
    createNewJob: builder.mutation({
      query: newJob => ({
        url: '/posts',
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ['Post'],
    }),
    loginUser: builder.mutation({
      query: loginInfo => ({
        url: '/auth/login',
        method: 'POST',
        body: loginInfo,
      }),
    }),
    initSocket: builder.mutation({
      query: socketid => ({
        url: '/initsocket',
        method: 'POST',
        body: { socketid },
      }),
    }),
    editPost: builder.mutation({
      query: post => {
        const id = post.id;

        delete post.id;

        return {
          url: `/posts/${id}`,
          method: 'PATCH',
          body: post,
        };
      },
      invalidatesTags: (_result, _error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    deletePost: builder.mutation({
      query: id => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Post', id: arg.id },
        { type: 'Post', id: 'PARTIAL-LIST' },
      ],
    }),
    withdrawApplication: builder.mutation({
      query: ({ applicationId, jobId }) => ({
        url: `/posts/${jobId}/applications/${applicationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Application', id: arg.id },
        { type: 'Application', id: 'PARTIAL-LIST' },
      ],
    }),
    sendNewMessage: builder.mutation({
      query: newMessage => ({
        url: '/message',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Conversation', id: arg.id }],
    }),
    initConversation: builder.mutation({
      query: ({ senderId, receiverId }) => ({
        url: '/conversation',
        method: 'POST',
        body: { senderId, receiverId },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Conversation', id: arg.id }],
    }),
    getConversationByUser: builder.query<Conversation[], string>({
      query: userId => `/conversation/${userId}`,
      providesTags: (result = []) => [
        'Conversation',
        ...result.map(({ id }: { id: string }) => ({
          type: 'Conversation' as const,
          id,
        })),
      ],
    }),
    getMessageByConversation: builder.query<Message[], string>({
      query: conversationId => `/message/conversation/${conversationId}`,
      async onCacheEntryAdded(_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const addMessages = (message: Message) => {
          updateCachedData(draft => {
            draft.push(message);
          });
        };

        try {
          await cacheDataLoaded;
          socket.on('message', addMessages);
        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        socket.off('message', addMessages);
      },
    }),

    getAllPosts: builder.query<ListResponse<JobPost>, PaginationParams>({
      query: ({ page, limit }) => `/posts?page=${page}&limit=${limit}`,
      providesTags: result =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Post' as const, id })), { type: 'Post', id: 'PARTIAL-LIST' }]
          : [{ type: 'Post', id: 'PARTIAL-LIST' }],
    }),

    getEmployerPosts: builder.query<
      ListResponse<JobPost>,
      { employerId: string; page: number; limit: number; search: string }
    >({
      query: ({ employerId, page, limit, search }) =>
        `/posts/employer/${employerId}?page=${page}&limit=${limit}&search=${search}`,
      providesTags: result =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Post' as const, id })), { type: 'Post', id: 'PARTIAL-LIST' }]
          : [{ type: 'Post', id: 'PARTIAL-LIST' }],
    }),

    getApplicationsByPost: builder.query<ListResponse<Application>, { postId: string; page: number; limit: number; filter: any }>({
      query: ({ postId, page, limit, filter }) => ({
        url: `/posts/${postId}/applications`,
        params: {
          page,
          limit,
          ...filter, 
        },
      }),

      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Application' as const, id })),
              { type: 'Application', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Application', id: 'PARTIAL-LIST' }],
    }),

    getStudentApplications: builder.query<ListResponse<Application>, { studentId: string; page: number; limit: number; filter: any }>({
      query: ({ studentId, page, limit, filter }) => ({
        url: `/student/${studentId}/applications`,
        params: {
          page,
          limit,
          ...filter, 
        },
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Application' as const, id })),
              { type: 'Application', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Application', id: 'PARTIAL-LIST' }],
    }),

    getPresignedUrl: builder.query({
      query: ({ userId, fileType, accountType }) =>
        `/generate-presigned-url?userId=${userId}&fileType=${fileType}&accountType=${accountType}`,
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
  useUploadFileMutation,
  useGetPostByIdQuery,
  useGetPresignedUrlQuery,
  useUpdateEmployerInformationMutation,
  useInitConversationMutation,
} = apiSlice;
