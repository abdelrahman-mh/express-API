/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import authController from '../controllers/authenticationController';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signIn', authController.signIn);

export default router;
