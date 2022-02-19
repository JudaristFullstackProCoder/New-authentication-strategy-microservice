/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-19 17:13:22
 * @modify date 2022-02-19 17:13:22
 * @desc [The Sign in controller]
 */
import { __awaiter } from "tslib";
import user from "../models/user.js";
import { hashSync, getDeviceSerialNumber } from "../libs/libs.js";
import config from "../config.js";
import { checkValidEmail } from "../libs/libs.js";
import { SMTPClient } from 'emailjs';
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function sendEmailVerificationLink(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new SMTPClient({
            user: 'judearist',
            password: 'Labrutelegere22*',
            host: 'smtp.gmail.com',
            ssl: true,
        });
        try {
            yield client.sendAsync({
                text: content,
                from: 'judearist@gmail.com',
                to: 'judearist@gmail.com',
                cc: 'judearist@gmail.com',
                subject: 'VERIFY YOUR ACCOUNT',
                attachment: [
                    { data: `<html> <a href='http://localhost:2022/account/active?token=${content}'>click here to activate your account</a></html>`, alternative: true },
                ]
            });
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
export default function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // required all fields
        let required_fields = ["name", "email", "password"];
        for (let i = 0; i < required_fields.length; i++) {
            if (!req.body[required_fields[i]]) {
                return next(new Error(`${required_fields[i]} is required`));
            }
        }
        // now that check if this email is valid
        if (!checkValidEmail(req.body.email)) {
            return next(new Error("Invalid email address "));
        }
        // Check if the email is still available (two users must not have the same email)
        // We hope to have the "name", "email" and "password" fields in the body of the request
        let founded_email = yield user.findOne({
            email: req.body.email
        }, "email").exec();
        /**
         * @var {Array} email
         * @conditon Then email address already used
         */
        if (founded_email != null) {
            return next(new Error("Invalid email address or already used"));
        }
        try {
            req.body.password = hashSync(req.body.password);
        }
        catch (err) {
            return next(new Error("Invalid password"));
        }
        let Id = makeid(77);
        let client = new user(Object.assign(Object.assign({ token: hashSync(yield getDeviceSerialNumber()) }, req.body), { isValidate: Id }));
        // send email
        let result = sendEmailVerificationLink(Id);
        if (!result) {
            return next(result);
        }
        let saved = {};
        try {
            saved = yield client.save();
        }
        catch (err) {
            return next(new Error(err.message));
        }
        return res.cookie(config.user_token, client.token, {
            maxAge: 31560000000 // A year !
        }).json({
            success: true,
            data: saved
        });
    });
}
