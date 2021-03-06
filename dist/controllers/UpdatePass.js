/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:39:25
 * @modify date 2022-02-21 18:39:25
 * @desc [Update password controller]
 */
import { __awaiter } from "tslib";
import { checkUserAuthentication } from "../middlewares/Authentication.js";
import { AuthenticationRequired, InvalidCredentials, Succes, UnknowError } from "../middlewares/Responses.js";
import { checkValidPassword, hashSync } from "../libs/libs.js";
import user from "../models/user.js";
export default function UpdatePass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // All fields are required
        let required_fields = ["password", "password_confirmation"];
        for (let i = 0; i < required_fields.length; i++) {
            if (!req.body[required_fields[i]]) {
                return next(new Error(`${required_fields[i]} is required`));
            }
        }
        // user must be authenticated before he perform this action
        if (!checkUserAuthentication(req, res, next)) {
            return AuthenticationRequired(req, res, next);
        }
        // We hope to have the password, password_confirmation fields in the body request
        let [pass, confirm_pass] = [req.body.password, req.body.password_confirmation];
        // the two password (password and password confirmation) must be equal and valid
        if (!checkValidPassword(pass) ||
            !checkValidPassword(confirm_pass) ||
            (pass !== confirm_pass) || (pass === "") || (confirm_pass === "")) {
            return InvalidCredentials(res);
        }
        else if (pass === confirm_pass && process.env.user_token) {
            let replacement = yield user.findOneAndUpdate({
                token: req.cookies[process.env.user_token]
            }, {
                password: hashSync(confirm_pass)
            }, {
                new: true
            });
            if (replacement) {
                return Succes(res, replacement);
            }
            else {
                return UnknowError(res);
            }
        }
        else {
            return UnknowError(res);
        }
    });
}
