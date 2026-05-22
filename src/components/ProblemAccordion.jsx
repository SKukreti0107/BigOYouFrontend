import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import { getInterviewErrorMessage } from './interviewErrors';

export default function ProblemAccordion({ topic_deets }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let problems_list = topic_deets.problems || [];
    const progressPercentage = topic_deets.total > 0 ? (topic_deets.completed / topic_deets.total) * 100 : 0;

    const startInterview = async (problemId = null) => {
        try {
            let url = `/interview/start?topic=${encodeURIComponent(topic_deets.topic)}`;
            if (problemId) {
                url += `&problem_id=${problemId}`;
            }
            const res = await api.post(url);
            let session_deets = res.data;
            console.log(session_deets);
            navigate(`/interviewPage/${session_deets.session_id}`, { state: { session_deets } });
        } catch (error) {
            console.error("Failed to start topic interview", error);
            alert(getInterviewErrorMessage(error, "starting an interview"));
        }
    };

    return (
        <div className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-[#137fec]/10 hover:shadow-lg">
            {/* Header / Summary */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-5 bg-[#161b22] hover:bg-[#1c222b] transition-colors focus:outline-none"
                aria-expanded={isOpen}
            >
                {/* Left: Topic Name */}
                <span className="font-semibold tracking-wide text-lg text-slate-200">
                    {topic_deets.topic}
                </span>

                {/* Right: Progress & Icon */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#30363d] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#137fec] to-[#3b82f6] rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-400 min-w-[32px] text-right">
                            {topic_deets.completed}/{topic_deets.total}
                        </span>
                    </div>
                    {/* Expand Chevron */}
                    <span
                        className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                    >
                        expand_more
                    </span>
                </div>
            </button>

            {/* Collapsible Details */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 border-t border-[#30363d]/50">
                        {/* Primary CTA */}
                        <div className="mb-8">
                            <button
                                onClick={() => startInterview()}
                                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#137fec] to-[#0ea5e9] hover:from-[#1d82e6] hover:to-[#0284c7] text-white font-bold tracking-wide transition-all shadow-md shadow-[#137fec]/20 hover:shadow-lg hover:shadow-[#137fec]/40 hover:-translate-y-0.5 cursor-pointer"
                            >
                                Start Random Interview
                            </button>
                        </div>

                        {/* Completed, Suggested Reattempt & Remaining Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#30363d]/30">
                            
                            {/* Completed */}
                            <div className="pt-4 md:pt-0">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                                    Completed Elements
                                </h4>
                                <ul className="space-y-3">
                                    {problems_list.map((p) =>
                                        p.is_completed ? (
                                            <li key={p.id} className="flex items-start gap-2 text-sm text-slate-300 bg-emerald-500/5 p-2 rounded-md border border-emerald-500/10 transition-colors hover:bg-emerald-500/10">
                                                <span className="material-symbols-outlined text-[18px] text-emerald-500 shrink-0">check_circle</span>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-200">{p.title}</span>
                                                    {p.score !== null && (
                                                        <span className="text-[10px] text-emerald-400/80 font-mono mt-0.5">Scored: {p.score}%</span>
                                                    )}
                                                </div>
                                            </li>
                                        ) : null
                                    )}
                                    {!problems_list.some(p => p.is_completed) && (
                                        <li className="text-sm text-slate-500 italic px-2 py-1">No completed questions yet.</li>
                                    )}
                                </ul>
                            </div>

                            {/* Suggested Reattempt */}
                            <div className="pt-6 md:pt-0 md:pl-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                                    Suggested Reattempt
                                </h4>
                                <ul className="space-y-3">
                                    {problems_list.map((p) =>
                                        p.is_reattempt ? (
                                            <li 
                                                key={p.id} 
                                                onClick={() => startInterview(p.id)}
                                                className="flex items-center justify-between gap-2 text-sm text-slate-300 bg-rose-500/5 p-2 rounded-md border border-rose-500/10 transition-all duration-300 hover:border-rose-500/30 hover:bg-rose-500/10 cursor-pointer group"
                                                title="Reattempt this specific problem"
                                            >
                                                <div className="flex items-start gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-rose-500 shrink-0 mt-0.5">error</span>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-200 group-hover:text-rose-400 transition-colors">{p.title}</span>
                                                        {p.score !== null && (
                                                            <span className="text-[10px] text-rose-400/80 font-mono mt-0.5">Scored: {p.score}%</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shrink-0">
                                                    play_circle
                                                </span>
                                            </li>
                                        ) : null
                                    )}
                                    {!problems_list.some(p => p.is_reattempt) && (
                                        <li className="text-sm text-slate-500 italic px-2 py-1">No reattempts suggested.</li>
                                    )}
                                </ul>
                            </div>

                            {/* Remaining */}
                            <div className="pt-6 md:pt-0 md:pl-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">pending</span>
                                    Remaining Questions
                                </h4>
                                <ul className="space-y-3">
                                    {problems_list.map((p) =>
                                        (!p.is_completed && !p.is_reattempt) ? (
                                            <li key={p.id} className="flex items-start gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors p-2 rounded-md hover:bg-slate-800/50">
                                                <span className="material-symbols-outlined text-[18px] text-slate-600 shrink-0">circle</span>
                                                <span className="font-medium">{p.title}</span>
                                            </li>
                                        ) : null
                                    )}
                                    {!problems_list.some(p => !p.is_completed && !p.is_reattempt) && (
                                        <li className="text-sm text-emerald-500 font-medium px-2 py-1">All conquered! 🎉</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}