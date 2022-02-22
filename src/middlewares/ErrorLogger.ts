/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:18:10
 * @modify date 2022-02-22 19:18:10
 * @desc [Error logger middleware]
 */

import { NextFunction, Request, Response } from "express";

export default function (err:Error, req:Request, res:Response, next:NextFunction) {
    console.error(err.message);
    next(err);
}
