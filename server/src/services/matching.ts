export interface MatchResult {
  applicantId: string;
  score: number;
  breakdown: {
    skills: number;
    education: number;
    experience: number;
    location: number;
  };
}

export function calculateMatchScore(
  applicant: {
    skills?: string | null;
    education?: string | null;
    experience?: string | null;
    location?: string | null;
    preferredLocation?: string | null;
    salaryExpectation?: number | null;
  },
  job: {
    skillsRequired?: string | null;
    educationRequired?: string | null;
    experienceLevel?: string | null;
    location: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    county?: string | null;
  }
): MatchResult {
  let skills = 0;
  let education = 0;
  let experience = 0;
  let location = 0;

  // Skills match (weight: 35%)
  if (applicant.skills && job.skillsRequired) {
    const appSkills = applicant.skills.toLowerCase().split(/[,;.\n]+/).map(s => s.trim()).filter(Boolean);
    const jobSkills = job.skillsRequired.toLowerCase().split(/[,;.\n]+/).map(s => s.trim()).filter(Boolean);
    if (jobSkills.length > 0) {
      const matched = appSkills.filter(s => jobSkills.some(js => js.includes(s) || s.includes(js)));
      skills = matched.length / jobSkills.length;
    }
  }

  // Education match (weight: 20%)
  if (applicant.education && job.educationRequired) {
    const edu = applicant.education.toLowerCase();
    const req = job.educationRequired.toLowerCase();
    if (edu.includes(req) || req.includes(edu)) {
      education = 1;
    } else {
      education = 0.5;
    }
  }

  // Experience match (weight: 25%)
  if (applicant.experience && job.experienceLevel) {
    const exp = applicant.experience.toLowerCase();
    const level = job.experienceLevel.toLowerCase();
    const levels = ['entry level', 'mid level', 'senior level', 'manager', 'executive'];
    const appIdx = levels.findIndex(l => exp.includes(l));
    const jobIdx = levels.findIndex(l => level.includes(l));
    if (appIdx >= 0 && jobIdx >= 0) {
      experience = appIdx >= jobIdx ? 1 : 0.5;
    } else {
      experience = 0.5;
    }
  }

  // Location match (weight: 20%)
  const appLoc = applicant.location || applicant.preferredLocation || '';
  const jobLoc = job.location || job.county || '';
  if (appLoc && jobLoc) {
    location = appLoc.toLowerCase().includes(jobLoc.toLowerCase()) ||
               jobLoc.toLowerCase().includes(appLoc.toLowerCase()) ? 1 : 0.3;
  }

  const totalScore = (skills * 0.35 + education * 0.20 + experience * 0.25 + location * 0.20) * 100;

  return {
    applicantId: '',
    score: Math.round(totalScore),
    breakdown: {
      skills: Math.round(skills * 100),
      education: Math.round(education * 100),
      experience: Math.round(experience * 100),
      location: Math.round(location * 100),
    },
  };
}
