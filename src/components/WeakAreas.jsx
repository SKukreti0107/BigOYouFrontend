import { useNavigate } from 'react-router-dom';

export default function WeakAreas({ weakAreas, loading = false }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px] animate-pulse">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700"></div>
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-slate-800 rounded"></div>
                            <div className="h-3 w-32 bg-slate-800 rounded"></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Skeleton Row 1 */}
                        <div className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-32 bg-slate-800 rounded"></div>
                                <div className="h-3 w-16 bg-slate-800 rounded"></div>
                            </div>
                            <div className="h-3 w-48 bg-slate-800 rounded"></div>
                            <div className="flex items-center gap-3">
                                <div className="flex-grow bg-slate-800 h-1 rounded-full"></div>
                                <div className="h-7 w-16 bg-slate-800 rounded-md shrink-0"></div>
                            </div>
                        </div>

                        {/* Skeleton Row 2 */}
                        <div className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-28 bg-slate-800 rounded"></div>
                                <div className="h-3 w-16 bg-slate-800 rounded"></div>
                            </div>
                            <div className="h-3 w-40 bg-slate-800 rounded"></div>
                            <div className="flex items-center gap-3">
                                <div className="flex-grow bg-slate-800 h-1 rounded-full"></div>
                                <div className="h-7 w-16 bg-slate-800 rounded-md shrink-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    let displayAreas = [];
    let isMock = false;
    let isAllStrong = false;

    if (weakAreas !== undefined && weakAreas !== null) {
        if (weakAreas.length > 0) {
            displayAreas = weakAreas;
        } else {
            // If they have taken interviews but weakAreas is empty, they are strong in everything!
            isAllStrong = true;
        }
    } else {
        // Fallback to beautiful default benchmarks
        displayAreas = [
            {
                topic: "Dynamic Programming",
                success_rate: 35,
                improvement_tip: "State transitions & overlapping subproblems."
            },
            {
                topic: "System Design",
                success_rate: 55,
                improvement_tip: "Scalability patterns & database sharding."
            }
        ];
        isMock = true;
    }

    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 relative overflow-hidden group flex-grow flex flex-col justify-between min-h-[220px]">
            {isMock && (
                <div className="absolute top-4 right-4 z-20 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-[9px] font-black text-amber-500 uppercase tracking-widest animate-pulse pointer-events-none">
                    Benchmark
                </div>
            )}
            
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                        <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">Weak Areas</h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Critical Improvement</p>
                    </div>
                </div>

                {isAllStrong ? (
                    <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500 text-4xl">verified</span>
                        <h4 className="text-sm font-bold text-slate-200 mt-1">Outstanding Performance!</h4>
                        <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                            No critical weak areas detected. All your practiced topics show scores above 75%. Keep up the excellent work!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayAreas.map((area, idx) => {
                            const isLow = area.success_rate < 50;
                            const progressColor = isLow ? "bg-rose-500" : "bg-amber-500";
                            const textColor = isLow ? "text-rose-400" : "text-amber-400";
                            const borderHover = isLow ? "hover:border-rose-500/30" : "hover:border-amber-500/30";
                            const glowStyle = isLow 
                                ? "shadow-[0_0_8px_rgba(244,63,94,0.4)]" 
                                : "shadow-[0_0_8px_rgba(245,158,11,0.4)]";

                            return (
                                <div key={idx} className={`p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl transition-all ${borderHover}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-xs font-bold text-slate-200">{area.topic}</h4>
                                        <span className={`text-[10px] font-bold ${textColor}`}>
                                            {area.success_rate}% SUCCESS
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 mb-3">
                                        Improve: <span className="text-slate-200 font-bold">{area.improvement_tip}</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow bg-slate-800 h-1 rounded-full">
                                            <div 
                                                className={`h-full rounded-full ${progressColor} ${glowStyle}`}
                                                style={{ width: `${area.success_rate}%` }}
                                            ></div>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/practice')}
                                            className={`shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-black uppercase tracking-wider rounded-md border border-[#30363d] transition-all cursor-pointer`}
                                        >
                                            Practice
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
