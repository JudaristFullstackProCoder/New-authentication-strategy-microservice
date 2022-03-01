/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-03-01 16:45:16
 * @modify date 2022-03-01 16:45:16
 * @desc [User controller]
 */
import { __awaiter } from "tslib";
import User from "../models/user.js";
export const getUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.body.id;
        User.findById(id, {}, {}, function (err, data) {
            if (err)
                return next(err);
            return res.json({
                success: true,
                data: data
            });
        });
    });
};
export const DeleteUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.body.id;
        User.findOneAndDelete({
            _id: id
        }, {}, function (err, data) {
            if (err)
                return next(err);
            return res.json({
                success: true,
                data: data
            });
        });
    });
};
export const UpdateUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.body.id;
        delete req.body.id;
        User.findByIdAndUpdate(id, Object.assign({}, req.body), { new: true }, function (err, data) {
            if (err)
                return next(err);
            return res.json({
                success: true,
                data: data
            });
        });
    });
};
