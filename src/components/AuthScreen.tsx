import React, { useState } from 'react';
import { ShieldCheck, Lock, Sparkles, CheckCircle2, ArrowRight, Loader2, UserCheck, AlertCircle } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, db, FirebaseUser } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface AuthScreenProps {
  onAuthenticated: (user: { uid: string; displayName: string | null; email: string | null; photoURL: string | null }) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onAuthenticated,
  onContinueAsGuest
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Sync user profile to Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Student',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore user doc sync warning:', err);
      }

      onAuthenticated({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      if (error?.code === 'auth/popup-blocked') {
        setAuthError('Pop-up window was blocked by your browser. Please allow popups or use Demo Student Access.');
      } else if (error?.code === 'auth/cancelled-popup-request' || error?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in was closed before completion. Please click again to continue.');
      } else {
        setAuthError(error?.message || 'Authentication error. You can continue with Demo Student Access.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    onAuthenticated({
      uid: 'demo-student-armaan',
      displayName: 'Armaan Saini',
      email: 'armaansaini240908@gmail.com',
      photoURL: null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-auto text-center">
        {/* Top subtle badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Firebase & Google Authentication</span>
        </div>

        {/* Identity Logo */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-indigo-600/30 mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Lock className="w-7 h-7 text-indigo-400" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-black text-white tracking-tight mb-1">
          Welcome to CareerGenie
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
          Sign in or sign up with your Google account to secure your resume data, career roadmaps, and mock interview transcripts.
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

        {/* Google Sign In / Sign Up Primary Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl shadow-white/10 transition active:scale-98 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-slate-800" />
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
            <span>{isLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          {/* Quick Demo Bypass for Hackathon Evaluation */}
          <button
            onClick={handleDemoSignIn}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2 border border-slate-700"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast-Track Demo Access (Armaan Saini)</span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted cloud profile storage via Firebase Firestore</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero-Trust permission rules: only you access your data</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Instant sync across sessions and devices</span>
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
