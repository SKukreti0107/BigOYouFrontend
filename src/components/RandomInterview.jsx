export default function RandomInterview() {
    return (
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Start a Random Interview</h3>
                    <p className="text-xs text-slate-400">Pick a difficulty and launch a fresh mock session.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="relative">
                        <select className="appearance-none bg-[#0d1117] text-xs font-semibold text-slate-300 pl-3 pr-8 py-2 rounded-lg border border-[#30363d] hover:bg-slate-800 focus:outline-none cursor-pointer">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                            <option>Mixed</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-[16px] pointer-events-none">expand_more</span>
                    </div>
                    <button className="bg-[#137fec] hover:bg-[#137fec]/90 text-white text-xs font-bold py-2 px-5 rounded-lg shadow-lg shadow-[#137fec]/20 transition-all flex items-center gap-2 justify-center cursor-pointer">
                        <span className="material-symbols-outlined text-[18px]">play_circle</span>
                        Start Random Interview
                    </button>
                </div>
            </div>
        </div>
    )
}