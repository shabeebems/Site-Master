import express, { Router } from "express";
import { AuthController } from "../controller/auth/authController";

const router: Router = express.Router();

const authController = new AuthController()

router.post('/signup', authController.signup)
      .post('/otp', authController.otp)
      .post('/resendOtp', authController.resendOtp)
      .post('/login', authController.login)
      .delete('/logout', authController.logout)

export default router;
