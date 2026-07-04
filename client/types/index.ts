export type UserRole = 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';

export type ApplicationStatus = 'RECEIVED' | 'SHORTLISTED' | 'INTERVIEW' | 'ACCEPTED' | 'DECLINED' | 'WITHDRAWN';

export type JobStatus = 'ACTIVE' | 'CLOSED' | 'DRAFT' | 'EXPIRED';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  nationalId?: string;
  nationalIdVerified?: boolean;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  county?: string;
  education?: string;
  skills?: string;
  experience?: string;
  certifications?: string;
  preferredLocation?: string;
  salaryExpectation?: number;
  availability?: string;
  portfolioUrls?: string;
  certificatesUrl?: string;
  introVideoUrl?: string;
  companyName?: string;
  companyRegNumber?: string;
  companyVerified?: boolean;
  companyLogoUrl?: string;
  companyWebsite?: string;
  companyDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  location: string;
  county?: string;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  category?: string;
  experienceLevel?: string;
  skillsRequired?: string;
  educationRequired?: string;
  vacanciesCount: number;
  status: string;
  expiresAt?: string;
  isPromoted: boolean;
  createdAt: string;
  updatedAt: string;
  employerId: string;
  employer: {
    id: string;
    companyName?: string;
    companyLogoUrl?: string;
    companyVerified?: boolean;
  };
  _count?: { applications: number };
  matchScore?: number;
  matchBreakdown?: { skills: number; education: number; experience: number; location: number };
}

export interface Application {
  id: string;
  status: string;
  coverLetter?: string;
  compatibilityScore?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  jobId: string;
  applicantId: string;
  job: Job;
  applicant?: User;
}

export interface Message {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  sender: { id: string; fullName: string; avatarUrl?: string; role: string };
  receiver: { id: string; fullName: string; avatarUrl?: string; role: string };
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewerId: string;
  revieweeId: string;
  jobId?: string;
  reviewer: { id: string; fullName: string; avatarUrl?: string };
  job?: { id: string; title: string };
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type?: string;
  data?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  user: { id: string; fullName: string; avatarUrl?: string; role: string };
  lastMessage: Message;
  unread: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
