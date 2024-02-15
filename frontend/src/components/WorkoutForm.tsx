import { useState } from "react";
import axios, { AxiosError } from "axios";
import workoutModel from "../models/wokout.mode";
import { useAppDispatch } from "../hooks/AppRedux";
import { createWorkout } from "../rtk/slices/workouts.slice";

type addResponse = {
  success: boolean;
  workout: workoutModel;
  message: string;
};

function WorkoutForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState<number | string>("");
  const [reps, setReps] = useState<number | string>("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await axios.post<addResponse>(
        import.meta.env.VITE_APP_API + "workouts",
        {
          title,
          load,
          reps,
        }
      );
      dispatch(createWorkout(res.data.workout));
      setTitle("");
      setReps("");
      setLoad("");
      setError("");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || error.message);
      }
    }
    setPending(false);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label> Excersize Title: </label>
      <input
        type="text"
        name="title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label> Load (in kg):</label>
      <input
        type="number"
        name="load"
        value={load}
        required
        onChange={(e) => setLoad(+e.target.value)}
      />
      <label> Excersize Title: </label>
      <input
        type="number"
        name="reps"
        required
        value={reps}
        onChange={(e) => setReps(+e.target.value)}
      />
      <button disabled={pending} type="submit">
        Add Workout{" "}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
