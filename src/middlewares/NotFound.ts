/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:18:35
 * @modify date 2022-02-22 19:18:35
 * @desc [NotFound middleware : this middleware handle "Not found route"]
 */


import { NextFunction, Request, Response } from "express";
import {NotFound} from "../middlewares/Responses.js";

export default function (req:Request, res:Response, next:NextFunction) {
    return NotFound(req, res, next);
}
