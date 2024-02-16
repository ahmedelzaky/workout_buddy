import WorkoutsDetails from "../components/WorkoutsDetails";
import WorkoutForm from "../components/WorkoutForm";
import useGet from "../hooks/useGet";
import workoutModel from "../models/wokout.mode";
import { useAppDispatch, useAppSelector } from "../hooks/AppRedux";
import { setWorkouts } from "../rtk/slices/workouts.slice";
import { useEffect } from "react";

function Home() {
  const dispatch = useAppDispatch();
  const workouts: workoutModel[] = useAppSelector((state) => state.workouts);
  const { data, error } = useGet<workoutModel[]>("workouts");

  useEffect(() => {
    if (data) {
      dispatch(setWorkouts(data));
    }
  }, [data, dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))
        ) : (
          <div> get up and add some workout </div>
        )}
      </div>
      <WorkoutForm />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Home;
