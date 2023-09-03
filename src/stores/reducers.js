import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  userName: "",
  access_token: "",
  contents: [],
  contentDetail: {},
  category: "general",
  user: {},
  clientIdGoogle: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setContents: (state, action) => {
      state.contents = action.payload;
    },
    setContentDetail: (state, action) => {
      state.contentDetail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setClientIdGoogle: (state, action) => {
      state.clientIdGoogle = action.payload;
    },
  },
});

export const {
  setContents,
  setContentDetail,
  setLoading,
  setUser,
  setUserName,
  setAccessToken,
  setClientIdGoogle,
} = appSlice.actions;

export default appSlice.reducer;
