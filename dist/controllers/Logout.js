import { Logout } from "../middlewares/Responses.js";
export default function logout(req, res, next) {
    // Clear the authentication cookie
    return Logout(req, res, next);
}
