import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiQuery = createApi({
  reducerPath: "apiQuery",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    // POST ENDPOINTS
    getAllPosts: builder.query({
      query: () => `posts`,
    }),

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
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetAllPostsQuery,
  useRegisterUserMutation,
  useLoginUsrMutation,
} = apiQuery;
