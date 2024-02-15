import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
    logout: () => {
      return "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
