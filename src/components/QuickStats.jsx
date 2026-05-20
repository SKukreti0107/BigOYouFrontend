export default function QuickStats({ stats, loading = false }) {
    if (loading) {
        return (
            <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {/* Interviews Taken Skeleton */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between min-h-[200px]">
                    <div className="h-4 w-32 bg-slate-800 rounded"></div>
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="h-10 w-16 bg-slate-800 rounded"></div>
                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                    </div>
                </div>

                {/* Average Score Skeleton */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between min-h-[200px]">
                    <div className="h-4 w-32 bg-slate-800 rounded"></div>
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="h-10 w-24 bg-slate-800 rounded"></div>
                        <div className="h-6 w-20 bg-slate-800 rounded"></div>
                    </div>
                </div>

                {/* Top Topics Skeleton */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between min-h-[200px]">
                    <div className="flex justify-between items-center">
                        <div className="h-4 w-28 bg-slate-800 rounded"></div>
                        <div className="h-5 w-20 bg-slate-800 rounded-full"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <div className="h-8 w-16 bg-slate-800 rounded-lg"></div>
                        <div className="h-8 w-20 bg-slate-800 rounded-lg"></div>
                        <div className="h-8 w-16 bg-slate-800 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    const displayTaken = stats?.interviews_taken ?? 0;
    const displayThisWeek = stats?.interviews_this_week ?? 0;
    const displayAvg = stats?.average_score !== undefined ? stats.average_score : null;
    const displayImprovement = stats?.score_improvement !== undefined ? stats.score_improvement : null;
    const displayTopics = stats?.top_topics && stats.top_topics.length > 0 ? stats.top_topics : [];
    const hasData = displayTaken > 0;

    // Dynamic gamification tier — only shown once the user has sessions
    let tierLabel = null;
    let tierColor = "text-slate-400 bg-slate-500/10 border-slate-500/20";
    if (displayTaken >= 20) {
        tierLabel = "Gold Tier";
        tierColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    } else if (displayTaken >= 10) {
        tierLabel = "Silver Tier";
        tierColor = "text-slate-300 bg-slate-400/10 border-slate-400/20";
    } else if (displayTaken >= 1) {
        tierLabel = "Bronze Tier";
        tierColor = "text-amber-600 bg-amber-700/10 border-amber-700/20";
    }

    return (
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Interviews Taken */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Interviews Taken</span>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="text-5xl font-black text-white font-mono tracking-tighter">
                        {displayTaken}
                    </div>
                    <div>
                        {hasData ? (
                            <span className="inline-block text-emerald-400 text-[11px] font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                                ↑ {displayThisWeek} this week
                            </span>
                        ) : (
                            <span className="inline-block text-slate-500 text-[11px] font-medium bg-slate-800/50 px-2.5 py-1 rounded border border-[#30363d]">
                                Start your first session →
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Average Score */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Average Score</span>
                </div>
                {hasData ? (
                    <div className="flex flex-col gap-3 mt-auto">
                        <div className="text-5xl font-black text-white font-mono tracking-tighter">
                            {displayAvg}<span className="text-3xl text-slate-400">%</span>
                        </div>
                        <div>
                            <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded border ${
                                displayImprovement >= 0 
                                    ? "text-[#137fec] bg-[#137fec]/10 border-[#137fec]/20" 
                                    : "text-rose-500 bg-rose-500/10 border-rose-500/20"
                            }`}>
                                {displayImprovement >= 0 ? "↑" : "↓"} {Math.abs(displayImprovement)} pts
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 gap-2 py-4 text-center">
                        <span className="material-symbols-outlined text-slate-700 text-3xl">query_stats</span>
                        <p className="text-slate-600 text-xs leading-relaxed">Complete an interview<br/>to see your score</p>
                    </div>
                )}
            </div>
            
            {/* Top Topics */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Top Topics</span>
                    {tierLabel && (
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${tierColor}`}>
                            {tierLabel}
                        </span>
                    )}
                </div>
                {displayTopics.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {displayTopics.map((topic, index) => (
                            <span key={index} className="px-3 py-1.5 rounded-lg bg-[#0d1117] text-sm font-semibold text-slate-300 border border-[#30363d]">
                                {topic}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 gap-2 py-2 text-center">
                        <span className="material-symbols-outlined text-slate-700 text-3xl">topic</span>
                        <p className="text-slate-600 text-xs leading-relaxed">Topics will appear<br/>after your first interview</p>
                    </div>
                )}
            </div>

        </div>
    );
}
