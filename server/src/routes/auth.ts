import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { signToken } from '../lib/jwt';
import { registerSchema, loginSchema } from '../validators';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        role: data.role,
        phone: data.phone,
        nationalId: data.nationalId,
        companyName: data.companyName,
        companyRegNumber: data.companyRegNumber,
        companyDescription: data.companyDescription,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        companyName: true,
        createdAt: true,
      },
    });

    const token = signToken(user.id, user.role);

    res.status(201).json({ user, token });
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user.id, user.role);

    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (error: any) {
    if (error?.issues) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true, email: true, fullName: true, role: true, phone: true,
        nationalId: true, nationalIdVerified: true, avatarUrl: true,
        bio: true, location: true, county: true, education: true,
        skills: true, experience: true, certifications: true,
        preferredLocation: true, salaryExpectation: true, availability: true,
        portfolioUrls: true, certificatesUrl: true, introVideoUrl: true,
        companyName: true, companyRegNumber: true, companyVerified: true,
        companyLogoUrl: true, companyWebsite: true, companyDescription: true,
        createdAt: true, updatedAt: true,
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

export default router;
