import { createSlice } from "@reduxjs/toolkit";

type userType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
};
type postType = {
  _id: string;
  userId: string;
  first_name: string;
  last_name: string;
  location: string;
  description: string;
  userPicturePath: string;
  picturePath: string;
  likes: {
    userId: string;
    isLiked: boolean;
  };
  comment: string[];
};

type postsType = postType[];

interface slice {
  mode: string;
  user: userType | null;
  token: string | null;
  posts: postsType | [];
}
const initialState: slice = {
  user: null,
  mode: "light",
  token: null,
  posts: [],
};

export const statesSlice = createSlice({
  name: "statesSlice",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPosts,
  setPost,
  setUserFriends,
} = statesSlice.actions;
export default statesSlice.reducer;
