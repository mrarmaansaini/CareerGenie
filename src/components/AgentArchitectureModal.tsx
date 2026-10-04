import React, { useState } from 'react';
import { X, Cpu, Database, Server, GitBranch, Layers, ShieldCheck, Zap, Terminal, Code2 } from 'lucide-react';

interface AgentArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentArchitectureModal: React.FC<AgentArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'dag' | 'schema' | 'api' | 'judging'>('dag');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  CareerGenie System Architecture & Engineering Blueprint
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  SerpApi Hackathon 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Autonomous Multi-Agent DAG • SerpApi Live Grounding • Gemini 2.5 Flash Reasoning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-6 shrink-0">
          {[
            { id: 'dag', label: '1. Multi-Agent DAG Workflow', icon: GitBranch },
            { id: 'schema', label: '2. Supabase DB Schema', icon: Database },
            { id: 'api', label: '3. Backend API Design', icon: Server },
            { id: 'judging', label: '4. Judge Scoring Matrix', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* TAB 1: DAG WORKFLOW */}
          {activeTab === 'dag' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200 leading-relaxed">
                <strong>Autonomous Workflow Model:</strong> Unlike a passive chatbot that awaits user questions, CareerGenie operates as an autonomous agent DAG. When a student uploads their profile, 9 specialized agents coordinate sequentially and in parallel to discover, verify, diagnose, and construct personalized career assets.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    step: 'Stage 1: Resume Ingestion',
                    agent: 'Resume Genie',
                    engine: 'Gemini 2.5 Flash',
                    action: 'Parses unstructured text/PDF into typed JSON AST with verified skills, projects, and CGPA metrics.'
                  },
                  {
                    step: 'Stage 2: Opportunity Search',
                    agent: 'Opportunity Genie',
                    engine: 'SerpApi (google_jobs)',
                    action: 'Dispatches real-time queries for Indian tech hubs (Bengaluru, Hyderabad, Gurugram, Remote) across LinkedIn, Naukri, Internshala.'
                  },
                  {
                    step: 'Stage 3: Multi-Factor Fit',
                    agent: 'Match Genie',
                    engine: 'Gemini Cosine Engine',
                    action: 'Computes Skill Match (45%), Project Relevance (25%), Experience (15%), and Education (15%) for composite compatibility.'
                  },
                  {
                    step: 'Stage 4: Gap Detection',
                    agent: 'Skill Gap Genie',
                    engine: 'Tech Delta Vector',
                    action: 'Identifies missing prerequisite frameworks (e.g. Next.js, Docker) and assigns priority levels with time-to-acquire.'
                  },
                  {
                    step: 'Stage 5: Learning Curator',
                    agent: 'Learning Genie',
                    engine: 'SerpApi (google engine)',
                    action: 'Fetches verified free documentation, YouTube crash courses, and FreeCodeCamp roadmaps for 7, 15, and 30-day plans.'
                  },
                  {
                    step: 'Stage 6: ATS Copywriter',
                    agent: 'Cover Letter Genie',
                    engine: 'Gemini ATS Engine',
                    action: 'Synthesizes targeted pitch letters weaving candidate projects with company mission; evaluates against ATS scanner rules.'
                  },
                  {
                    step: 'Stage 7: Mock Interviewer',
                    agent: 'Interview Genie',
                    engine: 'Gemini STAR Simulator',
                    action: 'Runs 4-round technical and behavioral interview simulation, evaluating answers and providing 98+ model answers.'
                  },
                  {
                    step: 'Stage 8: Company Dossier',
                    agent: 'Company Research Genie',
                    engine: 'SerpApi (google & news)',
                    action: 'Gathers live funding rounds, verified tech stacks, hiring trends, and Glassdoor interview feedback for Indian startups.'
                  },
                  {
                    step: 'Stage 9: Daily Digest',
                    agent: 'Career Brief Genie',
                    engine: 'SerpApi Grants & Jobs',
                    action: 'Compiles morning briefing with trending skills (+184% agentic), scholarships (Google APAC), and hackathons.'
                  },
                  {
                    step: 'Stage 10: Differentiator',
                    agent: 'Career Success Probability',
                    engine: 'Tri-Factor Composite',
                    action: 'Combines Match Score (45%) + Interview Readiness (30%) + Skill Strength (25%) into an actionable probability gauge.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-white text-[11px]">{item.step}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">
                        {item.engine}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-cyan-400 mb-1">
                      {item.agent}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE SCHEMA */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Production-grade PostgreSQL schema designed for Supabase with Row Level Security (RLS) and JSONB indexing for resumes and opportunities:
              </p>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Students Profile Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  college TEXT,
  degree TEXT,
  graduation_year TEXT,
  cgpa NUMERIC(3, 2),
  location_preference TEXT,
  target_roles TEXT[],
  skills JSONB NOT NULL DEFAULT '{"technical":[],"soft":[],"tools":[],"frameworks":[]}',
  projects JSONB NOT NULL DEFAULT '[]',
  experience JSONB NOT NULL DEFAULT '[]',
  raw_resume TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Opportunities (Cached from SerpApi Google Jobs)
CREATE TABLE opportunities (
  id TEXT PRIMARY KEY, -- SerpApi job_id
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL,
  via TEXT,
  description TEXT,
  salary_range TEXT,
  schedule_type TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  apply_link TEXT NOT NULL,
  required_skills TEXT[],
  serp_search_query TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Match & Career Success Evaluations
CREATE TABLE career_evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  opportunity_id TEXT REFERENCES opportunities(id) ON DELETE CASCADE,
  match_score INT NOT NULL,
  interview_readiness INT NOT NULL,
  skill_strength INT NOT NULL,
  success_probability INT NOT NULL,
  diagnostic_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Learning Roadmaps & Milestones
CREATE TABLE learning_roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  missing_skills TEXT[] NOT NULL,
  plan_7day JSONB NOT NULL,
  plan_15day JSONB NOT NULL,
  plan_30day JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Mock Interview Sessions & Answers
CREATE TABLE mock_interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  questions JSONB NOT NULL,
  overall_score INT,
  readiness_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
              </pre>
            </div>
          )}

          {/* TAB 3: API SPECIFICATION */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                RESTful Express / FastAPI backend API design powering the CareerGenie microservices:
              </p>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { method: 'POST', path: '/api/serpapi/jobs', desc: 'Queries SerpApi engine=google_jobs for live internships in India with location and role filters.' },
                  { method: 'POST', path: '/api/serpapi/company', desc: 'Queries SerpApi engine=google & news for real-time funding, tech stack, and hiring intelligence.' },
                  { method: 'POST', path: '/api/serpapi/resources', desc: 'Discovers verified free tutorials and official documentation for identified skill gaps.' },
                  { method: 'POST', path: '/api/agent/parse-resume', desc: 'Resume Genie: Ingests raw resume text/PDF and emits typed structured JSON schema.' },
                  { method: 'POST', path: '/api/agent/match', desc: 'Match Genie: Calculates 4-factor semantic compatibility between candidate and job posting.' },
                  { method: 'POST', path: '/api/agent/skill-gap', desc: 'Skill Gap Genie: Performs set delta and vector diagnosis to extract missing tech competencies.' },
                  { method: 'POST', path: '/api/agent/learning-plan', desc: 'Learning Genie: Constructs actionable 7, 15, and 30-day accelerated roadmaps.' },
                  { method: 'POST', path: '/api/agent/cover-letter', desc: 'Cover Letter Genie: Synthesizes high-conversion ATS-optimized cover letter.' },
                  { method: 'POST', path: '/api/agent/interview/generate', desc: 'Interview Genie: Generates technical, behavioral, and HR questions for target role.' },
                  { method: 'POST', path: '/api/agent/interview/evaluate', desc: 'Interview Genie: Scores candidate answers with STAR critique and model answer.' },
                  { method: 'POST', path: '/api/agent/orchestrate', desc: 'Master Agent Orchestrator: End-to-end autonomous pipeline execution.' }
                ].map((ep, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px] shrink-0">
                      {ep.method}
                    </span>
                    <div>
                      <div className="text-emerald-400 font-bold">{ep.path}</div>
                      <div className="text-slate-400 text-[11px] font-sans mt-0.5">{ep.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JUDGE SCORING MATRIX */}
          {activeTab === 'judging' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 text-amber-200">
                <strong>Hackathon Rubric Alignment:</strong> How CareerGenie is engineered to score maximum points across all 5 evaluation dimensions:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">1. Meaningful SerpApi Usage (Weight: High)</span>
                  <p className="text-slate-300 leading-relaxed">
                    SerpApi is NOT a decorative add-on here. It is the fundamental search sensory organ powering 4 core modules: Live Google Jobs discovery, real-time company press/funding research, verified learning roadmap tutorials, and scholarship searches.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-indigo-400 block mb-1">2. AI Agent Design vs Simple Chatbot</span>
                  <p className="text-slate-300 leading-relaxed">
                    CareerGenie does not use a single "chat prompt". It deploys 9 coordinated autonomous agents with specialized responsibilities, JSON schema validation, multi-step tool calls, and transparent reasoning logs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">3. Originality & Differentiators</span>
                  <p className="text-slate-300 leading-relaxed">
                    The <strong>Career Success Probability Score</strong> dynamically models the candidate's hiring likelihood (Match + Interview Readiness + Skill Strength) and provides real-time levers to systematically increase it.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">4. Real-world Impact for Indian Students</span>
                  <p className="text-slate-300 leading-relaxed">
                    Built India-first: understands tier-2/3 college dynamics, CGPA conventions, INR stipends (₹40,000/mo), local tech hubs (Bengaluru, Gurugram, Hyderabad), and Indian scholarships (Reliance Foundation, Google APAC).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
