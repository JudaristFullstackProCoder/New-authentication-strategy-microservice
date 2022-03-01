/**
 * @author [Judarist Fullstack]
 * @email [judearist@mail.com]
 * @create date 2022-03-01 16:45:05
 * @modify date 2022-03-01 16:45:05
 * @desc [User routes]
 */
import express from "express";
import { getUser, UpdateUser, DeleteUser } from "../controllers/User.js";
const Router = express.Router();
Router.get("/user/:id", getUser);
Router.patch("/user/:id", UpdateUser);
Router.delete("/user/:id", DeleteUser);
export default Router;
