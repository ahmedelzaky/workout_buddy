import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../hooks/useAuth";

const initialState = JSON.parse(localStorage.getItem("user") || "{}");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
