import { __awaiter } from "tslib";
/**
 * Small usefull functions
 */
import bcryptjs from "bcryptjs";
import systeminformation from "systeminformation";
/**
 * @param stringToHash
 * @returns {string} hashed string
 */
let hashSync = function (stringToHash) {
    return bcryptjs.hashSync(stringToHash, process.env.salt);
};
let verifySync = function (originalString, hash) {
    return bcryptjs.compareSync(originalString, hash);
};
let getDeviceSerialNumber = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let infos = (yield systeminformation.osInfo()).serial;
        return infos;
    });
};
let checkValidEmail = function (email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};
let checkValidPassword = function (password) {
    return /^(.){8,}$/.test(password);
};
export { hashSync, verifySync, getDeviceSerialNumber, checkValidEmail, checkValidPassword };
