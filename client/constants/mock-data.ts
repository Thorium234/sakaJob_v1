export const MOCK_JOBS = [
  {
    id: "1",
    title: "Software Developer",
    company: "Safaricom",
    county: "Nairobi",
    salary: "KES 150,000 - 250,000",
    type: "Full-time",
    requirements: [
      "3+ years experience in React/Node.js",
      "Bachelor's in Computer Science or related field",
      "Experience with cloud services",
    ],
    responsibilities: [
      "Build and maintain web applications",
      "Collaborate with cross-functional teams",
      "Write clean, testable code",
    ],
    benefits: ["Health Insurance", "Remote Work Option", "Stock Options"],
    description:
      "Safaricom is Kenya's leading telecommunications company. We are looking for a talented Software Developer to join our growing engineering team. You will work on products that serve millions of Kenyans daily.",
    companyDescription:
      "Leading telco in East Africa with a mission to transform lives through connectivity.",
    verified: true,
  },
  {
    id: "2",
    title: "Graphic Designer",
    company: "Equity Bank",
    county: "Nairobi",
    salary: "KES 80,000 - 120,000",
    type: "Full-time",
    requirements: [
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio demonstrating design skills",
      "2+ years experience",
    ],
    responsibilities: [
      "Create marketing materials and brand assets",
      "Design digital and print collateral",
      "Maintain brand consistency",
    ],
    benefits: ["Health Insurance", "Annual Bonus", "Flexible Hours"],
    description:
      "Join Equity Bank's creative team to shape the visual identity of one of Africa's largest financial institutions.",
    companyDescription:
      "A leading financial services provider empowering communities across East Africa.",
    verified: true,
  },
  {
    id: "3",
    title: "Sales Representative",
    company: "Twiga Foods",
    county: "Nakuru",
    salary: "KES 50,000 + Commission",
    type: "Contract",
    requirements: [
      "Proven sales experience",
      "Excellent communication skills",
      "Must own a smartphone",
    ],
    responsibilities: [
      "Meet and exceed monthly sales targets",
      "Build relationships with local vendors",
      "Report daily sales activities",
    ],
    benefits: ["Travel Allowance", "Commission", "Phone Allowance"],
    description:
      "Twiga Foods is a fast-growing food distribution platform connecting farmers to markets.",
    companyDescription:
      "Revolutionizing food distribution across Kenya through technology.",
    verified: true,
  },
  {
    id: "4",
    title: "Accountant",
    company: "KCB Group",
    county: "Mombasa",
    salary: "KES 100,000 - 150,000",
    type: "Full-time",
    requirements: ["CPA-K Certification", "BCom Accounting degree", "3+ years experience"],
    responsibilities: [
      "Manage financial records and books",
      "Ensure tax compliance",
      "Prepare financial reports",
    ],
    benefits: ["Pension Scheme", "Medical Cover", "Loan Benefits"],
    description:
      "KCB Group, one of East Africa's largest banks, is seeking a seasoned accountant for our Mombasa branch.",
    companyDescription:
      "Kenya's oldest and most trusted banking institution.",
    verified: true,
  },
  {
    id: "5",
    title: "Electrician",
    company: "KenGen",
    county: "Kisumu",
    salary: "KES 60,000 - 90,000",
    type: "Full-time",
    requirements: [
      "Diploma in Electrical Engineering",
      "EPRA License",
      "3+ years field experience",
    ],
    responsibilities: [
      "Maintain and repair power grids",
      "Fault diagnosis and troubleshooting",
      "Ensure safety compliance",
    ],
    benefits: ["Health Insurance", "Overtime Pay", "Uniform Allowance"],
    description:
      "KenGen is Kenya's largest power generator. We need skilled electricians for our Kisumu operations.",
    companyDescription:
      "Leading power generation company powering Kenya's growth.",
    verified: true,
  },
  {
    id: "6",
    title: "Plumber",
    company: "Davis & Shirtliff",
    county: "Kiambu",
    salary: "KES 40,000 - 70,000",
    type: "Full-time",
    requirements: ["Trade Test Grade 1", "3 years experience", "Valid driver's license"],
    responsibilities: [
      "Install and repair water systems",
      "Pipe maintenance and fitting",
      "Customer site visits",
    ],
    benefits: ["Uniform Provided", "Transport Allowance", "Medical Cover"],
    description:
      "Davis & Shirtliff, East Africa's largest water equipment supplier, needs skilled plumbers.",
    companyDescription:
      "Leading water and energy solutions provider in East Africa.",
    verified: true,
  },
  {
    id: "7",
    title: "High School Teacher",
    company: "Brookhouse School",
    county: "Nairobi",
    salary: "KES 120,000 - 180,000",
    type: "Full-time",
    requirements: ["B.Ed degree", "TSC Registration", "IGCSE experience preferred"],
    responsibilities: [
      "Teach Mathematics and Physics",
      "Student mentorship",
      "Curriculum development",
    ],
    benefits: ["Housing Allowance", "Medical Cover", "School Fees Discount"],
    description:
      "Brookhouse International School seeks experienced teachers for our Nairobi campus.",
    companyDescription:
      "Premier international school offering world-class education in Kenya.",
    verified: true,
  },
  {
    id: "8",
    title: "Registered Nurse",
    company: "Aga Khan Hospital",
    county: "Mombasa",
    salary: "KES 90,000 - 140,000",
    type: "Full-time",
    requirements: ["BSc Nursing", "NCK License", "2+ years experience"],
    responsibilities: [
      "Provide patient care",
      "Administer medication",
      "Maintain medical records",
    ],
    benefits: ["Health Insurance", "Shift Allowance", "Continuing Education"],
    description:
      "Aga Khan Hospital, a top-tier medical facility, is looking for dedicated nursing staff.",
    companyDescription:
      "World-class healthcare facility serving East Africa with excellence.",
    verified: true,
  },
];

