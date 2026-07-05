import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { createJobSchema } from '../../validators';
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth';
import { calculateMatchScore } from '../../services/matching';

const router = Router();

router.post('/', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const data = createJobSchema.parse(req.body);
    const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
    const job = await prisma.job.create({
      data: { ...data, expiresAt, employerId: req.user!.userId },
      include: { employer: { select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true } } },
    });
    res.status(201).json({ job });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to create job' });
  }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { county, category, type, q, status } = req.query;
    const where: any = {};
    if (county) where.county = county;
    if (category) where.category = category;
    if (type) where.employmentType = type;
    if (status) where.status = status;
    else where.status = 'ACTIVE';
    if (q) where.OR = [
      { title: { contains: q as string } },
      { description: { contains: q as string } },
      { companyName: { contains: q as string } },
    ];

    const jobs = await prisma.job.findMany({
      where,
      include: { employer: { select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ jobs });
  } catch { res.status(500).json({ error: 'Failed to fetch jobs' }); }
});

router.get('/matches', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const jobs = await prisma.job.findMany({
      where: { status: 'ACTIVE' },
      include: { employer: { select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true } } },
    });
    const scored = jobs.map((job) => {
      const { score } = calculateMatchScore(user as any, job as any);
      return { ...job, matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore);
    res.json({ jobs: scored });
  } catch { res.status(500).json({ error: 'Failed to get matches' }); }
});

router.get('/employer/mine', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { employerId: req.user!.userId },
      include: { _count: { select: { applications: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ jobs });
  } catch { res.status(500).json({ error: 'Failed to fetch employer jobs' }); }
});

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: { employer: { select: { id: true, companyName: true, companyLogoUrl: true, companyDescription: true, companyVerified: true } } },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ job });
  } catch { res.status(500).json({ error: 'Failed to fetch job' }); }
});

router.put('/:id', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!existing || existing.employerId !== req.user!.userId) return res.status(403).json({ error: 'Not authorized' });
    const job = await prisma.job.update({ where: { id: req.params.id }, data: req.body });
    res.json({ job });
  } catch { res.status(500).json({ error: 'Failed to update job' }); }
});

router.delete('/:id', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const existing = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!existing || existing.employerId !== req.user!.userId) return res.status(403).json({ error: 'Not authorized' });
    const job = await prisma.job.update({ where: { id: req.params.id }, data: { status: 'CLOSED' } });
    res.json({ job });
  } catch { res.status(500).json({ error: 'Failed to close job' }); }
});

export default router;
