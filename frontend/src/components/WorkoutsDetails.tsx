import workoutModel from "../models/wokout.mode";

type WorkoutsDetailsProps = {
  workout: workoutModel;
};

function WorkoutsDetails({ workout }: WorkoutsDetailsProps) {
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong> {workout.load}
      </p>
      <p>
        <strong>Reps: </strong> {workout.reps}
      </p>
      <p> {workout.createdAt} </p>
    </div>
  );
}

export default WorkoutsDetails;
