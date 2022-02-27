/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-02-22 19:18:35
 * @modify date 2022-02-22 19:18:35
 * @desc [NotFound middleware : this middleware handle "Not found route"]
 */
import { NotFound } from "../middlewares/Responses.js";
export default function (req, res, next) {
    return NotFound(req, res, next);
}
