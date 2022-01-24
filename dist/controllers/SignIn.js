import { __awaiter } from "tslib";
import user from "../models/user.js";
import { hashSync, getDeviceSerialNumber } from "../libs/libs.js";
import config from "../config.js";
import { VerifyEmail, checkValidEmail } from "../libs/libs.js";
"../libs/libs.js";
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
        if (!VerifyEmail(req.body.email) || !checkValidEmail(req.body.email)) {
            return next(new Error("Invalid email address"));
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
        let client = new user(Object.assign({ token: hashSync(yield getDeviceSerialNumber()) }, req.body));
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
