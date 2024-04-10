import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);

export default router;
