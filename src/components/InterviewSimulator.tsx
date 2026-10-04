import React, { useState } from 'react';
import { MessageSquare, Mic, MicOff, Send, Award, CheckCircle, AlertCircle, Sparkles, RefreshCw, Loader2, ChevronRight, User, Bot, Building } from 'lucide-react';
import { MockInterviewSession, InterviewQuestion, Opportunity } from '../types/career';

interface InterviewSimulatorProps {
  session: MockInterviewSession | null;
  onGenerateSession: (role: string, company: string) => Promise<void>;
  onEvaluateAnswer: (question: InterviewQuestion, answer: string) => Promise<void>;
  isGenerating: boolean;
  isEvaluating: boolean;
  targetRole: string;
  targetCompany: string;
  onReadinessUpdated?: (score: number) => void;
  opportunities?: Opportunity[];
  onSelectJob?: (job: Opportunity) => void;
  selectedJob?: Opportunity | null;
}

export const InterviewSimulator: React.FC<InterviewSimulatorProps> = ({
  session,
  onGenerateSession,
  onEvaluateAnswer,
  isGenerating,
  isEvaluating,
  targetRole,
  targetCompany,
  onReadinessUpdated,
  opportunities = [],
  onSelectJob,
  selectedJob
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const currentQuestion = session?.questions?.[activeQuestionIndex];

  const handleGenerateQuestions = async () => {
    setActiveQuestionIndex(0);
    setAnswerInput('');
    await onGenerateSession(targetRole, targetCompany);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !answerInput.trim()) return;
    await onEvaluateAnswer(currentQuestion, answerInput);
  };

  const handleNextQuestion = () => {
    if (session && activeQuestionIndex < session.questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
      setAnswerInput('');
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
      setAnswerInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-cyan-400 border border-blue-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AGENT 7: INTERVIEW GENIE
              </span>
              <span className="text-xs text-slate-400 font-medium">Interactive Technical & Behavioral Simulation</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              AI Mock Interview Chamber
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-xs text-slate-400">Target Role:</span>
              <strong className="text-white text-xs">{targetRole}</strong>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">Target Company:</span>
              {opportunities.length > 0 && onSelectJob ? (
                <select
                  value={selectedJob?.id || ''}
                  onChange={(e) => {
                    const found = opportunities.find(o => o.id === e.target.value);
                    if (found) {
                      onSelectJob(found);
                      setActiveQuestionIndex(0);
                      setAnswerInput('');
                      onGenerateSession(found.title, found.company_name);
                    }
                  }}
                  className="bg-slate-950 border border-indigo-500/40 rounded-lg px-2.5 py-1 text-xs text-indigo-300 font-bold focus:outline-none focus:border-indigo-400 cursor-pointer shadow-inner"
                  title="Switch target company to generate specific interview questions"
                >
                  {opportunities.map(o => (
                    <option key={o.id} value={o.id} className="bg-slate-900 text-white">
                      {o.company_name} ({o.title})
                    </option>
                  ))}
                </select>
              ) : (
                <strong className="text-indigo-400 text-xs">{targetCompany}</strong>
              )}
            </div>
          </div>

          <button
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Interview Rounds...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Questions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {session && session.questions && session.questions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question List Navigation Sidebar */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Interview Rounds ({session.questions.length} Questions)
            </div>
            {session.questions.map((q, idx) => {
              const isActive = activeQuestionIndex === idx;
              const hasFeedback = !!q.feedback;

              return (
                <div
                  key={q.id || idx}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Q{idx + 1} • {q.category}
                    </span>
                    {hasFeedback ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {q.feedback?.score}%
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">Unanswered</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {q.question}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Question Active Chamber */}
          <div className="lg:col-span-2 space-y-4">
            {currentQuestion && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                {/* Question Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                      Question {activeQuestionIndex + 1} of {session.questions.length} [{currentQuestion.category}]
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Standard Indian Hiring Round
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  {/* Expected Key Points */}
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 font-medium">Interviewer Focus Areas:</span>
                    <ul className="mt-1 space-y-1">
                      {currentQuestion.expectedKeyPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Candidate Answer Box */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Your Response (Text or Voice)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        isRecording
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="Structure your answer using the STAR method (Situation, Task, Action, Result) or walk through your technical trade-offs..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevQuestion}
                        disabled={activeQuestionIndex === 0}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-30 transition"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        disabled={activeQuestionIndex === session.questions.length - 1}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-30 transition"
                      >
                        Next
                      </button>
                    </div>

                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isEvaluating || !answerInput.trim()}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                    >
                      {isEvaluating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Evaluating Response...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit for AI Evaluation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Evaluation Result Card */}
                {currentQuestion.feedback && (
                  <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Interviewer Assessment
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-black text-emerald-400">
                        <Award className="w-4 h-4" />
                        <span>Score: {currentQuestion.feedback.score} / 100</span>
                      </div>
                    </div>

                    {/* Strengths & Gaps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Strengths
                        </span>
                        <ul className="space-y-1 text-slate-300">
                          {currentQuestion.feedback.strengths.map((str, i) => (
                            <li key={i}>• {str}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Areas for Improvement
                        </span>
                        <ul className="space-y-1 text-slate-300">
                          {currentQuestion.feedback.gaps.map((gap, i) => (
                            <li key={i}>• {gap}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Exemplary Model Answer */}
                    <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/30 text-xs">
                      <span className="font-bold text-indigo-300 block mb-1">
                        High-Scoring Exemplary Answer Pattern:
                      </span>
                      <p className="text-slate-300 leading-relaxed italic">
                        "{currentQuestion.feedback.suggestedAnswer}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white mb-1">
            No Interview Session Active Yet
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Click below to generate high-yield technical and behavioral questions tailored for {targetRole} at {targetCompany}.
          </p>
          <button
            onClick={() => onGenerateSession(targetRole, targetCompany)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
          >
            Launch Interview Session
          </button>
        </div>
      )}
    </div>
  );
};
