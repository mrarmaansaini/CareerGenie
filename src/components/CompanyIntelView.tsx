import React, { useState } from 'react';
import { Building2, Search, ExternalLink, Newspaper, Layers, Award, Sparkles, Loader2, ThumbsUp, AlertCircle, ArrowUpRight } from 'lucide-react';
import { CompanyIntel } from '../types/career';

interface CompanyIntelViewProps {
  intel: CompanyIntel | null;
  onSearchCompany: (companyName: string) => Promise<void>;
  isLoading: boolean;
  targetCompany: string;
}

export const CompanyIntelView: React.FC<CompanyIntelViewProps> = ({
  intel,
  onSearchCompany,
  isLoading,
  targetCompany
}) => {
  const [searchInput, setSearchInput] = useState(targetCompany || 'Swiggy');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearchCompany(searchInput);
  };

  const quickCompanies = ['Swiggy', 'Razorpay', 'CRED', 'PhonePe', 'Zomato', 'Microsoft India', 'Groww'];

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AGENT 8: COMPANY RESEARCH GENIE
              </span>
              <span className="text-xs text-slate-400 font-medium">SerpApi Grounded Intelligence</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Company Dossier & Tech Stack Intelligence
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep research into engineering culture, hiring rounds, tech stack, and recent press
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search company (e.g. Swiggy, Razorpay)..."
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchInput.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Investigate'}
            </button>
          </form>
        </div>

        {/* Quick Click Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 text-[11px] shrink-0">Popular Indian tech employers:</span>
          {quickCompanies.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSearchInput(c);
                onSearchCompany(c);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition shrink-0 ${
                intel?.companyName.toLowerCase() === c.toLowerCase()
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {intel ? (
        <div className="space-y-6">
          {/* Main Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overview & HQ */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{intel.companyName}</h3>
                  <p className="text-xs text-indigo-400 font-medium">{intel.industry}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Headquarters</span>
                  <span className="text-slate-200 font-medium">{intel.headquarters || 'India'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Founded</span>
                  <span className="text-slate-200 font-medium">{intel.founded || '2015'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Scale / Funding</span>
                  <span className="text-slate-200 font-medium">{intel.fundingRound || 'Unicorn / Scaled'}</span>
                </div>
              </div>
            </div>

            {/* Production Tech Stack */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Verified Production Tech Stack
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Technologies detected in active job postings and engineering whitepapers:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {intel.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Culture & Scale Summary */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Engineering Culture
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {intel.cultureSummary}
              </p>
              <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-800/30 text-[11px] text-indigo-200 font-medium">
                💡 <span className="font-bold">Hiring Trend:</span> {intel.hiringTrends}
              </div>
            </div>
          </div>

          {/* Hiring Insights & Pros / Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interview Process Breakdown */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Standard Fresher Interview Rounds</span>
              </h4>
              <div className="space-y-3">
                {intel.interviewInsights.map((round, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-bold text-white block mb-0.5">Round {idx + 1}</span>
                    <p className="text-slate-400 leading-relaxed">{round}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fresher Pros & Cons */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span>Fresher & Intern Experience Verdict</span>
                </h4>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Key Advantages
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {intel.fresherPros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  {intel.fresherCons.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Considerations & Work Pace
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {intel.fresherCons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-500">
                Grounding Source: SerpApi Google Search, Glassdoor & Indian campus placement transcripts
              </div>
            </div>
          </div>

          {/* Recent News Grounded by SerpApi */}
          {intel.recentNews && intel.recentNews.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-indigo-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Live News & Industry Moves (Grounded via SerpApi)
                  </h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                  SerpApi News Engine
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {intel.recentNews.map((news, i) => (
                  <a
                    key={i}
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5 font-mono">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition leading-snug mb-1.5">
                        {news.title}
                      </h5>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {news.snippet}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-indigo-400 font-medium pt-3 mt-2 border-t border-slate-900 group-hover:translate-x-0.5 transition">
                      <span>Read Full Coverage</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">
            Loading Company Intelligence
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            SerpApi Google search agent is gathering company details, tech stacks, and interview trends...
          </p>
        </div>
      )}
    </div>
  );
};
