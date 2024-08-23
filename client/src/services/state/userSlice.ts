import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userType = {
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
  token: string | null;
}

const initialState: state = {
  user: null,
  token: null,
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
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
