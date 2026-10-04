import React from 'react';
import { Bot, Cpu, CheckCircle2, Loader2, Sparkles, Activity } from 'lucide-react';
import { AgentExecutionStep } from '../types/career';

interface AgentStatusBannerProps {
  steps: AgentExecutionStep[];
  isThinking: boolean;
  activeAgentName?: string;
}

export const AgentStatusBanner: React.FC<AgentStatusBannerProps> = ({
  steps,
  isThinking,
  activeAgentName
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl shadow-black/40 relative overflow-hidden backdrop-blur-md">
      {/* Decorative subtle ambient light */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Autonomous Multi-Agent Orchestrator
              </h3>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                9 Agents Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Coordinated reasoning loops powered by Gemini 2.5 Flash & live SerpApi Google Jobs grounding
            </p>
          </div>
        </div>

        {isThinking && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs animate-pulse">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Agent Active: <strong className="text-white">{activeAgentName || 'Synthesizing'}</strong></span>
          </div>
        )}
      </div>

      {/* Agents workflow pipeline chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs">
        {[
          { name: 'Resume Genie', tool: 'JSON AST Parser', status: 'ready', color: 'indigo' },
          { name: 'Opportunity Genie', tool: 'SerpApi Live Jobs', status: 'live', color: 'cyan' },
          { name: 'Match Genie', tool: 'Cosine Semantic', status: 'ready', color: 'emerald' },
          { name: 'Skill Gap Genie', tool: 'Tech Delta Vector', status: 'ready', color: 'amber' },
          { name: 'Learning Genie', tool: 'SerpApi Roadmaps', status: 'live', color: 'purple' },
          { name: 'Cover Letter Genie', tool: 'ATS Tailor Prompt', status: 'ready', color: 'pink' },
          { name: 'Interview Genie', tool: 'STAR Evaluation', status: 'ready', color: 'blue' },
          { name: 'Company Genie', tool: 'SerpApi Intel', status: 'live', color: 'violet' },
          { name: 'Career Brief Genie', tool: 'Daily Digest', status: 'ready', color: 'teal' },
          { name: 'Probability Engine', tool: 'Multi-Factor Model', status: 'ready', color: 'rose' }
        ].map((agent, i) => {
          const isCurrentlyActive = activeAgentName?.toLowerCase().includes(agent.name.toLowerCase().split(' ')[0]);
          return (
            <div
              key={i}
              className={`p-2.5 rounded-xl border transition-all ${
                isCurrentlyActive
                  ? 'bg-indigo-900/40 border-indigo-400 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[11px] text-slate-200 truncate">
                  {agent.name}
                </span>
                {agent.status === 'live' ? (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                    SerpApi
                  </span>
                ) : (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                    AI
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate">{agent.tool}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
