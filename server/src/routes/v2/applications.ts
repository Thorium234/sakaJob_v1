import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { applicationSchema } from '../../validators';
import { authenticate, AuthRequest, requireRole } from '../../middleware/auth';
import { calculateMatchScore } from '../../services/matching';
import { createNotification } from '../../services/notifications';

const router = Router();

router.post('/:jobId/apply', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const { coverLetter } = applicationSchema.parse(req.body);
    const existing = await prisma.application.findUnique({
      where: { jobId_applicantId: { jobId: req.params.jobId, applicantId: req.user!.userId } },
    });
    if (existing) return res.status(409).json({ error: 'Already applied' });

    const [job, applicant] = await Promise.all([
      prisma.job.findUnique({ where: { id: req.params.jobId } }),
      prisma.user.findUnique({ where: { id: req.user!.userId } }),
    ]);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    let compatibilityScore: number | undefined;
    if (applicant) {
      const { score } = calculateMatchScore(applicant as any, job as any);
      compatibilityScore = score;
    }

    const application = await prisma.application.create({
      data: { jobId: req.params.jobId, applicantId: req.user!.userId, coverLetter, compatibilityScore },
      include: {
        job: { select: { id: true, title: true, employerId: true } },
      },
    });

    await createNotification(job.employerId, 'New Application', `${req.user!.userId} applied to ${job.title}`, 'application', JSON.stringify({ applicationId: application.id }));
    res.status(201).json({ application });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to apply' });
  }
});

router.get('/mine', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { applicantId: req.user!.userId },
      include: { job: { include: { employer: { select: { id: true, companyName: true, companyLogoUrl: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ applications });
  } catch { res.status(500).json({ error: 'Failed to fetch applications' }); }
});

router.get('/job/:jobId', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.jobId } });
    if (!job || job.employerId !== req.user!.userId) return res.status(403).json({ error: 'Not authorized' });
    const applications = await prisma.application.findMany({
      where: { jobId: req.params.jobId },
      include: { applicant: { select: { id: true, fullName: true, email: true, phone: true, skills: true, experience: true, education: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ applications });
  } catch { res.status(500).json({ error: 'Failed to fetch applications' }); }
});

router.patch('/:id/status', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const app = await prisma.application.findUnique({ where: { id: req.params.id }, include: { job: true } });
    if (!app || app.job.employerId !== req.user!.userId) return res.status(403).json({ error: 'Not authorized' });
    const updated = await prisma.application.update({ where: { id: req.params.id }, data: { status } });
    await createNotification(app.applicantId, 'Application Updated', `Your application for ${app.job.title} is now ${status}`, 'application', JSON.stringify({ applicationId: app.id }));
    res.json({ application: updated });
  } catch { res.status(500).json({ error: 'Failed to update status' }); }
});

export default router;
