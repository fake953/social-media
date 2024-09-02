import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
};

interface state {
  user: userType | null;
  token: string | string;
}

const initialState: state = {
  user: null,
  token: "",
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ user: userType; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      //   state.user = null;
      state.token = "";
    },
    setUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
    },
    setUserFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("user friends non-existent :(");
      }
    },
  },
});

export const { setLogin, setLogout, setUserFriends, setUser } =
  userSlice.actions;

export default userSlice.reducer;
