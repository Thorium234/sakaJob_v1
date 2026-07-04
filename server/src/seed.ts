import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.message.deleteMany();
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('password123', 12);

  // Create employers
  const safaricom = await prisma.user.create({
    data: {
      email: 'hr@safaricom.co.ke',
      password,
      fullName: 'Safaricom HR',
      role: 'EMPLOYER',
      phone: '+254 711 000 000',
      companyName: 'Safaricom',
      companyRegNumber: 'CR12-2020-001',
      companyVerified: true,
      companyDescription: 'Kenya\'s leading telecommunications company connecting over 45 million people.',
      companyWebsite: 'https://www.safaricom.co.ke',
      location: 'Nairobi',
      county: 'Nairobi',
    },
  });

  const equityBank = await prisma.user.create({
    data: {
      email: 'careers@equitybank.co.ke',
      password,
      fullName: 'Equity Bank HR',
      role: 'EMPLOYER',
      phone: '+254 722 000 000',
      companyName: 'Equity Bank',
      companyRegNumber: 'CR12-2018-004',
      companyVerified: true,
      companyDescription: 'A leading financial services provider empowering communities across East Africa.',
      companyWebsite: 'https://www.equitybank.co.ke',
      location: 'Nairobi',
      county: 'Nairobi',
    },
  });

  const twigaFoods = await prisma.user.create({
    data: {
      email: 'jobs@twigafoods.com',
      password,
      fullName: 'Twiga Foods Recruiter',
      role: 'EMPLOYER',
      phone: '+254 700 000 001',
      companyName: 'Twiga Foods',
      companyRegNumber: 'CR12-2019-007',
      companyVerified: true,
      companyDescription: 'Fast-growing food distribution platform connecting farmers to markets across Kenya.',
      companyWebsite: 'https://twigafoods.com',
      location: 'Nakuru',
      county: 'Nakuru',
    },
  });

  const kcb = await prisma.user.create({
    data: {
      email: 'recruit@kcbgroup.com',
      password,
      fullName: 'KCB Group Talent',
      role: 'EMPLOYER',
      phone: '+254 720 000 002',
      companyName: 'KCB Group',
      companyRegNumber: 'CR12-2015-002',
      companyVerified: true,
      companyDescription: 'One of East Africa\'s largest and most trusted banking institutions.',
      companyWebsite: 'https://www.kcbgroup.com',
      location: 'Mombasa',
      county: 'Mombasa',
    },
  });

  const kengen = await prisma.user.create({
    data: {
      email: 'careers@kengen.co.ke',
      password,
      fullName: 'KenGen HR',
      role: 'EMPLOYER',
      phone: '+254 733 000 003',
      companyName: 'KenGen',
      companyRegNumber: 'CR12-2010-001',
      companyVerified: true,
      companyDescription: 'Kenya\'s largest power generator, powering the nation\'s growth.',
      companyWebsite: 'https://www.kengen.co.ke',
      location: 'Kisumu',
      county: 'Kisumu',
    },
  });

  const davis = await prisma.user.create({
    data: {
      email: 'hr@davis-shirtliff.com',
      password,
      fullName: 'Davis & Shirtliff HR',
      role: 'EMPLOYER',
      phone: '+254 709 000 004',
      companyName: 'Davis & Shirtliff',
      companyRegNumber: 'CR12-2005-003',
      companyVerified: true,
      companyDescription: 'East Africa\'s largest water and energy solutions provider.',
      companyWebsite: 'https://www.davisandshirtliff.com',
      location: 'Kiambu',
      county: 'Kiambu',
    },
  });

  const brookhouse = await prisma.user.create({
    data: {
      email: 'recruit@brookhouse.ac.ke',
      password,
      fullName: 'Brookhouse HR',
      role: 'EMPLOYER',
      phone: '+254 700 000 005',
      companyName: 'Brookhouse School',
      companyRegNumber: 'CR12-2012-005',
      companyVerified: true,
      companyDescription: 'Premier international school offering world-class education in Kenya.',
      companyWebsite: 'https://www.brookhouse.ac.ke',
      location: 'Nairobi',
      county: 'Nairobi',
    },
  });

  const agaKhan = await prisma.user.create({
    data: {
      email: 'nursing@agakhanhospital.org',
      password,
      fullName: 'Aga Khan Talent',
      role: 'EMPLOYER',
      phone: '+254 700 000 006',
      companyName: 'Aga Khan Hospital',
      companyRegNumber: 'CR12-2008-004',
      companyVerified: true,
      companyDescription: 'World-class healthcare facility serving East Africa with excellence.',
      companyWebsite: 'https://www.agakhanhospitals.org',
      location: 'Mombasa',
      county: 'Mombasa',
    },
  });

  // Create job seeker
  const john = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password,
      fullName: 'John Doe',
      role: 'JOB_SEEKER',
      phone: '+254 700 000 100',
      bio: 'Passionate software developer with a strong foundation in full-stack web development.',
      location: 'Nairobi',
      county: 'Nairobi',
      education: 'BSc Computer Science, University of Nairobi',
      skills: 'React, Node.js, TypeScript, PostgreSQL, Git, Tailwind CSS',
      experience: 'Senior Level',
      certifications: 'AWS Cloud Practitioner (2023)',
    },
  });

  const employers = [
    { user: safaricom, company: 'Safaricom', county: 'Nairobi', verified: true },
    { user: equityBank, company: 'Equity Bank', county: 'Nairobi', verified: true },
    { user: twigaFoods, company: 'Twiga Foods', county: 'Nakuru', verified: true },
    { user: kcb, company: 'KCB Group', county: 'Mombasa', verified: true },
    { user: kengen, company: 'KenGen', county: 'Kisumu', verified: true },
    { user: davis, company: 'Davis & Shirtliff', county: 'Kiambu', verified: true },
    { user: brookhouse, company: 'Brookhouse School', county: 'Nairobi', verified: true },
    { user: agaKhan, company: 'Aga Khan Hospital', county: 'Mombasa', verified: true },
  ];

  // Create jobs
  const jobData = [
    {
      title: 'Software Developer',
      description: 'Safaricom is Kenya\'s leading telecommunications company. We are looking for a talented Software Developer to join our growing engineering team. You will work on products that serve millions of Kenyans daily.',
      requirements: '3+ years experience in React/Node.js\nBachelor\'s in Computer Science or related field\nExperience with cloud services (AWS/GCP)',
      responsibilities: 'Build and maintain web applications\nCollaborate with cross-functional teams\nWrite clean, testable, well-documented code\nParticipate in code reviews',
      location: 'Nairobi',
      county: 'Nairobi',
      employmentType: 'Full-time',
      salaryMin: 150000,
      salaryMax: 250000,
      category: 'Information Technology',
      experienceLevel: 'Mid Level',
      skillsRequired: 'React, Node.js, TypeScript, AWS, PostgreSQL',
      educationRequired: 'Bachelor\'s in Computer Science',
      employerIdx: 0,
    },
    {
      title: 'Graphic Designer',
      description: 'Join Equity Bank\'s creative team to shape the visual identity of one of Africa\'s largest financial institutions. We\'re looking for a designer who can bring fresh ideas to both digital and print.',
      requirements: 'Proficiency in Adobe Creative Suite\nStrong portfolio demonstrating design skills\n2+ years of professional experience',
      responsibilities: 'Create marketing materials and brand assets\nDesign digital and print collateral\nMaintain brand consistency across all channels',
      location: 'Nairobi',
      county: 'Nairobi',
      employmentType: 'Full-time',
      salaryMin: 80000,
      salaryMax: 120000,
      category: 'Arts & Design',
      experienceLevel: 'Mid Level',
      skillsRequired: 'Adobe CC, Figma, Photoshop, Illustrator',
      educationRequired: 'Diploma in Graphic Design',
      employerIdx: 1,
    },
    {
      title: 'Sales Representative',
      description: 'Twiga Foods is a fast-growing food distribution platform connecting farmers to markets. We need driven sales representatives to expand our reach in Nakuru county.',
      requirements: 'Proven sales experience\nExcellent communication skills\nMust own a smartphone and be willing to travel',
      responsibilities: 'Meet and exceed monthly sales targets\nBuild relationships with local vendors and farmers\nReport daily sales activities and market insights',
      location: 'Nakuru',
      county: 'Nakuru',
      employmentType: 'Contract',
      salaryMin: 50000,
      salaryMax: 80000,
      category: 'Sales & Marketing',
      experienceLevel: 'Entry Level',
      skillsRequired: 'Sales, Communication, Negotiation',
      educationRequired: 'KCSE Certificate',
      employerIdx: 2,
    },
    {
      title: 'Accountant',
      description: 'KCB Group, one of East Africa\'s largest banks, is seeking a seasoned accountant for our Mombasa branch. You\'ll manage financial operations and ensure regulatory compliance.',
      requirements: 'CPA-K Certification\nBCom Accounting degree\n3+ years of experience in accounting',
      responsibilities: 'Manage financial records and books of accounts\nEnsure tax compliance and statutory deductions\nPrepare monthly and annual financial reports',
      location: 'Mombasa',
      county: 'Mombasa',
      employmentType: 'Full-time',
      salaryMin: 100000,
      salaryMax: 150000,
      category: 'Finance & Accounting',
      experienceLevel: 'Mid Level',
      skillsRequired: 'CPA-K, QuickBooks, Excel, Tax Compliance',
      educationRequired: 'BCom Accounting',
      employerIdx: 3,
    },
    {
      title: 'Electrician',
      description: 'KenGen is Kenya\'s largest power generator. We need skilled electricians for our Kisumu operations to help maintain and repair power infrastructure.',
      requirements: 'Diploma in Electrical Engineering\nEPRA License\n3+ years of field experience',
      responsibilities: 'Maintain and repair power grids and substations\nFault diagnosis and troubleshooting\nEnsure safety compliance and protocols',
      location: 'Kisumu',
      county: 'Kisumu',
      employmentType: 'Full-time',
      salaryMin: 60000,
      salaryMax: 90000,
      category: 'Engineering',
      experienceLevel: 'Mid Level',
      skillsRequired: 'Electrical Systems, EPRA, Safety Compliance',
      educationRequired: 'Diploma in Electrical Engineering',
      employerIdx: 4,
    },
    {
      title: 'Plumber',
      description: 'Davis & Shirtliff, East Africa\'s largest water equipment supplier, needs skilled plumbers for installation and maintenance work across Kiambu county.',
      requirements: 'Trade Test Grade 1\n3 years experience in plumbing\nValid driver\'s license',
      responsibilities: 'Install and repair water systems and pumps\nPipe maintenance and fitting\nCustomer site visits and assessments',
      location: 'Kiambu',
      county: 'Kiambu',
      employmentType: 'Full-time',
      salaryMin: 40000,
      salaryMax: 70000,
      category: 'Construction',
      experienceLevel: 'Entry Level',
      skillsRequired: 'Plumbing, Pipe Fitting, Pump Systems',
      educationRequired: 'Trade Test Grade 1',
      employerIdx: 5,
    },
    {
      title: 'High School Teacher',
      description: 'Brookhouse International School seeks experienced teachers for our Nairobi campus. We are looking for educators passionate about shaping the next generation.',
      requirements: 'B.Ed degree from recognized institution\nTSC Registration\nIGCSE experience is preferred',
      responsibilities: 'Teach Mathematics and Physics to high school students\nStudent mentorship and academic guidance\nCurriculum development and assessment',
      location: 'Nairobi',
      county: 'Nairobi',
      employmentType: 'Full-time',
      salaryMin: 120000,
      salaryMax: 180000,
      category: 'Education',
      experienceLevel: 'Senior Level',
      skillsRequired: 'Teaching, IGCSE, Classroom Management',
      educationRequired: 'B.Ed',
      employerIdx: 6,
    },
    {
      title: 'Registered Nurse',
      description: 'Aga Khan Hospital, a top-tier medical facility, is looking for dedicated nursing staff for our Mombasa campus. Join a world-class healthcare team.',
      requirements: 'BSc Nursing from recognized university\nNCK License\n2+ years of clinical experience',
      responsibilities: 'Provide comprehensive patient care\nAdminister medication and treatments\nMaintain accurate medical records',
      location: 'Mombasa',
      county: 'Mombasa',
      employmentType: 'Full-time',
      salaryMin: 90000,
      salaryMax: 140000,
      category: 'Healthcare',
      experienceLevel: 'Mid Level',
      skillsRequired: 'Nursing, Patient Care, NCK Licensed',
      educationRequired: 'BSc Nursing',
      employerIdx: 7,
    },
  ];

  for (const jd of jobData) {
    const emp = employers[jd.employerIdx];
    await prisma.job.create({
      data: {
        title: jd.title,
        description: jd.description,
        requirements: jd.requirements,
        responsibilities: jd.responsibilities,
        location: jd.location,
        county: jd.county,
        employmentType: jd.employmentType,
        salaryMin: jd.salaryMin,
        salaryMax: jd.salaryMax,
        salaryCurrency: 'KES',
        category: jd.category,
        experienceLevel: jd.experienceLevel,
        skillsRequired: jd.skillsRequired,
        educationRequired: jd.educationRequired,
        employerId: emp.user.id,
        status: 'ACTIVE',
      },
    });
  }

  // Create an application from John to Safaricom
  const safJob = await prisma.job.findFirst({
    where: { employerId: safaricom.id },
  });
  if (safJob) {
    await prisma.application.create({
      data: {
        jobId: safJob.id,
        applicantId: john.id,
        status: 'INTERVIEW',
        coverLetter: 'I am excited to apply for the Software Developer position at Safaricom. With 5+ years of experience in React and Node.js, I believe I can make an immediate impact.',
      },
    });
  }

  // Create a message thread
  if (safJob) {
    await prisma.message.create({
      data: {
        content: 'Hello John! We were impressed by your profile and verified credentials. Are you available for a quick interview tomorrow?',
        senderId: safaricom.id,
        receiverId: john.id,
        jobId: safJob.id,
      },
    });
    await prisma.message.create({
      data: {
        content: 'Hi! Thank you for reaching out. Yes, I\'m available tomorrow at 2 PM EAT. Looking forward to it!',
        senderId: john.id,
        receiverId: safaricom.id,
        jobId: safJob.id,
      },
    });
  }

  console.log('Seed complete!');
  console.log('Login credentials:');
  console.log('  Job Seeker: john.doe@example.com / password123');
  console.log('  Employer:   hr@safaricom.co.ke / password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
