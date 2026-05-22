import React, { useMemo, useState, useEffect } from 'react';

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
        const tasks = [
            { label: "Deconstruct conversation transcript", start: 0, end: 25 },
            { label: "Analyze implementation & edge cases", start: 25, end: 50 },
            { label: "Evaluate computational complexity", start: 50, end: 75 },
            { label: "Compile study & improvement plan", start: 75, end: 95 }
        ];

        return (
            <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
                <div className="w-full max-w-lg bg-[#161b22]/40 backdrop-blur-xl border border-[#30363d] rounded-3xl p-8 relative overflow-hidden shadow-2xl">
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
                        <div className="w-full text-center py-2 px-4 rounded-xl bg-[#0d1117]/60 border border-[#30363d]/50 mb-8 min-h-[48px] flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-300 transition-all duration-300">
                                {statusText}
                            </span>
                        </div>

                        {/* Checklist of tasks */}
                        <div className="w-full space-y-3.5 border-t border-[#30363d]/50 pt-6">
                            {tasks.map((task, idx) => {
                                const isDone = progress >= task.end;
                                const isActive = progress >= task.start && progress < task.end;
                                return (
                                    <div key={idx} className="flex items-center gap-3 transition-all duration-300">
                                        {isDone ? (
                                            <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0 transition-transform duration-300 scale-100">check_circle</span>
                                        ) : isActive ? (
                                            <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#137fec] animate-ping absolute"></div>
                                                <div className="w-2 h-2 rounded-full bg-[#137fec] relative"></div>
                                            </div>
                                        ) : (
                                            <span className="material-symbols-outlined text-slate-600 text-lg shrink-0">radio_button_unchecked</span>
                                        )}
                                        <span className={`text-xs font-semibold tracking-wide transition-all ${
                                            isDone ? "text-slate-300" :
                                            isActive ? "text-[#137fec] font-bold" :
                                            "text-slate-500"
                                        }`}>
                                            {task.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { feedback: f } = data;
    const { session_summary, scores, strengths, weaknesses, key_metrics, final_verdict } = f;
    const reference = propReference || data?.reference;

    // Helper to format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Helper for score color
    const getScoreColor = (score) => {
        if (score >= 8) return "text-emerald-400";
        if (score >= 5) return "text-amber-400";
        return "text-red-400";
    };

    const getScoreBg = (score) => {
        if (score >= 8) return "bg-emerald-500";
        if (score >= 5) return "bg-amber-500";
        return "bg-red-500";
    };

    const getScoreBorder = (score) => {
        if (score >= 8) return "border-emerald-500/30 bg-emerald-500/10";
        if (score >= 5) return "border-amber-500/30 bg-amber-500/10";
        return "border-red-500/30 bg-red-500/10";
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#137fec]/20 to-emerald-500/10 border border-[#137fec]/20 p-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${getScoreBorder(session_summary.overall_score)}`}>
                            <div className="text-center">
                                <span className={`block text-3xl font-bold ${getScoreColor(session_summary.overall_score)}`}>{session_summary.overall_score}</span>
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Score</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">{session_summary.performance_label}</h2>
                            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                                {data.response || final_verdict.summary}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-[#0d1117]/50 rounded-xl px-5 py-3 border border-[#30363d]">
                            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time Spent</span>
                            <span className="text-xl font-mono text-white">{formatTime(session_summary.time_spent_seconds)}</span>
                        </div>
                        <div className="bg-[#0d1117]/50 rounded-xl px-5 py-3 border border-[#30363d]">
                            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Difficulty</span>
                            <span className="text-xl font-bold text-amber-500">{session_summary.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Strengths / Detailed Feedback */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-[#137fec]/10 text-[#137fec] flex items-center justify-center">
                                <span className="material-symbols-outlined">psychology</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-200">AI Feedback Summary</h3>
                                <p className="text-xs text-slate-500">Deep-dive analysis of your interview session</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {strengths && strengths.length > 0 ? (
                                <div>
                                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Strengths & Highlights
                                    </h4>
                                    <ul className="space-y-3 ml-3.5">
                                        {strengths.map((strength, idx) => (
                                            <li key={idx} className="text-sm text-slate-400 flex gap-2">
                                                <span className="material-symbols-outlined text-emerald-500 text-base shrink-0">check_circle</span>
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

                            {/* Using scores grouping for additional context if needed, or just keeping it simple per mock */}
                            {Object.entries(scores || {}).map(([key, val]) => (
                                val.notes && val.score > 0 && (
                                    <div key={key}>
                                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3 capitalize">
                                            <span className={`w-1.5 h-1.5 rounded-full ${val.score >= 5 ? 'bg-[#137fec]' : 'bg-amber-500'}`}></span>
                                            {key.replace('_', ' ')}
                                        </h4>
                                        <p className="text-sm text-slate-400 ml-3.5">{val.notes}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Key Metrics - Moved here to match width of left col in mock or potentially keep as grid */}
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                <span className="material-symbols-outlined">analytics</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-200">Key Metrics</h3>
                                <p className="text-xs text-slate-500">Performance comparison vs optimal benchmarks</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    {/* Reference Solution */}
                    {reference && (
                        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                                    <span className="material-symbols-outlined">menu_book</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-200">Reference Solution</h3>
                                    <p className="text-xs text-slate-500">Optimal approach and key insights</p>
                                </div>
                            </div>

                            {/* Optimal Approach */}
                            <div className="mb-5">
                                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                                    Optimal Approach
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed ml-3.5 whitespace-pre-line">{reference.optimal_approach}</p>
                            </div>

                            {/* Complexity badges */}
                            <div className="flex gap-3 mb-5">
                                <div className="flex-1 bg-[#0d1117]/50 border border-[#30363d] rounded-xl p-3 text-center">
                                    <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Time</span>
                                    <span className="text-sm font-mono font-bold text-emerald-400">{reference.time_complexity}</span>
                                </div>
                                <div className="flex-1 bg-[#0d1117]/50 border border-[#30363d] rounded-xl p-3 text-center">
                                    <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Space</span>
                                    <span className="text-sm font-mono font-bold text-[#137fec]">{reference.space_complexity}</span>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="mb-5">
                                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    Key Insights
                                </h4>
                                <p className="text-sm text-slate-400 leading-relaxed ml-3.5 whitespace-pre-line">{reference.key_insights}</p>
                            </div>

                            {/* Common Pitfalls */}
                            {reference.common_pitfalls && (
                                <div className="mb-5">
                                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                        Common Pitfalls
                                    </h4>
                                    <div className="ml-3.5 p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                                        <p className="text-sm text-rose-300/70 leading-relaxed whitespace-pre-line">{reference.common_pitfalls}</p>
                                    </div>
                                </div>
                            )}

                            {/* Pseudocode */}
                            {reference.pseudocode && (
                                <div>
                                    <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#137fec]"></span>
                                        Pseudocode
                                    </h4>
                                    <pre className="ml-3.5 p-4 bg-[#0d1117] border border-[#30363d] rounded-xl text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{reference.pseudocode}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Improvement Plan */}
                <div className="space-y-6">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sticky top-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
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
                                    <div key={idx} className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-sm text-amber-500">warning</span>
                                            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">{weakness.category}</h4>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                            <strong className="block text-slate-300 mb-1">{weakness.title}</strong>
                                            {weakness.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl text-center text-slate-500 text-sm">
                                    No critical weaknesses identified. Great job!
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#30363d]">
                            <h4 className="text-sm font-bold text-slate-200 mb-2">Final Verdict</h4>
                            <div className={`p-3 rounded-lg border text-center font-bold ${final_verdict.decision === "No Hire" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                    final_verdict.decision === "Hire" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                        "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                }`}>
                                {final_verdict.decision}
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full mt-4 py-3 bg-[#137fec] hover:bg-[#137fec]/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#137fec]/20"
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
    let colorClass = "text-[#137fec]";
    let barColor = "bg-[#137fec]";

    if (status === "optimal" || (typeof progress === 'number' && progress > 70)) {
        colorClass = "text-emerald-400";
        barColor = "bg-emerald-500";
    } else if (status === "needs_improvement" || (typeof progress === 'number' && progress < 40)) {
        colorClass = "text-amber-400";
        barColor = "bg-amber-500";
    }

    return (
        <div className="bg-gradient-to-br from-[#161b22] to-[#0d1117] p-4 border border-[#30363d] rounded-xl">
            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">{title}</span>
            <div className="flex items-end gap-2 mb-2">
                <span className={`text-xl font-mono ${colorClass}`}>{value}</span>
                {subValue && <span className="text-[10px] text-slate-500 mb-1">{subValue}</span>}
            </div>
            {type === "bar" && (
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                    <div className={`${barColor} h-full rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
            )}
        </div>
    );
}