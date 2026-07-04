import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { applicationSchema } from '../validators';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';
import { calculateMatchScore } from '../services/matching';
import { createNotification } from '../services/notifications';

const router = Router();

// POST /api/applications/:jobId/apply
router.post('/:jobId/apply', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.jobId } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.status !== 'ACTIVE') return res.status(400).json({ error: 'Job is not accepting applications' });

    const existing = await prisma.application.findUnique({
      where: { jobId_applicantId: { jobId: req.params.jobId, applicantId: req.user!.userId } },
    });
    if (existing) return res.status(409).json({ error: 'Already applied' });

    const data = applicationSchema.parse(req.body);

    // Calculate compatibility score
    const applicant = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    const score = applicant ? calculateMatchScore(applicant, job) : null;

    const application = await prisma.application.create({
      data: {
        jobId: req.params.jobId,
        applicantId: req.user!.userId,
        coverLetter: data.coverLetter,
        compatibilityScore: score?.score ?? null,
      },
      include: {
        job: { select: { title: true, employerId: true } },
      },
    });

    // Notify employer
    await createNotification(
      application.job.employerId,
      'New Application',
      `${applicant?.fullName || 'Someone'} applied to "${application.job.title}"`,
      'new_application',
      { applicationId: application.id, jobId: req.params.jobId }
    );

    res.status(201).json({ application });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to apply' });
  }
});

// GET /api/applications/mine — jobs I applied to
router.get('/mine', authenticate, requireRole('JOB_SEEKER'), async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { applicantId: req.user!.userId },
      include: {
        job: {
          include: {
            employer: {
              select: { id: true, companyName: true, companyLogoUrl: true, companyVerified: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ applications });
  } catch {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// GET /api/applications/job/:jobId — employer views applicants
router.get('/job/:jobId', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.jobId } });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.employerId !== req.user!.userId) return res.status(403).json({ error: 'Not your job' });

    const applications = await prisma.application.findMany({
      where: { jobId: req.params.jobId },
      include: {
        applicant: {
          select: {
            id: true, fullName: true, email: true, phone: true, avatarUrl: true,
            location: true, county: true, education: true, skills: true,
            experience: true, portfolioUrls: true, bio: true,
          },
        },
      },
      orderBy: [
        { compatibilityScore: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({ applications });
  } catch {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// PATCH /api/applications/:id/status
router.patch('/:id/status', authenticate, requireRole('EMPLOYER'), async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ['RECEIVED', 'SHORTLISTED', 'INTERVIEW', 'ACCEPTED', 'DECLINED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
      include: { job: { select: { employerId: true, title: true } } },
    });
    if (!application) return res.status(404).json({ error: 'Application not found' });
    if (application.job.employerId !== req.user!.userId) {
      return res.status(403).json({ error: 'Not your job' });
    }

    const updated = await prisma.application.update({
      where: { id: req.params.id },
      data: { status },
      include: { applicant: { select: { id: true, fullName: true } } },
    });

    // Notify applicant
    const statusLabels: Record<string, string> = {
      RECEIVED: 'Received',
      SHORTLISTED: 'Shortlisted',
      INTERVIEW: 'Interview Invitation',
      ACCEPTED: 'Accepted',
      DECLINED: 'Declined',
    };

    await createNotification(
      updated.applicant.id,
      `Application ${statusLabels[status] || status}`,
      `Your application for "${application.job.title}" has been ${statusLabels[status]?.toLowerCase() || status.toLowerCase()}`,
      'application_status',
      { applicationId: updated.id }
    );

    res.json({ application: updated });
  } catch {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

export default router;
