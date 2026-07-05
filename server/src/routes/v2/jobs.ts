import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { createJobSchema } from '../../validators';
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth';
import { calculateMatchScore } from '../../services/matching';

const router = Router();

// POST /api/v2/jobs
router.post('/', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const data = createJobSchema.parse(req.body);

    const job = await prisma.job.create({
      data: {
        ...data,
        employerId: req.user!.userId,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
      include: {
        employer: {
          select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true },
        },
      },
    });

    res.status(201).json({ job });
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// GET /api/v2/jobs
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const {
      page = '1', limit = '20', category, county,
      employmentType, experienceLevel, search, sort = 'newest',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: any = { status: 'ACTIVE' };

    if (category) where.category = category as string;
    if (county) where.county = county as string;
    if (employmentType) where.employmentType = employmentType as string;
    if (experienceLevel) where.experienceLevel = experienceLevel as string;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
        { skillsRequired: { contains: search as string } },
        { location: { contains: search as string } },
      ];
    }

    const orderBy: any = sort === 'oldest'
      ? { createdAt: 'asc' }
      : sort === 'salary'
        ? { salaryMin: 'desc' }
        : { createdAt: 'desc' };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: [
          { isPromoted: 'desc' },
          orderBy,
        ],
        skip,
        take,
        include: {
          employer: {
            select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true },
          },
          _count: { select: { applications: true } },
        },
      }),
      prisma.job.count({ where }),
    ]);

    res.json({
      jobs,
      pagination: {
        page: parseInt(page as string),
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/v2/jobs/matches — recommended jobs for job seeker
router.get('/matches', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const applicant = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    if (!applicant) return res.status(404).json({ error: 'User not found' });

    const jobs = await prisma.job.findMany({
      where: { status: 'ACTIVE' },
      include: {
        employer: {
          select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true },
        },
        _count: { select: { applications: true } },
      },
      take: 50,
      orderBy: { createdAt: 'desc' },
    });

    const scored = jobs.map(job => {
      const result = calculateMatchScore(applicant, job);
      return { ...job, matchScore: result.score, matchBreakdown: result.breakdown };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);

    res.json({ jobs: scored });
  } catch {
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// GET /api/v2/jobs/employer/mine — employer's own listings
router.get('/employer/mine', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { employerId: req.user!.userId },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ jobs });
  } catch {
    res.status(500).json({ error: 'Failed to fetch employer jobs' });
  }
});

// GET /api/v2/jobs/:id
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: {
        employer: {
          select: {
            id: true, fullName: true, companyName: true, companyLogoUrl: true,
            companyDescription: true, companyVerified: true, companyWebsite: true,
          },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ job });
  } catch {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// PUT /api/v2/jobs/:id
router.put('/:id', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.employerId !== req.user!.userId) {
      return res.status(403).json({ error: 'Not your job listing' });
    }

    const data = createJobSchema.partial().parse(req.body);
    const updated = await prisma.job.update({
      where: { id: req.params.id },
      data: {
        ...data,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      },
      include: {
        employer: {
          select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true },
        },
      },
    });

    res.json({ job: updated });
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE /api/v2/jobs/:id — soft close
router.delete('/:id', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.employerId !== req.user!.userId) {
      return res.status(403).json({ error: 'Not your job listing' });
    }

    await prisma.job.update({
      where: { id: req.params.id },
      data: { status: 'CLOSED' },
    });

    res.json({ message: 'Job closed successfully' });
  } catch {
    res.status(500).json({ error: 'Failed to close job' });
  }
});

export default router;
