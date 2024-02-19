/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const router = express.Router();
import authController from '../controllers/authController';

// REGISTER
router.post("/register", authController.register);

//LOG IN
router.post("/login", authController.login);

export default router;