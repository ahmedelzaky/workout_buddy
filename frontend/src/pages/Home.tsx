import WorkoutsDetails from "../components/WorkoutsDetails";
import useAxios from "../hooks/useAxios";
import workoutModel from "../models/wokout.mode";

function Home() {
  const { data: workouts } = useAxios<workoutModel[]>("workouts");
  console.log(workouts);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
}

export default Home;
