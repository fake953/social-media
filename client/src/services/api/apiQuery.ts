import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiQuery = createApi({
  reducerPath: "apiQuery",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://social-media-sandy-five.vercel.app",
    // baseUrl: "http://localhost:5000",
    baseUrl: "https://social-media-api-rnw6.onrender.com",
  }),
  endpoints: (builder) => ({
    //AUTHENTICATION ENDPOINTS
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUsr: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    // POST ENDPOINTS

    // GET
    getAllPosts: builder.query({
      query: () => `/posts`,
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    getUserPosts: builder.query({
      query: (userId) => `/posts/${userId}/posts`,
    }),

    // PATCH
    likePost: builder.mutation({
      query: ({ id, userId, secret }) => ({
        url: `/posts/${id}/like`,
        method: "PATCH",
        body: { userId },
        headers: {
          Authorization: `bearer ${secret}`,
        },
      }),
    }),

    // POST
    createPost: builder.mutation({
      query: ({ formData, secret }) => ({
        url: "/posts",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `bearer ${secret}`,
        },
      }),
    }),

    // USER ENDPOINTS
    // GET
    getUserInformation: builder.mutation({
      query: (params) => ({
        url: `/users/${params.id}`,
        headers: {
          Authorization: `bearer ${params.secret}`,
        },
      }),
    }),

    getUserFriends: builder.mutation({
      query: ({ id, secret }) => ({
        url: `/users/${id}/friends`,
        headers: {
          Authorization: `bearer ${secret}`,
        },
      }),
    }),
    // PATCH
    updateUserFriendsList: builder.mutation({
      query: ({ id, friendId, secret }) => ({
        url: `/users/${id}/${friendId}`,
        method: "PATCH",
        headers: {
          Authorization: `bearer ${secret}`,
        },
      }),
    }),
    getOtherUsersDetail: builder.query({
      query: ({ id }) => `/users/profiles/${id}`,
    }),
    getOtherUsersFriends: builder.mutation({
      query: ({ id }) => `/users/profiles/${id}/friends`,
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useRegisterUserMutation,
  useLoginUsrMutation,
  useCreatePostMutation,
  useGetUserPostsQuery,
  useLikePostMutation,
  useGetPostQuery,
  useGetUserInformationMutation,
  useGetUserFriendsMutation,
  useUpdateUserFriendsListMutation,
  useGetOtherUsersDetailQuery,
  useGetOtherUsersFriendsMutation,
} = apiQuery;
