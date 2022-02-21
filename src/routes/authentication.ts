// Library imports
import express from "express";
const router = express.Router();

// Custom imports
import loginController from "../controllers/Login.js";
import signInController from "../controllers/SignIn.js";
import passwordUpdateController from "../controllers/UpdatePass.js";
import {passwordResetControllerVerifyCode, resetPassword, passwordResetControllerNewCredentials} from "../controllers/ResetPass.js";
import logoutController from "../controllers/Logout.js";

import {getUserAuthenticationStatus}from "../middlewares/Authentication.js";

router.post(`/login`, loginController);
router.post(`/signin`,signInController);
router.post(`/update-password`, passwordUpdateController);
router.post(`/reset-password`, resetPassword);
router.post(`/reset-password/code`, passwordResetControllerVerifyCode);
router.post(`/reset-password/new-credentials`, passwordResetControllerNewCredentials);
router.post(`/is-authenticated`, getUserAuthenticationStatus);
router.post(`/logout`, logoutController);

export default router;
