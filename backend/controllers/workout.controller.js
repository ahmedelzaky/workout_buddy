const WorkoutModel = require("../models/workout.model");

const getAllWorkout = async (req, res) => {
  const workouts = await WorkoutModel.find({ user_id: req.user._id })
    .sort({ createdAt: -1 })
    .exec();
  res.json(workouts);
};

const addWorkout = async (req, res) => {
  try {
    const workout = new WorkoutModel({ ...req.body, user_id: req.user._id });
    await workout.save();
    res.status(201).json({ success: true, workout });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await WorkoutModel.findById(id).exec();
    if (workout) {
      res.json({ success: true, workout });
    } else {
      res
        .status(404)
        .json({ success: false, message: "There is no Workout with this id" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    let workout = await WorkoutModel.findByIdAndUpdate(id, req.body).exec();
    if (workout) {
      workout = await WorkoutModel.findById(id).exec();
      res.json({ success: true, workout });
    } else {
      res
        .status(404)
        .json({ success: false, message: "There is no Workout with this id" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await WorkoutModel.findByIdAndDelete(id).exec();
    if (!workout) {
      res
        .status(404)
        .json({ success: false, message: "There is no Workout with this id" });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllWorkout,
  addWorkout,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
