import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['JOB_SEEKER', 'EMPLOYER']),
  phone: z.string().optional(),
  nationalId: z.string().optional(),
  // Employer fields
  companyName: z.string().optional(),
  companyRegNumber: z.string().optional(),
  companyDescription: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  county: z.string().optional(),
  employmentType: z.string().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.string().default('KES'),
  category: z.string().optional(),
  experienceLevel: z.string().optional(),
  skillsRequired: z.string().optional(),
  educationRequired: z.string().optional(),
  vacanciesCount: z.number().default(1),
  expiresAt: z.string().optional(),
  isPromoted: z.boolean().default(false),
});

export const updateProfileSchema = z.object({
  fullName: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  county: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
  experience: z.string().optional(),
  certifications: z.string().optional(),
  preferredLocation: z.string().optional(),
  salaryExpectation: z.number().optional(),
  availability: z.string().optional(),
  // Employer fields
  companyName: z.string().optional(),
  companyDescription: z.string().optional(),
  companyWebsite: z.string().optional(),
});

export const applicationSchema = z.object({
  coverLetter: z.string().optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  jobId: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  jobId: z.string().optional(),
});
