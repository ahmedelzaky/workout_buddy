import { configureStore } from "@reduxjs/toolkit";
import workoutsSlice from "./slices/workouts.slice";
import authSlice from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
