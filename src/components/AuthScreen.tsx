import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  auth,
  googleProvider,
  signInWithRedirect
} from '../lib/firebase';

interface AuthScreenProps {
  onAuthenticated: (user: { uid: string; displayName: string | null; email: string | null; photoURL: string | null }) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Redirect directly to Google's official sign-in page
  const handleGoogleSignIn = async () => {
    setIsRedirecting(true);
    setAuthError(null);

    try {
      await signInWithRedirect(auth, googleProvider);
      // The browser navigates directly to Google's official accounts.google.com sign-in page
    } catch (error: any) {
      console.error('Google Redirect Error:', error);
      setAuthError(error?.message || 'Could not redirect to Google official sign-in. Please try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto text-center">
        {/* Top subtle badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Google Authentication</span>
        </div>

        {/* Identity Logo */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-indigo-600/30 mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Lock className="w-7 h-7 text-indigo-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          Welcome to CareerGenie
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6 leading-relaxed">
          Sign in directly with your official Google account to access your AI Career Command Center, live opportunities, and interview simulations.
        </p>

        {/* Error notification if any */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/50 border border-rose-800 text-left text-xs text-rose-200 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{authError}</span>
            </div>
          </div>
        )}

        {/* Google Sign In - Sole Authentication Option */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isRedirecting}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl shadow-white/10 transition active:scale-98 flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
          >
            {isRedirecting ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>
              {isRedirecting
                ? 'Redirecting to Google Official Sign-In...'
                : 'Sign in with Google'}
            </span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Redirects securely to Google official accounts sign-in</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Real Google profile picture and verified credentials</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted cloud profile storage via Firebase Firestore</span>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-slate-500 mt-5">
          By signing in, you agree to CareerGenie's Terms of Service and Privacy Policy. Built for SerpApi India Hackathon 2026.
        </p>
      </div>
    </div>
  );
};
