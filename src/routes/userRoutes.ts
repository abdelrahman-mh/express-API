/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import userController from '../controllers/userController';
import authorizationMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/', authorizationMiddleware, userController.getUser);
router.get('/all', authorizationMiddleware, userController.getUsers);
router.post('/', userController.createUser);
router.put('/', authorizationMiddleware, userController.updateUser);

export default router;
