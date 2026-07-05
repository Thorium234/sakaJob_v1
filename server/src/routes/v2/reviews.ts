import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { reviewSchema } from '../../validators';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = reviewSchema.parse(req.body);
    if (!req.body.revieweeId) return res.status(400).json({ error: 'revieweeId is required' });
    const review = await prisma.review.create({
      data: { rating: data.rating, comment: data.comment, jobId: data.jobId, reviewerId: req.user!.userId, revieweeId: req.body.revieweeId },
      include: {
        reviewer: { select: { id: true, fullName: true, avatarUrl: true } },
        reviewee: { select: { id: true, fullName: true } },
      },
    });
    res.status(201).json({ review });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to create review' });
  }
});

router.get('/user/:userId', async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { revieweeId: req.params.userId },
      include: { reviewer: { select: { id: true, fullName: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ reviews });
  } catch { res.status(500).json({ error: 'Failed to fetch reviews' }); }
});

export default router;
