require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workout.route");

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/workouts", workoutRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db successfuly");
    app.listen(port, () => {
      console.log(`app started on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
