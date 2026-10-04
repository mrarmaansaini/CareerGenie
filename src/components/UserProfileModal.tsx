import React from 'react';
import {
  X,
  ShieldCheck,
  LogOut,
  Mail,
  User,
  GraduationCap,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserResumeProfile } from '../types/career';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: UserResumeProfile;
  authUser: { uid: string; displayName: string | null; email: string | null; photoURL: string | null } | null;
  onSignOut: () => void;
  onOpenAuth: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  activeProfile,
  authUser,
  onSignOut,
  onOpenAuth
}) => {
  if (!isOpen) return null;

  const isGoogleAccount = !!authUser && !authUser.uid.startsWith('demo-');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar / Photo */}
            {isGoogleAccount && authUser?.photoURL ? (
              <img
                src={authUser.photoURL}
                alt={authUser.displayName || 'Google Profile'}
                className="w-12 h-12 rounded-2xl border border-indigo-500/40 object-cover shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-600/30">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-black text-lg">
                  {(authUser?.displayName || activeProfile.fullName || 'S').charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {isGoogleAccount
                  ? authUser?.displayName || 'Google User'
                  : activeProfile.fullName || 'Demo Student'}
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                {isGoogleAccount
                  ? authUser?.email
                  : activeProfile.email}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Only relevant details */}
        <div className="p-6 space-y-4">
          {isGoogleAccount ? (
            /* Google Account Details Only */
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Account Type</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google Account</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Name</span>
                  <span className="text-white font-medium">{authUser?.displayName || 'Not provided'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Email</span>
                  <span className="text-white font-medium">{authUser?.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified & Encrypted
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Account ID</span>
                  <span className="text-slate-400 font-mono text-[11px] truncate max-w-[170px]">
                    {authUser?.uid}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Sample / Demo Account Details Only */
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Account Type</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Sample Student Account</span>
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Student Name</span>
                  <span className="text-white font-medium">{activeProfile.fullName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Email</span>
                  <span className="text-white font-medium">{activeProfile.email}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">University</span>
                  <span className="text-white font-medium">{activeProfile.college}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Degree</span>
                  <span className="text-white font-medium">{activeProfile.degree}</span>
                </div>
              </div>

              {/* Option to link real Google account */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#ffffff" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#ffffff" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#ffffff" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Connect Google Account</span>
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {authUser ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSignOut();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800 text-xs font-semibold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
