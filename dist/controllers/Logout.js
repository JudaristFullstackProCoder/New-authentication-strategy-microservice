/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-21 18:37:29
 * @modify date 2022-02-21 18:37:29
 * @desc [Logout controller]
 */
import { Logout } from "../middlewares/Responses.js";
export default function logout(req, res, next) {
    // Clear the authentication cookie
    return Logout(req, res, next);
}
