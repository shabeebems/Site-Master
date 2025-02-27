import express from "express";
import { AuthController } from "../controller/auth/authController";
const router = express.Router();

const authController = new AuthController()

router.post('/signup', authController.signup)
      .post('/login', authController.login)
      .post('/otp', authController.otp)
      .post('/resendOtp', authController.resendOtp)
      .delete('/logout', authController.logout)

export default router;
