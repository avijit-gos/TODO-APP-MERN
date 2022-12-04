/** @format */

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const database = require("./db");
const fileUpload = require("express-fileupload");

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFiles: true,
  })
);

const port = process.env.PORT || 6050;

app.use("/api/user", require("./routes/users/usersRoutes"));
app.use("/api/task", require("./routes/tasks/tasksRoutes"));

app.listen(port, () => console.log(`App listening on port:${port}`));

module.exports = app;
