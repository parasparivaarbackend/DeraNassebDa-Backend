import { Router } from "express";
import { Login, NewPassword, SendOTP, Signup, verifyOTP } from "../Controller/user.controller.js";
import { loginValidation, RegisterValidation } from "../validation/index.validation.js";

const router = Router();

router.route("/login").post(loginValidation, Login)
router.route("/signup").post(RegisterValidation, Signup)
router.route("/sendOTP").post(SendOTP)
router.route("/verifyOTP").post(verifyOTP)
router.route("/newPassword").post(NewPassword)


export default router;
