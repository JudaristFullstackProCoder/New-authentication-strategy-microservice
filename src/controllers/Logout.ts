/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:37:29
 * @modify date 2022-02-21 18:37:29
 * @desc [Logout controller]
 */

import { NextFunction, Request, Response } from "express";
import {Logout} from "../middlewares/Responses.js";

export default function logout (req:Request, res:Response, next:NextFunction):Response {
        // Clear the authentication cookie
        return Logout(req, res, next);
}
