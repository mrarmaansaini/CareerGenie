import React, { useEffect, useState } from 'react';
import { Bot, Sparkles, Cpu, Search, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Autonomous Multi-Agent DAG...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 400);
          return 100;
        }
        const next = prev + 4;
        if (next === 24) setStatusText('Wiring SerpApi Google Jobs Search Engine...');
        else if (next === 52) setStatusText('Mounting Gemini 2.5 Flash Autonomous Agents...');
        else if (next === 76) setStatusText('Configuring Tri-Factor Probability Model...');
        else if (next === 96) setStatusText('Ready for Indian Student Career Acceleration!');
        return next;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden p-6 select-none animate-fadeIn">
      {/* Background glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Logo & Identity */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Animated Badge Container */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-2xl shadow-indigo-500/40">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Bot className="w-10 h-10 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md">
            v2.5 AGENT
          </span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent mb-2">
          CareerGenie
        </h1>
        <p className="text-sm font-semibold text-indigo-300 mb-1">
          "Your Personal AI Career Agent"
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <span>🇮🇳 Built for SerpApi India Hackathon 2026</span>
          <span>•</span>
          <span className="text-cyan-400 font-mono">Autonomous DAG</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-full h-2.5 p-0.5 mb-3 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-100 ease-out shadow-sm shadow-cyan-400/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
          <span className="text-slate-300 truncate max-w-[320px] text-left">
            {statusText}
          </span>
          <span className="text-indigo-400 font-bold shrink-0 ml-2">
            {progress}%
          </span>
        </div>

        {/* Fast skip button */}
        <button
          onClick={onComplete}
          className="mt-8 text-xs text-slate-500 hover:text-slate-300 transition py-1 px-3 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
