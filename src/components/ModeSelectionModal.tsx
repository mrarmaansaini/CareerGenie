import React, { useState } from 'react';
import { Key, Database, ShieldCheck, CheckCircle2, ArrowRight, Lock, ExternalLink, Zap, X } from 'lucide-react';

interface ModeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'sample' | 'live', keys?: { serpApiKey: string; geminiApiKey: string }) => void;
  currentMode: 'sample' | 'live';
  currentSerpKey: string;
  currentGeminiKey: string;
}

export const ModeSelectionModal: React.FC<ModeSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectMode,
  currentMode,
  currentSerpKey,
  currentGeminiKey
}) => {
  const [selectedOption, setSelectedOption] = useState<'sample' | 'live'>(currentMode || 'live');
  const [serpKeyInput, setSerpKeyInput] = useState(currentSerpKey);
  const [geminiKeyInput, setGeminiKeyInput] = useState(currentGeminiKey);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setErrorMsg(null);
    if (selectedOption === 'live') {
      if (!serpKeyInput.trim()) {
        setErrorMsg('Please enter your SerpApi API Key to activate Live API Mode, or switch to Sample Data Demo Mode.');
        return;
      }
      onSelectMode('live', {
        serpApiKey: serpKeyInput.trim(),
        geminiApiKey: geminiKeyInput.trim()
      });
    } else {
      onSelectMode('sample');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Top subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-800 flex items-start justify-between shrink-0 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>CareerGenie Environment Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Select Your Environment Mode
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose between real-time live search with custom resume uploads, or zero-config demo mode.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0 ml-3"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800 text-xs text-rose-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mode Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* OPTION 1: LIVE API MODE */}
            <div
              onClick={() => setSelectedOption('live')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedOption === 'live'
                  ? 'bg-indigo-950/40 border-indigo-400 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Key className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Custom Upload Active
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Live API Mode
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Connect your SerpApi key for real-time Google Jobs across India.
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-1.5 text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Custom Resume Upload (PDF / Text)</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time SerpApi Google Jobs</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-300 font-semibold">
                <span>{selectedOption === 'live' ? '✓ Selected' : 'Click to Select'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* OPTION 2: SAMPLE DATA DEMO MODE */}
            <div
              onClick={() => setSelectedOption('sample')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedOption === 'sample'
                  ? 'bg-indigo-950/40 border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                    Zero-Config Instant
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  Sample Data Demo Mode
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Explore pre-curated Indian student profiles (Aarav - Frontend & Priya - AI/ML).
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-300">
                  <li className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Custom Resume Upload Disabled</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>1-Click Switch between verified profiles</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-300 font-semibold">
                <span>{selectedOption === 'sample' ? '✓ Selected' : 'Click to Select'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Live Key Inputs (Visible when Live API Mode is selected) */}
          {selectedOption === 'live' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3.5 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-white flex items-center gap-1">
                    <span>SerpApi Private API Key</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <a
                    href="https://serpapi.com/manage-api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Get SerpApi Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={serpKeyInput}
                  onChange={(e) => setSerpKeyInput(e.target.value)}
                  placeholder="Paste your SerpApi key here..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Gemini API Key (Optional — Defaults to Server)
                </label>
                <input
                  type="password"
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  placeholder="Leave empty to use built-in Gemini server runtime key..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                />
              </div>

              {/* Direct In-Card Launch Button for Live Mode */}
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Launch in Live Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 relative z-10">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>You can toggle modes or update keys anytime in the top bar</span>
          </span>

          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
            <button
              onClick={handleConfirm}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition shadow-lg active:scale-95 cursor-pointer ${
                selectedOption === 'live'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-600/20'
              }`}
            >
              <span>{selectedOption === 'live' ? '🚀 Launch in Live Mode' : '⚡ Launch in Demo Mode'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
