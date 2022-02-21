/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:41:31
 * @modify date 2022-02-21 18:41:31
 * @desc [Reset password controller : For users who have forgotten their password]
 */

import { NextFunction, Response, Request } from "express";
import { checkValidEmail } from "../libs/libs";
import passResetModel from "../models/passwordReset";
import User from "../models/user";
import { RandomStringId, sendEmailVerificationLink as sendEmailResetCode} from "./SignIn";

export async function resetPassword (req:Request, res:Response, next:NextFunction) {
    let email = req.body.email;
    // now that check if this email is valid
    if (!checkValidEmail(req.body.email)){
        return next(new Error("Invalid email address"));
    }
    // now check if this email is used by a user (true email because it exists in the database)
    try{
        let user = User.findOne({
            email: email
        }).exec();
        if (!user){
            // the email is fake
            return res.json({
                error: true,
                message: "This email does not match any account!"
            });
        }
        // this email is legit
        // send a code (reset code ) this email
        try{
            // Size of 22 to be reassured of the uniqueness of the code
            let resetcode = RandomStringId(22);
            sendEmailResetCode("judearist@gmail.com", email, resetcode);
        }catch(err){
            return next(new Error("an unexpected error has just occurred, please try again :)"));
        }
    }catch(err){
        return next(new Error("an unexpected error has just occurred, please try again :)"));
    }
    // create a new password reset
    try{
        let passwordReset = await passResetModel.findOne({
            email : email
        }).exec();

        if (passwordReset !== null){
            // then we have already send a code to this email to reset password
        }
    }catch(err){
        return next(err);
    }
}

export async function passwordResetControllerVerifyCode (req:Request, res:Response, next:NextFunction) {

}


export async function passwordResetControllerNewCredentials (req:Request, res:Response, next:NextFunction) {

}
