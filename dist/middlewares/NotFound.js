import { NotFound } from "../middlewares/Responses.js";
export default function (req, res, next) {
    return NotFound(req, res, next);
}