interface MockMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
}

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  "1": [
    {
      id: 1,
      sender: "employer",
      text: "Hello John! We were impressed by your profile and verified credentials.",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "employer",
      text: "Are you available for a quick interview tomorrow? We'd love to discuss the Software Developer role.",
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "Hi! Thank you for reaching out. Yes, I'm available tomorrow at 2 PM EAT. Looking forward to it!",
      time: "10:15 AM",
    },
  ],
  "2": [
    {
      id: 1,
      sender: "employer",
      text: "Hi John, we saw your application for the Graphic Designer position.",
      time: "Yesterday",
    },
    {
      id: 2,
      sender: "user",
      text: "Hello! Yes, I'm very interested in the role. I'd love to discuss how my experience aligns with your needs.",
      time: "Yesterday",
    },
  ],
};

export const MOCK_CONVERSATIONS = [
  {
    id: "1",
    company: "Safaricom HR",
    role: "Software Developer",
    lastMessage: "Great! I'll send you a calendar invite shortly.",
    time: "10:20 AM",
    unread: 2,
  },
  {
    id: "2",
    company: "Equity Bank Design Team",
    role: "Graphic Designer",
    lastMessage: "We'll review your portfolio and get back to you.",
    time: "Yesterday",
    unread: 0,
  },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Your application to Safaricom was viewed.", time: "2h ago" },
  { id: 2, text: "New job matches your profile in Nairobi.", time: "5h ago" },
  { id: 3, text: "Interview reminder: Safaricom tomorrow at 10 AM.", time: "1d ago" },
];

export const MOCK_APPLICATIONS = [
  {
    id: "1",
    title: "Software Developer",
    company: "Safaricom",
    appliedDate: "2 days ago",
    status: "Interview Scheduled",
    stage: 3,
  },
  {
    id: "2",
    title: "Graphic Designer",
    company: "Equity Bank",
    appliedDate: "5 days ago",
    status: "Under Review",
    stage: 2,
  },
];

export const MOCK_LEARNING_MODULES = [
  {
    id: "1",
    title: "CV Writing Masterclass",
    lessons: 5,
    completed: 5,
    color: "#2563EB",
    bg: "#DBEAFE",
    desc: "Learn how to write a CV that passes ATS filters and catches recruiters' eyes.",
  },
  {
    id: "2",
    title: "Interview Preparation",
    lessons: 8,
    completed: 3,
    color: "#16A34A",
    bg: "#DCFCE7",
    desc: "Master behavioral and technical interviews with proven frameworks.",
  },
  {
    id: "3",
    title: "Professional Communication",
    lessons: 6,
    completed: 0,
    color: "#9333EA",
    bg: "#F3E8FF",
    desc: "Enhance your email, chat, and verbal communication in professional settings.",
  },
  {
    id: "4",
    title: "Digital Skills for Work",
    lessons: 10,
    completed: 0,
    color: "#F97316",
    bg: "#FFF7ED",
    desc: "Essential software tools every modern employee should know.",
  },
];
