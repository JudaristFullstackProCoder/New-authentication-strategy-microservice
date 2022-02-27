/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:20:26
 * @modify date 2022-02-22 19:20:26
 * @desc [Authentication Server]
 */

// modules imports
import cookieParser from "cookie-parser";
import cors from "cors";

// Third library imports
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

    // .env file
import {resolve} from "path";
import {config} from "dotenv";
config({path: resolve(".env")});
config({path: resolve(".env.dev")});

const app = express();

// custom modules imports
import appRoutes from "../routes/authentication.js";
import connection from '../db/connection.js';
import clientErrorHandler from '../middlewares/ClientErrorHandler.js';
import ErrorLogger from '../middlewares/ErrorLogger.js';
import NotFound from '../middlewares/NotFound.js';
import AU from "../controllers/ActivateUser.js";

// Middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api/v1", appRoutes);
app.get("/api/v1/user/verify", AU);

// Error handler middleware
app.use(ErrorLogger, clientErrorHandler);

// Handle not found route
app.use("*", NotFound);

// start the server if the database connection succed

try {
    if (process.env.NODE_ENV === "production"){
        connection(process.env.MONGODBURI || "");
    }else{
        connection(process.env.mongodb || "")
    }
    app.listen(process.env.port);
    // console.log(`app is running on port ${process.env.port}`);
}catch(err) {
    // console.log("The server can't start ");
    console.log(err);
}
