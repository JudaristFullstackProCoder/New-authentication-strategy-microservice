import { NextFunction, Request, Response } from "express";
import {Logout} from "../middlewares/Responses.js";

export default function logout (req:Request, res:Response, next:NextFunction):Response {
        // Clear the authentication cookie
        return Logout(req, res, next);
}
