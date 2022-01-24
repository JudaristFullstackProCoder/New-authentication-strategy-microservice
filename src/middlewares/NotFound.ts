
import { NextFunction, Request, Response } from "express";
import {NotFound} from "../middlewares/Responses.js";

export default function (req:Request, res:Response, next:NextFunction) {
    return NotFound(req, res, next);
}
