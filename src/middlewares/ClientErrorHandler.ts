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
