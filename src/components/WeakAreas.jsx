export default function WeakAreas() {
    return (
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                    <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                    <h3 className="font-bold text-lg">Weak Areas</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Critical Improvement</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl hover:border-rose-500/30 transition-all">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-slate-200">Dynamic Programming</h4>
                        <span className="text-[10px] font-bold text-rose-400">35% SUCCESS</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-3">Improve: <span className="text-slate-200 font-bold">State transitions</span> &amp; overlapping subproblems.</p>
                    <div className="flex items-center gap-3">
                        <div className="flex-grow bg-slate-800 h-1 rounded-full">
                            <div className="bg-rose-500 h-full rounded-full w-[35%] shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                        </div>
                        <button className="shrink-0 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-[9px] font-black uppercase tracking-wider rounded-md border border-rose-500/30 transition-all">
                            Practice Now
                        </button>
                    </div>
                </div>
                
                <div className="p-4 bg-[#0d1117]/50 border border-[#30363d] rounded-xl hover:border-amber-500/30 transition-all">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-slate-200">System Design</h4>
                        <span className="text-[10px] font-bold text-amber-400">55% SUCCESS</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-3">Improve: <span className="text-slate-200 font-bold">Scalability patterns</span> &amp; database sharding.</p>
                    <div className="flex items-center gap-3">
                        <div className="flex-grow bg-slate-800 h-1 rounded-full">
                            <div className="bg-amber-500 h-full rounded-full w-[55%] shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                        </div>
                        <button className="shrink-0 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-white text-[9px] font-black uppercase tracking-wider rounded-md border border-amber-500/30 transition-all">
                            Practice Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
