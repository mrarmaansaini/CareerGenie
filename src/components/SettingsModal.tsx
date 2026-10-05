import React, { useState } from 'react';
import { X, Key, Check, ShieldCheck, Sparkles, ExternalLink, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serpApiKey: string;
  setSerpApiKey: (key: string) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  onSaveKeys?: (serpKey: string, geminiKey: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  serpApiKey,
  setSerpApiKey,
  geminiApiKey,
  setGeminiApiKey,
  onSaveKeys
}) => {
  const [serpKeyInput, setSerpKeyInput] = useState(serpApiKey);
  const [geminiKeyInput, setGeminiKeyInput] = useState(geminiApiKey);
  const [savedToast, setSavedToast] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    tested: boolean;
    serp?: { valid: boolean; message: string };
    gemini?: { valid: boolean; message: string };
  }>({ tested: false });

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsVerifying(true);
    setVerifyStatus({ tested: false });
    try {
      const res = await fetch('/api/keys/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serpApiKey: serpKeyInput.trim(),
          geminiApiKey: geminiKeyInput.trim()
        })
      });
      if (res.ok) {
        const data = await res.json();
        setVerifyStatus({
          tested: true,
          serp: data.serp,
          gemini: data.gemini
        });
      } else {
        setVerifyStatus({
          tested: true,
          serp: { valid: false, message: `Server error: HTTP ${res.status}` }
        });
      }
    } catch (err: any) {
      setVerifyStatus({
        tested: true,
        serp: { valid: false, message: `Connection test failed: ${err.message}` }
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSerp = serpKeyInput.trim();
    const cleanGemini = geminiKeyInput.trim();
    setSerpApiKey(cleanSerp);
    setGeminiApiKey(cleanGemini);
    localStorage.setItem('careergenie_serp_key', cleanSerp);
    localStorage.setItem('careergenie_gemini_key', cleanGemini);

    if (onSaveKeys) {
      onSaveKeys(cleanSerp, cleanGemini);
    }

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                API Configuration &amp; Live Keys
              </h2>
              <p className="text-xs text-slate-400">
                Configure SerpApi and Gemini keys for real-time live queries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-xs text-indigo-200 leading-relaxed">
            <span className="font-bold">Live API Integration:</span> Enter your SerpApi key to query real Google Jobs in real-time across India. Enter your Gemini key to power autonomous career roadmaps and resume scoring.
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                SerpApi API Key (For Live Google Jobs)
              </label>
              <a
                href="https://serpapi.com/manage-api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Get SerpApi Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={serpKeyInput}
              onChange={(e) => setSerpKeyInput(e.target.value)}
              placeholder="Paste SerpApi private key..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Gemini API Key (For AI Agents &amp; Parsing)
              </label>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={geminiKeyInput}
              onChange={(e) => setGeminiKeyInput(e.target.value)}
              placeholder="Defaults to server environment key..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Test Connection Button & Status */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isVerifying || (!serpKeyInput && !geminiKeyInput)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 transition flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Verifying live connectivity...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Test &amp; Verify API Keys</span>
                </>
              )}
            </button>

            {verifyStatus.tested && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs animate-fadeIn">
                {verifyStatus.serp && (
                  <div className="flex items-center gap-2">
                    {verifyStatus.serp.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className={verifyStatus.serp.valid ? 'text-emerald-300' : 'text-amber-300'}>
                      SerpApi: {verifyStatus.serp.message}
                    </span>
                  </div>
                )}
                {verifyStatus.gemini && (
                  <div className="flex items-center gap-2">
                    {verifyStatus.gemini.valid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className={verifyStatus.gemini.valid ? 'text-emerald-300' : 'text-amber-300'}>
                      Gemini: {verifyStatus.gemini.message}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Saved locally in browser
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                {savedToast ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save &amp; Apply Keys</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
