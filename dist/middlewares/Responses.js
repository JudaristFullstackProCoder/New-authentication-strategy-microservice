import config from "../config.js";
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
let NotFound = function (req, res, next) {
    return res.status(404).json({});
};
/**
 *
 * @param {Response} res
 * @returns {Response}
 */
let InvalidCredentials = function (res) {
    res.status(403).json({
        error: true,
        message: "Invalid Credentials"
    });
};
/**
 *
 * @param {Response} res
 * @returns {Response}
 */
let AuthenticationRequired = function (res) {
    return res.status(403).json({
        error: true,
        data: "Authentication required"
    });
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
let Logout = function (req, res, next) {
    return res.clearCookie(config.user_token).json({
        success: true,
        data: "logout"
    });
};
let UnknowError = function (res) {
    return res.status(500).json({
        error: true,
        data: "An error occured, please retry !"
    });
};
let Succes = function (res, data) {
    return res.status(200).json({
        succes: true,
        data: data
    });
};
export { NotFound, AuthenticationRequired, InvalidCredentials, Logout, UnknowError, Succes };
