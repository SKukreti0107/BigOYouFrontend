export default function QuickStats() {
    return (
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Interviews Taken */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Interviews Taken</span>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="text-5xl font-black text-white font-mono tracking-tighter">
                        48
                    </div>
                    <div>
                        <span className="inline-block text-emerald-400 text-[11px] font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                            ↑ 3 this week
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Interview Score */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Average Score</span>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="text-5xl font-black text-white font-mono tracking-tighter">
                        82<span className="text-3xl text-slate-400">.4%</span>
                    </div>
                    <div>
                        <span className="inline-block text-[#137fec] text-[11px] font-bold bg-[#137fec]/10 px-2.5 py-1 rounded border border-[#137fec]/20">
                            ↑ 1.2 pts
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Top Topics */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between hover:border-[#137fec]/50 transition-colors group">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-widest group-hover:text-slate-300 transition-colors">Top Topics</span>
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        Silver Tier
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="px-3 py-1.5 rounded-lg bg-[#0d1117] text-sm font-semibold text-slate-300 border border-[#30363d]">Arrays</span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#0d1117] text-sm font-semibold text-slate-300 border border-[#30363d]">Graphs</span>
                    <span className="px-3 py-1.5 rounded-lg bg-[#0d1117] text-sm font-semibold text-slate-300 border border-[#30363d]">Trees</span>
                </div>
            </div>

        </div>
    );
}
