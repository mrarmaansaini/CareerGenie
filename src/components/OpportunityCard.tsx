import React from 'react';
import { ExternalLink, Building, MapPin, IndianRupee, Sparkles, AlertCircle, CheckCircle, ArrowRight, MessageSquare, FileText, ChevronRight } from 'lucide-react';
import { Opportunity } from '../types/career';

interface OpportunityCardProps {
  job: Opportunity;
  onSelectForCoverLetter: (job: Opportunity) => void;
  onSelectForSkillGap: (job: Opportunity) => void;
  onSelectForInterview: (job: Opportunity) => void;
  onSelectForCompanyIntel: (companyName: string) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  job,
  onSelectForCoverLetter,
  onSelectForSkillGap,
  onSelectForInterview,
  onSelectForCompanyIntel
}) => {
  const matchScore = job.match_score || 82;
  const successProb = job.career_success_probability || 78;

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-lg hover:shadow-indigo-500/10 transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Company, Via Badge, Compatibility Pill */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {job.thumbnail ? (
              <img
                src={job.thumbnail}
                alt={job.company_name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-800/40 flex items-center justify-center text-indigo-400 font-bold shrink-0">
                <Building className="w-5 h-5" />
              </div>
            )}
            <div>
              <button
                onClick={() => onSelectForCompanyIntel(job.company_name)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn"
              >
                <span>{job.company_name}</span>
                <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition" />
              </button>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">
                {job.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
              {job.via}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>{matchScore}% Match</span>
            </div>
          </div>
        </div>

        {/* Metadata chips: Location, Stipend, Schedule */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] text-slate-300">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[150px]">{job.location}</span>
          </span>
          {job.salary && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-medium">
              <IndianRupee className="w-3 h-3" />
              <span>{job.salary}</span>
            </span>
          )}
          {job.work_from_home && (
            <span className="px-2 py-0.5 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
              Remote
            </span>
          )}
          {job.schedule_type && (
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400">
              {job.schedule_type}
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {job.description}
        </p>

        {/* Skill matching preview */}
        {job.skill_gap && (
          <div className="space-y-1.5 mb-4 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Matched Skills:
              </span>
              <span className="text-emerald-400 font-mono">
                {job.skill_gap.matchedSkills.slice(0, 3).join(', ')}
              </span>
            </div>
            {job.skill_gap.missingSkills.length > 0 && (
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  Target Gap:
                </span>
                <span className="text-amber-300 font-mono">
                  {job.skill_gap.missingSkills.slice(0, 2).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons footer */}
      <div className="pt-3 border-t border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] text-slate-400 font-medium">
            Success Prob: <strong className="text-indigo-400">{successProb}%</strong>
          </div>
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition"
          >
            <span>Apply on Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* AI Agent Action Bar */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            onClick={() => onSelectForCoverLetter(job)}
            className="py-1.5 px-2 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/40 text-[10px] font-semibold text-indigo-300 hover:text-white transition flex items-center justify-center gap-1"
            title="Generate ATS Tailored Cover Letter"
          >
            <FileText className="w-3 h-3" />
            <span className="truncate">Cover Letter</span>
          </button>

          <button
            onClick={() => onSelectForSkillGap(job)}
            className="py-1.5 px-2 rounded-lg bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/40 text-[10px] font-semibold text-amber-300 hover:text-white transition flex items-center justify-center gap-1"
            title="Diagnose Skill Gaps & Generate Roadmap"
          >
            <Sparkles className="w-3 h-3" />
            <span className="truncate">Skill Gaps</span>
          </button>

          <button
            onClick={() => onSelectForInterview(job)}
            className="py-1.5 px-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/40 text-[10px] font-semibold text-cyan-300 hover:text-white transition flex items-center justify-center gap-1"
            title="Simulate Role-Specific Mock Interview"
          >
            <MessageSquare className="w-3 h-3" />
            <span className="truncate">Mock Round</span>
          </button>
        </div>
      </div>
    </div>
  );
};
