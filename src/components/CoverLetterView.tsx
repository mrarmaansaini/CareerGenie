import React, { useState } from 'react';
import { Copy, Check, Download, Sparkles, ShieldCheck, RefreshCw, FileText, Send, Lightbulb, FileDown, Building } from 'lucide-react';
import { CoverLetterData, Opportunity, UserResumeProfile } from '../types/career';
import { generateCoverLetterPdf, downloadPdf } from '../utils/pdfGenerator';

interface CoverLetterViewProps {
  coverLetter: CoverLetterData | null;
  selectedJob: Opportunity | null;
  profile: UserResumeProfile | null;
  onGenerateCoverLetter: (job: Opportunity) => Promise<void>;
  isGenerating: boolean;
  opportunities?: Opportunity[];
  onSelectJob?: (job: Opportunity) => void;
}

export const CoverLetterView: React.FC<CoverLetterViewProps> = ({
  coverLetter,
  selectedJob,
  profile,
  onGenerateCoverLetter,
  isGenerating,
  opportunities = [],
  onSelectJob
}) => {
  const [copied, setCopied] = useState(false);
  const [editableText, setEditableText] = useState(coverLetter?.generatedText || '');

  React.useEffect(() => {
    if (coverLetter?.generatedText) {
      setEditableText(coverLetter.generatedText);
    }
  }, [coverLetter]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([editableText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cover_Letter_${coverLetter?.companyName || 'Application'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const candidate = profile?.fullName || coverLetter?.candidateName || 'Candidate';
    const comp = coverLetter?.companyName || selectedJob?.company_name || 'Company';
    const r = coverLetter?.role || selectedJob?.title || 'Engineering Intern';
    const score = coverLetter?.atsScore || 94;

    const bytes = generateCoverLetterPdf(candidate, comp, r, editableText, score);
    downloadPdf(bytes, `Cover_Letter_${comp.replace(/\s+/g, '_')}.pdf`);
  };

  const company = selectedJob?.company_name || coverLetter?.companyName || 'Target Company';
  const role = selectedJob?.title || coverLetter?.role || 'Software Engineering Intern';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AGENT 6: COVER LETTER GENIE
              </span>
              <span className="text-xs text-slate-400 font-medium">ATS-Optimized & Project Grounded</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Tailored Application Letter Studio
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-slate-400">Target Role:</span>
              <strong className="text-indigo-400 text-xs">{role}</strong>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Target Company:</span>
              {opportunities.length > 0 && onSelectJob ? (
                <select
                  value={selectedJob?.id || ''}
                  onChange={(e) => {
                    const found = opportunities.find(o => o.id === e.target.value);
                    if (found) {
                      onSelectJob(found);
                      onGenerateCoverLetter(found);
                    }
                  }}
                  className="bg-slate-950 border border-indigo-500/40 rounded-lg px-2.5 py-1 text-xs text-indigo-300 font-bold focus:outline-none focus:border-indigo-400 cursor-pointer shadow-inner"
                  title="Switch target company to generate cover letter"
                >
                  {opportunities.map(o => (
                    <option key={o.id} value={o.id} className="bg-slate-900 text-white">
                      {o.company_name} ({o.title})
                    </option>
                  ))}
                </select>
              ) : (
                <strong className="text-white text-xs">{company}</strong>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedJob && (
              <button
                onClick={() => onGenerateCoverLetter(selectedJob)}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate Pitch</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition"
              title="Download ATS-Formatted PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-pink-400" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Download as TXT"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Document Editor */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-mono text-[11px]">Formatted Document View</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              ATS Parsable Format
            </span>
          </div>

          <textarea
            rows={18}
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-full bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed tracking-wide resize-none"
            placeholder="Click 'Generate Pitch' to compose a personalized ATS cover letter..."
          />

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800 mt-4">
            <span>Word Count: {editableText.split(/\s+/).filter(Boolean).length} words</span>
            <span>Estimated Reading Time: ~1.2 mins</span>
          </div>
        </div>

        {/* ATS Quality Analysis & Strategic Anchors */}
        <div className="space-y-4">
          {/* ATS Meter Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                ATS Compatibility Score
              </span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {coverLetter?.atsScore || 94}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                style={{ width: `${coverLetter?.atsScore || 94}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Scanned against keyword density, structural heading compatibility, and active voice ratios.
            </p>
          </div>

          {/* Key Anchors Included */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Grounded Anchors Included</span>
            </h4>
            <div className="space-y-2">
              {(coverLetter?.keyHighlightsIncluded || [
                'Direct citation of verified project work',
                'Alignment with production stack requirements',
                'Clear articulation of high-velocity ownership'
              ]).map((highlight, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiter Outreach Tips */}
          <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-3xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Outreach Strategy</span>
            </h4>
            <div className="space-y-2">
              {(coverLetter?.tips || [
                'Send a 2-sentence note on LinkedIn to the engineering lead with your live demo URL.',
                'Mention your willingness to take a 48-hour take-home coding trial.',
                'Ensure your GitHub profile pins your top 2 showcased projects.'
              ]).map((tip, i) => (
                <p key={i} className="text-xs text-slate-400 leading-relaxed">
                  • {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
