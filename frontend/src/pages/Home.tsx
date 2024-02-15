import WorkoutsDetails from "../components/WorkoutsDetails";
import WorkoutForm from "../components/WorloutForm";
import useAxios from "../hooks/useAxios";
import workoutModel from "../models/wokout.mode";

function Home() {
  const { data: workouts } = useAxios<workoutModel[]>("workouts");
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
