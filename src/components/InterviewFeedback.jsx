import React, { useMemo, useState, useEffect } from 'react';

const defaultTraceLogs = [
    "[METRICS EVALUATION] Analyzed: session execution parameters and timing bounds.",
    "[DISCUSSION PHASE] Verifying candidate explanation of approach and constraints.",
    "[CODING PHASE] Parsing code structure and checking compilation logs.",
    "[REVIEW PHASE] Evaluating optimization proposals and complexity analysis.",
    "[PENALTY CHECK] Hint penalty rule evaluated. Checked timelines and boundaries.",
    "[SCORING] Mapped Problem Solving performance to hiring rubrics.",
    "[SCORING] Mapped Complexity Analysis bounds to Big-O criteria.",
    "[SCORING] Mapped Communication style and dialogue to rubric.",
    "[VERDICT] Compiled overall verdict and mapped final recommendation tier."
];

const categoryRubrics = {
    problem_solving: [
        { tier: "9-10 (Strong/Exceptional)", title: "Exceptional / Strong Hire Bar", desc: "Formulated highly optimal approach independently. Implemented elegant, correct, and bug-free code. Had 0 hints and 0 syntax/runtime corrections." },
        { tier: "7-8 (Clear Pass)", title: "Clear Pass", desc: "Proposed a valid working approach. Implemented working code with only minor bugs or minimal assistance. Needed 0 major hints." },
        { tier: "5-6 (Marginal/Weak)", title: "Marginal / Weak", desc: "Needed 1-2 hints to arrive at the solution or resolve bugs. Wrote multiple syntax/runtime errors during coding." },
        { tier: "1-4 (Fail)", title: "Unsatisfactory / Fail", desc: "Wrote fundamentally flawed code, failed to compile, or did not finish the coding phase. Required heavy guidance (>= 3 hints)." }
    ],
    complexity_analysis: [
        { tier: "9-10 (Exceptional)", title: "Exceptional / Flawless", desc: "Identified exact worst-case time AND space complexities using Big-O notation for BOTH the initial approach and final code, providing flawless logical justifications." },
        { tier: "7-8 (Good)", title: "Good / Pass", desc: "Identified correct complexities, but had minor gaps in reasoning or initially forgot recursive stack space." },
        { tier: "5-6 (Needs Improvement)", title: "Needs Improvement", desc: "One of time or space complexity was incorrect, or needed prompting to get them correct." },
        { tier: "1-4 (Unsatisfactory)", title: "Unsatisfactory / Fail", desc: "Got both complexities incorrect, or only got them correct after the interviewer gave them the exact answer." }
    ],
    communication: [
        { tier: "9-10 (Exceptional)", title: "Exceptional / Collaborative", desc: "Proactively explained thought process before coding. Discussed trade-offs, edge cases, and code walk-throughs clearly and fluidly." },
        { tier: "7-8 (Clear Pass)", title: "Clear Pass", desc: "Clear communication, but required occasional prompting to explain code or approach." },
        { tier: "5-6 (Marginal/Weak)", title: "Marginal / Weak", desc: "Vague, gave one-word/short answers, or failed to explain their code logic during implementation." },
        { tier: "1-4 (Fail)", title: "Unsatisfactory / Fail", desc: "Silent for long intervals, refused to explain logic, or only communicated when explicitly prompted." }
    ]
};

const getActiveTierIndex = (key, score) => {
    if (score >= 9) return 0;
    if (score >= 7) return 1;
    if (score >= 5) return 2;
    return 3;
};

