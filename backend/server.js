require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const swagger = require("./swagger");

const app = express();

const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup);

app.listen(port, () => {
  console.log(`app started on http://localhost:${port}`);
});
