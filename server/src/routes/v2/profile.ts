import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { updateProfileSchema } from '../../validators';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

// GET /api/v2/profile/:userId
router.get('/:userId', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: {
        id: true, fullName: true, role: true, avatarUrl: true,
        bio: true, location: true, county: true, education: true,
        skills: true, experience: true, companyName: true,
        companyDescription: true, companyLogoUrl: true,
        companyVerified: true, createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/v2/profile
router.put('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = updateProfileSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data,
      select: {
        id: true, email: true, fullName: true, role: true, phone: true,
        bio: true, location: true, county: true, education: true,
        skills: true, experience: true, certifications: true,
        preferredLocation: true, salaryExpectation: true, availability: true,
        companyName: true, companyDescription: true, companyWebsite: true,
        updatedAt: true,
      },
    });

    res.json({ user });
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
