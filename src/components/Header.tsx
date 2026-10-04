import React from 'react';
import { Sparkles, Bot, Search, FileText, Briefcase, GraduationCap, Building2, MessageSquare, Award, Settings, Terminal, FileDown, LogOut, User } from 'lucide-react';
import { UserResumeProfile } from '../types/career';
import { generateSystemFaqGuidePdf, downloadPdf } from '../utils/pdfGenerator';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeProfile: UserResumeProfile | null;
  onOpenUpload: () => void;
  onOpenArch: () => void;
  onOpenJudge: () => void;
  isSimulatedSerp: boolean;
  onOpenSettings: () => void;
  activeAgentsCount: number;
  appMode: 'sample' | 'live';
  onOpenModeSelector: () => void;
  authUser?: { uid: string; displayName: string | null; email: string | null; photoURL: string | null } | null;
  onSignOut?: () => void;
  onOpenAuth?: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  activeProfile,
  onOpenUpload,
  onOpenArch,
  onOpenJudge,
  isSimulatedSerp,
  onOpenSettings,
  activeAgentsCount,
  appMode,
  onOpenModeSelector,
  authUser,
  onSignOut,
  onOpenAuth,
  onOpenProfile
}) => {
  const navTabs = [
    { id: 'dashboard', label: 'Command Center', icon: Sparkles },
    { id: 'opportunities', label: 'Opportunities', icon: Search, badge: 'SerpApi' },
    { id: 'skill-gap', label: 'Skill Roadmap', icon: GraduationCap },
    { id: 'cover-letter', label: 'Cover Letter', icon: FileText },
    { id: 'interview', label: 'Mock Interview', icon: MessageSquare, badge: 'AI' },
    { id: 'company', label: 'Company Intel', icon: Building2 },
    { id: 'brief', label: 'Daily Brief', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-purple-950/70 to-slate-950 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-indigo-900/30 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-indigo-300">SerpApi India Hackathon 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Theme: Autonomous AI Career Agents</span>
          <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px]">
            🇮🇳 India-First
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenModeSelector}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition shadow-sm ${
              appMode === 'live'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/60'
            }`}
            title="Click to Switch between Live API Mode and Sample Data Demo Mode"
          >
            <span className={`w-2 h-2 rounded-full ${appMode === 'live' ? 'bg-emerald-400' : 'bg-cyan-400'} animate-pulse`} />
            <span>{appMode === 'live' ? 'Live API Mode' : 'Sample Data Mode'}</span>
          </button>
          <button
            onClick={() => {
              const bytes = generateSystemFaqGuidePdf();
              downloadPdf(bytes, 'CareerGenie_System_And_FAQ_Guide.pdf');
            }}
            className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 font-medium px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition text-[11px]"
            title="Download In-Depth System & Architecture Guide PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guide (PDF)</span>
          </button>
          <button
            onClick={onOpenJudge}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition text-[11px]"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Judge Evaluation Panel</span>
          </button>
          <button
            onClick={onOpenArch}
            className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-medium px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition text-[11px]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px]"
            title="Configure Custom API Keys"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">API Config</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Logo & Branding on Left, User Profile Card on Right */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 shrink-0">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent block">
                CareerGenie
              </span>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5 whitespace-nowrap">
                Your Personal AI Career Agent
              </p>
            </div>
          </div>

          {/* Right: Unified Profile Pill */}
          <div className="flex items-center gap-2 shrink-0">
            {authUser ? (
              /* Authenticated User Pill */
              <div
                onClick={onOpenProfile}
                className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-1.5 pl-2.5 shadow-sm cursor-pointer transition group"
                title="Click to view & edit Account Profile"
              >
                {authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName || 'Google Profile'}
                    className="w-8 h-8 rounded-xl border border-slate-700 object-cover shadow-sm group-hover:border-indigo-400 transition shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                    {(authUser.displayName || authUser.email || 'G').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition leading-tight truncate max-w-[140px]">
                    {authUser.displayName || activeProfile?.fullName || 'Google User'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] leading-tight mt-0.5">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Google Verified
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenUpload();
                    }}
                    className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 transition font-medium"
                    title="Switch or Upload Student Resume"
                  >
                    Switch
                  </button>
                  {onSignOut && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSignOut();
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                      title="Sign Out of Google"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : activeProfile ? (
              /* Sample Student Profile Pill */
              <div
                onClick={onOpenProfile}
                className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-1.5 pl-2.5 shadow-sm cursor-pointer transition group"
                title="Click to view & edit Account Profile"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow shrink-0">
                  {activeProfile.fullName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition leading-tight truncate max-w-[140px]">
                    {activeProfile.fullName}
                  </div>
                  <div className="text-[10px] text-indigo-400 truncate max-w-[120px] mt-0.5">
                    Student Profile
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenUpload();
                    }}
                    className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 transition font-medium"
                    title="Switch or Upload Resume"
                  >
                    Switch
                  </button>
                  {onOpenAuth && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAuth();
                      }}
                      className="p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-600/30 transition"
                      title="Sign in with Google"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              onOpenAuth && (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Row 2: Full-Width Dedicated Navigation Tab Bar (As shown in image 2) */}
        <div className="pb-3 pt-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
