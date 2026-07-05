import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';
import jobRoutes from './jobs';
import applicationRoutes from './applications';
import messageRoutes from './messages';
import reviewRoutes from './reviews';
import notificationRoutes from './notifications';
import lookupRoutes from './lookup';

const router = Router();

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', version: 'v2', timestamp: new Date().toISOString() });
});

// V2 Routes — production API
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/messages', messageRoutes);
router.use('/reviews', reviewRoutes);
router.use('/notifications', notificationRoutes);
router.use('/lookup', lookupRoutes);

export default router;
