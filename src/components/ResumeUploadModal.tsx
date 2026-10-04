import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, ArrowRight, Loader2, FileCheck, Trash2, AlertCircle, Download, Lock, Key } from 'lucide-react';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { UserResumeProfile } from '../types/career';
import { generateSampleResumePdf, downloadPdf } from '../utils/pdfGenerator';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileLoaded: (profile: UserResumeProfile) => void;
  isLoading: boolean;
  onParseResume: (payload: { text?: string; pdfBase64?: string; fileName?: string }) => Promise<void>;
  appMode: 'sample' | 'live';
  onSwitchToLiveMode: () => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onProfileLoaded,
  isLoading,
  onParseResume,
  appMode,
  onSwitchToLiveMode
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'sample'>(appMode === 'live' ? 'upload' : 'sample');
  const [customText, setCustomText] = useState('');
  const [selectedFile, setSelectedFile] = useState<{
    file: File;
    name: string;
    sizeFormatted: string;
    base64?: string;
    isPdf: boolean;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveTab(appMode === 'live' ? 'upload' : 'sample');
  }, [appMode, isOpen]);

  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = async (file: File) => {
    setErrorMsg(null);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isText = file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md');

    if (!isPdf && !isText && !file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      setErrorMsg('Please upload a PDF or plain text / markdown resume file.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('File size exceeds 15MB limit. Please upload a smaller file.');
      return;
    }

    if (isPdf) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedFile({
          file,
          name: file.name,
          sizeFormatted: formatFileSize(file.size),
          base64: result,
          isPdf: true
        });
      };
      reader.onerror = () => {
        setErrorMsg('Failed to read PDF file. Please try another file or paste text.');
      };
      reader.readAsDataURL(file);
    } else {
      // Plain text or markdown
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        setCustomText(text);
        setSelectedFile({
          file,
          name: file.name,
          sizeFormatted: formatFileSize(file.size),
          isPdf: false
        });
      };
      reader.onerror = () => {
        setErrorMsg('Failed to read text file.');
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleGenerateAndAttachSamplePdf = () => {
    const bytes = generateSampleResumePdf('Aarav Sharma');
    downloadPdf(bytes, 'Aarav_Sharma_Resume.pdf');
    
    // Also convert bytes to base64 and attach to selectedFile
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = 'data:application/pdf;base64,' + btoa(binary);

    const dummyFile = new File([bytes as any], 'Aarav_Sharma_Resume.pdf', { type: 'application/pdf' });
    setSelectedFile({
      file: dummyFile,
      name: 'Aarav_Sharma_Resume.pdf',
      sizeFormatted: `${(bytes.length / 1024).toFixed(1)} KB`,
      base64,
      isPdf: true
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !customText.trim()) {
      setErrorMsg('Please select a resume file or paste resume text.');
      return;
    }

    try {
      await onParseResume({
        text: customText.trim() ? customText : undefined,
        pdfBase64: selectedFile?.base64,
        fileName: selectedFile?.name
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse resume. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Resume Genie: Profile Ingestion
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  PDF & Text Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Upload your resume (PDF/TXT) to automatically parse skills, projects, and target roles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-5">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {appMode === 'sample' ? (
              <Lock className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>Upload Resume {appMode === 'sample' ? '(Requires Live API)' : '(PDF / Text)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('sample')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'sample'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sample Indian Profiles (1-Click)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'upload' && appMode === 'sample' ? (
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center flex flex-col items-center justify-center space-y-4 my-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Custom Resume Upload Locked in Sample Data Mode
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  You are currently using <strong>Sample Data Demo Mode</strong>. In this mode, pre-verified Indian student profiles (Aarav & Priya) are active.
                  To upload and analyze your own personal resume with live SerpApi Google Jobs search, please switch to <strong>Live API Mode</strong>.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('sample')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                >
                  Explore Sample Profiles
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToLiveMode();
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Enter API Keys & Unlock Upload</span>
                </button>
              </div>
            </div>
          ) : activeTab === 'upload' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.txt,.md,.doc,.docx"
                className="hidden"
              />

              {/* Interactive File Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-indigo-400 bg-indigo-950/30 scale-[1.01]'
                    : selectedFile
                    ? 'border-emerald-500/50 bg-emerald-950/20'
                    : 'border-slate-800 hover:border-indigo-500/50 bg-slate-950/60 hover:bg-slate-950'
                }`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-2">
                      <span>{selectedFile.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono">
                        {selectedFile.sizeFormatted}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-300/80 mb-3">
                      ✓ Ready for parsing by Resume Genie
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-lg bg-rose-950/30 border border-rose-900/30 hover:bg-rose-950/50 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Choose Different File</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">
                      Click to browse or drag and drop your resume
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports <strong className="text-indigo-400">PDF</strong> (multimodal Gemini parsing) or <strong className="text-indigo-400">TXT / MD</strong>
                    </p>
                    <span className="inline-block mt-2 text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                      Select PDF from Device
                    </span>
                  </div>
                )}
              </div>

              {/* Quick sample PDF test trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-300">
                <span className="text-[11px] text-slate-400">
                  Don't have a resume PDF file handy on your device?
                </span>
                <button
                  type="button"
                  onClick={handleGenerateAndAttachSamplePdf}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-[11px] font-semibold transition shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Generate & Load Sample PDF</span>
                </button>
              </div>

              {/* Optional: Paste raw text */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Or Paste Resume Text / Markdown
                  </label>
                  {customText && (
                    <button
                      type="button"
                      onClick={() => setCustomText('')}
                      className="text-[10px] text-slate-500 hover:text-slate-300"
                    >
                      Clear Text
                    </button>
                  )}
                </div>
                <textarea
                  rows={5}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Alternatively, paste your raw resume text here with Education, Skills, Projects, and Experience..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Extracts skills, CGPA, projects & experience
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || (!selectedFile && !customText.trim())}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition active:scale-95"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Parsing Resume...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Execute Resume Genie</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Or choose a verified Indian college profile to instantly simulate autonomous matching and roadmaps:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAMPLE_PROFILES.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => {
                      onProfileLoaded(sample);
                      onClose();
                    }}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-950 transition cursor-pointer group relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition">
                          {sample.fullName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                          CGPA {sample.cgpa.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-1 line-clamp-1">
                        {sample.college}
                      </div>
                      <div className="text-[11px] text-cyan-400 font-medium mb-3">
                        {sample.targetRoles[0]}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {sample.skills.technical.slice(0, 4).map((sk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:translate-x-0.5 transition">
                      <span>Load Profile & Run Genie</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
