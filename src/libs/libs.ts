/**
 * Small usefull functions
 */
import bcryptjs from "bcryptjs";
import systeminformation from "systeminformation";

/**
 * @param stringToHash 
 * @returns {string} hashed string
 */
let hashSync:Function = function (stringToHash:string) {
    return bcryptjs.hashSync(stringToHash, process.env.salt);
}

let verifySync:Function = function (originalString:string, hash:string) {
    return bcryptjs.compareSync(originalString, hash);
}

let getDeviceSerialNumber:Function = async function () : Promise<Object>{
    let infos = (await systeminformation.osInfo()).serial;
    return infos;
}

let checkValidEmail:Function = function (email:string):Boolean {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

let checkValidPassword:Function = function (password:string):Boolean {
    return /^(.){8,}$/.test(password);
}

type emailvr = {
    success: boolean,
    info:string,
    addr:string
}

export {hashSync, verifySync, getDeviceSerialNumber, checkValidEmail, checkValidPassword};
