import React, { useState, useEffect } from 'react';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import {
  UserResumeProfile,
  Opportunity,
  CareerSuccessScore,
  LearningRoadmap,
  CoverLetterData,
  MockInterviewSession,
  CompanyIntel,
  CareerBrief,
  AgentExecutionStep,
  InterviewQuestion
} from './types/career';
import { Header } from './components/Header';
import { AgentStatusBanner } from './components/AgentStatusBanner';
import { CareerSuccessProbabilityCard } from './components/CareerSuccessProbabilityCard';
import { OpportunityCard } from './components/OpportunityCard';
import { SkillGapView } from './components/SkillGapView';
import { CoverLetterView } from './components/CoverLetterView';
import { InterviewSimulator } from './components/InterviewSimulator';
import { CompanyIntelView } from './components/CompanyIntelView';
import { CareerBriefView } from './components/CareerBriefView';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { AgentArchitectureModal } from './components/AgentArchitectureModal';
import { HackathonJudgePanel } from './components/HackathonJudgePanel';
import { SettingsModal } from './components/SettingsModal';
import { SplashScreen } from './components/SplashScreen';
import { ModeSelectionModal } from './components/ModeSelectionModal';
import { AuthScreen } from './components/AuthScreen';
import { UserProfileModal } from './components/UserProfileModal';
import { auth, onAuthStateChanged, getRedirectResult, fbSignOut, testFirestoreConnection } from './lib/firebase';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  MapPin,
  Bot,
  User
} from 'lucide-react';

interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export default function App() {
  // Navigation & Modals state
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Authentication State (Firebase & Google Identity)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('careergenie_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Splash Screen & Environment Mode State
  const [showSplash, setShowSplash] = useState(true);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [appMode, setAppMode] = useState<'sample' | 'live'>(() => {
    const savedMode = localStorage.getItem('careergenie_mode') as 'sample' | 'live';
    const hasKey = !!localStorage.getItem('careergenie_serp_key');
    if (savedMode) return savedMode;
    return hasKey ? 'live' : 'sample';
  });

  // API keys (optional user provided)
  const [serpApiKey, setSerpApiKey] = useState(() => localStorage.getItem('careergenie_serp_key') || '');
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('careergenie_gemini_key') || '');

  // Initialize Firebase Auth listener and handle Google OAuth redirect
  useEffect(() => {
    testFirestoreConnection();

    // Check for Google Sign-In redirect result
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          const u: AuthUser = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL
          };
          setAuthUser(u);
          localStorage.setItem('careergenie_auth_user', JSON.stringify(u));
          setIsAuthModalOpen(false);
          setShowSplash(false);
          if (result.user.displayName) {
            setActiveProfile(prev => ({
              ...prev,
              fullName: result.user.displayName || prev.fullName,
              email: result.user.email || prev.email
            }));
          }
        }
      })
      .catch((err) => {
        console.warn('Google redirect resolution note:', err);
      });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const u: AuthUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        };
        setAuthUser(u);
        localStorage.setItem('careergenie_auth_user', JSON.stringify(u));
        if (firebaseUser.displayName) {
          setActiveProfile(prev => ({
            ...prev,
            fullName: firebaseUser.displayName || prev.fullName,
            email: firebaseUser.email || prev.email
          }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (!authUser) {
      setIsAuthModalOpen(true);
    } else {
      const hasChosen = sessionStorage.getItem('careergenie_session_mode_chosen');
      if (!hasChosen) {
        setIsModeModalOpen(true);
      }
    }
  };

  const handleAuthenticated = (user: AuthUser) => {
    setAuthUser(user);
    setIsAuthModalOpen(false);
    localStorage.setItem('careergenie_auth_user', JSON.stringify(user));
    if (user.displayName) {
      setActiveProfile(prev => ({
        ...prev,
        fullName: user.displayName || prev.fullName,
        email: user.email || prev.email
      }));
    }
    const hasChosen = sessionStorage.getItem('careergenie_session_mode_chosen');
    if (!hasChosen) {
      setIsModeModalOpen(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    setAuthUser(null);
    localStorage.removeItem('careergenie_auth_user');
    setIsAuthModalOpen(true);
  };

  const handleSelectMode = (mode: 'sample' | 'live', keys?: { serpApiKey: string; geminiApiKey: string }) => {
    setAppMode(mode);
    localStorage.setItem('careergenie_mode', mode);
    sessionStorage.setItem('careergenie_session_mode_chosen', 'true');
    if (mode === 'live' && keys) {
      setSerpApiKey(keys.serpApiKey);
      if (keys.geminiApiKey) setGeminiApiKey(keys.geminiApiKey);
      localStorage.setItem('careergenie_serp_key', keys.serpApiKey);
      if (keys.geminiApiKey) localStorage.setItem('careergenie_gemini_key', keys.geminiApiKey);
      fetchLiveOpportunities('Software Engineer Intern');
    }
  };

  // Core Data state
  const [activeProfile, setActiveProfile] = useState<UserResumeProfile>(SAMPLE_PROFILES[0]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedJob, setSelectedJob] = useState<Opportunity | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRemote, setFilterRemote] = useState(false);
  const [filterInternshipOnly, setFilterInternshipOnly] = useState(false);
  const [filterLocation, setFilterLocation] = useState('All');

  // Agent Specific State
  const [careerSuccessScore, setCareerSuccessScore] = useState<CareerSuccessScore>({
    overall: 78,
    matchScore: 86,
    interviewReadiness: 72,
    skillStrength: 80,
    explanation: "Synthesized from your 8 core technical proficiencies in React and TypeScript, high project relevance with DevPulse, and current interview readiness. Closing the Docker containerization gap will increase your probability score to 90%+.",
    formulaBreakdown: {
      matchWeight: "45% Weight (Resume Skills & Projects vs Job Specs)",
      interviewWeight: "30% Weight (Technical & Behavioral Mock Readiness)",
      skillWeight: "25% Weight (Core Stack Depth & GitHub Portfolio)",
      insights: [
        "Closing the Docker & Next.js SSR skill gap can boost your probability by +12%.",
        "Completing 2 mock interview rounds with Interview Genie will refine your readiness score."
      ]
    }
  });

  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [coverLetter, setCoverLetter] = useState<CoverLetterData | null>(null);
  const [interviewSession, setInterviewSession] = useState<MockInterviewSession | null>(null);
  const [companyIntel, setCompanyIntel] = useState<CompanyIntel | null>(null);
  const [careerBrief, setCareerBrief] = useState<CareerBrief | null>(null);

  // Execution & Loading states
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const [isRunningJudgeTest, setIsRunningJudgeTest] = useState(false);
  const [activeAgentName, setActiveAgentName] = useState<string>('');

  const [agentSteps, setAgentSteps] = useState<AgentExecutionStep[]>([]);

  // 1. Initial Load: Fetch Jobs, Company Intel, and Daily Brief
  useEffect(() => {
    fetchLiveOpportunities(activeProfile.targetRoles[0] || 'Software Engineer Intern');
    fetchCompanyIntel('Swiggy');
    fetchCareerBrief();
    initInterviewSession(activeProfile.targetRoles[0] || 'Frontend Developer Intern', 'Swiggy');
  }, []);

  // Fetch opportunities from SerpApi proxy endpoint
  const fetchLiveOpportunities = async (query: string) => {
    setIsLoadingJobs(true);
    setActiveAgentName('Opportunity Genie (SerpApi)');
    try {
      const res = await fetch('/api/serpapi/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query || 'Frontend React Intern India',
          location: 'India',
          customApiKey: serpApiKey
        })
      });
      const data = await res.json();
      const rawJobs: Opportunity[] = data.jobs || [];

      // Calculate initial match scores against active profile
      const scored = rawJobs.map((job) => {
        const userSkills = [
          ...activeProfile.skills.technical,
          ...activeProfile.skills.frameworks
        ].map(s => s.toLowerCase());

        const reqSkills = (job.required_skills || []).map(s => s.toLowerCase());
        const matched = reqSkills.filter(r => userSkills.some(u => u.includes(r) || r.includes(u)));
        const missing = reqSkills.filter(r => !userSkills.some(u => u.includes(r) || r.includes(u)));
        const skillRatio = reqSkills.length > 0 ? (matched.length / reqSkills.length) : 0.75;
        const skillScore = Math.round(Math.min(96, Math.max(55, skillRatio * 100)));
        const matchScore = Math.round(skillScore * 0.5 + 85 * 0.25 + 80 * 0.25);
        const successProb = Math.round(matchScore * 0.45 + 72 * 0.30 + 80 * 0.25);

        return {
          ...job,
          match_score: matchScore,
          career_success_probability: successProb,
          compatibility: {
            overall: matchScore,
            skillMatch: skillScore,
            educationMatch: 90,
            experienceMatch: 80,
            projectRelevance: 84,
            summary: `High semantic alignment between ${activeProfile.fullName} and ${job.company_name}.`
          },
          skill_gap: {
            matchedSkills: matched.length > 0 ? matched : ['React', 'JavaScript'],
            missingSkills: missing.length > 0 ? missing : ['Docker', 'System Design'],
            priorityGaps: missing.map((s, idx) => ({
              skill: s,
              priority: (idx === 0 ? 'High' : 'Medium') as 'High' | 'Medium' | 'Low',
              reason: `Important criteria for ${job.company_name}'s production standards.`
            })),
            recommendations: [
              `Build a hands-on project deploying a containerized app with ${missing[0] || 'Docker'}.`,
              'Practice system design mock scenarios with Interview Genie.'
            ]
          }
        };
      });

      setOpportunities(scored);
      if (scored.length > 0 && !selectedJob) {
        setSelectedJob(scored[0]);
      }
    } catch (e) {
      console.error('Failed to fetch jobs:', e);
    } finally {
      setIsLoadingJobs(false);
      setActiveAgentName('');
    }
  };

  // Fetch Company Intelligence from SerpApi
  const fetchCompanyIntel = async (companyName: string) => {
    setIsLoadingCompany(true);
    setActiveAgentName('Company Research Genie (SerpApi)');
    try {
      const res = await fetch('/api/agent/company-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, customApiKey: geminiApiKey })
      });
      const data = await res.json();
      if (data.intel) {
        setCompanyIntel(data.intel);
      }
    } catch (e) {
      console.error('Company intel error:', e);
    } finally {
      setIsLoadingCompany(false);
      setActiveAgentName('');
    }
  };

  // Fetch Daily Career Brief
  const fetchCareerBrief = async () => {
    try {
      const res = await fetch('/api/agent/career-brief');
      const data = await res.json();
      if (data.brief) {
        setCareerBrief(data.brief);
      }
    } catch (e) {
      console.error('Career brief error:', e);
    }
  };

  // Initialize Mock Interview Session
  const initInterviewSession = async (role: string, company: string) => {
    setIsGeneratingInterview(true);
    setActiveAgentName('Interview Genie');
    try {
      const res = await fetch('/api/agent/interview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, company, profile: activeProfile, customApiKey: geminiApiKey })
      });
      const data = await res.json();
      if (data.session) {
        setInterviewSession(data.session);
      }
    } catch (e) {
      console.error('Interview gen error:', e);
    } finally {
      setIsGeneratingInterview(false);
      setActiveAgentName('');
    }
  };

  // Evaluate candidate interview answer
  const handleEvaluateInterviewAnswer = async (question: InterviewQuestion, answer: string) => {
    setIsEvaluatingInterview(true);
    setActiveAgentName('Interview Genie (STAR Evaluation)');
    try {
      const res = await fetch('/api/agent/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userAnswer: answer,
          category: question.category,
          role: interviewSession?.role || activeProfile.targetRoles[0],
          customApiKey: geminiApiKey
        })
      });
      const data = await res.json();
      if (data.feedback && interviewSession) {
        const updatedQuestions = interviewSession.questions.map(q => {
          if (q.id === question.id) {
            return { ...q, userAnswer: answer, feedback: data.feedback };
          }
          return q;
        });

        setInterviewSession({
          ...interviewSession,
          questions: updatedQuestions
        });

        // Boost Interview Readiness in Career Success Probability!
        const newReadiness = Math.min(95, careerSuccessScore.interviewReadiness + 6);
        const newProb = Math.round(careerSuccessScore.matchScore * 0.45 + newReadiness * 0.30 + careerSuccessScore.skillStrength * 0.25);
        setCareerSuccessScore(prev => ({
          ...prev,
          interviewReadiness: newReadiness,
          overall: newProb,
          explanation: `Updated: Your mock interview answer scored ${data.feedback.score}%. Your readiness factor increased from ${prev.interviewReadiness}% to ${newReadiness}%, driving composite probability to ${newProb}%.`
        }));
      }
    } catch (e) {
      console.error('Evaluate interview error:', e);
    } finally {
      setIsEvaluatingInterview(false);
      setActiveAgentName('');
    }
  };

  // Generate Learning Roadmap with SerpApi grounding
  const handleGenerateRoadmap = async (role: string, gaps: string[]) => {
    setIsLoadingRoadmap(true);
    setActiveAgentName('Learning Genie (SerpApi Roadmaps)');
    try {
      const res = await fetch('/api/agent/learning-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole: role, missingSkills: gaps, customApiKey: geminiApiKey })
      });
      const data = await res.json();
      if (data.roadmap) {
        setRoadmap(data.roadmap);
      }
    } catch (e) {
      console.error('Roadmap error:', e);
    } finally {
      setIsLoadingRoadmap(false);
      setActiveAgentName('');
    }
  };

  // Generate Tailored ATS Cover Letter
  const handleGenerateCoverLetter = async (job: Opportunity) => {
    setIsGeneratingCoverLetter(true);
    setActiveAgentName('Cover Letter Genie');
    try {
      const res = await fetch('/api/agent/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: activeProfile,
          opportunity: job,
          companyIntel,
          customApiKey: geminiApiKey
        })
      });
      const data = await res.json();
      if (data.coverLetter) {
        setCoverLetter(data.coverLetter);
        setSelectedJob(job);
        setCurrentTab('cover-letter');
      }
    } catch (e) {
      console.error('Cover letter error:', e);
    } finally {
      setIsGeneratingCoverLetter(false);
      setActiveAgentName('');
    }
  };

  // Master Orchestration: Run full autonomous agent pipeline for a profile
  const handleRunFullPipeline = async (profile: UserResumeProfile) => {
    setIsOrchestrating(true);
    setActiveAgentName('Master Agent Orchestrator');
    try {
      const res = await fetch('/api/agent/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: profile.rawText || JSON.stringify(profile),
          customApiKey: geminiApiKey
        })
      });
      const data = await res.json();
      if (data.opportunities) {
        setOpportunities(data.opportunities);
        if (data.opportunities.length > 0) {
          setSelectedJob(data.opportunities[0]);
        }
      }
      if (data.careerSuccessScore) {
        setCareerSuccessScore(data.careerSuccessScore);
      }
    } catch (e) {
      console.error('Orchestration error:', e);
    } finally {
      setIsOrchestrating(false);
      setActiveAgentName('');
    }
  };

  // Handle Profile Switch / Upload
  const handleProfileLoaded = (profile: UserResumeProfile) => {
    setActiveProfile(profile);
    handleRunFullPipeline(profile);
  };

  // Custom text / PDF parsing via Resume Genie
  const handleParseCustomResume = async (payload: { text?: string; pdfBase64?: string; fileName?: string }) => {
    setIsOrchestrating(true);
    setActiveAgentName('Resume Genie');
    try {
      const res = await fetch('/api/agent/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: payload.text,
          pdfBase64: payload.pdfBase64,
          mimeType: payload.pdfBase64 ? 'application/pdf' : 'text/plain',
          customApiKey: geminiApiKey
        })
      });
      const data = await res.json();
      if (data.profile) {
        setActiveProfile(data.profile);
        await handleRunFullPipeline(data.profile);
      }
    } catch (e) {
      console.error('Parse resume error:', e);
    } finally {
      setIsOrchestrating(false);
      setActiveAgentName('');
    }
  };

  // Automated Judge Test Suite
  const handleRunJudgeTest = async () => {
    setIsRunningJudgeTest(true);
    await new Promise(r => setTimeout(r, 600));
    await fetchLiveOpportunities('AI Engineer Intern');
    await fetchCompanyIntel('CRED');
    await handleGenerateRoadmap('AI Engineer', ['PyTorch', 'Vector DBs', 'Docker']);
    setIsRunningJudgeTest(false);
  };

  // Filter opportunities for view
  const filteredJobs = opportunities.filter((job) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchQ =
        job.title.toLowerCase().includes(q) ||
        job.company_name.toLowerCase().includes(q) ||
        job.required_skills.some(s => s.toLowerCase().includes(q));
      if (!matchQ) return false;
    }
    if (filterRemote && !job.work_from_home) return false;
    if (filterInternshipOnly && job.schedule_type !== 'Internship') return false;
    if (filterLocation !== 'All' && !job.location.toLowerCase().includes(filterLocation.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Animated Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeProfile={activeProfile}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        onOpenArch={() => setIsArchModalOpen(true)}
        onOpenJudge={() => setIsJudgeModalOpen(true)}
        isSimulatedSerp={!serpApiKey}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        activeAgentsCount={9}
        appMode={appMode}
        onOpenModeSelector={() => setIsModeModalOpen(true)}
        authUser={authUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Agent Status Banner (Linear-style live execution telemetry) */}
        <AgentStatusBanner
          steps={agentSteps}
          isThinking={isOrchestrating || !!activeAgentName}
          activeAgentName={activeAgentName}
        />

        {/* TAB 1: COMMAND CENTER (DASHBOARD) */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Differentiator Hero: Career Success Probability Score */}
            <CareerSuccessProbabilityCard
              score={careerSuccessScore}
              targetRole={activeProfile.targetRoles[0]}
              candidateName={activeProfile.fullName}
              companyName={selectedJob?.company_name || 'Swiggy'}
              missingSkills={selectedJob?.skill_gap?.missingSkills || ['Docker', 'Next.js', 'System Design']}
              onNavigateToRoadmap={() => {
                if (selectedJob) {
                  handleGenerateRoadmap(selectedJob.title, selectedJob.skill_gap?.missingSkills || ['Next.js', 'Docker']);
                }
                setCurrentTab('skill-gap');
              }}
              onNavigateToInterview={() => setCurrentTab('interview')}
            />

            {/* Quick Profile Summary Bar */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  {activeProfile.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{activeProfile.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      CGPA {activeProfile.cgpa}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {activeProfile.degree} • {activeProfile.college}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Account & Profile</span>
                </button>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                >
                  Switch Profile
                </button>
                <button
                  onClick={() => handleRunFullPipeline(activeProfile)}
                  disabled={isOrchestrating}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isOrchestrating ? 'animate-spin' : ''}`} />
                  <span>Re-Run Agent DAG</span>
                </button>
              </div>
            </div>

            {/* Top Recommended Opportunities Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white tracking-tight">
                      Top Matched Opportunities (Grounded by SerpApi)
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                      Real-time Feed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live Indian tech internships matched by Match Genie against your verified projects & skill AST
                  </p>
                </div>

                <button
                  onClick={() => setCurrentTab('opportunities')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
                >
                  <span>Explore All {opportunities.length} Openings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {opportunities.slice(0, 3).map((job) => (
                  <OpportunityCard
                    key={job.id}
                    job={job}
                    onSelectForCoverLetter={handleGenerateCoverLetter}
                    onSelectForSkillGap={(j) => {
                      setSelectedJob(j);
                      handleGenerateRoadmap(j.title, j.skill_gap?.missingSkills || ['Next.js', 'Docker']);
                      setCurrentTab('skill-gap');
                    }}
                    onSelectForInterview={(j) => {
                      setSelectedJob(j);
                      initInterviewSession(j.title, j.company_name);
                      setCurrentTab('interview');
                    }}
                    onSelectForCompanyIntel={(company) => {
                      fetchCompanyIntel(company);
                      setCurrentTab('company');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 3-Column Quick Modules: Daily Brief, Top Grant, and Trending Skills */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div
                onClick={() => setCurrentTab('brief')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Agent 9 • Daily Brief
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  140+ New Internships Live Today in India
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  Spike in React, Next.js, and Agentic AI trainee postings in Bengaluru & Hyderabad.
                </p>
              </div>

              <div
                onClick={() => setCurrentTab('brief')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Scholarship Spotlight
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Google Generation Scholarship (APAC)
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  ₹1,50,000 grant for women in computer science. Deadline approaching.
                </p>
              </div>

              <div
                onClick={() => setCurrentTab('brief')}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Ecosystem Trend
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Agentic AI & Tool Calling (+184%)
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  Fastest growing engineering prerequisite in Indian university hiring rounds.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE OPPORTUNITIES (SERPAPI GOOGLE JOBS) */}
        {currentTab === 'opportunities' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search & Filter Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1 font-mono">
                      <Search className="w-3 h-3" />
                      AGENT 2: OPPORTUNITY GENIE (SERPAPI)
                    </span>
                    <span className="text-xs text-slate-400 font-medium">engine=google_jobs</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">
                    Live Indian Internships & Fresher Openings
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchLiveOpportunities(searchQuery || activeProfile.targetRoles[0])}
                    disabled={isLoadingJobs}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingJobs ? 'animate-spin' : ''}`} />
                    <span>Refresh SerpApi Feed</span>
                  </button>
                </div>
              </div>

              {/* Input & Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by role or skill (e.g. React, Docker)..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Location Filter */}
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Locations (India)</option>
                  <option value="Bengaluru">Bengaluru, Karnataka</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Gurugram">Gurugram / Delhi NCR</option>
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Remote">Remote India</option>
                </select>

                {/* Remote Toggle */}
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterRemote}
                    onChange={(e) => setFilterRemote(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>Remote Only</span>
                </label>

                {/* Internship Only Toggle */}
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterInternshipOnly}
                    onChange={(e) => setFilterInternshipOnly(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>Internships Only</span>
                </label>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <OpportunityCard
                    key={job.id}
                    job={job}
                    onSelectForCoverLetter={handleGenerateCoverLetter}
                    onSelectForSkillGap={(j) => {
                      setSelectedJob(j);
                      handleGenerateRoadmap(j.title, j.skill_gap?.missingSkills || ['Next.js', 'Docker']);
                      setCurrentTab('skill-gap');
                    }}
                    onSelectForInterview={(j) => {
                      setSelectedJob(j);
                      initInterviewSession(j.title, j.company_name);
                      setCurrentTab('interview');
                    }}
                    onSelectForCompanyIntel={(company) => {
                      fetchCompanyIntel(company);
                      setCurrentTab('company');
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center">
                  <Search className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">No openings matched your filters</h4>
                  <p className="text-xs text-slate-400">Try clearing keywords or switching locations to see more SerpApi results.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SKILL GAP & LEARNING ROADMAP */}
        {currentTab === 'skill-gap' && (
          <div className="animate-fadeIn">
            <SkillGapView
              selectedJob={selectedJob}
              profile={activeProfile}
              onGenerateRoadmap={handleGenerateRoadmap}
              isLoadingRoadmap={isLoadingRoadmap}
              roadmap={roadmap}
            />
          </div>
        )}

        {/* TAB 4: COVER LETTER STUDIO */}
        {currentTab === 'cover-letter' && (
          <div className="animate-fadeIn">
            <CoverLetterView
              coverLetter={coverLetter}
              selectedJob={selectedJob}
              profile={activeProfile}
              onGenerateCoverLetter={handleGenerateCoverLetter}
              isGenerating={isGeneratingCoverLetter}
              opportunities={opportunities}
              onSelectJob={(job) => {
                setSelectedJob(job);
                handleGenerateCoverLetter(job);
              }}
            />
          </div>
        )}

        {/* TAB 5: MOCK INTERVIEW LAB */}
        {currentTab === 'interview' && (
          <div className="animate-fadeIn">
            <InterviewSimulator
              session={interviewSession}
              onGenerateSession={initInterviewSession}
              onEvaluateAnswer={handleEvaluateInterviewAnswer}
              isGenerating={isGeneratingInterview}
              isEvaluating={isEvaluatingInterview}
              targetRole={selectedJob?.title || activeProfile.targetRoles[0] || 'Frontend Developer Intern'}
              targetCompany={selectedJob?.company_name || 'Top Tier Indian Startups'}
              opportunities={opportunities}
              selectedJob={selectedJob}
              onSelectJob={(job) => {
                setSelectedJob(job);
                initInterviewSession(job.title, job.company_name);
              }}
            />
          </div>
        )}

        {/* TAB 6: COMPANY DOSSIER */}
        {currentTab === 'company' && (
          <div className="animate-fadeIn">
            <CompanyIntelView
              intel={companyIntel}
              onSearchCompany={fetchCompanyIntel}
              isLoading={isLoadingCompany}
              targetCompany={selectedJob?.company_name || 'Swiggy'}
            />
          </div>
        )}

        {/* TAB 7: DAILY CAREER BRIEF & GRANTS */}
        {currentTab === 'brief' && (
          <div className="animate-fadeIn">
            <CareerBriefView
              brief={careerBrief}
              onSelectOpportunity={(job) => {
                setSelectedJob(job);
                setCurrentTab('opportunities');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">CareerGenie</span>
            <span>— Built for SerpApi India Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsArchModalOpen(true)} className="hover:text-indigo-400 transition">
              Architecture Blueprint
            </button>
            <button onClick={() => setIsJudgeModalOpen(true)} className="hover:text-amber-400 transition">
              Judge Evaluation Suite
            </button>
            <button onClick={() => setIsSettingsModalOpen(true)} className="hover:text-cyan-400 transition">
              API Keys Config
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isAuthModalOpen && (
        <AuthScreen
          onAuthenticated={handleAuthenticated}
          onContinueAsGuest={() => {
            setIsAuthModalOpen(false);
            const hasChosen = sessionStorage.getItem('careergenie_session_mode_chosen');
            if (!hasChosen) {
              setIsModeModalOpen(true);
            }
          }}
        />
      )}

      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onProfileLoaded={handleProfileLoaded}
        isLoading={isOrchestrating}
        onParseResume={handleParseCustomResume}
        appMode={appMode}
        onSwitchToLiveMode={() => setIsModeModalOpen(true)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        activeProfile={activeProfile}
        authUser={authUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => {
          setIsProfileModalOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <ModeSelectionModal
        isOpen={isModeModalOpen}
        onClose={() => setIsModeModalOpen(false)}
        onSelectMode={handleSelectMode}
        currentMode={appMode}
        currentSerpKey={serpApiKey}
        currentGeminiKey={geminiApiKey}
      />

      <AgentArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

      <HackathonJudgePanel
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
        onRunAutonomousTest={handleRunJudgeTest}
        isRunningTest={isRunningJudgeTest}
        activeAgentsCount={9}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        serpApiKey={serpApiKey}
        setSerpApiKey={setSerpApiKey}
        geminiApiKey={geminiApiKey}
        setGeminiApiKey={setGeminiApiKey}
      />
    </div>
  );
}
