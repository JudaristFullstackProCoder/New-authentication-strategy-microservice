import { NextFunction, Request, Response } from "express";
import user from "../models/user.js";
import {hashSync, getDeviceSerialNumber} from "../libs/libs.js";
import config from "../config.js";
import { VerifyEmail, checkValidEmail } from "../libs/libs.js"; "../libs/libs.js";

export default async function signIn (req:Request, res:Response, next:NextFunction) {
        // required all fields
        let required_fields = ["name", "email", "password"];

        for (let i = 0; i <required_fields.length; i++) {
            if(!req.body[required_fields[i]]){
                return next(new Error(`${required_fields[i]} is required`));
            }
        }
        // now that check if this email is valid
        if (!VerifyEmail(req.body.email) || !checkValidEmail(req.body.email)){
            return next(new Error("Invalid email address"));
        }
    
        // Check if the email is still available (two users must not have the same email)
        // We hope to have the "name", "email" and "password" fields in the body of the request
        let founded_email = await user.findOne({
            email : req.body.email
        }, "email").exec();
    
        /**
         * @var {Array} email
         * @conditon Then email address already used
         */
        if (founded_email != null){
            return next(new Error("Invalid email address or already used"));
        }
    
        try{
            req.body.password = hashSync(req.body.password);
        }catch(err){
            return next(new Error("Invalid password"));
        }
    
        let client = new user({
            token : hashSync(await getDeviceSerialNumber()),
            ...req.body
        });
    
        let saved = {};
    
        try {
            saved = await client.save();
        } catch (err:any) {
            return next(new Error(err.message));
        }
    
        return res.cookie(
            config.user_token , client.token, {
                maxAge : 31560000000 // A year !
            }
        ).json({
            success : true,
            data : saved
        });
}
