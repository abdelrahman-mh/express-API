import { Router } from 'express';
// import authRoutes from './authRoutes';
import docsRoutes from './docs.router';
import noteRoutes from './noteRoutes';
import userRoutes from './userRoutes';

const router = Router();

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);
router.use('/docs', docsRoutes);

export default router;
