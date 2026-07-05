import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { updateProfileSchema } from '../../validators';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

router.get('/:userId', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: {
        id: true, fullName: true, email: true, phone: true, avatarUrl: true,
        bio: true, location: true, county: true, role: true,
        education: true, skills: true, experience: true, certifications: true,
        companyName: true, companyLogoUrl: true, companyDescription: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data,
      select: {
        id: true, fullName: true, email: true, phone: true, bio: true,
        location: true, county: true, education: true, skills: true,
        experience: true, certifications: true, avatarUrl: true,
        companyName: true, companyDescription: true, companyWebsite: true,
      },
    });
    res.json({ user });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
