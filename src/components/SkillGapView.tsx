import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Clock, Sparkles, Loader2, Award, Zap } from 'lucide-react';
import { Opportunity, UserResumeProfile, LearningRoadmap } from '../types/career';

interface SkillGapViewProps {
  selectedJob: Opportunity | null;
  profile: UserResumeProfile | null;
  onGenerateRoadmap: (role: string, gaps: string[]) => Promise<void>;
  isLoadingRoadmap: boolean;
  roadmap: LearningRoadmap | null;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  selectedJob,
  profile,
  onGenerateRoadmap,
  isLoadingRoadmap,
  roadmap
}) => {
  const [selectedSprintTab, setSelectedSprintTab] = useState<'7day' | '15day' | '30day'>('7day');

  const defaultMissing = ['Next.js App Router', 'Docker & Containerization', 'PostgreSQL / Prisma', 'System Design Fundamentals'];
  const defaultMatched = ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'TailwindCSS', 'REST APIs', 'Git'];

  const matchedSkills = selectedJob?.skill_gap?.matchedSkills || profile?.skills?.technical || defaultMatched;
  const missingSkills = selectedJob?.skill_gap?.missingSkills?.length
    ? selectedJob.skill_gap.missingSkills
    : defaultMissing;

  const targetRole = selectedJob?.title || profile?.targetRoles?.[0] || 'Frontend Developer Intern';
  const companyName = selectedJob?.company_name || 'Top Tier Indian Startups';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AGENT 4 & 5: SKILL GAP & LEARNING GENIE
              </span>
              <span className="text-xs text-slate-400 font-medium">SerpApi Grounded</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Skill Gap Diagnosis & Accelerated Roadmaps
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating <strong className="text-white">{profile?.fullName || 'Candidate'}</strong> against <strong className="text-indigo-400">{targetRole}</strong> at <strong className="text-cyan-400">{companyName}</strong>
            </p>
          </div>

          <button
            onClick={() => onGenerateRoadmap(targetRole, missingSkills)}
            disabled={isLoadingRoadmap}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition disabled:opacity-50"
          >
            {isLoadingRoadmap ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Curating SerpApi Resources...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Synthesize 7, 15 & 30-Day Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills Card */}
        <div className="bg-slate-900/60 border border-emerald-900/30 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Verified Proficiencies ({matchedSkills.length})
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold">Strong Alignment</span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            These skills extracted from your resume match the core criteria of {companyName} and pass standard ATS scanners.
          </p>

          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((sk, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs font-medium text-emerald-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{sk}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills / Priority Gaps Card */}
        <div className="bg-slate-900/60 border border-amber-900/30 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Identified Skill Gaps ({missingSkills.length})
              </h3>
            </div>
            <span className="text-[11px] text-amber-400 font-bold">Action Required</span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Bridging these priority areas will directly increase your Career Success Probability from <strong className="text-white">78%</strong> to <strong className="text-emerald-400">92%+</strong>.
          </p>

          <div className="space-y-2.5">
            {missingSkills.map((gap, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{gap}</div>
                    <div className="text-[10px] text-slate-400">
                      {idx === 0 ? 'High Priority • Required for production code' : 'Medium Priority • Expected in round 2'}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                  {idx === 0 ? '~4-6 hours' : '~2-3 hours'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Visualization */}
      {roadmap && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Curated Accelerated Roadmap
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Autonomous step-by-step curriculum integrated with free documentation and tutorials
              </p>
            </div>

            {/* Sprint tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {[
                { id: '7day', label: '7-Day Sprint' },
                { id: '15day', label: '15-Day Milestone' },
                { id: '30day', label: '30-Day Masterclass' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSprintTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedSprintTab === tab.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 7-Day Sprint View */}
          {selectedSprintTab === '7day' && roadmap.day7 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200">
                <span className="font-bold">Focus:</span> {roadmap.day7.focus}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {roadmap.day7.tasks.map((task) => (
                  <div
                    key={task.day}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                          Day {task.day}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.duration}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 leading-snug mb-3">
                        {task.task}
                      </p>
                    </div>

                    <a
                      href={task.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 pt-2 border-t border-slate-900 group"
                    >
                      <span className="truncate">{task.resourceTitle}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 15-Day Milestone View */}
          {selectedSprintTab === '15day' && roadmap.day15 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/30 text-xs text-purple-200">
                <span className="font-bold">Focus:</span> {roadmap.day15.focus}
              </div>

              <div className="space-y-3">
                {roadmap.day15.milestones.map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{m.period}: {m.goal}</span>
                      {m.deliverable && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          Deliverable: {m.deliverable}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {m.tasks.map((t, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 30-Day Masterclass View */}
          {selectedSprintTab === '30day' && roadmap.day30 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-emerald-200">
                <span className="font-bold">Focus:</span> {roadmap.day30.focus}
              </div>

              {roadmap.day30.capstoneProject && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-lg">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4" />
                    <span>Capstone Project Recommendation</span>
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-1">
                    {roadmap.day30.capstoneProject.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {roadmap.day30.capstoneProject.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {roadmap.day30.capstoneProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
