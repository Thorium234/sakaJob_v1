import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { reviewSchema } from '../validators';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/reviews
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = reviewSchema.parse(req.body);
    const { revieweeId } = req.body;

    if (!revieweeId) return res.status(400).json({ error: 'revieweeId is required' });
    if (revieweeId === req.user!.userId) return res.status(400).json({ error: 'Cannot review yourself' });

    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        reviewerId: req.user!.userId,
        revieweeId,
        jobId: data.jobId,
      },
      include: {
        reviewer: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });

    res.status(201).json({ review });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// GET /api/reviews/user/:userId
router.get('/user/:userId', async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { revieweeId: req.params.userId },
      include: {
        reviewer: { select: { id: true, fullName: true, avatarUrl: true } },
        job: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const avg = await prisma.review.aggregate({
      where: { revieweeId: req.params.userId },
      _avg: { rating: true },
      _count: true,
    });

    res.json({
      reviews,
      averageRating: avg._avg.rating || 0,
      totalReviews: avg._count || 0,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export default router;
