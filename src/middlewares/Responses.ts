import { NextFunction, Request, Response } from "express";
import config from "../config.js"

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response}
 */
let NotFound:Function = function (req:Request, res:Response, next:NextFunction) : Response {
    if(res.headersSent) { 

     }
    return res.status(404).json({});
}

/**
 * 
 * @param {Response} res 
 * @returns {Response}
 */
let InvalidCredentials:Function = function (res:Response) {
    if(res.headersSent) { 
        
    }
    res.status(403).json({
        error : true,
        message : "Invalid Credentials"
    });
}

/**
 * 
 * @param {Response} res 
 * @returns {Response}
 */
let AuthenticationRequired:Function = function (res:Response) :Response {
    if(res.headersSent) { 
        
    }
    return res.status(403).json({
        error : true,
        data : "Authentication required"
    })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns 
 */
let Logout:Function =  function (req:Request, res:Response, next:NextFunction) {
    if(res.headersSent) { 
        
    }
    return res.clearCookie(config.user_token).json({
        success : true,
        data : "logout"
    });
}

/**
 * 
 * @param res 
 * @returns 
 */
let UnknowError:Function = function (res:Response) {
    if(res.headersSent) { 
        
    }
    return res.status(500).json({
        error : true,
        data: "An error occured, please retry !"
    });
}

/**
 * 
 * @param res 
 * @param data 
 * @returns 
 */
let Succes:Function = function (res:Response, data:any="OK") {
    if(res.headersSent) { 
        
    }
    return res.status(200).json({
        succes: true,
        data: data
    });
}

export {NotFound, AuthenticationRequired, InvalidCredentials, Logout, UnknowError, Succes};
