/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-03-01 16:45:16
 * @modify date 2022-03-01 16:45:16
 * @desc [User controller]
 */

import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";


export const getUser = async function (req:Request, res:Response, next:NextFunction) {
    let id = req.body.id;
    User.findById(id, {}, {}, function (err, data) {
        if (err) return next(err);
        return res.json({
            success: true,
            data: data
        });
    });
}

export const DeleteUser = async function (req:Request, res:Response, next:NextFunction) {
    let id = req.body.id;
    User.findOneAndDelete({
        _id: id
    }, {}, function (err, data) {
        if (err) return next(err);
        return res.json({
            success: true,
            data: data
        })
    });
}

export const UpdateUser = async function (req:Request, res:Response, next:NextFunction) {
    let id = req.body.id;
    delete req.body.id;
    User.findByIdAndUpdate(id, {
        ...req.body
    }, {new: true}, function (err, data) {
        if (err) return next(err);
        return res.json({
            success: true,
            data: data
        });
    });
}
