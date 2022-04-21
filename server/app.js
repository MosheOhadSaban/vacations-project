const express = require("express");
const app = express();
const usersController = require("./controllers/users-controller");
const vacationController = require("./controllers/vacations-controller");
const followedVacationsController = require("./controllers/followedVacations-controller");
const fileController = require("./controllers/file-controller");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const loginFilter = require("./middleware/login-filter");
const errorHandler = require("../vacations-server/errors/error-handler");
const { createServer } = require("http");
const server = createServer(app);

app.use(fileUpload());
app.use(express.static("files"));
app.use(express.json()); //middleware
app.use(loginFilter()); //middleware
app.use(cors({ origin: "http://localhost:3000" })); //middleware
app.use(morgan("dev"));

app.use("/users", usersController); //middleware
app.use("/vacations", vacationController); //middleware
app.use("/followVacations", followedVacationsController); //middleware
app.use("/files", fileController); //middleware
app.use(errorHandler); // erorr middleware

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
