// Built-in modules imports
import cookieParser from "cookie-parser";
import cors from "cors";
// Third library imports
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
const app = express();
// custom modules imports
import appRoutes from "../routes/authentication.js";
import connection from '../db/connection.js';
import clientErrorHandler from '../middlewares/ClientErrorHandler.js';
import ErrorLogger from '../middlewares/ErrorLogger.js';
import NotFound from '../middlewares/NotFound.js';
import config from "../config.js";
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api/v1", appRoutes);
// Error handler middleware
app.use(ErrorLogger, clientErrorHandler);
// Handle not found route
app.use("*", NotFound);
// start the server if the database connection succed
try {
    connection(config.mongodb);
    app.listen(4422);
    console.log(`app is running on port ${4422}`);
}
catch (err) {
    console.log("The server can't start ");
    console.log(err);
}
