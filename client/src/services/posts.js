import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => `posts`,
    }),
  }),
});
export const { useGetAllPostsQuery } = postsApi;
