import React from 'react';
import { Target, TrendingUp, HelpCircle, ArrowUpRight, Zap, CheckCircle, ShieldCheck, Award, FileDown } from 'lucide-react';
import { CareerSuccessScore } from '../types/career';
import { generateCareerDiagnosticPdf, downloadPdf } from '../utils/pdfGenerator';

interface CareerSuccessProbabilityCardProps {
  score: CareerSuccessScore;
  targetRole?: string;
  candidateName?: string;
  companyName?: string;
  missingSkills?: string[];
  onNavigateToRoadmap?: () => void;
  onNavigateToInterview?: () => void;
}

export const CareerSuccessProbabilityCard: React.FC<CareerSuccessProbabilityCardProps> = ({
  score,
  targetRole = 'Frontend Developer Intern',
  candidateName = 'Aarav Sharma',
  companyName = 'Swiggy',
  missingSkills = ['Docker', 'Next.js', 'System Design'],
  onNavigateToRoadmap,
  onNavigateToInterview
}) => {
  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-400';
    if (val >= 65) return 'text-indigo-400';
    return 'text-amber-400';
  };

  const getProgressGradient = (val: number) => {
    if (val >= 80) return 'from-emerald-500 to-teal-400';
    if (val >= 65) return 'from-indigo-500 to-cyan-400';
    return 'from-amber-500 to-orange-400';
  };

  const handleExportPdf = () => {
    const bytes = generateCareerDiagnosticPdf(
      candidateName,
      targetRole,
      companyName,
      score.overall,
      score.matchScore,
      score.interviewReadiness,
      score.skillStrength,
      missingSkills
    );
    downloadPdf(bytes, `CareerGenie_Diagnostic_${candidateName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-cyan-400" />
              KEY DIFFERENTIATOR
            </span>
            <span className="text-xs text-slate-400 font-medium">Autonomous Synthesis</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Career Success Probability Score
          </h2>
          <p className="text-xs text-slate-400">
            Targeting: <strong className="text-indigo-300">{targetRole}</strong> in India Tech Ecosystem
          </p>
        </div>

        {/* Circular / Big Metric Badge */}
        <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 px-5 py-3 rounded-2xl self-start sm:self-auto shadow-inner">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Aggregated Probability
            </div>
            <div className={`text-3xl font-black ${getScoreColor(score.overall)} tracking-tight`}>
              {score.overall}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tri-Factor Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Factor 1: Match Score */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 relative hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">1. Match Score</span>
            <span className="text-indigo-400 font-bold">{score.matchScore}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-gradient-to-r ${getProgressGradient(score.matchScore)} transition-all duration-700`}
              style={{ width: `${score.matchScore}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            Resume Skills & Projects vs live job specifications in India
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Weight: 45%</div>
        </div>

        {/* Factor 2: Interview Readiness */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 relative hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">2. Interview Readiness</span>
            <span className="text-cyan-400 font-bold">{score.interviewReadiness}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-gradient-to-r ${getProgressGradient(score.interviewReadiness)} transition-all duration-700`}
              style={{ width: `${score.interviewReadiness}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            Technical clarity, STAR response structure & system thinking
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Weight: 30%</div>
        </div>

        {/* Factor 3: Skill Strength */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 relative hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">3. Skill Strength</span>
            <span className="text-purple-400 font-bold">{score.skillStrength}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-gradient-to-r ${getProgressGradient(score.skillStrength)} transition-all duration-700`}
              style={{ width: `${score.skillStrength}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400">
            Core stack depth, frameworks, tooling & code verified portfolio
          </div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Weight: 25%</div>
        </div>
      </div>

      {/* Explanation Box */}
      <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-2xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
              AI Agent Diagnostic Rationale
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {score.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Actionable levers to increase score */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
        <div className="text-slate-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Levers to reach <strong className="text-white">90%+ Success Probability</strong>:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportPdf}
            className="px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/40 font-medium flex items-center gap-1.5 transition"
            title="Download Career Diagnostic Dossier (PDF)"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export PDF Dossier</span>
          </button>
          {onNavigateToRoadmap && (
            <button
              onClick={onNavigateToRoadmap}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium flex items-center gap-1 transition"
            >
              <span>Bridge Skill Gaps (+8%)</span>
              <ArrowUpRight className="w-3 h-3 text-cyan-400" />
            </button>
          )}
          {onNavigateToInterview && (
            <button
              onClick={onNavigateToInterview}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1 shadow-md shadow-indigo-600/30 transition"
            >
              <span>Practice Mock Round (+12%)</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
