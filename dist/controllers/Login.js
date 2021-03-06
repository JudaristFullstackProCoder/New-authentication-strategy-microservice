/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:32:02
 * @modify date 2022-02-21 18:32:02
 * @desc [Login controller]
 */
import { __awaiter } from "tslib";
import { verifySync, checkValidEmail } from "../libs/libs.js";
import { InvalidCredentials } from "../middlewares/Responses.js";
import { checkUserAuthentication } from "../middlewares/Authentication.js";
import user from "../models/user.js";
export default function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // require required fields
        const required_fields = ["email", "password"];
        for (let i = 0; i < required_fields.length; i++) {
            if (!req.body[required_fields[i]]) {
                return next(new Error(`${required_fields[i]} is required`));
            }
        }
        let isAuthenticated = yield checkUserAuthentication(req);
        if (isAuthenticated === true) {
            // already logged
            return next(new Error("Authentication is already"));
        }
        // require valid email anb valid password
        if (!checkValidEmail(req.body.email) || req.body.password === "") {
            return InvalidCredentials(res);
        }
        // We hope to have the "email" and "password" fields in the body of the request
        let founded_user = yield user.findOne({
            email: req.body.email
        }, "token email name password").exec();
        if (founded_user === null) {
            return res.status(400).json({
                error: true,
                message: "User not found"
            });
        }
        // user exist
        // before verifing password check is the user is valid
        if (founded_user.isValidate !== true) {
            // Then the user has not yet activated his account via the verification link sent to his email box.
            return res.json({
                error: true,
                message: "This user has not yet activated his account via the verification link sent to his email box"
            });
        }
        let verfied_password = null;
        try {
            verfied_password = verifySync(req.body.password, founded_user.password);
        }
        catch (err) {
            return next(err.message);
        }
        if (verfied_password === false) {
            return InvalidCredentials(res);
        }
        else if (verfied_password === true && process.env.user_token) {
            return res.status(200).cookie(process.env.user_token, founded_user.token, {
                maxAge: 31560000000 // A year !
            }).json({
                success: true,
                data: founded_user
            });
        }
        else {
            return next(new Error("An exception occured :-(, please try again :-)"));
        }
    });
}
