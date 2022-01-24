import { NextFunction, Request, Response } from "express";
import {verifySync} from "../libs/libs.js";
import {getDeviceSerialNumber} from "../libs/libs.js";

/**
 * Retur true or not if the user is authenticated
 * @param {Request} req 
 * @returns {Boolean}
 */
let checkUserAuthentication:Function = async function (req:Request) {
    let auth = false;

    try {
        auth = verifySync(await getDeviceSerialNumber(), req.cookies.user_token);
    }catch(err){
        return false;
    }

    if (auth === true) {
        return true;
    }else{
        return false;
    }
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response}
 */
const getUserAuthenticationStatus = async function (req:Request, res:Response) {
    let auth = false;
    try {
        auth = verifySync(await getDeviceSerialNumber(), req.cookies.user_token || "");
    }catch(err){
        return res.status(403).json({
            error : true,
            authenticated : false
        });
    }

    if (auth === true) {
        return res.status(200).json({
            success : true, 
            authenticated : true
        });
    }else{
        return res.status(403).json({
            error : true,
            authenticated : false
        });
    }
    
}

/**
 * This function return 403 response if the user
 * isn't authenticated or pass to the next route if the
 * user il already authenticated
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns 
 */
const requireUserAuthentication = async function (req:Request, res:Response, next:NextFunction) {
    let auth = false;
    try {
        auth = verifySync(await getDeviceSerialNumber(), req.cookies.user_token);
    }catch(err){
        return next(new Error());
    }

    if (auth === true) {
        // if user is already logged then continue
        return next('route');
    }else{
        return res.status(403).json({
            error : true,
            message : "Authentication required ! please login"
        });
    }
    
}

export {requireUserAuthentication, getUserAuthenticationStatus, checkUserAuthentication};
