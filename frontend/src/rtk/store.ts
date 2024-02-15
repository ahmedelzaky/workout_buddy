import { configureStore } from "@reduxjs/toolkit";
import workoutsSlice from "./slices/workouts.slice";

const store = configureStore({
  reducer: {
    workouts: workoutsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
