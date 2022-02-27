/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:41:31
 * @modify date 2022-02-21 18:41:31
 * @desc [Reset password controller : For users who have forgotten their password]
 */

import { NextFunction, Response, Request } from "express";
import { checkValidEmail } from "../libs/libs";
import { NotFound, Succes, InvalidCredentials } from "../middlewares/Responses";
import passResetModel from "../models/passwordReset";
import User from "../models/user";
import { RandomStringId, sendEmailVerificationLink as sendEmailResetCode} from "./SignIn";
import { hashSync } from "../libs/libs";

const unexpectedError = new Error("an unexpected error has just occurred, please try again :)");

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
        // Size of 22 to be reassured of the uniqueness of the code
        let resetcode = RandomStringId(22);
        await sendEmailResetCode("judearist@gmail.com", email, resetcode);
        // register the sended email in db
        // create a new password reset
        let passwordReset = await passResetModel.findOne({
            email : email,
            status: "started"
        }).exec();

        if (passwordReset !== null){
            // then we have already send a code to this email to reset password
            // delete the old db record
            await passResetModel.findOneAndDelete({
                _id: passwordReset._id
            }).exec();
        }

        let passResetDocument = new passResetModel({
            email: email,
            code: resetcode,
            status: "start"
        });

        await passResetDocument.save();

    }catch(err){
        return next(unexpectedError);
    }

}

export async function passwordResetControllerVerifyCode (req:Request, res:Response, next:NextFunction) {
    let email = req.body.email;
    let code = req.body.code;
    // Check that the code and the email are in the database (corresponds).
    try{
        let reset = await passResetModel.findOne({
            email: email,
            code: code,
            status: "started"
        }).exec();

        if(!reset){
            // This code and this email address do not correspond to a database record.
            return NotFound(req, res, next);
        }
        // This code and this email address correspond to a record in the database.
        let updated = passResetModel.findOneAndUpdate({
            email: email,
            code: code,
            status: "started"
        }, {
            status: "pending"
        }, {
            new: true
        }).exec();

        return Succes(updated);

    }catch(err){
        return next(unexpectedError);
    }
}


export async function passwordResetControllerNewCredentials (req:Request, res:Response, next:NextFunction) {
   
    let email = req.body.email;
    let code = req.body.code;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword){
        return InvalidCredentials(res);
    }

    try{
        let reset = passResetModel.findOne({
            email: email,
            code: code,
            status: "pending"
        }).exec();

        if (!reset) {
            return NotFound(req, res, next);
        }

        // update password
        let updated = User.findOneAndUpdate({
            email: email
        }, {
            password: hashSync(password)
        }, {
            new: true
        }).exec();

        if (!updated){
            return next(unexpectedError);
        }
        // update the resetPassword record to "done" because the user has finished to reset his password
        let updatedStatus = passResetModel.findOneAndUpdate({
            email: email,
            code: code,
            status: "pending"
        }, {
            status: "done"
        }, {
            new: true
        }).exec();

        return Succes(res, {...updated, updatedStatus});

    }catch(err){
        return next(unexpectedError);
    }

}
