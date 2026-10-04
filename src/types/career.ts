export interface SkillBreakdown {
  technical: string[];
  soft: string[];
  tools: string[];
  frameworks: string[];
}

export interface ProjectItem {
  title: string;
  techStack: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface UserResumeProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  graduationYear: string;
  cgpa: string;
  targetRoles: string[];
  locationPreference: string;
  skills: SkillBreakdown;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: string[];
  summary: string;
  rawText: string;
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface OpportunityCompatibility {
  overall: number;
  skillMatch: number;
  educationMatch: number;
  experienceMatch: number;
  projectRelevance: number;
  summary: string;
}

export interface OpportunitySkillGap {
  matchedSkills: string[];
  missingSkills: string[];
  priorityGaps: { skill: string; priority: 'High' | 'Medium' | 'Low'; reason: string }[];
  recommendations: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  company_name: string;
  location: string;
  via: string;
  description: string;
  salary?: string;
  schedule_type?: string;
  work_from_home?: boolean;
  apply_link: string;
  posted_at?: string;
  thumbnail?: string;
  required_skills: string[];
  match_score?: number;
  career_success_probability?: number;
  compatibility?: OpportunityCompatibility;
  skill_gap?: OpportunitySkillGap;
}

export interface CareerSuccessScore {
  overall: number;
  matchScore: number;
  interviewReadiness: number;
  skillStrength: number;
  explanation: string;
  formulaBreakdown: {
    matchWeight: string;
    skillWeight: string;
    interviewWeight: string;
    insights: string[];
  };
}

export interface DailyTask {
  day: number;
  task: string;
  resourceUrl: string;
  resourceTitle: string;
  duration: string;
}

export interface LearningMilestone {
  period: string;
  goal: string;
  tasks: string[];
  deliverable?: string;
}

export interface SerpResource {
  title: string;
  link: string;
  snippet: string;
  source: string;
  type: 'course' | 'tutorial' | 'certification' | 'documentation';
}

export interface LearningRoadmap {
  targetRole: string;
  missingSkills: string[];
  day7: {
    title: string;
    focus: string;
    tasks: DailyTask[];
  };
  day15: {
    title: string;
    focus: string;
    milestones: LearningMilestone[];
  };
  day30: {
    title: string;
    focus: string;
    milestones: LearningMilestone[];
    capstoneProject: {
      name: string;
      description: string;
      techStack: string[];
    };
  };
  resources: SerpResource[];
}

export interface CoverLetterData {
  candidateName: string;
  companyName: string;
  role: string;
  generatedText: string;
  atsScore: number;
  keyHighlightsIncluded: string[];
  tips: string[];
}

export interface InterviewQuestion {
  id: string;
  category: 'technical' | 'hr' | 'behavioral';
  question: string;
  expectedKeyPoints: string[];
  userAnswer?: string;
  feedback?: {
    score: number;
    strengths: string[];
    gaps: string[];
    suggestedAnswer: string;
  };
}

export interface MockInterviewSession {
  id: string;
  role: string;
  company: string;
  questions: InterviewQuestion[];
  overallScore?: number;
  readinessStatus?: string;
  summaryFeedback?: string;
}

export interface CompanyNewsItem {
  title: string;
  snippet: string;
  link: string;
  date: string;
  source: string;
}

export interface CompanyIntel {
  companyName: string;
  industry: string;
  founded?: string;
  headquarters?: string;
  fundingRound?: string;
  techStack: string[];
  recentNews: CompanyNewsItem[];
  hiringTrends: string;
  interviewInsights: string[];
  cultureSummary: string;
  fresherPros: string[];
  fresherCons: string[];
}

export interface ScholarshipItem {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  link: string;
  category: string;
}

export interface HackathonItem {
  id: string;
  title: string;
  platform: string;
  prize: string;
  deadline: string;
  link: string;
  theme: string;
  mode?: 'online' | 'offline' | 'hybrid';
  region?: string;
  venue?: string;
}

export interface CareerBrief {
  date: string;
  headline: string;
  internshipsCount: number;
  topOpportunities: Opportunity[];
  featuredScholarships: ScholarshipItem[];
  hackathons: HackathonItem[];
  trendingSkills: { skill: string; demandGrowth: string; category: string }[];
  dailyAgentTip: string;
}

export interface AgentExecutionStep {
  id: string;
  agentName: string;
  badge: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  timestamp: string;
  details: string;
  toolCall?: {
    service: string;
    query?: string;
    params?: Record<string, any>;
  };
}
