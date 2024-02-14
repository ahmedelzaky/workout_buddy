const express = require("express");
const {
  getAllWorkout,
  addWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workout.controller");

const workoutRouter = express.Router();

workoutRouter.get("/", getAllWorkout).post("/", addWorkout);
workoutRouter
  .get("/:id", getWorkout)
  .patch("/:id", updateWorkout)
  .delete("/:id", deleteWorkout);

module.exports = workoutRouter;
