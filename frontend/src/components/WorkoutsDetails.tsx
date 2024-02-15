import axios from "axios";
import workoutModel from "../models/wokout.mode";
import { useAppDispatch } from "../hooks/AppRedux";
import { deleteWorkout } from "../rtk/slices/workouts.slice";
import { formatDistanceToNow } from "date-fns";

type WorkoutsDetailsProps = {
  workout: workoutModel;
};

function WorkoutsDetails({ workout }: WorkoutsDetailsProps) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_APP_API + `workouts/${workout._id}`
      );
      dispatch(deleteWorkout(workout._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong> {workout.load}
      </p>
      <p>
        <strong>Reps: </strong> {workout.reps}
      </p>
      <p>
        {" "}
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}{" "}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
}

export default WorkoutsDetails;
