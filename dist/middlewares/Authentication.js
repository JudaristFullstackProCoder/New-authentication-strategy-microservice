import { __awaiter } from "tslib";
import { verifySync } from "../libs/libs.js";
import { getDeviceSerialNumber } from "../libs/libs.js";
/**
 * Retur true or not if the user is authenticated
 * @param {Request} req
 * @returns {Boolean}
 */
let checkUserAuthentication = function (req) {
    return __awaiter(this, void 0, void 0, function* () {
        let auth = false;
        try {
            auth = verifySync(yield getDeviceSerialNumber(), req.cookies.user_token);
        }
        catch (err) {
            return false;
        }
        if (auth === true) {
            return true;
        }
        else {
            return false;
        }
    });
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Response}
 */
const getUserAuthenticationStatus = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let auth = false;
        try {
            auth = verifySync(yield getDeviceSerialNumber(), req.cookies.user_token || "");
        }
        catch (err) {
            return res.status(403).json({
                error: true,
                authenticated: false
            });
        }
        if (auth === true) {
            return res.status(200).json({
                success: true,
                authenticated: true
            });
        }
        else {
            return res.status(403).json({
                error: true,
                authenticated: false
            });
        }
    });
};
/**
 * This function return 403 response if the user
 * isn't authenticated or pass to the next route if the
 * user il already authenticated
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
const requireUserAuthentication = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let auth = false;
        try {
            auth = verifySync(yield getDeviceSerialNumber(), req.cookies.user_token);
        }
        catch (err) {
            return next(new Error());
        }
        if (auth === true) {
            // if user is already logged then continue
            return next('route');
        }
        else {
            return res.status(403).json({
                error: true,
                message: "Authentication required ! please login"
            });
        }
    });
};
export { requireUserAuthentication, getUserAuthenticationStatus, checkUserAuthentication };
