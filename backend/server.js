const express = require("express");
const morgan = require("morgan");
const swagger = require("./swagger");

const app = express();

const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swagger.serve, swagger.setup);

app.listen(port, () => {
  console.log("app started on http://localhost:3000");
});
