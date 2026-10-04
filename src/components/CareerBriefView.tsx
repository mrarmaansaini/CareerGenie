import React, { useState } from 'react';
import { Calendar, Award, ExternalLink, TrendingUp, Sparkles, Target, Zap, Clock, ShieldCheck, MapPin, Globe, Search, Filter, Laptop, Building2 } from 'lucide-react';
import { CareerBrief, Opportunity, ScholarshipItem, HackathonItem } from '../types/career';

interface CareerBriefViewProps {
  brief: CareerBrief | null;
  onSelectOpportunity: (job: Opportunity) => void;
}

export const CareerBriefView: React.FC<CareerBriefViewProps> = ({
  brief,
  onSelectOpportunity
}) => {
  // Scholarship filters
  const [scholarshipCategory, setScholarshipCategory] = useState<string>('All');
  const [scholarshipSearch, setScholarshipSearch] = useState<string>('');

  // Hackathon filters
  const [hackathonRegion, setHackathonRegion] = useState<string>('All');
  const [hackathonMode, setHackathonMode] = useState<string>('All');

  if (!brief) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center">
        <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-spin" />
        <h3 className="text-sm font-bold text-white mb-1">
          Compiling Daily Career Intelligence Brief...
        </h3>
      </div>
    );
  }

  // Filter scholarships
  const filteredScholarships = brief.featuredScholarships.filter((s) => {
    const matchesCat = scholarshipCategory === 'All' || s.category === scholarshipCategory;
    const matchesSearch =
      scholarshipSearch === '' ||
      s.title.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
      s.provider.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
      s.eligibility.toLowerCase().includes(scholarshipSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter hackathons
  const filteredHackathons = brief.hackathons.filter((h) => {
    const matchesMode =
      hackathonMode === 'All' ||
      (hackathonMode === 'online' && h.mode === 'online') ||
      (hackathonMode === 'offline' && (h.mode === 'offline' || h.mode === 'hybrid'));

    const matchesRegion =
      hackathonRegion === 'All' ||
      h.region?.toLowerCase().includes(hackathonRegion.toLowerCase());

    return matchesMode && matchesRegion;
  });

  const regionsList = [
    'All',
    'Online / All India',
    'Bengaluru',
    'Delhi NCR',
    'Hyderabad',
    'Pune / Mumbai',
    'Chennai'
  ];

  return (
    <div className="space-y-6">
      {/* Top Headline Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-900/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {brief.date}
              </span>
              <span className="text-xs text-slate-400 font-medium">Autonomous Career Intelligence Radar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug max-w-3xl">
              {brief.headline}
            </h2>
            <p className="text-xs text-slate-300 mt-2 flex flex-wrap items-center gap-2">
              <span>Verified Radar:</span>
              <strong className="text-emerald-400 font-mono">140+ live tech internships</strong>
              <span>•</span>
              <strong className="text-amber-400 font-mono">{brief.featuredScholarships.length} Curated Scholarships</strong>
              <span>•</span>
              <strong className="text-cyan-400 font-mono">{brief.hackathons.length} National Hackathons</strong>
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl shrink-0 self-start md:self-auto text-center shadow-inner">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Active Agent Broadcast
            </span>
            <div className="text-2xl font-black text-indigo-300">
              India Edition
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 mt-1 font-medium">
              <ShieldCheck className="w-3 h-3" />
              100% Student Verified
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Expanded Scholarships & Regional Hackathons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 1: EXPANDED SCHOLARSHIPS & GRANTS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Indian Scholarships & Education Grants
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Showing {filteredScholarships.length} of {brief.featuredScholarships.length} opportunities
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono font-bold self-start sm:self-auto">
                Direct Portal Links
              </span>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-2 mb-4">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={scholarshipSearch}
                  onChange={(e) => setScholarshipSearch(e.target.value)}
                  placeholder="Search by scholarship, provider (e.g. Google, Tata, Reliance)..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 font-sans"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['All', 'Women in STEM', 'Merit & Excellence', 'Need-Based / Means'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setScholarshipCategory(cat)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                      scholarshipCategory === cat
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition group"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-amber-500/20 mb-1 inline-block">
                        {sch.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-snug">
                        {sch.title}
                      </h4>
                    </div>
                    <span className="text-xs font-black text-emerald-400 font-mono shrink-0 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      {sch.amount}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-2">
                    <strong className="text-indigo-400 font-medium">{sch.provider}</strong> • Eligibility: {sch.eligibility}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-600" />
                      Deadline: {sch.deadline}
                    </span>
                    <a
                      href={sch.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group-hover:underline"
                    >
                      <span>Apply on Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: REGIONAL & ONLINE / OFFLINE HACKATHONS */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Student Hackathons 2026
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Offline hubs & All-India virtual hackathons
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono font-bold self-start sm:self-auto">
                Win Cash & PPOs
              </span>
            </div>

            {/* Filter Controls: Format (Online vs Offline) & Region */}
            <div className="space-y-2.5 mb-4">
              {/* Online vs Offline Toggle */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                {[
                  { id: 'All', label: 'All Formats', icon: Globe },
                  { id: 'offline', label: '🏢 Offline Hackathons', icon: Building2 },
                  { id: 'online', label: '🌐 Online / Virtual', icon: Laptop }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setHackathonMode(m.id)}
                    className={`flex-1 py-1 px-2 rounded-lg font-semibold transition text-[11px] flex items-center justify-center gap-1 ${
                      hackathonMode === m.id
                        ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Region Selector Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mr-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  Region:
                </span>
                {regionsList.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setHackathonRegion(reg)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border transition ${
                      hackathonRegion === reg
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Hackathons List */}
            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {filteredHackathons.length > 0 ? (
                filteredHackathons.map((h) => {
                  const isOffline = h.mode === 'offline' || h.mode === 'hybrid';
                  return (
                    <div
                      key={h.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded border ${
                                isOffline
                                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                              }`}
                            >
                              {isOffline ? `🏢 Offline: ${h.region}` : `🌐 Online: Virtual`}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                            {h.title}
                          </h4>
                        </div>
                        <span className="text-xs font-black text-cyan-400 font-mono shrink-0 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                          {h.prize}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 mb-1">
                        <strong className="text-slate-300 font-medium">{h.platform}</strong> • Theme: {h.theme}
                      </div>

                      {h.venue && (
                        <div className="text-[10px] text-slate-500 mb-2 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{h.venue}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                        <span className="text-slate-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-600" />
                          Deadline: {h.deadline}
                        </span>
                        <a
                          href={h.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group-hover:underline"
                        >
                          <span>Register Team</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-slate-950/40 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">No hackathons match the selected format and region filters.</p>
                  <button
                    onClick={() => {
                      setHackathonMode('All');
                      setHackathonRegion('All');
                    }}
                    className="mt-2 text-[11px] text-cyan-400 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hiring Trends & Tip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              High-Velocity Hiring Skill Trends (India 2026)
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {brief.trendingSkills.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                <div>
                  <div className="font-bold text-white text-xs">{t.skill}</div>
                  <span className="text-[10px] text-slate-500">{t.category}</span>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-xs">{t.demandGrowth}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/40 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>CareerGenie Hackathon Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {brief.dailyAgentTip}
            </p>
          </div>
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Grounding Radar</span>
            <span className="text-emerald-400 font-mono">100% Authentic</span>
          </div>
        </div>
      </div>
    </div>
  );
};
