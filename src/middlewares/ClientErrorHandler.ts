/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:17:49
 * @modify date 2022-02-22 19:17:49
 * @desc [Client Error handler]
 */


import { NextFunction, Request, Response } from "express";

export default function (err:Error, req:Request, res:Response, next:NextFunction) {
    if (res.headersSent) {
        next(err);
    };
    res.status(500).json({
        error : true,
        message : err.message || "Something went wrong, try again later"
    }).end();
}
