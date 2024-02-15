import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import workoutModel from "../../models/wokout.mode";

type WorkoutState = workoutModel[];

const initialState: WorkoutState = [];

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setWorkouts: (_state, action: PayloadAction<WorkoutState>) =>
      action.payload,
    createWorkout: (state, action: PayloadAction<workoutModel>) => {
      return [action.payload, ...state];
    },
    deleteWorkout: (state, action: PayloadAction<string>) => {
      return state.filter((ele) => ele._id != action.payload);
    },
  },
});

export const { setWorkouts, createWorkout, deleteWorkout } =
  workoutsSlice.actions;

export default workoutsSlice.reducer;
