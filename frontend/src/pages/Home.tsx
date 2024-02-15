import WorkoutsDetails from "../components/WorkoutsDetails";
import WorkoutForm from "../components/WorkoutForm";
import useAxios from "../hooks/useAxios";
import workoutModel from "../models/wokout.mode";
import { useAppDispatch, useAppSelector } from "../hooks/AppRedux";
import { setWorkouts } from "../rtk/slices/workouts.slice";
import { useEffect } from "react";

function Home() {
  const dispatch = useAppDispatch();
  const workouts: workoutModel[] = useAppSelector((state) => state.workouts);
  const { data } = useAxios<workoutModel[]>("workouts");

  useEffect(() => {
    if (data) {
      dispatch(setWorkouts(data));
    }
  }, [data]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