export default function InterviewFeedback({ feedback, reference: propReference }) {
    const data = useMemo(() => {
        if (!feedback) return null;
        if (typeof feedback === 'string') {
            try {
                return JSON.parse(feedback);
            } catch (e) {
                console.error("Failed to parse feedback JSON", e);
                return null;
            }
        }
        return feedback; // Assume it's already an object
    }, [feedback]);

    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing report parser...");
    const [isUnpacking, setIsUnpacking] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [copied, setCopied] = useState(false);


    const sessionId = data?.session_summary?.session_id || 'default';
    const sessionKey = `interview.unpacked.${sessionId}`;

    useEffect(() => {
        if (data && data.feedback && !hasTriggered) {
            setHasTriggered(true);
            const alreadyUnpacked = sessionStorage.getItem(sessionKey);
            if (alreadyUnpacked) {
                setIsUnpacking(false);
            } else {
                setIsUnpacking(true);
            }
        }
    }, [data, hasTriggered, sessionKey]);

    useEffect(() => {
        if (!isUnpacking) return;

        let currentProgress = 0;
        let timer;

        const messages = [
            { threshold: 0, text: "Initializing AI feedback engine..." },
            { threshold: 12, text: "Parsing transcripts & response pacing..." },
            { threshold: 30, text: "Deconstructing code syntax & structure..." },
            { threshold: 52, text: "Simulating algorithm runtimes & complexity limits..." },
            { threshold: 72, text: "Evaluating architectural & technical decisions..." },
            { threshold: 88, text: "Synthesizing improvement plan & benchmarks..." },
            { threshold: 96, text: "Assembling final performance dashboard..." }
        ];

        const updateProgress = () => {
            const increment = Math.floor(Math.random() * 4) + 3; // increment by 3-6%
            currentProgress = Math.min(currentProgress + increment, 100);
            setProgress(currentProgress);

            const matched = messages.reduce((acc, curr) => {
                if (currentProgress >= curr.threshold) return curr.text;
                return acc;
            }, messages[0].text);
            setStatusText(matched);

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    sessionStorage.setItem(sessionKey, "true");
                    setIsUnpacking(false);
                }, 750);
            }
        };

        timer = setInterval(updateProgress, 70);

        return () => clearInterval(timer);
    }, [isUnpacking, sessionKey]);

    if (!data || !data.feedback) {
        return (
            <div className="flex items-center justify-center p-12 min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#137fec] border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-slate-400 text-sm font-medium animate-pulse">Loading feedback analysis...</div>
                </div>
            </div>
        );
    }

    if (isUnpacking) {
        const traceLogs = data?.feedback?.evaluation_trace || defaultTraceLogs;
        const visibleLinesCount = Math.min(
            traceLogs.length,
            Math.floor((progress / 100) * (traceLogs.length + 1))
        );
        const visibleLogs = traceLogs.slice(0, visibleLinesCount);

        return (
            <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
                <div className="w-full max-w-2xl bg-[#161b22]/40 backdrop-blur-xl border border-[#30363d] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    {/* Glowing background highlights */}
                    <div className="absolute -top-24 -left-24 w-52 h-52 rounded-full bg-[#137fec]/15 blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -right-24 w-52 h-52 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
                    <div className="absolute inset-0 tech-bg opacity-30 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Glowing Header Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#137fec]/20 to-emerald-500/20 border border-[#137fec]/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(19,127,236,0.15)] relative">
                            <span className="material-symbols-outlined text-3xl text-white animate-pulse">insights</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">Compiling Interview Insights</h3>
                        <p className="text-slate-400 text-xs text-center mb-6 max-w-xs leading-relaxed">
                            Our AI analyzer is scoring your performance and preparing recommendations.
                        </p>

                        {/* Circular Progress & Percentage */}
                        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                            {/* Circular Track Background */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="52"
                                    stroke="#0d1117"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="stroke-[#30363d]/50"
                                />
                                {/* Glow under active path */}
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="52"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="10"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 52}
                                    strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
                                    className="stroke-primary opacity-20 blur-sm transition-all duration-100 ease-out"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="52"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 52}
                                    strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
                                    className="transition-all duration-100 ease-out"
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#137fec" />
                                        <stop offset="100%" stopColor="#0bda5b" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-3xl font-mono font-extrabold text-white tracking-tight">{progress}%</span>
                                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Progress</span>
                            </div>
                        </div>

                        {/* Status Message */}
                        <div className="w-full text-center py-2 px-4 rounded-xl bg-[#0d1117]/60 border border-[#30363d]/50 mb-4 min-h-[48px] flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-300 transition-all duration-300">
                                {statusText}
                            </span>
                        </div>

                        {/* Terminal Log Console */}
                        <div className="w-full bg-[#0d1117]/80 border border-[#30363d] rounded-2xl p-4 font-mono text-[10px] md:text-xs text-emerald-400/90 mt-4 h-56 overflow-y-auto flex flex-col gap-1.5 shadow-inner select-text text-left">
                            <div className="flex items-center gap-1.5 border-b border-[#30363d] pb-2 mb-2 select-none">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                <span className="text-[9px] text-slate-500 ml-2 font-bold uppercase tracking-wider">EVALUATION_PROCESSOR_LOG</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar animate-pulse-subtle">
                                {visibleLogs.map((log, idx) => (
                                    <div key={idx} className="flex gap-2 leading-relaxed">
                                        <span className="text-slate-600 select-none">&gt;</span>
                                        <span>{log}</span>
                                    </div>
                                ))}
                                {progress < 100 && (
                                    <div className="flex gap-2 text-emerald-400 animate-pulse">
                                        <span className="text-slate-600 select-none">&gt;</span>
                                        <span className="w-1.5 h-3.5 bg-emerald-400"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { feedback: f } = data;
    const { session_summary, scores, strengths, weaknesses, key_metrics, final_verdict, evaluation_trace } = f;
    const reference = propReference || data?.reference;

    // Helper to format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCopyCode = () => {
        if (reference?.pseudocode) {
            navigator.clipboard.writeText(reference.pseudocode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Helper for score color
    const getScoreColor = (score) => {
        const num = parseFloat(score) || 0;
        const normalized = num <= 10 ? num : num / 10;
        if (normalized >= 8) return "text-emerald-400";
        if (normalized >= 5) return "text-amber-400";
        return "text-red-400";
    };

    const getScoreBg = (score) => {
        const num = parseFloat(score) || 0;
        const normalized = num <= 10 ? num : num / 10;
        if (normalized >= 8) return "bg-emerald-500";
        if (normalized >= 5) return "bg-amber-500";
        return "bg-red-500";
    };

    const getScoreBorder = (score) => {
        const num = parseFloat(score) || 0;
        const normalized = num <= 10 ? num : num / 10;
        if (normalized >= 8) return "border-emerald-500/20 bg-emerald-500/5";
        if (normalized >= 5) return "border-amber-500/20 bg-amber-500/5";
        return "border-red-500/20 bg-red-500/5";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in select-none">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl border border-white/5 glass-panel p-8">
                {/* Visual Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-emerald-500/5 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {/* Circular Progress Gauge */}
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0 select-none">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="38"
                                    stroke="rgba(255, 255, 255, 0.05)"
                                    strokeWidth="6"
                                    fill="transparent"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="38"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 38}
                                    strokeDashoffset={2 * Math.PI * 38 * (1 - (parseFloat(session_summary.overall_score) <= 10 ? parseFloat(session_summary.overall_score) * 10 : parseFloat(session_summary.overall_score)) / 100)}
                                    className={`transition-all duration-500 ${getScoreColor(session_summary.overall_score)}`}
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className={`block text-3xl font-extrabold font-mono tracking-tighter ${getScoreColor(session_summary.overall_score)}`}>
                                    {session_summary.overall_score}
                                </span>
                                <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest block -mt-0.5">Score</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-1.5 tracking-tight">{session_summary.performance_label}</h2>
                            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                                {data.response || final_verdict.summary}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3 select-none text-center min-w-[110px]">
                            <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time Spent</span>
                            <span className="text-xl font-mono font-bold text-white">{formatTime(session_summary.time_spent_seconds)}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3 select-none text-center min-w-[110px]">
                            <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Difficulty</span>
                            <span className="text-xl font-bold text-amber-500">{session_summary.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Tabbed Workspace */}
                <div className="lg:col-span-2 flex flex-col border border-white/5 glass-panel rounded-2xl overflow-hidden min-h-[500px]">
                    {/* Tab Navigation Header */}
                    <div className="flex border-b border-white/5 bg-white/[0.01] px-4 pt-3 gap-2 select-none shrink-0">
                        {[
                            { id: 'overview', label: 'AI Overview', icon: 'psychology' },
                            { id: 'metrics', label: 'Metrics & Benchmarks', icon: 'analytics' },
                            { id: 'reference', label: 'Reference Solution', icon: 'menu_book' },
                            { id: 'trace', label: 'AI Evaluation Log', icon: 'terminal' }
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-xl border-t border-x transition-all duration-300 cursor-pointer relative ${
                                        isActive
                                            ? 'border-white/5 bg-[#0d1117]/40 text-[#137fec] -mb-[1px]'
                                            : 'border-transparent text-slate-500 hover:text-slate-300'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-base">{tab.icon}</span>
                                    {tab.label}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#137fec] to-emerald-500 rounded-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content Panel */}
                    <div className="p-6 flex-1 bg-white/[0.01]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-[#137fec]/10 text-[#137fec] flex items-center justify-center border border-[#137fec]/20">
                                        <span className="material-symbols-outlined">psychology</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-200">AI Feedback Summary</h3>
                                        <p className="text-xs text-slate-500">Deep-dive analysis of your interview session</p>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-2">
                                    {strengths && strengths.length > 0 ? (
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                Strengths & Highlights
                                            </h4>
                                            <ul className="space-y-3">
                                                {strengths.map((strength, idx) => (
                                                    <li key={idx} className="text-sm text-slate-400 flex gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                                                        <span className="material-symbols-outlined text-emerald-500 text-lg shrink-0">check_circle</span>
                                                        <span>
                                                            <strong className="text-slate-300 block mb-0.5">{strength.title}</strong>
                                                            {strength.description}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 italic text-sm text-center py-4">No specific strengths detected in this session.</div>
                                    )}

                                    {/* Using scores grouping for additional context if needed */}
                                    <div className="space-y-6 pt-2">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#137fec]"></span>
                                            Detailed Category Rubrics
                                        </h4>
                                        {Object.entries(scores || {}).map(([key, val]) => {
                                            if (!val || val.score === undefined) return null;
                                            
                                            const rubricKey = key === "problem_solving" ? "problem_solving" : 
                                                              key === "complexity_analysis" ? "complexity_analysis" : 
                                                              "communication";
                                                              
                                            const rubricList = categoryRubrics[rubricKey];
                                            const activeTierIdx = getActiveTierIndex(rubricKey, val.score);
                                            
                                            // Handle backward compatibility
                                            const justificationText = val.justification || val.notes || "";
                                            const steps = val.improvement_steps || [
                                                "Practice explaining trade-offs for different approaches.",
                                                "Ensure edge cases are validated before jumping to code implementation.",
                                                "Review time and space complexity bounds of common algorithm patterns."
                                            ];

                                            return (
                                                <div key={key} className="p-6 rounded-2xl bg-[#161b22]/30 border border-white/5 space-y-6 hover:bg-[#161b22]/50 transition-all duration-300 text-left">
                                                    {/* Category Header */}
                                                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-3 h-3 rounded-full ${
                                                                val.score >= 8 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 
                                                                val.score >= 5 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 
                                                                'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                                                            }`}></div>
                                                            <h4 className="text-base font-bold text-slate-100 capitalize">
                                                                {key.replace('_', ' ')}
                                                            </h4>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-slate-500 font-medium">Score:</span>
                                                            <span className={`font-mono text-sm font-extrabold px-3 py-1 rounded-xl border ${
                                                                val.score >= 8
                                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                                    : val.score >= 5
                                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                            }`}>
                                                                {val.score} / 10
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Rubric Tiers & Justification Grid */}
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {/* Hiring Rubric Expectations */}
                                                        <div className="space-y-3">
                                                            <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                                                <span className="material-symbols-outlined text-xs">tune</span>
                                                                MAANG Hiring Rubric Tiers
                                                            </h5>
                                                            <div className="space-y-2">
                                                                {rubricList && rubricList.map((tierItem, tIdx) => {
                                                                    const isActive = tIdx === activeTierIdx;
                                                                    return (
                                                                        <div 
                                                                            key={tIdx} 
                                                                            className={`p-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                                                                                isActive 
                                                                                    ? 'border-emerald-500/30 bg-emerald-500/[0.04] shadow-md shadow-emerald-500/[0.02]' 
                                                                                    : 'border-white/5 bg-transparent opacity-45 hover:opacity-75'
                                                                            }`}
                                                                        >
                                                                            {isActive && (
                                                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                                                    <span className="text-[8px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">Active</span>
                                                                                </div>
                                                                            )}
                                                                            <div className="flex items-start gap-2.5">
                                                                                <span className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                                                                                    {isActive ? 'check_circle' : 'circle'}
                                                                                </span>
                                                                                <div>
                                                                                    <div className="flex items-center gap-1.5">
                                                                                        <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>{tierItem.tier}</span>
                                                                                        <span className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-slate-500'}`}>{tierItem.title}</span>
                                                                                    </div>
                                                                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{tierItem.desc}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Justification & Action Items */}
                                                        <div className="flex flex-col gap-4">
                                                            {/* Interviewer Critical Assessment */}
                                                            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex-1">
                                                                <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 mb-2.5">
                                                                    <span className="material-symbols-outlined text-xs">gavel</span>
                                                                    Interviewer Critical Assessment
                                                                </h5>
                                                                <p className="text-xs text-slate-300 leading-relaxed italic">
                                                                    "{justificationText}"
                                                                </p>
                                                            </div>

                                                            {/* Actionable Improvement Checklist */}
                                                            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5">
                                                                <h5 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 mb-2.5">
                                                                    <span className="material-symbols-outlined text-xs text-amber-500 animate-pulse">trending_up</span>
                                                                    Action Items to Achieve Next Level
                                                                </h5>
                                                                <ul className="space-y-2 select-text">
                                                                    {steps.map((step, sIdx) => (
                                                                        <li key={sIdx} className="text-xs text-slate-400 flex items-start gap-2">
                                                                            <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5 shrink-0 select-none">play_arrow</span>
                                                                            <span>{step}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'metrics' && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-200">Key Metrics</h3>
                                        <p className="text-xs text-slate-500">Performance comparison vs optimal benchmarks</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                    <MetricCard
                                        title="Runtime Complexity"
                                        value={key_metrics?.runtime_complexity?.value || "N/A"}
                                        status={key_metrics?.runtime_complexity?.status}
                                        type="text"
                                    />
                                    <MetricCard
                                        title="Memory Efficiency"
                                        value={key_metrics?.memory_efficiency?.value || "N/A"}
                                        status={key_metrics?.memory_efficiency?.status}
                                        type="text"
                                    />
                                    <MetricCard
                                        title="Coding Speed"
                                        value={key_metrics?.coding_speed_percentile ? `Top ${100 - key_metrics.coding_speed_percentile}%` : "N/A"}
                                        subValue={key_metrics?.coding_speed_percentile ? `${key_metrics.coding_speed_percentile}th Percentile` : ""}
                                        status={key_metrics?.coding_speed_percentile > 50 ? "optimal" : "needs_improvement"}
                                        type="bar"
                                        progress={key_metrics?.coding_speed_percentile}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'reference' && reference && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                                        <span className="material-symbols-outlined">menu_book</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-200">Reference Solution</h3>
                                        <p className="text-xs text-slate-500">Optimal approach and key insights</p>
                                    </div>
                                </div>

                                {/* Approach Description & Complexity Badges */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                                    <div className="md:col-span-2 space-y-4">
                                        <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-violet-400">explore</span>
                                                Optimal Strategy
                                            </h4>
                                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{reference.optimal_approach}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex-1 bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex flex-col justify-center items-center">
                                            <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time Complexity</span>
                                            <span className="text-sm font-mono font-extrabold text-emerald-400">{reference.time_complexity}</span>
                                        </div>
                                        <div className="flex-1 bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex flex-col justify-center items-center">
                                            <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Space Complexity</span>
                                            <span className="text-sm font-mono font-extrabold text-[#137fec]">{reference.space_complexity}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Insights & Pitfalls */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-amber-400">lightbulb</span>
                                            Key Insights
                                        </h4>
                                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{reference.key_insights}</p>
                                    </div>

                                    {reference.common_pitfalls && (
                                        <div className="p-4 rounded-xl bg-rose-500/[0.01] border border-rose-500/10">
                                            <h4 className="text-xs font-bold text-rose-300/80 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm text-rose-400">error</span>
                                                Common Pitfalls
                                            </h4>
                                            <p className="text-xs text-rose-200/70 leading-relaxed whitespace-pre-line">{reference.common_pitfalls}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Code Block Mock IDE */}
                                {reference.pseudocode && (
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-[#137fec]">code</span>
                                            Optimal Reference Code
                                        </h4>
                                        <div className="border border-white/5 bg-[#080b11]/80 rounded-2xl overflow-hidden shadow-2xl relative">
                                            {/* Header Mock bar */}
                                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117]/80 border-b border-white/5 select-none">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                                    <span className="text-[10px] text-slate-400 ml-2 font-mono">solution.py</span>
                                                </div>
                                                <button
                                                    onClick={handleCopyCode}
                                                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-white rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[13px]">{copied ? 'done' : 'content_copy'}</span>
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </button>
                                            </div>
                                            {/* Code Display */}
                                            <pre className="p-4 text-[11px] text-slate-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar">{reference.pseudocode}</pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'trace' && (
                            <div className="space-y-6 animate-fade-in text-left">
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center border border-[#10b981]/20">
                                        <span className="material-symbols-outlined">terminal</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-200">AI Evaluation Trace Log</h3>
                                        <p className="text-xs text-slate-500">Chronological telemetry checks compiled by the AI agent</p>
                                    </div>
                                </div>
                                <div className="border border-white/5 bg-[#080b11]/90 rounded-2xl overflow-hidden shadow-2xl relative font-mono text-[10px] md:text-xs text-emerald-400 p-6 space-y-2 h-[420px] overflow-y-auto custom-scrollbar select-text">
                                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 select-none">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                            <span className="text-[9px] text-slate-500 ml-2">evaluation_pipeline.log</span>
                                        </div>
                                    </div>
                                    {(evaluation_trace || defaultTraceLogs).map((log, idx) => (
                                        <div key={idx} className="flex gap-2 leading-relaxed">
                                            <span className="text-slate-600 select-none">&gt;</span>
                                            <span>{log}</span>
                                        </div>
                                    ))}
                                    <div className="flex gap-2 text-emerald-500/50 italic pt-4 select-none">
                                        <span className="text-slate-600 select-none">&gt;</span>
                                        <span>[PROCESS] Pipeline execution complete. Report generated.</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Improvement Plan */}
                <div className="space-y-6">
                    <div className="border border-white/5 glass-panel p-6 rounded-2xl sticky top-6 shadow-xl flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-200">Improvement Plan</h3>
                                <p className="text-xs text-slate-500">Targeted study recommendations</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {weaknesses && weaknesses.length > 0 ? (
                                weaknesses.slice(0, 4).map((weakness, idx) => (
                                    <div key={idx} className="p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.02] transition-all duration-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-base text-amber-500 animate-pulse">warning</span>
                                            <h4 className="text-[10px] font-extrabold text-slate-200 uppercase tracking-wider">{weakness.category}</h4>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            <strong className="block text-slate-300 mb-1">{weakness.title}</strong>
                                            {weakness.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-center text-slate-500 text-sm">
                                    No critical weaknesses identified. Great job!
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-3 text-center">Final Verdict</h4>
                            {final_verdict.decision === "No Hire" ? (
                                <div className="bg-rose-500/5 text-rose-400 border border-rose-500/20 py-3.5 rounded-xl text-center font-mono font-extrabold uppercase tracking-widest text-xs relative overflow-hidden shadow-[0_0_15px_rgba(244,63,94,0.05)] select-none">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                    </span>
                                    {final_verdict.decision}
                                </div>
                            ) : final_verdict.decision === "Hire" || final_verdict.decision === "Strong Hire" ? (
                                <div className="bg-emerald-500/5 text-emerald-400 border border-emerald-500/20 py-3.5 rounded-xl text-center font-mono font-extrabold uppercase tracking-widest text-xs relative overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.05)] select-none">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    {final_verdict.decision}
                                </div>
                            ) : (
                                <div className="bg-amber-500/5 text-amber-400 border border-amber-500/20 py-3.5 rounded-xl text-center font-mono font-extrabold uppercase tracking-widest text-xs relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.05)] select-none">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    {final_verdict.decision}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full py-3 bg-gradient-to-r from-[#137fec] to-blue-500 hover:from-[#137fec]/90 hover:to-blue-500/90 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#137fec]/20 active:translate-y-0 cursor-pointer"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, subValue, status, type, progress }) {
    let colorClass = "text-primary";
    let barColor = "from-[#137fec] to-blue-400";
    let borderClass = "border-white/5";
    let bgGlow = "bg-primary/5";
    let icon = "info";

    if (title.toLowerCase().includes("runtime")) {
        icon = "schedule";
    } else if (title.toLowerCase().includes("memory")) {
        icon = "memory";
    } else if (title.toLowerCase().includes("speed")) {
        icon = "speed";
    }

    if (status === "optimal" || (typeof progress === 'number' && progress >= 70)) {
        colorClass = "text-emerald-400";
        barColor = "from-emerald-500 to-teal-400";
        borderClass = "border-emerald-500/10";
        bgGlow = "bg-emerald-500/5";
    } else if (status === "needs_improvement" || (typeof progress === 'number' && progress < 40)) {
        colorClass = "text-amber-400";
        barColor = "from-amber-500 to-orange-400";
        borderClass = "border-amber-500/10";
        bgGlow = "bg-amber-500/5";
    }

    return (
        <div className={`bg-white/[0.01] backdrop-blur-xl p-5 border ${borderClass} rounded-2xl relative overflow-hidden group hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 shadow-lg`}>
            {/* Soft decorative background glow */}
            <div className={`absolute -right-8 -top-8 w-20 h-20 rounded-full ${bgGlow} blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>
            
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{title}</span>
                <span className="material-symbols-outlined text-slate-600 text-lg">{icon}</span>
            </div>

            <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-mono font-extrabold tracking-tight ${colorClass}`}>{value}</span>
                {subValue && <span className="text-[10px] text-slate-500 font-medium mb-0.5">{subValue}</span>}
            </div>

            {type === "bar" && (
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-4 relative">
                    <div 
                        className={`bg-gradient-to-r ${barColor} h-full rounded-full transition-all duration-1000 ease-out`} 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}
        </div>
    );
}