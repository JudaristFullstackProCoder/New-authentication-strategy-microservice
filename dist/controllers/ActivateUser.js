/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-19 17:09:14
 * @modify date 2022-02-19 17:09:14
 * @desc [ This function is a controller that respond to the route /account/activate?token=...
 * and update the account status in db if the account has not yet been verified; Id the account
 * is already verfied, send the appriate response to the user ]
 */
import { __awaiter } from "tslib";
import User from "../models/user.js";
/**
 * @param req
 * @param res
 * @param next
 */
export default function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.query.token;
        try {
            // find a user with the corresponding token
            let user = yield User.findOne({ isValide: token }).exec();
            // check if the user is already validated
            if (user.isValidate === true) {
                // then the user is already validated
                return res.json({
                    data: "This user is already verified"
                });
            }
            // Validate the user
            let updated = yield User.findOneAndUpdate({
                isValidate: token
            }, {
                isValidate: true
            }, {
                new: true
            }).exec();
            return res.json({
                message: "This user is verified",
                data: updated
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
