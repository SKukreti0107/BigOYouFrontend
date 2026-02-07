import React, { useMemo } from 'react';

export default function InterviewFeedback({ feedback }) {
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

    if (!data || !data.feedback) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-pulse text-slate-400">Loading feedback analysis...</div>
            </div>
        );
    }

    const { feedback: f } = data;
    const { session_summary, scores, strengths, weaknesses, key_metrics, final_verdict } = f;

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